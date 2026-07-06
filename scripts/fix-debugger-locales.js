const fs = require("fs");
const path = require("path");

const localesDir = path.join(
  __dirname,
  "..",
  "node_modules",
  "@react-native",
  "debugger-frontend",
  "dist",
  "third-party",
  "front_end",
  "core",
  "i18n",
  "locales",
);

const fallbackLocalePath = path.join(localesDir, "en-US.json");
const requiredLocales = ["ru.json"];

function ensureLocaleFile(localeFileName) {
  const targetPath = path.join(localesDir, localeFileName);
  if (fs.existsSync(targetPath)) {
    return;
  }

  fs.copyFileSync(fallbackLocalePath, targetPath);
  console.log(
    `[fix-debugger-locales] created missing locale ${localeFileName} from en-US.json`,
  );
}

function main() {
  if (!fs.existsSync(localesDir)) {
    console.warn(
      "[fix-debugger-locales] debugger locales directory not found, skipping",
    );
    return;
  }

  if (!fs.existsSync(fallbackLocalePath)) {
    console.warn(
      "[fix-debugger-locales] en-US.json not found, cannot create fallback locales",
    );
    return;
  }

  requiredLocales.forEach(ensureLocaleFile);
}

main();
