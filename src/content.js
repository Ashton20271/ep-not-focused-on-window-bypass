// content.js

function keepWindowActive() {
  // Simulate focus and visibility events
  window.addEventListener('blur', () => {
    window.dispatchEvent(new Event('focus'));
  });

  window.addEventListener('visibilitychange', (event) => {
    if (document.hidden) {
      document.dispatchEvent(new Event('visibilitychange'));
    }
  });

  // Override the document.hidden and document.visibilityState properties
  Object.defineProperty(document, 'hidden', {
    configurable: true,
    get: () => false
  });

  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => 'visible'
  });

  // Ensure focus event is periodically dispatched
  setInterval(() => {
    window.dispatchEvent(new Event('focus'));
  }, 1000);
}

// Run the function to keep the window active
keepWindowActive();
