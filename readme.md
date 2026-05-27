# YouTube Chatbot 🎥🤖

An AI-powered chatbot that lets users interact with YouTube videos by asking questions about their content.  
The chatbot extracts transcripts from YouTube videos, processes them using NLP techniques, and generates intelligent responses using Large Language Models (LLMs).

---

## 🚀 Features

- 🔗 Input any YouTube video URL
- 📝 Extracts video transcripts automatically
- 💬 Ask questions related to the video
- 🧠 Uses AI/LLM for contextual responses
- ⚡ Fast and interactive chatbot interface
- 📚 Retrieval-Augmented Generation (RAG) based workflow

---

## 🛠️ Tech Stack

- Python
- LangChain
- OpenAI API
- FAISS / Vector Store
- Streamlit / Flask (depending on your implementation)
- YouTube Transcript API

---

## 📂 Project Structure

```bash
Youtube-Chatbot/
│── app.py / chatbot.py
│── requirements.txt
│── README.md
│── .env
│── utils/
│── templates/
│── static/

git clone https://github.com/Aditya3113/Youtube-Chatbot.git
cd Youtube-Chatbot

python -m venv venv

venv\Scripts\activate

source venv/bin/activate

pip install -r requirements.txt
