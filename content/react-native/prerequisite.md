# Installasi Prerequisite

## Windows
1. Install Node.js (versi LTS) dari [nodejs.org](https://nodejs.org/).
2. Install JDK 11 atau lebih tinggi dari [adoptium.net](https://adoptium.net/).
3. Install Android Studio untuk Android SDK dan emulator.
4. Install Python 2 (untuk React Native CLI).
5. Tambahkan variabel environment: `ANDROID_HOME`, `JAVA_HOME`, dan path ke `platform-tools`.

## Mac
1. Install Node.js via Homebrew: `brew install node`.
2. Install JDK via Homebrew: `brew install --cask adoptopenjdk/openjdk/adoptopenjdk11`.
3. Install Xcode dari App Store untuk iOS development.
4. Install CocoaPods: `sudo gem install cocoapods`.
5. Untuk Android, install Android Studio.

## Linux (Ubuntu/Debian)
1. Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`.
2. Install JDK: `sudo apt install openjdk-11-jdk`.
3. Install Android Studio dari snap atau tarball.
4. Install Python: `sudo apt install python2`.
5. Tambahkan variabel environment seperti di Windows.