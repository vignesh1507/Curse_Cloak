document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const statusElement = document.getElementById('status');
  const buttonText = document.getElementById('buttonText');
  const languageSelect = document.getElementById('languageSelect');

  // Load initial state from storage
  chrome.storage.local.get(["extensionActive", "selectedLanguage", "enabledLanguages"], function (result) {
    const isActive = result.extensionActive || false;
    updateUI(isActive);
    
    // Set language dropdown to saved value or default to "all"
    if (result.selectedLanguage) {
      languageSelect.value = result.selectedLanguage;
    }
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
  
  // Add event listener for language selection
  languageSelect.addEventListener('change', function() {
    const selectedLanguage = languageSelect.value;
    
    // Save selected language
    chrome.storage.local.set({ selectedLanguage: selectedLanguage });
    
    // Update enabled languages based on selection
    if (selectedLanguage === 'all') {
      chrome.storage.local.set({ 
        enabledLanguages: ['english', 'spanish', 'french']
      });
    } else {
      chrome.storage.local.set({ 
        enabledLanguages: [selectedLanguage]
      });
    }
    
    // Reload current tab to apply changes immediately
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  });

  function updateUI(isActive) {
    if (isActive) {
      toggleButton.classList.add('active');
      buttonText.textContent = 'Turn Off';
      statusElement.textContent = 'ON';
      statusElement.classList.add('on');
      document.querySelector('.icon').textContent = '🛑';
    } else {
      toggleButton.classList.remove('active');
      buttonText.textContent = 'Turn On';
      statusElement.textContent = 'OFF';
      statusElement.classList.remove('on');
      document.querySelector('.icon').textContent = '✅';
    }
  }
});