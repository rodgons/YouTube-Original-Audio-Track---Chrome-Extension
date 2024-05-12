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


## Privacy Policy for YouTube Original Audio Track

Effective date: May 12, 2024

1. Introduction:
   - Our extension, YouTube Original Audio Track, enhances the user experience on YouTube by setting videos to play in their original audio track automatically. This Privacy Policy explains our policy regarding any information that could be associated with or used to identify you ("Personal Information").

2. Personal Information We Do Not Collect:
   - We do not collect any Personal Information using our extension. The extension does not monitor, store, or transmit any data about your browsing habits, location, or any other aspect of your usage.

3. Data Usage:
   - Our extension does not require or use data of any kind. Its functionality is strictly limited to modifying YouTube video settings within your browser, and it operates entirely client-side without any data being sent back to any servers.

4. Changes to This Privacy Policy:
   - We may update our Privacy Policy from time to time. You are advised to review this page periodically for any changes.

This privacy policy is generated and maintained with the utmost respect for your privacy and does not imply any data collection whatsoever.



