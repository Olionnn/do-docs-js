# Clean Project
1. Hapus node_modules: `rm -rf node_modules && npm install`.
2. Clean Gradle (Android): `cd android && ./gradlew clean`.
3. Clean iOS: `cd ios && rm -rf build && pod install`.
4. Hapus cache Metro: `npx react-native start --reset-cache`.