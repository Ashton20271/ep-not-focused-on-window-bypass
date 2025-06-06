// content.js
// IF IT WORKS DONT TRY AND FIX IT
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

let isActive = false;
let intervalId;

function toggleWindowActive(state) {
  if (state) {
      if (!isActive) {
          keepWindowActive();
          isActive = true;
      }
  } else {
      if (isActive) {
          clearInterval(intervalId);
          location.reload(); // Reload the page to reset modifications
          isActive = false;
      }
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'turnOn') {
      toggleWindowActive(true);
      sendResponse({ status: 'on' });
  } else if (request.action === 'turnOff') {
      toggleWindowActive(false);
      sendResponse({ status: 'off' });
  } else if (request.action === 'getStatus') {
      sendResponse({ status: isActive ? 'on' : 'off' });
  }
});

// Run the function to keep the window active on load if needed
if (isActive) {
  toggleWindowActive(true);
}
