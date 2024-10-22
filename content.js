function isSiteWhitelisted(url, whitelist) {
    return whitelist.some(site => url.includes(site));
  }
  
  function startCensorship() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const currentTabUrl = tabs[0].url;
  
      chrome.storage.sync.get(['whitelistedSites'], function(result) {
        const whitelistedSites = result.whitelistedSites || [];
        const isWhitelisted = isSiteWhitelisted(currentTabUrl, whitelistedSites);
  
        if (!isWhitelisted) {
          fetchCussWords().then(() => {
            chrome.storage.local.get(['extensionActive'], function(result) {
              if (result.extensionActive !== false) {
                traverseAndBlur(document.body);
              }
            });
          });
        } else {
          console.log('This site is whitelisted. Censorship is skipped.');
        }
      });
    });
  }
  
  startCensorship();
  