const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;
const rootDir = __dirname;
const defaultFile = 'index.html';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  const requestPath = decodeURIComponent(req.url.split('?')[0]);
  const cleanedPath = requestPath === '/' ? defaultFile : requestPath.replace(/^\/+/, '');
  const safePath = path.normalize(cleanedPath).replace(/^([.]{2}[\\/])+/, '');
  let filePath = path.join(rootDir, safePath);

  if (!filePath.startsWith(rootDir)) {
    return sendNotFound(res, requestPath);
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      return sendNotFound(res, requestPath);
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, defaultFile);
    }

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        return sendNotFound(res, requestPath);
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      res.end(data);
    });
  });
});

function sendNotFound(res, resourcePath) {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(`Resource not found: ${resourcePath}`);
}

server.listen(port, () => {
  console.log(`Static server running at http://localhost:${port}`);
});
