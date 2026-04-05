// PasteQueue Background Service Worker
// Receives copied content from content script and syncs to API

const API_BASE = "https://pastequeue.app"; // Change to localhost:3000 for dev

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "COPY_EVENT") {
    handleCopyEvent(message.data, sender.tab);
    sendResponse({ success: true });
  }
  return true;
});

async function handleCopyEvent(data, tab) {
  const { content, contentType } = data;

  if (!content || content.trim().length === 0) return;
  if (content.length > 50000) return; // Skip very large copies

  try {
    const stored = await chrome.storage.local.get(["auth_token", "queue_count"]);
    const token = stored.auth_token;

    if (!token) {
      console.log("PasteQueue: Not authenticated, skipping sync");
      return;
    }

    const payload = {
      content,
      content_type: contentType,
      source_url: tab?.url || null,
      source_title: tab?.title || null,
    };

    const response = await fetch(`${API_BASE}/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      // Update badge count
      const count = (stored.queue_count || 0) + 1;
      await chrome.storage.local.set({ queue_count: count });
      chrome.action.setBadgeText({ text: count > 99 ? "99+" : String(count) });
      chrome.action.setBadgeBackgroundColor({ color: "#6366f1" });
    }
  } catch (err) {
    console.error("PasteQueue: Failed to sync item", err);
  }
}

// Listen for auth token updates from popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SET_AUTH_TOKEN") {
    chrome.storage.local.set({ auth_token: message.token });
  }
  if (message.type === "CLEAR_AUTH") {
    chrome.storage.local.remove(["auth_token", "queue_count"]);
    chrome.action.setBadgeText({ text: "" });
  }
});

// Detect content type from the copied text
function detectContentType(content) {
  const trimmed = content.trim();

  // URL detection
  if (/^https?:\/\/[^\s]+$/.test(trimmed)) return "url";

  // Code detection (heuristic)
  const codePatterns = [
    /^[\s\S]*[{};()=>][\s\S]*$/, // has common code chars
    /^\s*(function|const|let|var|import|export|class|def|return)\s/m,
    /^\s*[<\/][\w]/m, // XML/HTML tags
  ];
  if (codePatterns.some((p) => p.test(trimmed))) return "code";

  return "text";
}
