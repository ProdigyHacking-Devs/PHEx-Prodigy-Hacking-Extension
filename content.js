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

    // Inject into PAGE WORLD
    chrome.scripting.executeScript({
      target: { tabId: chrome.devtools?.inspectedWindow?.tabId, allFrames: true },
      world: "MAIN",
      func: (code) => {
        const s = document.createElement("script");
        s.textContent = code;
        document.documentElement.appendChild(s);
        s.remove();
      },
      args: [code]
    });

    console.log("[Equatio] Custom script injected successfully (MAIN world).");
  } catch (err) {
    console.error("[Equatio] Custom script injection failed:", err);
  }
})();
