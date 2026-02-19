# Crit Calc App

This project is a Progressive Web App (PWA) that can also be built as a native Android and iOS application using Capacitor.

## Prerequisites

-   **Node.js**: Install from [nodejs.org](https://nodejs.org/).
-   **Android Studio**: For building the Android app.
-   **Xcode**: For building the iOS app (macOS only).

## Project Structure

-   `www/`: Contains the web assets (HTML, CSS, JS). modify these files to update the app.
-   `android/`: The native Android project.
-   `ios/`: The native iOS project.
-   `capacitor.config.json`: Capacitor configuration.

## Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Make Changes**:
    Edit files in the `www/` directory.

3.  **Update Version**:
    When you are ready to deploy a new version, update `version` in `package.json` and run:
    ```bash
    npm run update-version
    ```
    This will automatically:
    - Update the version display in `index.html`.
    - Update asset URLs (CSS, JS) with the new version for cache busting.
    - Update `service-worker.js` cache name and file list.

## Building for Mobile

After making changes to the `www/` folder, you must sync them to the native projects.

1.  **Sync Changes**:
    ```bash
    npx cap sync
    ```
    This copies the `www/` assets to the `android/` and `ios/` directories and updates any native plugins.

2.  **Build/Run Android**:
    ```bash
    npx cap open android
    ```
    -   This will open Android Studio.
    -   Wait for Gradle sync to finish.
    -   Click the "Run" (green play) button to build and run on a connected device or emulator.
    -   To build an APK: `Build > Build Bundle(s) / APK(s) > Build APK(s)`.

3.  **Build/Run iOS** (macOS only):
    ```bash
    npx cap open ios
    ```
    -   This will open Xcode.
    -   Select your target device/simulator.
    -   Click the "Play" button to build and run.

## Live Reload (Optional)

To see changes immediately on the device without rebuilding:

1.  Serve `www` locally (e.g., using `python -m http.server` or `live-server`).
    ```bash
    npx cap serve
    ```
    *Note: This might require additional configuration in `capacitor.config.json` to point `server.url` to your local IP.*

## Troubleshooting

-   If assets are not updating, run `npx cap copy` manually.
-   Ensure Android Studio / Xcode are up to date.
