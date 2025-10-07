// Gallery System
// Displays all 15 wireframe screens in iPhone frames simultaneously

// All available screens (matches showcase.js)
const ALL_SCREENS = [
  { path: 'screens/auth-login.html', name: 'Login', category: 'Auth' },
  { path: 'screens/auth-register.html', name: 'Register', category: 'Auth' },
  { path: 'screens/auth-kyc.html', name: 'KYC Verification', category: 'Auth' },
  { path: 'screens/dashboard.html', name: 'Dashboard', category: 'Dashboard' },
  { path: 'screens/strategy-details.html', name: 'Strategy Details', category: 'Strategy' },
  { path: 'screens/allocate-step1.html', name: 'Select Strategy', category: 'Allocate' },
  { path: 'screens/allocate-step2.html', name: 'Enter Amount', category: 'Allocate' },
  { path: 'screens/allocate-step3.html', name: 'Confirm Allocation', category: 'Allocate' },
  { path: 'screens/history.html', name: 'Transaction History', category: 'History' },
  { path: 'screens/settings.html', name: 'Settings Hub', category: 'Settings' },
  { path: 'screens/settings-profile.html', name: 'Profile Settings', category: 'Settings' },
  { path: 'screens/settings-security.html', name: 'Security Settings', category: 'Settings' },
  { path: 'screens/settings-banks.html', name: 'Bank Accounts', category: 'Settings' },
  { path: 'screens/banking-deposit.html', name: 'Deposit Funds', category: 'Banking' },
  { path: 'screens/banking-withdraw.html', name: 'Withdraw Funds', category: 'Banking' }
];

// Status bar HTML template
function getStatusBarHTML() {
  return `
    <div class="iphone-status-bar">
      <div class="time">9:41</div>
      <div class="indicators">
        <div class="status-signal">
          <span></span><span></span><span></span><span></span>
        </div>
        <svg class="status-wifi" viewBox="0 0 16 12" fill="none">
          <path d="M8 10.5C8.69036 10.5 9.25 9.94036 9.25 9.25C9.25 8.55964 8.69036 8 8 8C7.30964 8 6.75 8.55964 6.75 9.25C6.75 9.94036 7.30964 10.5 8 10.5Z" fill="black"/>
          <path d="M11.0607 7.43934C9.70001 6.07862 7.29999 6.07862 5.93934 7.43934" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M13.182 5.31802C10.8609 3.00066 7.13909 3.00066 4.81802 5.31802" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M15.303 3.19671C11.9218 -0.184508 6.07819 -0.184508 2.69671 3.19671" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <div class="status-battery">
          <div class="status-battery-fill"></div>
        </div>
      </div>
    </div>
  `;
}

// Generate iPhone frame HTML for a screen
function createFrameHTML(screen, index) {
  const timestamp = Date.now();
  return `
    <div class="iphone-frame-container">
      <div class="iphone-frame">
        <div class="iphone-notch"></div>
        ${getStatusBarHTML()}
        <div id="screen-${index}" class="iphone-screen">
          <iframe id="gallery-frame-${index}" src="${screen.path}?t=${timestamp}" title="${screen.name}"></iframe>
        </div>
        <div class="iphone-home-indicator"></div>
      </div>
      <div class="screen-name">${screen.name}</div>
      <div class="screen-category">${screen.category}</div>
    </div>
  `;
}

// Initialize gallery
function initGallery() {
  const galleryGrid = document.getElementById('gallery-grid');

  if (!galleryGrid) {
    console.error('Gallery grid container not found');
    return;
  }

  // Generate all frames
  const framesHTML = ALL_SCREENS.map((screen, index) => createFrameHTML(screen, index)).join('');
  galleryGrid.innerHTML = framesHTML;

  // Add load event listeners for each iframe
  ALL_SCREENS.forEach((screen, index) => {
    const iframe = document.getElementById(`gallery-frame-${index}`);
    const screenContainer = document.getElementById(`screen-${index}`);

    if (iframe && screenContainer) {
      // Add loading class
      screenContainer.classList.add('loading');

      // Remove loading class when loaded
      iframe.addEventListener('load', () => {
        screenContainer.classList.remove('loading');
      }, { once: true });

      // Handle load errors
      iframe.addEventListener('error', () => {
        console.error(`Failed to load: ${screen.path}`);
        screenContainer.classList.remove('loading');
      });
    }
  });

  console.log(`Gallery initialized with ${ALL_SCREENS.length} screens`);
}

// Function to reload all iframes (useful for language changes)
function reloadAllFrames() {
  ALL_SCREENS.forEach((screen, index) => {
    const iframe = document.getElementById(`gallery-frame-${index}`);
    if (iframe) {
      // Add timestamp to force reload and bypass cache
      const timestamp = Date.now();
      iframe.src = `${screen.path}?t=${timestamp}`;
      console.log(`Reloading frame ${index}: ${screen.name}`);
    }
  });
  console.log('All gallery frames reloaded');
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', initGallery);

// Export for external use
export { ALL_SCREENS, initGallery, reloadAllFrames };
