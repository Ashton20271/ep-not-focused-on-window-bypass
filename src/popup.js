document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('onButton').addEventListener('click', function() {
        sendMessageToContentScript({ action: 'turnOn' }, updateStatus);
    });

    document.getElementById('offButton').addEventListener('click', function() {
        sendMessageToContentScript({ action: 'turnOff' }, updateStatus);
    });

    // Check the current status when the popup is opened
    sendMessageToContentScript({ action: 'getStatus' }, updateStatus);
});

function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, callback);
    });
}

function updateStatus(response) {
    if (response && response.status) {
        document.getElementById('status').textContent = `Status: ${response.status.charAt(0).toUpperCase() + response.status.slice(1)}`;
    } else {
        document.getElementById('status').textContent = 'Status: Unknown';
    }
}
