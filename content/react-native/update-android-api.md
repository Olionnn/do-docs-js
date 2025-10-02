# Update Android API ke Versi Terbaru

## Overview
Android secara berkala merilis update API level baru dengan fitur-fitur terbaru, security improvements, dan performance enhancements. Update Android API penting untuk:

- Mendapatkan fitur terbaru Android
- Meningkatkan security aplikasi
- Mendukung device terbaru
- Memenuhi Google Play requirements

## Cek Versi Android API Saat Ini

### Cek di Project
```bash
# Cek compileSdkVersion dan targetSdkVersion
cat android/app/build.gradle | grep -E "(compileSdkVersion|targetSdkVersion)"

# Cek buildToolsVersion
cat android/app/build.gradle | grep buildToolsVersion
```

### Cek Android SDK Terinstall
```bash
# List installed SDK packages
~/Library/Android/sdk/tools/bin/sdkmanager --list_installed

# Atau di Windows
%ANDROID_HOME%/tools/bin/sdkmanager --list_installed
```

## Update Android Studio dan SDK

### 1. Update Android Studio
```bash
# Download Android Studio terbaru dari:
# https://developer.android.com/studio

# Atau update via Android Studio:
# Help → Check for Updates
```

### 2. Update Android SDK Tools
```bash
# Update SDK tools
~/Library/Android/sdk/tools/bin/sdkmanager --update

# Update platform-tools
~/Library/Android/sdk/tools/bin/sdkmanager --install 'platform-tools'

# Update build-tools terbaru
~/Library/Android/sdk/tools/bin/sdkmanager --install 'build-tools;33.0.2'
```

### 3. Install Android API Level Terbaru

```bash
# Install Android API 34 (Android 14)
~/Library/Android/sdk/tools/bin/sdkmanager --install 'platforms;android-34'

# Install Google APIs (jika perlu)
~/Library/Android/sdk/tools/bin/sdkmanager --install 'add-ons;addon-google_apis-google-23'

# Install system images untuk emulator
~/Library/Android/sdk/tools/bin/sdkmanager --install 'system-images;android-34;google_apis;x86_64'
```

## Update Project Configuration

### Update build.gradle (Project Level)

```gradle
// android/build.gradle
buildscript {
    ext {
        buildToolsVersion = "33.0.2"
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "23.1.7779620"
        kotlinVersion = "1.8.0"
    }
    // ... existing code ...
}
```

### Update build.gradle (App Level)

```gradle
// android/app/build.gradle
android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    buildToolsVersion rootProject.ext.buildToolsVersion

    defaultConfig {
        applicationId "com.myapp"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"

        // ... existing code ...
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = '1.8'
    }
}
```

### Update Gradle Wrapper

```bash
# Update gradle wrapper ke versi terbaru
cd android
./gradlew wrapper --gradle-version 8.0.2

# Atau edit gradle-wrapper.properties
# distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-bin.zip
```

## Update Dependencies

### Update React Native Dependencies

```bash
# Update React Native (pastikan kompatibel dengan target API)
npm update react-native

# Update React Native CLI
npm install -g @react-native-community/cli

# Update Metro bundler
npm update @react-native-community/cli
```

### Update Android Dependencies

```gradle
// android/app/build.gradle
dependencies {
    implementation 'com.facebook.react:react-native:+'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'
    implementation 'com.google.android.material:material:1.9.0'
    // ... existing code ...
}
```

## Update AndroidManifest.xml

### Permissions dan Features

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.myapp">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Android 13+ Notification Permission -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <!-- Android 12+ Approximate Location -->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"
        android:maxSdkVersion="30" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"
        android:maxSdkVersion="30" />

    <application
        android:name=".MainApplication"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="false"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true"
        android:requestLegacyExternalStorage="true">

        <!-- Android 12+ Splash Screen API -->
        <meta-data
            android:name="android.app.splash_screen"
            android:resource="@style/SplashScreen" />

        <!-- ... existing code ... -->
    </application>
</manifest>
```

## Update Java/Kotlin Code

### MainApplication.java (Java)

```java
// android/app/src/main/java/com/myapp/MainApplication.java
package com.myapp;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  // ... existing code ...
}
```

### MainApplication.kt (Kotlin)

```kotlin
// android/app/src/main/java/com/myapp/MainApplication.kt
package com.myapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.soloader.SoLoader
import java.util.*

class MainApplication : Application(), ReactApplication {
    private val mReactNativeHost: ReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getPackages(): List<ReactPackage> {
            val packages: MutableList<ReactPackage> = PackageList(this).packages
            return packages
        }

        override fun getJSMainModuleName(): String {
            return "index"
        }
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return mReactNativeHost
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
        initializeFlipper(this, reactNativeHost.reactInstanceManager)
    }

    // ... existing code ...
}
```

## Update ProGuard Rules

```proguard
# android/app/proguard-rules.pro

# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.jni.** { *; }

# AndroidX
-keep class androidx.** { *; }
-dontwarn androidx.**

# Material Components
-keep class com.google.android.material.** { *; }
-dontwarn com.google.android.material.**

# OkHttp
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# Glide (jika digunakan)
-keep public class * extends com.bumptech.glide.module.AppGlideModule {
  public static void registerComponents(@NonNull android.content.Context, @NonNull com.bumptech.glide.Glide, @NonNull com.bumptech.glide.Registry);
}
```

## Testing Update

### Build dan Test

```bash
# Clean build
cd android
./gradlew clean

# Build debug APK
./gradlew assembleDebug

# Install ke device
./gradlew installDebug

# Jalankan React Native
cd ..
react-native run-android
```

### Test di Berbagai API Levels

```bash
# Buat AVD untuk API level berbeda
~/Library/Android/sdk/tools/bin/avdmanager create avd -n test_api_34 -k 'system-images;android-34;google_apis;x86_64'

# Jalankan emulator
~/Library/Android/sdk/emulator/emulator -avd test_api_34
```

## Troubleshooting

### Common Issues

#### Build Tools Version Error
```
# Update buildToolsVersion di build.gradle
buildToolsVersion = "33.0.2"
```

#### Compile SDK Version Error
```
# Pastikan Android SDK API level terinstall
~/Library/Android/sdk/tools/bin/sdkmanager --install 'platforms;android-34'
```

#### Gradle Sync Failed
```bash
# Clear Gradle cache
rm -rf ~/.gradle/caches
cd android && ./gradlew clean
```

#### Dexing Issue
```gradle
// android/app/build.gradle
android {
    defaultConfig {
        multiDexEnabled true
    }
}
```

## Android API Level Reference

| API Level | Version | Release Date | Notable Features |
|-----------|---------|--------------|------------------|
| 34 | Android 14 | 2023 | Predictive back, per-app language |
| 33 | Android 13 | 2022 | Material You, Notification permission |
| 32 | Android 12L | 2022 | Large screen optimizations |
| 31 | Android 12 | 2021 | Splash screen API, App startup |
| 30 | Android 11 | 2020 | Scoped storage, Biometric prompt |

## Best Practices

1. **Test di Multiple API Levels**: Test aplikasi di API 21+ (minimum) sampai latest
2. **Gradual Updates**: Update satu API level dalam satu waktu
3. **Backup Project**: Selalu backup sebelum major updates
4. **Check Compatibility**: Pastikan semua dependencies support target API
5. **Update Documentation**: Update README dengan requirements baru

## Summary

Update Android API melibatkan:
1. Update Android Studio dan SDK tools
2. Install latest Android API level
3. Update build.gradle configurations
4. Update dependencies dan manifest
5. Test thoroughly di multiple devices
6. Update documentation

Selalu test aplikasi setelah update untuk memastikan kompatibilitas dan performance. Jika ada issues, check React Native upgrade helper dan Android developer documentation. 