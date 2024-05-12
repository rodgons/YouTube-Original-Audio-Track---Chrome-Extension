# YouTube Original Audio Track 

![Extension Icon](assets/icon.png)

## Overview
"YouTube Original Audio Track " is a Chrome extension designed to automatically switch YouTube videos to their original audio track, overriding the automatic selection that defaults to the viewer's regional language settings. This ensures users can always experience content in its original language, regardless of their location.


## Project Structure

```
.
├── README.md
├── assets
│   ├── icon.png
│   ├── icon_128x128.png
│   ├── icon_16x16.png
│   ├── icon_24x24.png
│   └── icon_48x48.png
├── background.js
├── content.js
└── manifest.json
```

## Features
- **Automatic Audio Adjustment**: Automatically switches the audio track to the original language when a YouTube video is loaded.
- **Easy to Use**: Works seamlessly in the background with no user input required after installation.
- **Lightweight and Fast**: Minimal impact on browser performance.

## Installation
To install "YouTube Original Audio Track ", follow these simple steps:

1. Download the extension from the Chrome Web Store.
2. Click "Add to Chrome" to install the extension.
3. Once installed, it will automatically start working whenever you watch YouTube videos.

## How It Works
The extension listens for YouTube pages to load and then triggers a sequence of DOM manipulations:
1. It clicks the settings button on the YouTube player.
2. It navigates to the audio settings and selects the "Audio Track" option.
3. It identifies and selects the option containing the word "original" in the audio track list.

## Permissions
The extension requires the following permissions:
- Access to YouTube pages for modifying audio settings.

## Privacy
This extension does not collect or use any personal data. It operates entirely within your browser.


