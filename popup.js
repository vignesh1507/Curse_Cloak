document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const statusElement = document.getElementById('status');
  const buttonText = document.getElementById('buttonText');

  // Load initial state from storage
  chrome.storage.local.get(["extensionActive"], function (result) {
    const isActive = result.extensionActive || false;
    updateUI(isActive);
  });

  // Add event listener for toggle button
  toggleButton.addEventListener('click', async function () {
    chrome.storage.local.get(["extensionActive"], function (result) {
      const newState = !result.extensionActive;
      chrome.storage.local.set({ extensionActive: newState });
      updateUI(newState);

      
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });

  function updateUI(isActive) {
    if (isActive) {
      toggleButton.classList.add('active');
      buttonText.textContent = 'Turn Off';
      statusElement.textContent = 'ON';
      statusElement.classList.add('on');
      document.querySelector('.icon').textContent = '✅';
    } else {
      toggleButton.classList.remove('active');
      buttonText.textContent = 'Turn On';
      statusElement.textContent = 'OFF';
      statusElement.classList.remove('on');
      document.querySelector('.icon').textContent = '🛑';
    }
  }
});
