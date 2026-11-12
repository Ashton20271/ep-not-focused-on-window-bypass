document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('onButton').addEventListener('click', function() {
        sendMessageToContentScript({ action: 'turnOn' }, updateStatus);
    });

    document.getElementById('offButton').addEventListener('click', function() {
        sendMessageToContentScript({ action: 'turnOff' }, updateStatus);
    });

    sendMessageToContentScript({ action: 'getStatus' }, updateStatus);
});

function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, message, callback);
        }
    });
}

function updateStatus(response) {
    const statusEl = document.getElementById('status');
    if (response && response.status) {
        statusEl.textContent = `Status: ${capitalize(response.status)}`;
    } else {
        statusEl.textContent = 'Status: Unknown';
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
