chrome.webNavigation.onCompleted.addListener(
  async (details) => {
    if (details.url.includes("math.prodigygame.com") && details.frameId === 0) {
      try {
        await chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          files: ["script.js"]
        });

        console.log("Local script.js injected into math.prodigygame.com");
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
