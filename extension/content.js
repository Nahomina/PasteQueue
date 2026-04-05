// PasteQueue Content Script
// Captures copy events on every page and sends to background worker

let lastContent = "";
let debounceTimer = null;

document.addEventListener("copy", () => {
  // Debounce to avoid duplicate events
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    try {
      const content = await readClipboard();
      if (!content || content === lastContent) return;
      lastContent = content;

      const contentType = detectContentType(content);

      chrome.runtime.sendMessage({
        type: "COPY_EVENT",
        data: { content, contentType },
      });
    } catch (err) {
      // Clipboard read might fail if page doesn't have focus — that's OK
    }
  }, 100);
});

async function readClipboard() {
  try {
    return await navigator.clipboard.readText();
  } catch {
    // Fall back to selection text if clipboard API fails
    return window.getSelection()?.toString() || "";
  }
}

function detectContentType(content) {
  const trimmed = content.trim();
  if (/^https?:\/\/[^\s]+$/.test(trimmed)) return "url";
  const codePatterns = [
    /^\s*(function|const|let|var|import|export|class|def|return)\s/m,
    /^\s*[<\/][\w]/m,
  ];
  if (codePatterns.some((p) => p.test(trimmed))) return "code";
  return "text";
}
