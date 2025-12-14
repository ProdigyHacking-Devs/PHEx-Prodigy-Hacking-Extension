document.addEventListener("DOMContentLoaded", () => {
  const devModeToggle = document.getElementById("devMode");
  const devOptions = document.getElementById("devOptions");
  const scriptUrlInput = document.getElementById("scriptUrl");
  const saveButton = document.getElementById("saveUrl");

  chrome.storage.local.get(["devMode", "scriptUrl"], (data) => {
    if (data.devMode) {
      devModeToggle.checked = true;
      devOptions.style.display = "block";
    }
    if (data.scriptUrl) {
      scriptUrlInput.value = data.scriptUrl;
    }
  });

  devModeToggle.addEventListener("change", () => {
    const enabled = devModeToggle.checked;
    devOptions.style.display = enabled ? "block" : "none";
    chrome.storage.local.set({ devMode: enabled });
  });

  saveButton.addEventListener("click", () => {
    const url = scriptUrlInput.value.trim();
    if (url) {
      chrome.storage.local.set({ scriptUrl: url });
      alert("Custom script URL saved!");
    }
  });
});
