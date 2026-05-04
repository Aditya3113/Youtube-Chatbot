const chat   = document.getElementById("chat");
const input  = document.getElementById("q");
const status = document.getElementById("status");

chrome.storage.local.get("openai_key", r => {
  if (r.openai_key) {
    document.getElementById("key-input").placeholder = "Key saved ✓";
  }
});

document.getElementById("save-key").onclick = () => {
  const key = document.getElementById("key-input").value.trim();
  if (key) {
    chrome.storage.local.set({ openai_key: key }, () => {
      document.getElementById("key-input").value = "";
      document.getElementById("key-input").placeholder = "Key saved ✓";
      status.textContent = "Key saved! Close and reopen the popup.";
    });
  }
};

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const url = tabs[0]?.url || "";
  let videoId = null;
  try { videoId = new URL(url).searchParams.get("v"); } catch(e) {}

  if (!videoId) {
    status.textContent = "Open a YouTube video first.";
    return;
  }

  status.textContent = "Indexing transcript... (~20s first time)";

  chrome.runtime.sendMessage({ type: "LOAD_VIDEO", videoId }, res => {
    if (chrome.runtime.lastError) {
      status.textContent = "Error: " + chrome.runtime.lastError.message;
      return;
    }
    status.textContent = "Ready — ask anything!";
  });
});

document.getElementById("send").onclick = ask;
input.addEventListener("keydown", e => { if (e.key === "Enter") ask(); });

function ask() {
  const q = input.value.trim();
  if (!q) return;
  input.value = "";
  appendMsg("You", q, "user");
  const thinkId = "think_" + Date.now();
  appendMsg("Bot", "Thinking...", "bot", thinkId);

  chrome.runtime.sendMessage({ type: "ASK", question: q }, res => {
    const el = document.getElementById(thinkId);
    if (el) el.remove();
    if (chrome.runtime.lastError) {
      appendMsg("Bot", "Error: " + chrome.runtime.lastError.message, "bot");
      return;
    }
    appendMsg("Bot", res.answer, "bot");
  });
}

function appendMsg(who, text, cls, id) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  if (id) div.id = id;
  div.textContent = who + ": " + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}