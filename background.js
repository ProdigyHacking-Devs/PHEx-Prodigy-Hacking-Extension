const DEFAULT_SCRIPT_URL =
  "https://raw.githubusercontent.com/CrackinPMG2024/HackMenuX/refs/heads/main/source";

// Listen for navigation completion on math.prodigygame.com
chrome.webNavigation.onCompleted.addListener(
  async (details) => {
    // Only inject into the main frame of math.prodigygame.com
    if (details.url.includes("math.prodigygame.com") && details.frameId === 0) {
      try {
        // Load developer mode settings and custom script URL
        const { devMode, scriptUrl } = await chrome.storage.local.get([
          "devMode",
          "scriptUrl"
        ]);

        // Decide which URL to use
        const url = devMode && scriptUrl ? scriptUrl : DEFAULT_SCRIPT_URL;
        console.log("Using script URL:", url);

        // Fetch the script text
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const scriptText = await response.text();

        // Inject into the page context after DOM is ready
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

        // Success message in background console
        console.log("Equation script injected successfully into math.prodigygame.com");
      } catch (err) {
        // If injection fails, try to show an alert in the page
        try {
          await chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            func: (message) => alert("Injection failed: " + message),
            args: [err.message]
          });
        } catch (alertErr) {
          // If even alert injection fails, log to background console
          console.error("Failed to inject alert:", alertErr);
        }
      }
    }
  },
  { url: [{ hostContains: "math.prodigygame.com" }] }
);
