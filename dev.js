'use strict';

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const serverScript = path.join(rootDir, 'server.js');
const ignoredDirs = new Set(['node_modules', '.git', '.claude', '.specify']);
const watchers = new Map();
const debounceMs = 200;

let serverProcess = null;
let restartScheduled = false;
let debounceTimer = null;
let shuttingDown = false;

function startServer() {
  if (shuttingDown) {
    return;
  }

  serverProcess = spawn(process.execPath, [serverScript], {
    stdio: 'inherit'
  });

  serverProcess.on('exit', (code, signal) => {
    const exitReason = signal ? `signal ${signal}` : `code ${code}`;
    if (!shuttingDown && !restartScheduled) {
      console.log(`[dev] server exited unexpectedly (${exitReason}). Restarting...`);
      restartServer();
    }
  });

  console.log('[dev] server started');
}

function stopServer(callback) {
  if (!serverProcess) {
    callback?.();
    return;
  }

  const processToStop = serverProcess;
  serverProcess = null;

  processToStop.once('exit', () => callback?.());
  processToStop.kill();
  setTimeout(() => {
    if (!processToStop.killed) {
      processToStop.kill('SIGKILL');
    }
  }, 5000);
}

function restartServer(triggerPath) {
  if (shuttingDown) {
    return;
  }

  if (triggerPath) {
    const relative = path.relative(rootDir, triggerPath) || '.';
    console.log(`[dev] change detected in ${relative}, reloading...`);
  }

  if (restartScheduled) {
    return;
  }

  restartScheduled = true;

  stopServer(() => {
    restartScheduled = false;
    startServer();
  });
}

function shouldIgnore(targetPath) {
  const relative = path.relative(rootDir, targetPath);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return true;
  }

  return relative.split(path.sep).some((segment) => ignoredDirs.has(segment));
}

function scheduleRestart(targetPath) {
  if (shuttingDown) {
    return;
  }

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    restartServer(targetPath);
  }, debounceMs);
}

function watchDirectory(dirPath) {
  if (watchers.has(dirPath) || shouldIgnore(dirPath)) {
    return;
  }

  let watcher;
  try {
    watcher = fs.watch(dirPath, (event, filename) => {
      if (!filename) {
        scheduleRestart(dirPath);
        rescanDirectories(dirPath);
        return;
      }

      const fullPath = path.join(dirPath, filename);

      if (shouldIgnore(fullPath)) {
        return;
      }

      fs.stat(fullPath, (err, stats) => {
        if (!err && stats.isDirectory()) {
          rescanDirectories(fullPath);
        }
      });

      scheduleRestart(fullPath);
    });
  } catch (error) {
    console.error(`[dev] failed to watch ${dirPath}: ${error.message}`);
    return;
  }

  watcher.on('error', (error) => {
    if (!shuttingDown) {
      console.error(`[dev] watcher error in ${dirPath}: ${error.message}`);
    }
  });

  watchers.set(dirPath, watcher);
}

function rescanDirectories(startDir) {
  const stack = [startDir];
  while (stack.length) {
    const current = stack.pop();
    if (shouldIgnore(current)) {
      continue;
    }

    watchDirectory(current);

    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch (error) {
      continue;
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }
      const entryPath = path.join(current, entry.name);
      if (!shouldIgnore(entryPath)) {
        stack.push(entryPath);
      }
    }
  }
}

function shutdown() {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  console.log('\n[dev] shutting down...');

  for (const watcher of watchers.values()) {
    watcher.close();
  }
  watchers.clear();

  stopServer(() => {
    process.exit(0);
  });

  setTimeout(() => process.exit(0), 2000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

rescanDirectories(rootDir);
startServer();

console.log('[dev] watching for file changes. Press Ctrl+C to stop.');
