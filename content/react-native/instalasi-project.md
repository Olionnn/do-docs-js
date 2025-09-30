# Instalasi Awal Membuat Project

## Menggunakan Expo
1. Install Expo CLI: `npm install -g @expo/cli`.
2. Buat project: `expo init MyProject`.
3. Pilih template (blank, tabs, dll).
4. Jalankan: `cd MyProject && expo start`.

## Native Tanpa Expo (React Native CLI)
1. Install React Native CLI: `npm install -g react-native-cli`.
2. Buat project: `react-native init MyProject`.
3. Untuk iOS (Mac): `cd MyProject && cd ios && pod install`.
4. Jalankan Android: `react-native run-android`.
5. Jalankan iOS: `react-native run-ios`.