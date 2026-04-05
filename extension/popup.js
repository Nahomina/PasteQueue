const API_BASE = "https://pastequeue.app"; // Change to localhost:3000 for dev

let items = [];

async function init() {
  const stored = await chrome.storage.local.get(["auth_token", "queue_count"]);

  if (!stored.auth_token) {
    document.getElementById("auth-section").style.display = "block";
    return;
  }

  document.getElementById("queue-section").style.display = "block";
  document.getElementById("footer").style.display = "flex";

  await loadItems(stored.auth_token);

  document.getElementById("status").textContent = "Connected";
  document.getElementById("status").classList.add("connected");

  document.getElementById("sign-out-btn").addEventListener("click", signOut);
}

async function loadItems(token) {
  try {
    const res = await fetch(`${API_BASE}/api/items?limit=15`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      if (res.status === 401) signOut();
      return;
    }

    items = await res.json();
    renderItems();
  } catch (err) {
    document.getElementById("items-list").innerHTML =
      '<div class="empty-state">Could not connect to PasteQueue.</div>';
  }
}

function renderItems() {
  const list = document.getElementById("items-list");

  if (!items.length) {
    list.innerHTML = '<div class="empty-state">Your queue is empty.<br>Copy something to get started!</div>';
    return;
  }

  list.innerHTML = items.map((item, i) => `
    <div class="queue-item ${item.is_pinned ? "pinned" : ""}" data-index="${i}">
      <div class="item-meta">
        <span class="type-badge type-${item.content_type}">${item.content_type}</span>
        ${item.is_pinned ? '<span style="font-size:11px">📌</span>' : ""}
        <span class="item-time">${timeAgo(item.created_at)}</span>
      </div>
      <div class="item-content ${item.content_type === "code" ? "code" : ""}">
        ${escapeHtml(item.content.slice(0, 150))}${item.content.length > 150 ? "…" : ""}
      </div>
    </div>
  `).join("");

  // Click to copy
  list.querySelectorAll(".queue-item").forEach((el) => {
    el.addEventListener("click", async () => {
      const item = items[parseInt(el.dataset.index)];
      await navigator.clipboard.writeText(item.content);

      const contentEl = el.querySelector(".item-content");
      const original = contentEl.innerHTML;
      contentEl.innerHTML = '<span class="copy-feedback">Copied!</span>';
      setTimeout(() => (contentEl.innerHTML = original), 1500);
    });
  });
}

function signOut() {
  chrome.runtime.sendMessage({ type: "CLEAR_AUTH" });
  chrome.storage.local.remove(["auth_token", "queue_count"]);
  document.getElementById("queue-section").style.display = "none";
  document.getElementById("footer").style.display = "none";
  document.getElementById("auth-section").style.display = "block";
}

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

init();
