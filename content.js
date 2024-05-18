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
      let originalFound = false;
      for (const option of audioOptions) {
        const label = option.querySelector(".ytp-menuitem-label");
        if (label && label.textContent.includes("original")) {
          option.click();
          originalFound = true;
          break;
        }
      }

      if (!originalFound) {
        document.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: 0,
            clientY: 0,
          })
        );
      } else {
        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            which: 27,
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
      }
    }, 30);
  }, 30);
}

waitForElement(".ytp-settings-button", fixAudioTrack);
