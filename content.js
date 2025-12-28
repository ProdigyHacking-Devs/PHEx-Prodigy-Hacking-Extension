(async () => {
  try {
    const { devMode, scriptUrl } = await chrome.storage.local.get([
      "devMode",
      "scriptUrl"
    ]);

    if (!devMode || !scriptUrl) return;

    console.log("[Equatio] DevMode active — injecting custom script:", scriptUrl);

    const s = document.createElement("script");
    s.src = scriptUrl;
    s.onload = () => console.log("[Equatio] Custom script loaded.");
    s.onerror = () => console.error("[Equatio] Failed to load custom script.");
    document.documentElement.appendChild(s);

  } catch (err) {
    console.error("[Equatio] Custom script injection failed:", err);
  }
})();
