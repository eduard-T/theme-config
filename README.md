# Home Screen Configurator

A lightweight React Native app built with Expo and TypeScript that dynamically renders a home screen based on a loaded JSON configuration file.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- The [Expo Go](https://expo.dev/client) app on your iOS or Android device, or a simulator/emulator

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `i` / `a` to open in a simulator.

---

## Switching Configuration Files

The app ships with three JSON configuration files representing different "brands". You can switch between them at runtime without restarting the app:

1. Tap the **Settings** icon in the bottom right corner of the home screen.
2. In the settings modal, select a brand from the list.
3. The home screen will immediately re-render with the selected configuration applied and dismiss the modal.

Each brand maps to a local config file under the `configs/` directory. To add a new configuration, create a new JSON file in that directory following the existing structure and register it in the brand list.

---

## Project Structure

```
├── app/                  # Expo Router route files (thin, logic-free)
├── configs/              # JSON configuration files (one per brand)
├── core/
│   ├── assets/           # Shared static assets
│   ├── components/       # Shared/reusable UI components
│   ├── hooks/            # Shared utility hooks
│   └── providers/        # React Context providers
└── screens/              # Presentation logic with screen-specific components
```

---

## Approach

The primary goal was to keep route files thin and free of presentation logic. All screen-level UI lives in the `screens/` directory and is simply referenced by the corresponding route file. Files are organized by domain — `configs/` for configuration data, `core/` for anything shared across the app (components, hooks, providers, and assets), and `screens/` for presentation.

State management is handled via React Context. On startup, the app loads the default JSON configuration and stores it in context. When the user switches brands via the settings modal, the context state is updated and the home screen re-renders automatically to reflect the new configuration.

Styling uses React Native's built-in `StyleSheet` API — there was no justification for introducing a third-party styling solution given the scope of the project.

---

## Considerations

- Both the home screen and the options on the settings screen are wrapped in a `ScrollView` to ensure content remains accessible on smaller devices or when system font sizes are increased.
- A `SafeAreaView` wraps the home screen to keep content within safe display boundaries across devices with notches or home indicators.

---

## Assumptions

- Image URLs provided in the configuration are expected to be reliably available. A placeholder loader is shown while images are fetching, but no heavy error-handling or fallback strategy has been implemented beyond that.
- The call-to-action button link is treated as an external URL and opens in the device's default browser. It was not intended for internal app navigation.