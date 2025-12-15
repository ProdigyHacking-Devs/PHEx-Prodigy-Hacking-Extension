const DEFAULT_SCRIPT_URL =
  "https://raw.githubusercontent.com/CrackinPMG2024/HackMenuX/refs/heads/main/source";

chrome.webNavigation.onCompleted.addListener(
  async (details) => {
    if (details.url.includes("math.prodigygame.com") && details.frameId === 0) {
      try {
        const { devMode, scriptUrl } = await chrome.storage.local.get([
          "devMode",
          "scriptUrl"
        ]);
        const url = devMode && scriptUrl ? scriptUrl : DEFAULT_SCRIPT_URL;
        console.log("Using script URL:", url);

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const scriptText = await response.text();

        await chrome.scripting.executeScript({
          target: { tabId: details.tabId },
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

            if (
              document.readyState === "complete" ||
              document.readyState === "interactive"
            ) {
              runScript();
            } else {
              window.addEventListener("DOMContentLoaded", runScript);
            }
          },
          args: [scriptText]
        });

        console.log("Equation script injected successfully into math.prodigygame.com");
      } catch (err) {
        try {
          await chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            func: (message) => alert("Injection failed: " + message),
            args: [err.message]
          });
        } catch (alertErr) {
          console.error("Failed to inject alert:", alertErr);
        }
      }
    }
  },
  { url: [{ hostContains: "math.prodigygame.com" }] }
);
