let vectorIndex = [];
let videoLoaded = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "LOAD_VIDEO") {
    handleLoadVideo(msg.videoId).then(() => sendResponse({ ok: true }));
    return true;
  }
  if (msg.type === "ASK") {
    handleAsk(msg.question).then(answer => sendResponse({ answer }));
    return true;
  }
});

async function handleLoadVideo(videoId) {
  if (videoLoaded === videoId) return;
  vectorIndex = [];
  videoLoaded = videoId;

  const transcript = await fetchTranscript(videoId);
  console.log("Transcript length:", transcript.length);
  console.log("Preview:", transcript.slice(0, 300));

  if (!transcript.length) {
    console.error("Transcript is empty");
    return;
  }

  const chunks = chunkText(transcript, 1000, 200);
  console.log("Chunks:", chunks.length);

  for (const chunk of chunks) {
    const vector = await embed(chunk);
    vectorIndex.push({ text: chunk, vector });
  }
  console.log("Indexing complete");
}

async function handleAsk(question) {
  if (vectorIndex.length === 0) {
    return "Transcript not loaded yet. Please wait or try a different video.";
  }
  const qVec = await embed(question);
  const topChunks = topK(qVec, vectorIndex, 4);
  const context = topChunks.map(c => c.text).join("\n\n");
  return await generate(context, question);
}

async function fetchTranscript(videoId) {
  try {
    const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });
    const html = await pageRes.text();

    const captionMatch = html.match(/"baseUrl":"(https:\/\/www\.youtube\.com\/api\/timedtext[^"]+)"/);
    if (!captionMatch) {
      console.warn("No captions found for this video");
      return "";
    }

    const captionUrl = captionMatch[1]
      .replace(/\\u0026/g, "&")
      .replace(/\\/g, "");

    console.log("Caption URL:", captionUrl.slice(0, 120));

    const capRes = await fetch(captionUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.youtube.com/"
      }
    });

    console.log("Caption response status:", capRes.status);
    const xml = await capRes.text();
    console.log("XML length:", xml.length);
    console.log("XML preview:", xml.slice(0, 150));

    const texts = [];
    const regex = /<text[^>]*>([\s\S]*?)<\/text>/g;
    let match;
    while ((match = regex.exec(xml)) !== null) {
      const text = match[1]
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/\n/g, " ")
        .trim();
      if (text) texts.push(text);
    }

    console.log("Lines extracted:", texts.length);
    return texts.join(" ").replace(/\s+/g, " ").trim();

  } catch (e) {
    console.error("fetchTranscript error:", e);
    return "";
  }
}

function chunkText(text, chunkSize, overlap) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize));
    i += chunkSize - overlap;
  }
  return chunks;
}

async function embed(text) {
  const key = await getKey();
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: "text-embedding-3-small", input: text })
  });
  const data = await res.json();
  return data.data[0].embedding;
}

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] ** 2;
    nb += b[i] ** 2;
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function topK(qVec, index, k) {
  return index
    .map(item => ({ ...item, score: cosine(qVec, item.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

async function generate(context, question) {
  const key = await getKey();
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Answer ONLY from the provided transcript context. If the context is insufficient, say you don't know.\n\nContext:\n${context}`
        },
        { role: "user", content: question }
      ]
    })
  });
  const data = await res.json();
  return data.choices[0].message.content;
}

async function getKey() {
  return new Promise(resolve => {
    chrome.storage.local.get("openai_key", r => resolve(r.openai_key));
  });
}