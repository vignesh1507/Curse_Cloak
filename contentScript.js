let cussWords = [];

// Function to fetch and parse cuss words from CSV file. 
function fetchCussWords() {
  return fetch(chrome.runtime.getURL("cuss_words.csv"))
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); 
      }
      return response.text();
    })
    .then(data => {
      const lines = data.split('\n');
      cussWords = lines.map(line => line.trim()).filter(line => line !== '');
    })
    .catch(error => {
      console.error('Error fetching cuss words:', error);
    });
}

// Function to apply a blur effect to the cuss words
function blurCussWords(textNode) {
  cussWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    textNode.nodeValue = textNode.nodeValue.replace(regex, match => {
      return '*'.repeat(match.length);
    });
  });
}

// Traverse all text nodes in the document and blur the cuss words
function traverseAndBlur(node) {
  if (node.nodeType === Node.TEXT_NODE) { 
    blurCussWords(node);
  } else {
    node.childNodes.forEach(childNode => traverseAndBlur(childNode));
  }
}

// Start processing the webpage after fetching cuss words
fetchCussWords().then(() => {
  chrome.storage.local.get(['extensionActive'], function (result) {
    if (result.extensionActive !== false) { 
      traverseAndBlur(document.body);
    }
  });
});
