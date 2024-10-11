# 🌪️ Curse Cloak: Your Shield Against Offensive Language

**Curse Cloak** is a cutting-edge Chrome extension designed to enhance your browsing experience by masking offensive language in real time. Say goodbye to unpleasant surprises in comments, articles, and social media feeds! With its intuitive functionality, **Curse Cloak** ensures a cleaner, more enjoyable online environment.

## 🚀 Features

- **Dynamic Filtering**: Instantly replaces offensive words with asterisks (****) to keep your reading experience clean and enjoyable.
- **Seamless Integration**: Works effortlessly across all websites—no configuration needed.
- **User-Friendly Interface**: Simple activation with a single click; no complex settings to navigate.
- **Library-Driven**: Utilizes the `washyourmouthoutwithsoap` library for efficient and comprehensive cuss word filtering.


## ⚡ Getting Started

### Prerequisites

- Google Chrome installed on your local machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vignesh1507/Curse_Cloak.git
   cd Curse_Cloak
   ```

2. **Load the extension in Chrome:**
   - Go to `chrome://extensions/`.
   - Enable **Developer mode** (toggle switch in the top right).
   - Click on **Load unpacked** and select the `curse_cloak` directory.

3. **Start Browsing**:
   - Click the **Curse Cloak** icon in your toolbar to activate the filtering.


## 🌟 How It Works

- **Text Analysis**: As you browse, **Curse Cloak** scans the content on the webpage for any cuss words using the `washyourmouthoutwithsoap` library.
- **Dynamic Masking**: When a match is found, it replaces the offending word with asterisks (****), providing an immediate visual filter.


## 🛠️ Technical Details

- **Built with**: 
  - HTML, CSS, JavaScript
  - Chrome Extensions API
- **Manifest Version**: 3
- **Cuss Word Filtering**: Utilizes the `washyourmouthoutwithsoap` library for advanced offensive language detection.

### Code Structure

- **`manifest.json`**: Configuration file for the extension.
- **`background.js`**: Handles background tasks and interactions.
- **`contentScript.js`**: Main logic for detecting and masking cuss words.


### 💡 Be part of the change. Browse smarter with **Curse Cloak**! 🌐
