# 🌪️ Curse Cloak: Your Shield Against Offensive Language

![Curse Cloak Banner](https://dragon.online-convert.com/download-file/cdf523d5-0415-4a22-95a0-0399ecba2fe6/9edd2413-a348-4ea4-8544-390a35e5e8f6) 

**Curse Cloak** is a cutting-edge Chrome extension designed to enhance your browsing experience by masking offensive language in real time. Say goodbye to unpleasant surprises in comments, articles, and social media feeds! With its intuitive functionality, **Curse Cloak** ensures a cleaner, more enjoyable online environment.

---

## 🚀 Features

- **Dynamic Filtering**: Instantly replaces offensive words with asterisks (****) to keep your reading experience clean and enjoyable.
- **Seamless Integration**: Works effortlessly across all websites—no configuration needed.
- **User-Friendly Interface**: Simple activation with a single click; no complex settings to navigate.
- **Customizable**: Easily extend the list of filtered words with your own `cuss_words.csv`.

---

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

---

## 🌟 How It Works

- **Text Analysis**: As you browse, **Curse Cloak** scans the content on the webpage for any cuss words listed in `cuss_words.csv`.
- **Dynamic Masking**: When a match is found, it replaces the offending word with asterisks (****), providing an immediate visual filter.

---

## 🛠️ Technical Details

- **Built with**: 
  - HTML, CSS, JavaScript
  - Chrome Extensions API
- **Manifest Version**: 3

### Code Structure

- **`manifest.json`**: Configuration file for the extension.
- **`background.js`**: Handles background tasks and interactions.
- **`contentScript.js`**: Main logic for detecting and masking cuss words.
- **`cuss_words.csv`**: Contains a list of offensive words to be filtered.

---

## 📄 Customization

You can easily add more words to be filtered:

1. Open `cuss_words.csv`.
2. Add your cuss words, one per line.
3. Save and refresh your extension in Chrome.

---

## 🎉 Contributing

We welcome contributions! If you have ideas for new features or improvements, feel free to submit a pull request.

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.

---


### 💡 Be part of the change. Browse smarter with **Curse Cloak**! 🌐
