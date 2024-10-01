document.getElementById('toggleButton').addEventListener('click', function () {
    chrome.storage.local.get(["extensionActive"], function (result) {
      chrome.storage.local.set({ extensionActive: !result.extensionActive });
      window.close();
    });
  });
  