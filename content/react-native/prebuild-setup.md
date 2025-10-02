# Prebuild dengan Expo dan React Native CLI

## Overview
Prebuild adalah proses menghasilkan native code (iOS dan Android) dari JavaScript/React code. Ada dua pendekatan utama: Expo managed workflow dan React Native CLI bare workflow.

## Expo Managed Workflow

### Keuntungan
- Mudah setup dan development
- OTA (Over-The-Air) updates
- Built-in services (push notifications, etc.)
- Tidak perlu Xcode/Android Studio untuk development

### Kekurangan
- Kurang fleksibilititas untuk native modules custom
- Dependency pada Expo services
- App size lebih besar

### Setup Expo Prebuild

```bash
# Install Expo CLI
npm install -g @expo/cli

# Buat project baru
expo init MyExpoApp

# Pilih template:
# - blank (TypeScript) - Recommended
# - blank (JavaScript)
# - tabs (TypeScript)
# - minimal

# Masuk ke folder project
cd MyExpoApp

# Jalankan development server
expo start
```

### Expo Prebuild Commands

```bash
# Prebuild untuk development (membuat ios/android folders)
expo prebuild

# Prebuild dengan clean
expo prebuild --clean

# Prebuild untuk platform tertentu
expo prebuild --platform ios
expo prebuild --platform android

# Build APK untuk development
expo build:android

# Build IPA untuk development
expo build:ios

# Build untuk production
expo build:android --type app-bundle
expo build:ios --type archive
```

### Expo App Configuration (app.json)

```json
{
  "expo": {
    "name": "MyExpoApp",
    "slug": "my-expo-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.mycompany.myexpoapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.mycompany.myexpoapp"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

## React Native CLI (Bare Workflow)

### Keuntungan
- Full control atas native code
- Bisa menggunakan semua native libraries
- Lebih fleksibel untuk custom native modules
- App size lebih optimal

### Kekurangan
- Setup lebih kompleks
- Perlu Xcode/Android Studio
- Lebih banyak manual configuration

### Setup React Native CLI

```bash
# Install React Native CLI
npm install -g react-native-cli

# Atau gunakan npx (recommended)
npx react-native init MyRNApp

# Untuk TypeScript support
npx react-native init MyRNApp --template react-native-template-typescript

# Masuk ke folder project
cd MyRNApp
```

### iOS Setup (Mac only)

```bash
# Install CocoaPods dependencies
cd ios
pod install
cd ..

# Jalankan di iOS simulator
react-native run-ios

# Atau buka di Xcode
cd ios
open MyRNApp.xcworkspace
```

### Android Setup

```bash
# Jalankan di Android emulator/device
react-native run-android

# Build APK debug
cd android
./gradlew assembleDebug

# Build APK release
./gradlew assembleRelease

# Install ke device
./gradlew installDebug
```

## Metro Bundler Configuration

### Metro Config (metro.config.js)

```javascript
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
```

## Development Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "web": "expo start --web",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint .",
    "build:android": "cd android && ./gradlew assembleRelease",
    "build:ios": "cd ios && xcodebuild -workspace MyApp.xcworkspace -scheme MyApp -configuration Release -archivePath build/MyApp.xcarchive archive",
    "clean": "cd android && ./gradlew clean && cd ../ios && rm -rf build",
    "clean:node": "rm -rf node_modules && npm install",
    "postinstall": "patch-package"
  }
}
```

## Troubleshooting Prebuild Issues

### Common Issues

#### iOS Build Fails
```bash
# Clean iOS build
cd ios
rm -rf build
pod install
cd ..
react-native run-ios
```

#### Android Build Fails
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
react-native run-android
```

#### Metro Cache Issues
```bash
# Clear Metro cache
react-native start --reset-cache

# Atau hapus cache folder
rm -rf $TMPDIR/metro-cache
```

#### Node Modules Issues
```bash
# Reinstall node modules
rm -rf node_modules
npm install

# Atau gunakan Yarn
rm -rf node_modules
yarn install
```

## Performance Optimization

### Hermes Engine (Recommended)

```javascript
// android/app/build.gradle
project.ext.react = [
    enableHermes: true,  // clean and rebuild if changing
]
```

### ProGuard/R8 (Android Release)

```javascript
// android/app/build.gradle
def enableProguardInReleaseBuilds = true
```

### App Size Optimization

1. **Tree Shaking**: Pastikan menggunakan ES6 imports
2. **Image Optimization**: Gunakan compressed images
3. **Bundle Splitting**: Code splitting untuk features besar
4. **Remove Debug Code**: Pastikan development code tidak masuk production

## CI/CD Setup

### GitHub Actions untuk React Native

```yaml
name: Build and Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm test

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: cd android && ./gradlew assembleRelease

  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: cd ios && pod install
      - run: cd ios && xcodebuild -workspace MyApp.xcworkspace -scheme MyApp -configuration Release -archivePath build/MyApp.xcarchive archive
```

## Summary

Pilih Expo jika:
- Tim kecil/individual developer
- Butuh development cepat
- Tidak butuh custom native modules kompleks
- Ingin OTA updates

Pilih React Native CLI jika:
- Tim besar dengan native developers
- Butuh custom native modules
- Kontrol penuh atas build process
- Performance critical application