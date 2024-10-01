let cussWords = [];

// Function to fetch and parse cuss words from CSV
function fetchCussWords() {
  return fetch(chrome.runtime.getURL("cuss_words.csv"))
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\n');
      cussWords = lines.map(line => line.trim()).filter(line => line !== '');
    });
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
  if (node.nodeType === Node.TEXT_NODE) { // Text node
    blurCussWords(node);
  } else {
    node.childNodes.forEach(childNode => traverseAndBlur(childNode));
  }
}

// Start processing the webpage after fetching cuss words
fetchCussWords().then(() => {
  traverseAndBlur(document.body);
});
