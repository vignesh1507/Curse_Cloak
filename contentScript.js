let cussWordsList = [];

// Leetspeak mapping for conversion
const leetToCharMap = {
  ' ': ['_', '-', ",", '.', '  ', '   '],
  'a': ['4', '@', 'α', '/-\\', '/\\', '^', '4a', 'ª'],
  'b': ['8', 'ß', '&', '|3', '13', '|8', 'b|', '|o'],
  'c': ['<', '(', '[', 'ç', 'Ç', '{', '©'],
  'd': ['|)', '|}', '[)'],
  'e': ['3', '£', '€', '|≡'],
  'f': ['ph', '|='],
  'g': ['9'],
  'h': ['#', '4', '|-|', '|·|', '}{', ']-['],
  'i': ['1', '!', '|', 'l'],
  'j': ['_|', '_/'],
  'k': ['|<', 'l<', '1<', '|{'],
  'l': ['1', '|', '|_', '\\_'],
  'm': ['|\\/|', '/\\/\\', '|V|', '^^'],
  'n': ['||', '|\\|', '/\\/', '/\\|'],
  'o': ['0', '()', '[]', '<>'],
  'p': ['9', '|>'],
  'q': ['9'],
  'r': ['|2', '12', '|?'],
  's': ['5', '$', 'z'],
  't': ['7', '+', '|', '†'],
  'u': ['|_|', '\\_/'],
  'v': ['\\/', '|/'],
  'w': ['\\^/', 'v\\', 'v\\/', '\\/v', 'vv', '\\/\\/'],
  'x': ['><', '}{', '×'],
  'y': ['`/', '¥'],
  'z': ['2', 's'],
  'ß': ['ss', 'sz', 'b', 'B']
};

// Create a reverse mapping for faster lookups, now handling ambiguity
const charToLeetMap = {};
for (const [char, leetChars] of Object.entries(leetToCharMap)) {
  leetChars.forEach(leetChar => {
    if (!charToLeetMap[leetChar]) {
      charToLeetMap[leetChar] = [];
    }
    if (!charToLeetMap[leetChar].includes(char)) {
      charToLeetMap[leetChar].push(char);
    }
  });
}

// Function to normalize text for comparison - handles accents, case, and leetspeak
function normalizeText(text) {
  // First handle accents and convert to lowercase
  let normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  // Then convert leetspeak characters
  return deLeetify(normalized);
}

// Function to convert leetspeak to normal text, handling ambiguity
function deLeetify(text) {
  let result = text;
  
  // First, try to replace exact multi-character leetspeak patterns
  for (let len = 4; len >= 2; len--) {
    for (let i = 0; i <= result.length - len; i++) {
      const pattern = result.substring(i, i + len);
      if (charToLeetMap[pattern]) {
        // For multi-character patterns, use the first interpretation for simplicity
        result = result.substring(0, i) + 
                charToLeetMap[pattern][0] + 
                result.substring(i + pattern.length);
      }
    }
  }
  
  // Then replace single characters
  let newResult = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    if (charToLeetMap[char]) {
      // For single characters, use the first interpretation for initial normalization
      newResult += charToLeetMap[char][0];
    } else {
      newResult += char;
    }
  }
  
  return newResult;
}


// Function to normalize a string and keep a map to the original indices
function getNormalizationMap(original) {
  const normalized = [];
  const positionMap = [];

  for (let i = 0; i < original.length; i++) {
    const norm = normalizeText(original[i]);
    for (let j = 0; j < norm.length; j++) {
      normalized.push(norm[j]);
      positionMap.push(i); // map normalized char to original char index
    }
  }

  return { normalized: normalized.join(''), positionMap };
}

// Function to apply a blur effect to the cuss words
function blurCussWords(textNode) {
  let nodeValue = textNode.nodeValue;
  if (!nodeValue || nodeValue.trim() === '') return;

  // Generate normalized string and map each normalized character to its original index
  const { normalized: normalizedNodeValue, positionMap } = getNormalizationMap(nodeValue);
  let alternativeNormalizations = [normalizedNodeValue];

  // Generate alternative normalizations for ambiguous characters, this handles cases where the same character could represent multiple characters
  for (let i = 0; i < nodeValue.length; i++) {
    const char = nodeValue[i];

    if (charToLeetMap[char] && charToLeetMap[char].length > 1) {
      const newAlternatives = [];

      // For each existing alternative
      for (const alt of alternativeNormalizations) {
        // Create a new alternative for each possible interpretation
        for (let j = 0; j < charToLeetMap[char].length; j++) {
          const replacement = charToLeetMap[char][j];
          newAlternatives.push(
            alt.substring(0, i) + replacement + alt.substring(i + 1)
          );
        }
      }

      // Add new alternatives to the list
      alternativeNormalizations = [...alternativeNormalizations, ...newAlternatives];

      // Limit the number of alternatives to prevent exponential growth
      if (alternativeNormalizations.length > 10) {
        alternativeNormalizations = alternativeNormalizations.slice(0, 10);
      }
    }
  }

  cussWordsList.forEach(word => {
    // Check if this is an expression (contains spaces)
    if (word.includes(' ')) {
      // For expressions, use string replacement with regex
      const parts = word.split(' ');
      const escapedParts = parts.map(part => escapeRegExp(part));
      const pattern = `\\b${escapedParts.join('\\s+')}\\b`;
      const regex = new RegExp(pattern, 'gi');

      // Check against all normalizations
      for (const normalized of alternativeNormalizations) {
        const matches = [...normalized.matchAll(regex)];

        // Replace from end to start to avoid position shifts
        for (let i = matches.length - 1; i >= 0; i--) {
          const match = matches[i];
          const normStart = match.index;
          const normEnd = normStart + match[0].length;

          const start = positionMap[normStart];
          const end = positionMap[normEnd - 1] + 1;

          // Replace the original text with asterisks, but preserve spaces
          const originalText = nodeValue.substring(start, end);
          const censoredText = originalText.replace(/[^\s]/g, '*');

          nodeValue = nodeValue.substring(0, start) +
                     censoredText +
                     nodeValue.substring(end);
        }
      }
    } else {
      // For single words, always use word boundary - that way we can avoid partial matches from words inside other words
      const wordPattern = `\\b${escapeRegExp(word)}\\b`;
      const regex = new RegExp(wordPattern, 'gi');

      // Check against all normalizations
      for (const normalized of alternativeNormalizations) {
        let match;
        while ((match = regex.exec(normalized)) !== null) {
          const normStart = match.index;
          const normEnd = normStart + match[0].length;

          const start = positionMap[normStart];
          const end = positionMap[normEnd - 1] + 1;

          const originalText = nodeValue.substring(start, end);
          const censored = originalText.replace(/[^\s]/g, '*');
          nodeValue = nodeValue.substring(0, start) +
                      censored +
                      nodeValue.substring(end);

          regex.lastIndex = normEnd;
        }
      }

      // Now look for potential leetspeak matches that could have different lengths
      const candidateMatches = findPotentialLeetMatchesInOriginalText(nodeValue, word);

      for (let i = candidateMatches.length - 1; i >= 0; i--) {
        const match = candidateMatches[i];
        const start = match.index;
        const end = start + match.length;

        // Censor the detected leetspeak variant, preserving spaces
        const originalText = nodeValue.substring(start, end);
        const censored = originalText.replace(/[^\s]/g, '*');
        nodeValue = nodeValue.substring(0, start) +
                   censored +
                   nodeValue.substring(end);
      }
    }

    // Additional logic to handle punctuation after cuss words
    const wordPatternWithPunctuation = `(?<!\\w)${escapeRegExp(word)}([.,!?:;])?`;
    const regexWithPunctuation = new RegExp(wordPatternWithPunctuation, 'gi');

    let match;
    while ((match = regexWithPunctuation.exec(normalizedNodeValue)) !== null) {
      const normStart = match.index;
      const normEnd = normStart + match[0].length;

      const start = positionMap[normStart];
      const end = positionMap[normEnd - 1] + 1;

      const originalText = nodeValue.substring(start, end);
      const censored = originalText.replace(/[^\s]/g, '*');

      nodeValue = nodeValue.substring(0, start) +
                  censored +
                  nodeValue.substring(end);

      regexWithPunctuation.lastIndex = normEnd;
    }
  });

  textNode.nodeValue = nodeValue;
}

// New function to find leetspeak matches in original text
function findPotentialLeetMatchesInOriginalText(originalText, targetWord) {
  const matches = [];
  const textLength = originalText.length;
  
  // Define what constitutes a word boundary
  function isWordBoundary(char) {
    return !char || /\W/.test(char) || char === ' ';
  }
  
  // Try to find patterns that could be leetspeak variants of the target word
  for (let i = 0; i < textLength; i++) {
    // Only check potential words that start at word boundaries
    const prevChar = originalText[i - 1];
    if (!isWordBoundary(prevChar) && i > 0) continue;
    
    // Try increasing lengths to find the complete leetspeak word
    let maxLength = Math.min(textLength - i, targetWord.length * 3); // Allow up to 3x length for leetspeak
    
    // Try different possible lengths, favoring longer matches first
    for (let len = maxLength; len >= targetWord.length; len--) {
      const candidate = originalText.substring(i, i + len);
      
      // Check if next character is a word boundary
      const nextChar = originalText[i + len];
      if (!isWordBoundary(nextChar) && i + len < textLength) continue;
      
      // Normalize this candidate to check against the target word
      const normalizedCandidate = normalizeText(candidate);
      
      // If normalizing made it match our target word, we've found a leetspeak variant
      if (normalizedCandidate === targetWord) {
        matches.push({
          index: i,
          length: len
        });
        break; // Found the longest match at this position
      }
    }
  }
  
  return matches;
}

// Function to find potential leetspeak matches with word boundary checks
function findPotentialLeetMatchesWithBoundaries(text, word) {
  const matches = [];
  const textLength = text.length;
  const wordLength = word.length;
  
  // Skip very short words that might cause too many false positives
  if (wordLength < 3) return matches;
  
  // Define what constitutes a word boundary
  function isWordBoundary(char) {
    return !char || /\W/.test(char) || char === ' ';
  }
  
  // Slide a window of the word length through the text checking for word boundaries
  for (let i = 0; i <= textLength - wordLength; i++) {
    // Check if this is a word boundary at the start
    const prevChar = text[i - 1];
    
    // Only proceed if we're at a word boundary
    if (isWordBoundary(prevChar) || i === 0) {
      const textSubstring = text.substring(i, i + wordLength);
      const nextChar = text[i + wordLength];
      
      // Check if this is a word boundary at the end
      if (isWordBoundary(nextChar) || i + wordLength === textLength) {
        // Check if this substring could be a leetspeak variation of the word
        if (couldBeLeetVariation(textSubstring, word)) {
          matches.push({
            index: i,
            length: wordLength
          });
        }
      }
    }
  }
  
  return matches;
}

// Keeps the existing findPotentialLeetMatches as a fallback but does not use it directly
function findPotentialLeetMatches(text, word) {
  const matches = [];
  const textLength = text.length;
  const wordLength = word.length;
  
  // Skip very short words that might cause too many false positives
  if (wordLength < 3) return matches;
  
  // Slide a window of the word length through the text
  for (let i = 0; i <= textLength - wordLength; i++) {
    const textSubstring = text.substring(i, i + wordLength);
    
    // Check if this substring could be a leetspeak variation of the word
    if (couldBeLeetVariation(textSubstring, word)) {
      matches.push({
        index: i,
        length: wordLength
      });
    }
  }
  
  return matches;
}

// Function to check if a string could be a leetspeak variation of another string
function couldBeLeetVariation(text, word) {
  // If strings are the same length and already normalized, just check if they're equal
  if (text === word) return true;
  
  // Otherwise, check characters one by one
  if (text.length !== word.length) return false;
  
  for (let i = 0; i < text.length; i++) {
    const textChar = text[i];
    const wordChar = word[i];
    
    // Direct match
    if (textChar === wordChar) continue;
    
    // Check if this could be a leetspeak substitution
    let isLeetVariation = false;
    
    // Check if the current character could be a leetspeak variant
    if (leetToCharMap[wordChar]) {
      isLeetVariation = leetToCharMap[wordChar].includes(textChar);
    }
    
    if (!isLeetVariation) return false;
  }
  
  return true;
}

// Helper function to escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Traverse all text nodes in the document and blur the cuss words
function traverseAndBlur(node) {
  // Skip script and style elements
  if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE' || 
      node.nodeName === 'NOSCRIPT' || node.nodeName === 'IFRAME') {
    return;
  }
  
  if (node.nodeType === Node.TEXT_NODE) {
    blurCussWords(node);
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      traverseAndBlur(node.childNodes[i]);
    }
  }
}

// Function to check if the current site is whitelisted
function isSiteWhitelisted(url, whitelist) {
  return whitelist.some(site => url.includes(site));
}

// Main function to start the censorship process
function startCensorship() {
  chrome.storage.local.get(['extensionActive'], function(result) {
    if (result.extensionActive === false) {
      console.log('Extension is disabled. Skipping censorship.');
      return; // Extension is disabled
    }
    
    chrome.runtime.sendMessage({action: "getCurrentUrl"}, function(response) {
      if (response && response.url) {
        const currentUrl = response.url;
        
        chrome.storage.sync.get(['whitelistedSites'], function(result) {
          const whitelistedSites = result.whitelistedSites || [];
          
          if (isSiteWhitelisted(currentUrl, whitelistedSites)) {
            console.log('This site is whitelisted. Censorship is skipped.');
            return;
          }
          
          // Site is not whitelisted, proceed with censorship
          fetchCussWords().then(() => {
            if (cussWordsList.length > 0) {
              console.log('Starting censorship with', cussWordsList.length, 'words/expressions');
              traverseAndBlur(document.body);
              
              // Observer for dynamic content
              setupMutationObserver();
            } else {
              console.log('No cuss words loaded or all censorship types disabled');
            }
          }).catch(err => {
            console.error('Error starting censorship:', err);
          });
        });
      }
    });
  });
}

// Function to fetch and parse cuss words from selected language and types
function fetchCussWords() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([
      'selectedLanguage', 
      'censorWords', 
      'censorExpressions',
    ], function(settings) {
      const language = settings.selectedLanguage || 'english';
      const types = [];
      
      if (settings.censorWords !== false) types.push('words');
      if (settings.censorExpressions !== false) types.push('expressions');
      
      if (types.length === 0) {
        cussWordsList = [];
        resolve();
        return;
      }
      
      // For "all" language setting, load every language
      const languages = language === 'all' ? ['english', 'spanish', 'french'] : [language];
      
      // Reset the words list before fetching
      cussWordsList = [];
      
      // Create array of promises for all file fetches
      const fetchPromises = [];
      
      languages.forEach(lang => {
        types.forEach(type => {
          const fileName = `${lang}_cuss_${type}.csv`;
          const fetchPromise = fetch(chrome.runtime.getURL(fileName))
            .then(response => {
              if (!response.ok) {
                console.warn(`Could not find file: ${fileName}`);
                return '';
              }
              return response.text();
            })
            .then(data => {
              const lines = data.split('\n');
              const words = lines
                .slice(1) // Skip header row since it's the name of the list
                .map(line => line.trim())
                .filter(line => line !== '');
              
              // Normalize words for better matching
              const normalizedWords = words.map(word => normalizeText(word));
              cussWordsList = [...cussWordsList, ...normalizedWords];
            })
            .catch(error => {
              console.error(`Error fetching ${fileName}:`, error);
            });
          
          fetchPromises.push(fetchPromise);
        });
      });
      
      // Wait for all fetches to complete
      Promise.all(fetchPromises)
        .then(() => {
          cussWordsList = [...new Set(cussWordsList)];
          console.log(`Loaded ${cussWordsList.length} cuss words/expressions`);
          resolve();
        })
        .catch(error => {
          console.error('Error fetching cuss word files:', error);
          reject(error);
        });
    });
  });
}

// Set up mutation observer to handle dynamically loaded content
function setupMutationObserver() {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            traverseAndBlur(node);
          }
        });
      } else if (mutation.type === 'characterData') {
        blurCussWords(mutation.target);
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "reloadSettings") {
    // Clear existing words and restart censorship
    cussWordsList = [];
    startCensorship();
    sendResponse({status: "Reloading settings and restarting censorship"});
  }
  return true;
});

// Start the censorship when the page loads
document.addEventListener('DOMContentLoaded', function() {
  startCensorship();
});

// Also run immediately in case the DOM is already loaded
startCensorship();