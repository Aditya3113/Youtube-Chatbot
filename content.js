const videoId = new URLSearchParams(window.location.search).get("v");

if (videoId) {
  chrome.runtime.sendMessage({ type: "LOAD_VIDEO", videoId });
}