const originalTranslations = {
  en: "original",
  es: "original",
  fr: "originale",
  de: "original",
  it: "originale",
  pt: "original",
  ru: "оригинал",
  ja: "オリジナル",
  ko: "원본",
  zh: "原始",
  ar: "أصلي",
  hi: "मूल",
  bn: "মূল",
  id: "asli",
  tr: "orijinal",
  vi: "nguyên bản",
  th: "ต้นฉบับ",
  nl: "origineel",
  pl: "oryginalny",
  sv: "original",
  fi: "alkuperäinen",
  no: "original",
  da: "original",
  cs: "originál",
  el: "πρωτότυπο",
  he: "מקורי",
  ro: "original",
  hu: "eredeti",
  uk: "оригінал",
  fa: "اصلی",
  ms: "asal",
  tl: "orihinal",
  ta: "அசல்",
  ur: "اصل",
  hr: "izvorni",
  bg: "оригинален",
  sk: "originál",
  sl: "izvirnik",
  sr: "оригинал",
  lt: "originalus",
  lv: "oriģināls",
  et: "originaal",
  ka: "ორიგინალი",
  az: "orijinal",
  uz: "asl",
  kk: "түпнұсқа",
  hy: "բնօրինակ",
  km: "ដើម",
  my: "မူရ်း",
  si: "මුල්",
  am: "የመጀመሪያው",
  ne: "मौलिक",
  lo: "ຕົ້ນສະບັບ",
  mn: "эх",
  bo: "དངོས་གཞི།",
  cy: "gwreiddiol",
  eo: "originala",
  eu: "jatorrizko",
  gl: "orixinal",
  gu: "મૂળ",
  ha: "asali",
  ig: "izugbe",
  is: "upprunalegt",
  jv: "asli",
  kn: "ಮೂಲ",
  ku: "orîjînal",
  ky: "түп нуска",
  lb: "original",
  mi: "taketake",
  ml: "യഥാർത്ഥ",
  mr: "मूळ",
  mt: "oriġinali",
  or: "ମୌଳିକ",
  pa: "ਅਸਲ",
  ps: "اصلي",
  sd: "اصل",
  sm: "muamua",
  sn: "chaicho",
  so: "asalka ah",
  sq: "origjinal",
  su: "asli",
  sw: "asili",
  te: "అసలు",
  tk: "asyl",
  tt: "оригиналь",
  ug: "ئەسلى",
  yi: "אריגינעל",
  yo: "atilẹba",
  zu: "okwangempela",
  af: "oorspronklik",
  bs: "originalni",
  ca: "original",
  ceb: "orihinal",
  co: "uriginale",
  fy: "oarspronklik",
  ga: "bunaidh",
  gd: "tùsail",
  haw: "kumu",
  hmn: "thawj",
  ht: "orijinal",
  ia: "original",
  ie: "original",
  io: "originala",
  kw: "gwredhek",
  la: "originalis",
  ln: "ya liboso",
  mg: "tany am-boalohany",
  mk: "оригинален",
  ny: "yoyamba",
  oc: "original",
  qu: "qallariy",
  rm: "original",
  rw: "cy'umwimerere",
  sa: "मूल",
  sc: "originale",
  st: "ea pele",
  tg: "аслӣ",
  to: "ʻuluaki",
  wo: "njëkk",
  xh: "yokuqala",
  "zh-tw": "原始",
};

let isExtensionEnabled = true;

// Function to check if the extension is enabled
function checkExtensionStatus(callback) {
  chrome.storage.sync.get("enabled", function (data) {
    isExtensionEnabled = data.enabled !== false;
    if (callback) callback(isExtensionEnabled);
  });
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleExtension") {
    isExtensionEnabled = request.enabled;
    if (!isExtensionEnabled) {
      // If disabled, remove any existing observers
      if (window.youtubeOriginalAudioObserver) {
        window.youtubeOriginalAudioObserver.disconnect();
      }
    } else {
      // If enabled, start observing again
      startObserving();
    }
  }
});

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

  return observer;
}

function fixAudioTrack(settingsButton) {
  if (!isExtensionEnabled) return;

  settingsButton.click();

  setTimeout(() => {
    const menuItems = document.querySelectorAll(".ytp-menuitem");
    let audioTrackItem = null;

    // Find the Audio track menu item by its icon
    for (const item of menuItems) {
      const icon = item.querySelector(".ytp-menuitem-icon svg");
      if (icon && icon.getAttribute("viewBox") === "0 0 24 24") {
        const path = icon.querySelector("path");
        if (
          path &&
          path
            .getAttribute("d")
            .includes(
              "M11.72,11.93C13.58,11.59,15,9.96,15,8c0-2.21-1.79-4-4-4C8.79,4,7,5.79,7,8c0,1.96,1.42,3.59,3.28,3.93"
            )
        ) {
          audioTrackItem = item;
          break;
        }
      }
    }

    if (audioTrackItem) {
      audioTrackItem.click();

      setTimeout(() => {
        const audioOptions = document.querySelectorAll(".ytp-menuitem");
        let selectedOption = null;
        let longestOption = null;
        let maxWords = 0;

        for (const option of audioOptions) {
          const content = option.querySelector(".ytp-menuitem-content");
          if (content) {
            const text = content.textContent.trim().toLowerCase();
            const words = text.split(/\s+/);

            // Check if the text contains "original" in any of the supported languages
            if (
              Object.values(originalTranslations).some((translation) =>
                text.includes(translation)
              )
            ) {
              selectedOption = option;
              break;
            }

            // Keep track of the option with the longest description
            if (words.length > maxWords) {
              maxWords = words.length;
              longestOption = option;
            }
          }
        }

        // If no "original" option was found, use the longest option
        if (!selectedOption && longestOption) {
          selectedOption = longestOption;
        }

        // Click the selected option
        if (selectedOption) {
          selectedOption.click();
        } else if (audioOptions.length > 0) {
          // If no option was selected, choose the first one
          audioOptions[0].click();
        }

        // Close the menu
        setTimeout(() => {
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
        }, 100);
      }, 100);
    } else {
      // If audio track item is not found, close the menu
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
  }, 100);
}

function startObserving() {
  checkExtensionStatus((enabled) => {
    if (enabled) {
      window.youtubeOriginalAudioObserver = waitForElement(
        ".ytp-settings-button",
        fixAudioTrack
      );
    }
  });
}

// Start observing when the content script loads
startObserving();
