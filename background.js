// Initialize default settings if not already set
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.get([
    'extensionActive', 
    'selectedLanguage', 
    'censorWords', 
    'censorExpressions', 
    'censorAcronyms'
  ], function(result) {
    // Set default values if not already set
    const updates = {};
    
    if (result.extensionActive === undefined) {
      updates.extensionActive = true;
    }
    
    if (!result.selectedLanguage) {
      updates.selectedLanguage = 'en';
    }
    
    if (result.censorWords === undefined) {
      updates.censorWords = true;
    }
    
    if (result.censorExpressions === undefined) {
      updates.censorExpressions = true;
    }
    
    if (result.censorAcronyms === undefined) {
      updates.censorAcronyms = true;
    }
    
    if (Object.keys(updates).length > 0) {
      chrome.storage.local.set(updates);
    }
  });
});

// Handle message to get current URL
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getCurrentUrl") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        sendResponse({url: tabs[0].url});
      } else {
        sendResponse({url: ""});
      }
    });
    return true; // Required for async response
  }
});

// When extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['contentScript.js']
  });
});