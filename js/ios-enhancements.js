/* ============================================
   iOS Enhancements Module
   Apple-Quality Interactions & Features
   ============================================ */

// ============================================
// 1. Toast Notifications (iOS Style)
// ============================================

export const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'default', duration = 3000) {
    this.init();

    const toast = document.createElement('div');
    toast.className = `toast-ios toast-${type}`;

    const icon = this.getIcon(type);
    toast.innerHTML = `
      <div class="toast-content">
        ${icon}
        <div class="toast-message">${message}</div>
      </div>
    `;

    this.container.appendChild(toast);

    // Auto-dismiss
    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }, duration);

    // Haptic feedback
    this.haptic('light');

    return toast;
  },

  success(message, duration) {
    return this.show(message, 'success', duration);
  },

  error(message, duration) {
    return this.show(message, 'error', duration);
  },

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  },

  getIcon(type) {
    const icons = {
      success: '<svg class="toast-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
      error: '<svg class="toast-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>',
      warning: '<svg class="toast-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>',
      default: '<svg class="toast-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>'
    };
    return icons[type] || icons.default;
  },

  haptic(type = 'light') {
    if ('vibrate' in navigator) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 30
      };
      navigator.vibrate(patterns[type] || 10);
    }
  }
};

// ============================================
// 2. Form Validation (iOS Style)
// ============================================

export class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = form.querySelectorAll('input, textarea, select');
    this.init();
  }

  init() {
    this.inputs.forEach(input => {
      // Validate on blur
      input.addEventListener('blur', () => this.validateField(input));
      
      // Clear error on input
      input.addEventListener('input', () => this.clearError(input));
      
      // Auto-advance focus
      if (input.type === 'tel' && input.maxLength) {
        input.addEventListener('input', (e) => this.autoAdvance(e));
      }
    });

    // Validate on submit
    this.form.addEventListener('submit', (e) => {
      if (!this.validateForm()) {
        e.preventDefault();
        this.focusFirstError();
      }
    });

    // Auto-focus first field
    this.focusFirst();
  }

  validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let message = '';

    // Required check
    if (input.required && !value) {
      isValid = false;
      message = 'This field is required';
    }
    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
      }
    }
    // Password validation
    else if (type === 'password' && value && input.minLength) {
      if (value.length < input.minLength) {
        isValid = false;
        message = `Password must be at least ${input.minLength} characters`;
      }
    }
    // Number validation
    else if (type === 'number' && value) {
      const num = parseFloat(value);
      if (input.min && num < parseFloat(input.min)) {
        isValid = false;
        message = `Must be at least ${input.min}`;
      }
      if (input.max && num > parseFloat(input.max)) {
        isValid = false;
        message = `Must be no more than ${input.max}`;
      }
    }

    if (!isValid) {
      this.showError(input, message);
    } else if (value) {
      this.showSuccess(input);
    }

    return isValid;
  }

  validateForm() {
    let isValid = true;
    this.inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    return isValid;
  }

  showError(input, message) {
    input.classList.add('input-error');
    input.classList.remove('input-success');
    
    let errorEl = input.parentElement.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-message';
      input.parentElement.appendChild(errorEl);
    }
    
    errorEl.innerHTML = `
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>
      ${message}
    `;
    
    Toast.haptic('medium');
  }

  showSuccess(input) {
    input.classList.remove('input-error');
    input.classList.add('input-success');
    
    const errorEl = input.parentElement.querySelector('.error-message');
    if (errorEl) errorEl.remove();
  }

  clearError(input) {
    input.classList.remove('input-error');
    const errorEl = input.parentElement.querySelector('.error-message');
    if (errorEl) errorEl.remove();
  }

  focusFirst() {
    const firstInput = this.form.querySelector('input:not([type="hidden"]):not([disabled])');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  focusFirstError() {
    const firstError = this.form.querySelector('.input-error');
    if (firstError) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  autoAdvance(e) {
    const input = e.target;
    if (input.value.length >= input.maxLength) {
      const inputs = Array.from(this.inputs);
      const currentIndex = inputs.indexOf(input);
      const nextInput = inputs[currentIndex + 1];
      if (nextInput) nextInput.focus();
    }
  }
}

// ============================================
// 3. Modal Sheet (iOS Bottom Sheet)
// ============================================

export class ModalSheet {
  constructor(content, options = {}) {
    this.content = content;
    this.options = {
      dismissible: true,
      onDismiss: null,
      ...options
    };
    this.overlay = null;
    this.sheet = null;
  }

  show() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    
    // Create sheet
    this.sheet = document.createElement('div');
    this.sheet.className = 'modal-sheet';
    this.sheet.innerHTML = `
      <div class="modal-handle"></div>
      <div class="modal-sheet-content">
        ${this.content}
      </div>
    `;
    
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.sheet);
    
    // Animate in
    requestAnimationFrame(() => {
      this.overlay.classList.add('active');
      this.sheet.classList.add('active');
    });
    
    // Dismissible
    if (this.options.dismissible) {
      this.overlay.addEventListener('click', () => this.dismiss());
      
      // Swipe down to dismiss
      this.addSwipeDismiss();
    }
    
    Toast.haptic('light');
  }

  dismiss() {
    this.overlay.classList.remove('active');
    this.sheet.classList.remove('active');
    
    setTimeout(() => {
      this.overlay?.remove();
      this.sheet?.remove();
      if (this.options.onDismiss) this.options.onDismiss();
    }, 400);
  }

  addSwipeDismiss() {
    let startY = 0;
    let currentY = 0;
    
    this.sheet.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });
    
    this.sheet.addEventListener('touchmove', (e) => {
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      
      if (deltaY > 0) {
        this.sheet.style.transform = `translateY(${deltaY}px)`;
      }
    });
    
    this.sheet.addEventListener('touchend', () => {
      const deltaY = currentY - startY;
      
      if (deltaY > 100) {
        this.dismiss();
      } else {
        this.sheet.style.transform = '';
      }
    });
  }
}

// ============================================
// 4. Action Sheet
// ============================================

export function showActionSheet(options) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const sheet = document.createElement('div');
  sheet.className = 'action-sheet';
  
  const actionsHtml = options.actions.map(action => `
    <div class="action-sheet-item ${action.destructive ? 'destructive' : ''}" data-action="${action.id}">
      ${action.label}
    </div>
  `).join('');
  
  sheet.innerHTML = `
    <div class="action-sheet-actions">
      ${actionsHtml}
    </div>
    <div class="action-sheet-cancel">Cancel</div>
  `;
  
  document.body.appendChild(overlay);
  document.body.appendChild(sheet);
  
  requestAnimationFrame(() => {
    overlay.classList.add('active');
    sheet.classList.add('active');
  });
  
  const dismiss = () => {
    overlay.classList.remove('active');
    sheet.classList.remove('active');
    setTimeout(() => {
      overlay.remove();
      sheet.remove();
    }, 400);
  };
  
  // Handle actions
  sheet.querySelectorAll('.action-sheet-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = options.actions.find(a => a.id === item.dataset.action);
      if (action?.handler) action.handler();
      dismiss();
    });
  });
  
  // Handle cancel
  sheet.querySelector('.action-sheet-cancel').addEventListener('click', dismiss);
  overlay.addEventListener('click', dismiss);
  
  Toast.haptic('light');
}

// ============================================
// 5. Pull-to-Refresh
// ============================================

export function enablePullToRefresh(container, onRefresh) {
  let startY = 0;
  let currentY = 0;
  let pulling = false;
  
  const indicator = document.createElement('div');
  indicator.className = 'pull-refresh-indicator';
  indicator.innerHTML = '<div class="spinner-ios"></div>';
  container.style.position = 'relative';
  container.insertBefore(indicator, container.firstChild);
  
  container.addEventListener('touchstart', (e) => {
    if (container.scrollTop === 0) {
      startY = e.touches[0].clientY;
      pulling = true;
    }
  });
  
  container.addEventListener('touchmove', (e) => {
    if (!pulling) return;
    
    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    
    if (deltaY > 0 && deltaY < 100) {
      indicator.style.top = `${deltaY - 60}px`;
    }
    
    if (deltaY > 80) {
      indicator.classList.add('visible');
    } else {
      indicator.classList.remove('visible');
    }
  });
  
  container.addEventListener('touchend', async () => {
    if (!pulling) return;
    pulling = false;
    
    const deltaY = currentY - startY;
    
    if (deltaY > 80 && onRefresh) {
      Toast.haptic('medium');
      await onRefresh();
    }
    
    indicator.style.top = '';
    indicator.classList.remove('visible');
  });
}

// ============================================
// 6. iOS-Style Search Bar
// ============================================

export function enhanceSearchBar(searchElement) {
  const wrapper = searchElement.querySelector('.search-input-wrapper') || searchElement;
  const input = searchElement.querySelector('input[type="search"]') || searchElement;
  const cancelBtn = searchElement.querySelector('.search-cancel');
  
  input.addEventListener('focus', () => {
    searchElement.classList.add('active');
    wrapper.classList.add('focused');
  });
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      input.value = '';
      input.blur();
      searchElement.classList.remove('active');
      wrapper.classList.remove('focused');
    });
  }
  
  // Clear button
  const clearBtn = searchElement.querySelector('.search-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      input.focus();
    });
  }
}

// ============================================
// 7. Offline Detection
// ============================================

export function initOfflineDetection() {
  const banner = document.createElement('div');
  banner.className = 'offline-banner';
  banner.textContent = 'No Internet Connection';
  document.body.appendChild(banner);
  
  window.addEventListener('offline', () => {
    banner.classList.add('visible');
    Toast.show('You are offline', 'warning', 2000);
  });
  
  window.addEventListener('online', () => {
    banner.classList.remove('visible');
    Toast.success('Back online', 2000);
  });
}

// ============================================
// 8. Swipe Actions for List Items
// ============================================

export function enableSwipeActions(listItem, actions) {
  let startX = 0;
  let currentX = 0;
  let swiping = false;
  
  listItem.classList.add('swipeable');
  
  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'swipe-actions';
  actionsContainer.innerHTML = actions.map(action => `
    <div class="swipe-action ${action.type}" data-action="${action.id}">
      ${action.label}
    </div>
  `).join('');
  
  listItem.style.position = 'relative';
  listItem.appendChild(actionsContainer);
  
  listItem.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    swiping = true;
  });
  
  listItem.addEventListener('touchmove', (e) => {
    if (!swiping) return;
    
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    
    if (deltaX < -50) {
      listItem.classList.add('swiped');
    }
  });
  
  listItem.addEventListener('touchend', () => {
    swiping = false;
  });
  
  // Handle action clicks
  actionsContainer.querySelectorAll('.swipe-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = actions.find(a => a.id === btn.dataset.action);
      if (action?.handler) action.handler();
      listItem.classList.remove('swiped');
    });
  });
  
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!listItem.contains(e.target)) {
      listItem.classList.remove('swiped');
    }
  });
}

// ============================================
// 9. Empty State Helper
// ============================================

export function showEmptyState(container, options) {
  const {
    icon = '📭',
    title = 'No items',
    message = 'There are no items to display',
    actionLabel = null,
    actionHandler = null
  } = options;
  
  const emptyState = document.createElement('div');
  emptyState.className = 'empty-state';
  
  emptyState.innerHTML = `
    <div class="empty-state-icon">${icon}</div>
    <div class="empty-state-title">${title}</div>
    <div class="empty-state-message">${message}</div>
    ${actionLabel ? `
      <div class="empty-state-action">
        <button class="bg-primary text-white px-6 py-3 rounded-lg font-semibold">${actionLabel}</button>
      </div>
    ` : ''}
  `;
  
  if (actionLabel && actionHandler) {
    const btn = emptyState.querySelector('button');
    btn.addEventListener('click', actionHandler);
  }
  
  container.innerHTML = '';
  container.appendChild(emptyState);
}

// ============================================
// 10. Skeleton Loader Helper
// ============================================

export function showSkeleton(container, count = 3) {
  const skeletons = [];
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton skeleton-card';
    skeleton.style.marginBottom = '16px';
    skeletons.push(skeleton);
  }
  
  container.innerHTML = '';
  skeletons.forEach(s => container.appendChild(s));
}

// ============================================
// Auto-initialize on load
// ============================================

if (typeof window !== 'undefined') {
  // Initialize offline detection
  document.addEventListener('DOMContentLoaded', () => {
    initOfflineDetection();
  });
}

// Export for use
export default {
  Toast,
  FormValidator,
  ModalSheet,
  showActionSheet,
  enablePullToRefresh,
  enhanceSearchBar,
  initOfflineDetection,
  enableSwipeActions,
  showEmptyState,
  showSkeleton
};
