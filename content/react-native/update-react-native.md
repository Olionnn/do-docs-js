# Update React Native ke Versi Terbaru

## Overview
Update React Native penting untuk mendapatkan:
- Security fixes dan bug fixes
- Performance improvements
- New features dan APIs
- Better compatibility dengan latest Android/iOS
- Long-term support

## Cek Versi React Native Saat Ini

```bash
# Cek versi React Native
npx react-native --version

# Cek versi di package.json
cat package.json | grep react-native

# Cek semua dependencies React Native
npm list react-native
```

## React Native Upgrade Helper

### Official Upgrade Tool
```bash
# Install React Native upgrade helper
npm install -g @react-native-community/cli

# Atau gunakan npx
npx @react-native-community/cli doctor
```

### Upgrade Assistant Online
Kunjungi: https://react-native-community.github.io/upgrade-helper/

1. Pilih current version → target version
2. Compare package.json changes
3. Lihat breaking changes
4. Copy necessary changes

## Minor Version Updates (Patch)

### Safe Updates (Patch versions)
```bash
# Update patch version (misal 0.70.1 → 0.70.6)
npm update react-native

# Update related packages
npm update @react-native-community/cli
npm update metro-react-native-babel-preset

# Clean dan rebuild
cd android && ./gradlew clean
cd ..
react-native run-android
```

## Major Version Updates

### React Native 0.71 → 0.72

#### 1. Backup Project
```bash
# Backup current working version
git add .
git commit -m "Backup before RN upgrade"
git tag backup-before-rn-0.72
```

#### 2. Update Dependencies
```bash
# Update React Native
npm install react-native@0.72

# Update CLI
npm install @react-native-community/cli@latest

# Update Metro
npm install metro@latest metro-react-native-babel-preset@latest

# Update Jest
npm install jest@latest @testing-library/react-native@latest
```

#### 3. Update package.json Scripts
```json
{
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "postinstall": "patch-package"
  }
}
```

#### 4. Update Metro Config
```javascript
// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  // Add your custom configuration here
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

#### 5. Update Babel Config
```javascript
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // Add your plugins here
  ],
};
```

#### 6. Update Android Configuration

```gradle
// android/build.gradle
buildscript {
    ext {
        buildToolsVersion = "33.0.2"
        minSdkVersion = 21
        compileSdkVersion = 33
        targetSdkVersion = 33
        ndkVersion = "23.1.7779620"
        kotlinVersion = "1.7.0"
    }
    dependencies {
        classpath("com.android.tools.build:gradle:7.4.2")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    }
}
```

```gradle
// android/app/build.gradle
dependencies {
    implementation 'com.facebook.react:react-native:+'
    implementation 'androidx.appcompat:appcompat:1.5.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'com.google.android.material:material:1.7.0'
}
```

#### 7. Update iOS Configuration

```ruby
# ios/Podfile
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '12.4'
install! 'cocoapods', :deterministic_uuids => false

target 'MyApp' do
  config = use_native_modules!

  use_react_native!(
    :path => config[:reactNativePath],
    :hermes_enabled => flags[:hermes_enabled],
    :fabric_enabled => flags[:fabric_enabled],
    :flipper_configuration => FlipperConfiguration.enabled,
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )

  target 'MyAppTests' do
    inherit! :complete
  end

  post_install do |installer|
    react_native_post_install(
      installer,
      config[:reactNativePath],
      :mac_catalyst_enabled => false
    )
  end
end
```

#### 8. Update Index Files

```javascript
// index.js
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

```javascript
// App.js atau App.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>React Native 0.72!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

## Breaking Changes Migration

### React Native 0.70+ Changes

#### 1. Hermes Default
Hermes sekarang default di Android. Jika ada issues:

```gradle
// android/app/build.gradle
project.ext.react = [
    enableHermes: false,  // Disable jika ada masalah
]
```

#### 2. New Architecture (Fabric)
```javascript
// index.js - Enable new architecture
import { AppRegistry } from 'react-native';
import { enableFabric } from 'react-native/Libraries/Renderer/shims/ReactNative';

enableFabric(true);
AppRegistry.registerComponent(appName, () => App);
```

#### 3. Flipper Integration
```javascript
// android/app/src/main/java/com/myapp/MainApplication.java
import com.facebook.flipper.android.utils.FlipperUtils;
import com.facebook.flipper.core.FlipperClient;
import com.facebook.flipper.plugins.inspector.DescriptorMapping;
import com.facebook.flipper.plugins.network.FlipperOkhttpInterceptor;
import com.facebook.flipper.plugins.network.NetworkFlipperPlugin;
import com.facebook.flipper.plugins.react.ReactFlipperPlugin;
import com.facebook.flipper.plugins.sharedpreferences.SharedPreferencesFlipperPlugin;
import okhttp3.OkHttpClient;

public class MainApplication extends Application implements ReactApplication {
  // ... existing code ...

  private void initializeFlipper() {
    if (FlipperUtils.shouldEnableFlipper(this)) {
      FlipperClient client = AndroidFlipperClient.getInstance(this);
      client.addPlugin(new InspectorFlipperPlugin(this, DescriptorMapping.withDefaults()));
      client.addPlugin(new ReactFlipperPlugin());
      client.addPlugin(new DatabasesFlipperPlugin(this));
      client.addPlugin(new SharedPreferencesFlipperPlugin(this));
      client.start();
    }
  }
}
```

## Automated Upgrade Scripts

### RN Diff Apply Script
```bash
# Download dan apply upgrade changes
npx react-native upgrade

# Atau upgrade ke specific version
npx react-native upgrade 0.72.0
```

### Custom Upgrade Script
```bash
#!/bin/bash
# upgrade-rn.sh

echo "Starting React Native upgrade..."

# Backup
git checkout -b upgrade-rn-$(date +%Y%m%d)

# Update dependencies
npm install react-native@latest
npm install @react-native-community/cli@latest

# Clean native folders
rm -rf android/app/build
rm -rf ios/build

# Reinstall pods
cd ios && pod install && cd ..

# Clean Metro cache
rm -rf $TMPDIR/metro-cache

echo "Upgrade completed. Please test the app."
```

## Testing After Upgrade

### Comprehensive Testing Checklist

```bash
# 1. Clean install
rm -rf node_modules
npm install

# 2. Clean native builds
cd android && ./gradlew clean
cd ../ios && rm -rf build

# 3. Test Android build
react-native run-android

# 4. Test iOS build (Mac only)
react-native run-ios

# 5. Run tests
npm test

# 6. Test release builds
cd android && ./gradlew assembleRelease
```

### Common Issues & Solutions

#### Metro Bundler Issues
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Reset Metro bundler
rm -rf $TMPDIR/metro-cache
```

#### Android Build Issues
```bash
# Clean Gradle
cd android
./gradlew clean
./gradlew --stop
rm -rf ~/.gradle/caches

# Rebuild
./gradlew assembleDebug
```

#### iOS Build Issues
```bash
# Clean CocoaPods
cd ios
rm -rf Pods
rm Podfile.lock
pod install

# Clean Xcode
rm -rf build
```

#### Dependency Conflicts
```bash
# Check for conflicts
npm ls

# Fix conflicts
npm audit fix

# Update problematic packages
npm update package-name
```

## Performance Improvements

### React Native 0.71+ Optimizations

1. **Hermes Engine**: Faster JavaScript execution
2. **Fabric Renderer**: Improved rendering performance
3. **TurboModules**: Faster native module communication
4. **Code Splitting**: Smaller bundle sizes

### Enable Performance Features

```javascript
// index.js
import { enableFabric, enableTurboModules } from 'react-native/Libraries/Renderer/shims/ReactNative';

// Enable new architecture features
enableFabric(true);
enableTurboModules(true);
```

## Rollback Strategy

### If Upgrade Fails
```bash
# Revert to previous commit
git checkout backup-before-rn-0.72
git reset --hard HEAD

# Reinstall dependencies
rm -rf node_modules
npm install

# Clean native builds
cd android && ./gradlew clean
cd ../ios && rm -rf build && pod install
```

## Version Compatibility Matrix

| React Native | Node.js | JDK | Android Gradle Plugin | Xcode |
|--------------|---------|-----|----------------------|-------|
| 0.72.x      | 16+    | 11+ | 7.4+               | 14.0+ |
| 0.71.x      | 14+    | 11+ | 7.3+               | 13.0+ |
| 0.70.x      | 14+    | 11+ | 7.2+               | 12.4+ |

## Best Practices

1. **Test Thoroughly**: Test di multiple devices dan OS versions
2. **Gradual Updates**: Update satu minor version dalam satu waktu
3. **Backup Always**: Commit sebelum upgrade
4. **Check Breaking Changes**: Baca changelog sebelum upgrade
5. **Update Dependencies**: Update semua RN-related packages bersamaan
6. **Monitor Performance**: Test performance setelah upgrade

## Summary

Update React Native melibatkan:
1. Backup project dan dependencies
2. Update React Native dan related packages
3. Update native configurations (Android/iOS)
4. Test thoroughly di multiple platforms
5. Fix breaking changes dan compatibility issues
6. Monitor performance dan stability

Gunakan React Native Upgrade Helper untuk guidance dan selalu test aplikasi secara menyeluruh setelah upgrade. Jika ada masalah, jangan ragu untuk rollback ke versi sebelumnya. 