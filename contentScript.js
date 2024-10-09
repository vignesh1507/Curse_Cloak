import wash from 'washyourmouthoutwithsoap';

let cussWords = [];

// Function to fetch and parse cuss words from washyourmouthoutwithsoap
function fetchCussWords() {
  cussWords = wash.words('en')
}

// Function to apply a blur effect to cuss words
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
fetchCussWords(); // Fetch cuss words from the library
chrome.storage.local.get(['extensionActive'], function (result) {
  if (result.extensionActive !== false) {
    traverseAndBlur(document.body);
  }
});
