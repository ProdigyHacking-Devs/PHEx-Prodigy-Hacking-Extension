const DEFAULT_SCRIPT_URL =
  "https://raw.githubusercontent.com/ProdigyHacking-Devs/CheatGUI/main/source.js";

chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (!details.url.includes("math.prodigygame.com")) return;

  try {
    const { devMode, scriptUrl } = await chrome.storage.local.get([
      "devMode",
      "scriptUrl"
    ]);

    const finalUrl = devMode && scriptUrl ? scriptUrl : DEFAULT_SCRIPT_URL;

    console.log("[Equatio] Injecting script:", finalUrl);

    // Fetch the script text
    const response = await fetch(finalUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const code = await response.text();

    // Inject into PAGE WORLD, only in top-level frame
    await chrome.scripting.executeScript({
      target: { tabId: details.tabId, frameIds: [0] },
      world: "MAIN",
      func: (code) => {
        const s = document.createElement("script");
        s.textContent = code;
        document.documentElement.appendChild(s);
        s.remove();
      },
      args: [code]
    });

    console.log("[Equatio] Script injected successfully into MAIN world.");
  } catch (err) {
    console.error("[Equatio] Injection failed:", err);
  }
}, {
  url: [{ hostContains: "math.prodigygame.com" }]
});
