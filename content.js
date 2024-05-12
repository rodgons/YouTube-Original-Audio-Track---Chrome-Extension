function waitForElement(selector, callback) {
  let observer = new MutationObserver((mutations, me) => {
    let element = document.querySelector(selector);
    if (element) {
      me.disconnect();
      callback(element);
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

function fixAudioTrack(settingsButton) {
  settingsButton.click();

  setTimeout(() => {
    const menuItems = document.querySelectorAll(".ytp-menuitem");
    for (const item of menuItems) {
      const label = item.querySelector(".ytp-menuitem-label span");
      if (label && label.textContent.trim() === "Audio track") {
        item.click();
        break;
      }
    }

    setTimeout(() => {
      const audioOptions = document.querySelectorAll(".ytp-menuitem");
      for (const option of audioOptions) {
        const label = option.querySelector(".ytp-menuitem-label");
        if (label && label.textContent.includes("original")) {
          option.click();
          break;
        }
      }
    }, 50);
  }, 50);
}

waitForElement(".ytp-settings-button", fixAudioTrack);
