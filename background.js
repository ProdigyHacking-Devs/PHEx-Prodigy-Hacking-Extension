// Always inject the bundled script.js into math.prodigygame.com

chrome.webNavigation.onCompleted.addListener(
  async (details) => {
    // Only inject into the main frame of math.prodigygame.com
    if (details.url.includes("math.prodigygame.com") && details.frameId === 0) {
      try {
        // Inject local script.js file
        await chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          files: ["script.js"]
        });

        console.log("script.js injected successfully into math.prodigygame.com");
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
