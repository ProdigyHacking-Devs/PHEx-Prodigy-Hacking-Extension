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
        func: (code) => {
          const runScript = () => {
            try {
              const s = document.createElement("script");
              s.textContent = code;
              document.documentElement.appendChild(s);
              s.remove();
            } catch (injectErr) {
              alert("Injection error inside page: " + injectErr.message);
            }
          };

          if (document.readyState === "complete" || document.readyState === "interactive") {
            runScript();
          } else {
            window.addEventListener("DOMContentLoaded", runScript);
          }
        },
        args: [scriptText]
      });

      console.log("[Equatio] Default script injected into ALL frames.");
    } catch (err) {
      console.error("[Equatio] Injection failed:", err);

      try {
        await chrome.scripting.executeScript({
          target: { tabId: details.tabId, allFrames: true },
          func: (message) => alert("Injection failed: " + message),
          args: [err.message]
        });
      } catch (alertErr) {
        console.error("[Equatio] Failed to inject alert:", alertErr);
      }
    }
  },
  { url: [{ hostContains: "math.prodigygame.com" }] }
);
