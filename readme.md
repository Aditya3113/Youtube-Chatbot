# YouTube Chatbot 🎥🤖

A Chrome Extension powered by AI that allows users to interact with YouTube videos through an intelligent chatbot interface.

The extension extracts the content of YouTube videos, processes the transcript using Natural Language Processing (NLP) techniques, and generates contextual answers using Large Language Models (LLMs).

---

# 🚀 Features

- 🎥 Works directly on YouTube videos
- 💬 Ask questions related to the current video
- 🧠 AI-powered contextual responses
- ⚡ Lightweight and fast Chrome Extension
- 📜 Automatic transcript extraction
- 🔍 Retrieval-Augmented Generation (RAG) workflow
- 🖥️ Interactive popup-based UI
- 🌐 Seamless browser integration

---

# 🛠️ Tech Stack

## Frontend
- HTML
- CSS
- JavaScript

## Browser Extension
- Chrome Extension APIs
- Manifest V3

## AI / NLP
- OpenAI API
- YouTube Transcript Processing
- Retrieval-Augmented Generation (RAG)

---

# 📂 Project Structure

```bash
Youtube-Chatbot/
│
├── background.js      # Handles background extension events
├── content.js         # Injects scripts into YouTube pages
├── popup.html         # Extension popup UI
├── popup.js           # Handles chatbot interactions
├── manifest.json      # Chrome extension configuration
├── README.md          # Project documentation
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Aditya3113/Youtube-Chatbot.git
cd Youtube-Chatbot
```

---

## 2️⃣ Open Chrome Extensions

Go to:

```text
chrome://extensions/
```

Enable:

- ✅ Developer Mode

---

## 3️⃣ Load the Extension

1. Click **Load Unpacked**
2. Select the project folder
3. The extension will now appear in Chrome

---

# ▶️ How to Use

1. Open any YouTube video.
2. Click on the extension icon.
3. The chatbot popup will open.
4. Ask questions related to the video.
5. Receive AI-generated responses instantly.

---

# 🧠 How It Works

## Step 1: Video Detection
The extension detects the currently active YouTube video.

## Step 2: Transcript Extraction
Video subtitles/transcripts are extracted automatically.

## Step 3: Context Processing
The transcript is processed and chunked into smaller sections.

## Step 4: AI Query Handling

When the user asks a question:

- Relevant transcript chunks are retrieved
- Context is passed to the LLM
- AI generates an accurate response

## Step 5: Response Display
The chatbot displays the generated answer inside the popup UI.

---

# 🔧 Chrome Extension Permissions

The extension may require the following permissions:

| Permission | Purpose |
|---|---|
| activeTab | Access current YouTube tab |
| scripting | Inject scripts into pages |
| storage | Store user/chat data |
| tabs | Detect active video tab |

---

# 📦 Manifest Version

This project uses:

```json
Manifest Version 3 (MV3)
```

---

# 🧪 Example Use Cases

## 📚 Learning From Educational Videos

Ask:
- “Summarize this lecture”
- “Explain the main concept”
- “What did the speaker say about neural networks?”

## 🎙️ Podcasts

Ask:
- “What were the key discussion points?”
- “Give me a short summary”

## 💻 Coding Tutorials

Ask:
- “What algorithm was implemented?”
- “Explain the code shown in the video”

---

# 🔮 Future Improvements

Planned enhancements include:

- 🎙️ Voice interaction support
- 🌍 Multi-language transcript support
- 📄 Video summarization mode
- 💾 Chat history saving
- 🧠 Persistent memory conversations
- 📱 Improved UI/UX
- ⚡ Faster response generation
- ☁️ Cloud deployment support

---

# 🐛 Known Limitations

- Videos without subtitles/transcripts may not work properly
- Response quality depends on transcript accuracy
- Long videos may increase processing time
- Requires internet connection for AI responses

---

# 🤝 Contributing

Contributions are welcome!

## Steps to Contribute

1. Fork the repository

2. Create a new feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

## Aditya Pandey

- GitHub: https://github.com/Aditya3113
- Project Repository: https://github.com/Aditya3113/Youtube-Chatbot

---

# ⭐ Support

If you found this project useful:

- ⭐ Star the repository
- 🍴 Fork the project
- 🛠️ Contribute improvements

---

# 📌 Repository Link

https://github.com/Aditya3113/Youtube-Chatbot
