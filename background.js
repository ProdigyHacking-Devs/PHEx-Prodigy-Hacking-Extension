const DEFAULT_SCRIPT_URL =
  "https://raw.githubusercontent.com/CrackinPMG2024/HackMenuX/refs/heads/main/source";

chrome.webNavigation.onCompleted.addListener(
  async (details) => {
    if (!details.url.includes("math.prodigygame.com")) return;

    try {
      const { devMode, scriptUrl } = await chrome.storage.local.get([
        "devMode",
        "scriptUrl"
      ]);

      // If dev mode is ON and custom script exists, content.js will inject instead
      if (devMode && scriptUrl) {
        console.log("[Equatio] DevMode active — content.js will inject custom script.");
        return;
      }

      console.log("[Equatio] Injecting default script:", DEFAULT_SCRIPT_URL);

      const response = await fetch(DEFAULT_SCRIPT_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const scriptText = await response.text();

      await chrome.scripting.executeScript({
        target: { tabId: details.tabId, allFrames: true },
        world: "MAIN",
        func: (code) => {
          const s = document.createElement("script");
          s.textContent = code;
          document.documentElement.appendChild(s);
          s.remove();
        },
        args: [scriptText]
      });

      console.log("[Equatio] Default script injected into ALL frames (MAIN world).");
    } catch (err) {
      console.error("[Equatio] Injection failed:", err);
    }
  },
  { url: [{ hostContains: "math.prodigygame.com" }] }
);
