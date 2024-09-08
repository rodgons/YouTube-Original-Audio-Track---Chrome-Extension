chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ enabled: true }, function () {
    console.log("Extension installed and enabled by default");
  });
});
