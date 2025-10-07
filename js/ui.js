// T008-T014: UI Component Library
// Reusable components for Quant-Driven Crypto Investment Platform

import { t } from './i18n.js';

// T008: StatCard - Display key metrics
export function StatCard({ title, value, trend = null, color = 'text-accent' }) {
  // Validate inputs
  const safeTitle = title || 'Metric';
  const safeValue = value || '—';
  
  const trendColor = trend && String(trend).startsWith('-') ? 'text-error' : color;
  const trendHtml = trend ? `
    <span class="inline-flex items-center mt-2 text-sm ${trendColor}">
      ${trend}
    </span>
  ` : '';

  return `
    <article class="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
             role="region"
             aria-label="${safeTitle}: ${safeValue}${trend ? ', ' + trend : ''}">
      <h3 class="text-sm font-medium text-gray-600">${safeTitle}</h3>
      <p class="text-3xl font-bold text-primary mt-2">${safeValue}</p>
      ${trendHtml}
    </article>
  `;
}

// T009: ButtonPrimary - Primary CTA button
export function ButtonPrimary({ text, onClick = '', disabled = false, ariaLabel = '' }) {
  const classes = `px-6 py-3 bg-accent text-white font-semibold rounded-lg
    hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent
    disabled:opacity-50 disabled:cursor-not-allowed transition-colors`;

  return `
    <button
      class="${classes}"
      onclick="${onClick}"
      ${disabled ? 'disabled' : ''}
      aria-label="${ariaLabel || text}">
      ${text}
    </button>
  `;
}

// T009: ButtonSecondary - Secondary action button
export function ButtonSecondary({ text, onClick = '', disabled = false, ariaLabel = '' }) {
  const classes = `px-6 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary
    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent
    disabled:opacity-50 disabled:cursor-not-allowed transition-colors`;

  return `
    <button
      class="${classes}"
      onclick="${onClick}"
      ${disabled ? 'disabled' : ''}
      aria-label="${ariaLabel || text}">
      ${text}
    </button>
  `;
}

// T010: Modal - Overlay dialog
export function Modal({ id, title, content, confirmText = 'Confirm', cancelText = 'Cancel' }) {
  return `
    <div id="${id}" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 hidden"
         role="dialog"
         aria-modal="true"
         aria-labelledby="${id}-title">
      <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h2 id="${id}-title" class="text-xl font-bold text-primary">${title}</h2>
        <div class="mt-4 text-gray-700">
          ${content}
        </div>
        <div class="mt-6 flex gap-3 justify-end">
          <button onclick="closeModal('${id}')"
                  class="px-6 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent transition-colors">
            ${cancelText}
          </button>
          <button onclick="document.getElementById('${id}').dataset.confirmed = 'true'; closeModal('${id}')"
                  class="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent transition-colors">
            ${confirmText}
          </button>
        </div>
      </div>
    </div>
  `;
}

// T011: Stepper - Multi-step flow indicator
export function Stepper({ steps, currentStep }) {
  const stepsHtml = steps.map((step, index) => {
    const stepNumber = index + 1;
    const isComplete = stepNumber < currentStep;
    const isActive = stepNumber === currentStep;
    const isPending = stepNumber > currentStep;

    const circleClass = isComplete ? 'bg-accent text-white' :
                       isActive ? 'bg-primary text-white' :
                       'bg-gray-200 text-gray-500';

    const labelClass = isActive ? 'text-primary' : 'text-gray-500';

    const lineClass = isComplete ? 'bg-accent' : 'bg-gray-200';

    return `
      <div class="flex-1 flex items-center">
        <div class="flex items-center justify-center w-10 h-10 rounded-full ${circleClass}">
          ${isComplete ? '✓' : stepNumber}
        </div>
        <span class="ml-3 text-sm font-medium ${labelClass}">${step.label}</span>
        ${index < steps.length - 1 ? `<div class="flex-1 h-1 mx-4 ${lineClass}"></div>` : ''}
      </div>
    `;
  }).join('');

  return `
    <nav class="flex items-center justify-between mb-8"
         role="progressbar"
         aria-valuenow="${currentStep}"
         aria-valuemin="1"
         aria-valuemax="${steps.length}">
      ${stepsHtml}
    </nav>
  `;
}

// T012: DataTable - Tabular data display
export function DataTable({ columns, rows, onRowClick = null, sortable = false }) {
  const headerHtml = columns.map(col => `
    <th scope="col"
        class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b"
        style="${col.width ? `width: ${col.width}` : ''}">
      ${col.label}
    </th>
  `).join('');

  const rowsHtml = rows.map((row, index) => {
    const rowClass = `border-b hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''} ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`;
    const onClick = onRowClick ? `onclick="${onRowClick}(${JSON.stringify(row).replace(/"/g, '&quot;')})"` : '';

    const cellsHtml = columns.map(col => `
      <td class="px-4 py-3 text-sm text-gray-900">${row[col.key]}</td>
    `).join('');

    return `
      <tr class="${rowClass}" ${onClick} ${onRowClick ? 'tabindex="0" role="button"' : ''}>
        ${cellsHtml}
      </tr>
    `;
  }).join('');

  return `
    <table class="w-full border-collapse">
      <thead class="bg-gray-50 sticky top-0">
        <tr>${headerHtml}</tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  `;
}

// T013: AlertBanner - System notifications
export function AlertBanner({ message, type = 'info', dismissible = true, onDismiss = '' }) {
  const typeClasses = {
    info: 'bg-blue-50 border-blue-400 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    error: 'bg-red-50 border-error text-error',
    success: 'bg-green-50 border-green-400 text-green-800'
  };

  const dismissButton = dismissible ? `
    <button onclick="${onDismiss}"
            class="ml-4 text-gray-500 hover:text-gray-700"
            aria-label="Dismiss alert">
      ✕
    </button>
  ` : '';

  return `
    <div class="fixed top-0 left-0 right-0 z-40 px-4 py-3 ${typeClasses[type]} border-b-4" role="alert">
      <div class="flex items-center justify-between max-w-7xl mx-auto">
        <p class="text-sm font-medium">${message}</p>
        ${dismissButton}
      </div>
    </div>
  `;
}

// T014: PerformanceChart - Chart.js wrapper
export function PerformanceChart({ data, period = '1M', onPeriodChange = '' }) {
  const periods = ['1D', '1W', '1M', '1Y', 'ALL'];

  const buttonsHtml = periods.map(p => {
    const activeClass = p === period ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700';
    return `
      <button onclick="${onPeriodChange}('${p}')"
              class="px-3 py-1 rounded text-sm font-medium ${activeClass} hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent">
        ${p}
      </button>
    `;
  }).join('');

  return `
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div class="flex gap-2 mb-4">
        ${buttonsHtml}
      </div>
      <canvas id="performance-chart" width="800" height="300" aria-label="Portfolio performance chart"></canvas>
    </div>
  `;
}

// Helper: Open modal
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.dataset.confirmed = 'false';
  }
}

// Helper: Close modal
export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Make closeModal available globally
window.closeModal = closeModal;
