# TestProgetctRn (BloggerPlatform)

React Native-приложение (bare workflow, React Native 0.86).

- **Android applicationId:** `com.testprogetctrn`
- **iOS Bundle ID (по умолчанию):** `org.reactjs.native.example.TestProgetctRn`
- **JS-движок:** Hermes
- **New Architecture:** включена

Перед релизной сборкой убедитесь, что окружение настроено по [официальной инструкции React Native](https://reactnative.dev/docs/set-up-your-environment).

---

## Переменные окружения

Проект использует `react-native-dotenv`. Перед сборкой создайте файл `.env` в корне репозитория (файл в `.gitignore`, в репозиторий не коммитится):

```env
API_URL2=https://your-production-api.example.com
LOGIN=
PASSWORD=
```

| Переменная   | Обязательна | Описание              |
|--------------|-------------|-----------------------|
| `API_URL2`   | Да          | Базовый URL API       |
| `LOGIN`      | Нет         | Тестовый логин (dev)  |
| `PASSWORD`   | Нет         | Тестовый пароль (dev) |

> Для production используйте production-URL в `.env`. Значения из `.env` вшиваются в JS-бандл на этапе сборки.

---

## Общая подготовка

```bash
# Установка зависимостей
npm install

# iOS: CocoaPods (только macOS)
bundle install
cd ios && bundle exec pod install && cd ..
```

Проверьте версию приложения перед релизом:

| Платформа | Где менять |
|-----------|------------|
| Android   | `android/app/build.gradle` → `versionCode`, `versionName` |
| iOS       | Xcode → Target **TestProgetctRn** → **General** → **Version** / **Build** |

---

## Релизная сборка Android (APK)

### 1. Создайте release-keystore (один раз)

```bash
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore android/app/release.keystore \
  -alias release \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Сохраните пароли и alias — они понадобятся для каждой сборки. Файл `*.keystore` не должен попадать в git.

### 2. Настройте подпись

Создайте `android/keystore.properties` (тоже не коммитить):

```properties
MYAPP_UPLOAD_STORE_FILE=release.keystore
MYAPP_UPLOAD_KEY_ALIAS=release
MYAPP_UPLOAD_STORE_PASSWORD=ваш_store_password
MYAPP_UPLOAD_KEY_PASSWORD=ваш_key_password
```

Добавьте в `.gitignore`:

```
android/keystore.properties
```

В `android/app/build.gradle` замените блок `signingConfigs` и `buildTypes.release`:

```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    // ...
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            if (keystorePropertiesFile.exists()) {
                storeFile file(keystoreProperties['MYAPP_UPLOAD_STORE_FILE'])
                storePassword keystoreProperties['MYAPP_UPLOAD_STORE_PASSWORD']
                keyAlias keystoreProperties['MYAPP_UPLOAD_KEY_ALIAS']
                keyPassword keystoreProperties['MYAPP_UPLOAD_KEY_PASSWORD']
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

> Сейчас release-сборка подписывается debug-ключом — это подходит только для локальных тестов, не для публикации в магазин.

### 3. Соберите APK

```bash
# Убедитесь, что .env содержит production-значения
cd android
./gradlew assembleRelease
cd ..
```

Готовый APK:

```
android/app/build/outputs/apk/release/app-release.apk
```

### 4. Установка на устройство

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Сборка AAB для Google Play (опционально)

Для публикации в Google Play нужен Android App Bundle, а не APK:

```bash
cd android
./gradlew bundleRelease
cd ..
```

Результат:

```
android/app/build/outputs/bundle/release/app-release.aab
```

### Полезные флаги Android

- Архитектура по умолчанию: `arm64-v8a` (см. `android/gradle.properties`).
- Сборка только для конкретной ABI:
  ```bash
  cd android && ./gradlew assembleRelease -PreactNativeArchitectures=armeabi-v7a,arm64-v8a
  ```

---

## Релизная сборка iOS

> Требуется **macOS**, **Xcode** и аккаунт **Apple Developer** (для установки на реальные устройства и публикации в App Store).

### 1. Подготовка проекта

```bash
npm install
bundle install
cd ios && bundle exec pod install && cd ..
```

### 2. Настройка подписи в Xcode

1. Откройте `ios/TestProgetctRn.xcworkspace` (не `.xcodeproj`).
2. Выберите target **TestProgetctRn** → вкладка **Signing & Capabilities**.
3. Включите **Automatically manage signing**.
4. Выберите свою **Team** (Apple Developer account).
5. Задайте уникальный **Bundle Identifier** (например, `com.yourcompany.bloggerplatform`).
6. Обновите **Version** (marketing version) и **Build** (build number).

### 3. Сборка для TestFlight / App Store (Archive)

1. В Xcode выберите схему **TestProgetctRn**.
2. Destination: **Any iOS Device (arm64)** — не симулятор.
3. Меню **Product → Archive**.
4. После сборки откроется **Organizer**:
   - **Distribute App** → **App Store Connect** → загрузка в TestFlight / App Store.
   - или **Ad Hoc** / **Development** → экспорт `.ipa` для тестовых устройств.

### 4. Сборка через командную строку (опционально)

```bash
xcodebuild \
  -workspace ios/TestProgetctRn.xcworkspace \
  -scheme TestProgetctRn \
  -configuration Release \
  -destination 'generic/platform=iOS' \
  -archivePath ios/build/TestProgetctRn.xcarchive \
  archive
```

Экспорт IPA (нужен ExportOptions.plist с method: `app-store`, `ad-hoc` или `development`):

```bash
xcodebuild \
  -exportArchive \
  -archivePath ios/build/TestProgetctRn.xcarchive \
  -exportPath ios/build/export \
  -exportOptionsPlist ios/ExportOptions.plist
```

### 5. Установка на устройство без App Store

- **TestFlight** — рекомендуемый способ для QA.
- **Ad Hoc** — IPA с профилем, в котором зарегистрированы UDID устройств.
- **Development** — для отладки на своих устройствах через Xcode.

---

## Чеклист перед релизом

- [ ] `.env` содержит production `API_URL2`
- [ ] Обновлены `versionCode` / `versionName` (Android) и Version / Build (iOS)
- [ ] Release-подпись Android настроена (не debug-keystore)
- [ ] iOS Bundle ID и signing team настроены в Xcode
- [ ] Приложение протестировано на реальном устройстве в Release-режиме
- [ ] Секреты (keystore, пароли, `.env`) не попали в git

---

## Локальная разработка

```bash
# Metro
npm start

# Android (debug)
npm run android

# iOS (debug, macOS)
npm run ios
```

---

## Troubleshooting

### Android: `assembleRelease` падает на bundling

- Проверьте наличие `.env` с `API_URL2`.
- Очистите кэш: `cd android && ./gradlew clean && cd ..`
- Пересоберите: `cd android && ./gradlew assembleRelease`

### Android: APK не устанавливается

- Удалите старую версию с другой подписью: `adb uninstall com.testprogetctrn`
- Убедитесь, что на устройстве разрешена установка из неизвестных источников

### iOS: ошибки CocoaPods

```bash
cd ios
bundle exec pod deintegrate
bundle exec pod install
cd ..
```

### iOS: Archive недоступен

- Выберите **Any iOS Device**, а не симулятор
- Проверьте signing team и provisioning profile в Xcode

---

## Полезные ссылки

- [React Native — Signed APK (Android)](https://reactnative.dev/docs/signed-apk-android)
- [React Native — Publishing to Apple App Store](https://reactnative.dev/docs/publishing-to-app-store)
- [Google Play — App Bundle](https://developer.android.com/guide/app-bundle)
- [App Store Connect](https://appstoreconnect.apple.com/)
