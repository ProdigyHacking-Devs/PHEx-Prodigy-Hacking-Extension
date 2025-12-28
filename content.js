(async () => {
  try {
    const { devMode, scriptUrl } = await chrome.storage.local.get([
      "devMode",
      "scriptUrl"
    ]);

    if (!devMode || !scriptUrl) return;

    console.log("[Equatio] DevMode active — injecting custom script:", scriptUrl);

    const response = await fetch(scriptUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const code = await response.text();

    // Inject directly into the PAGE WORLD
    const s = document.createElement("script");
    s.textContent = code;
    document.documentElement.appendChild(s);
    s.remove();

    console.log("[Equatio] Custom script injected successfully.");
  } catch (err) {
    console.error("[Equatio] Custom script injection failed:", err);
  }
})();
