document.addEventListener("DOMContentLoaded", function () {
  var toggleSwitch = document.getElementById("toggleSwitch");
  var status = document.getElementById("status");

  // Load the current state
  chrome.storage.sync.get("enabled", function (data) {
    toggleSwitch.checked = data.enabled !== false;
    status.textContent = toggleSwitch.checked ? "Enabled" : "Disabled";
  });

  // Save the state when the switch is toggled
  toggleSwitch.addEventListener("change", function () {
    var isEnabled = toggleSwitch.checked;
    chrome.storage.sync.set({ enabled: isEnabled }, function () {
      status.textContent = isEnabled ? "Enabled" : "Disabled";

      // Reload the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]) {
          chrome.tabs.reload(tabs[0].id, {}, function () {
            // After reload, wait a bit before sending the message
            setTimeout(() => {
              chrome.tabs.sendMessage(
                tabs[0].id,
                {
                  action: "toggleExtension",
                  enabled: isEnabled,
                },
                function (response) {
                  if (chrome.runtime.lastError) {
                    console.log(
                      "Failed to send message: " +
                        chrome.runtime.lastError.message
                    );
                  }
                }
              );
            }, 1000); // Wait for 1 second after reload
          });
        }
      });
    });
  });
});
