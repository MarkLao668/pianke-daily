const test = require("node:test");
const assert = require("node:assert/strict");
const { locales, localeOrder, defaultLocale, requiredKeys } = require("../app/i18n-data");

test("includes twelve selectable world languages", () => {
  assert.equal(localeOrder.length, 12);
  assert.equal(new Set(localeOrder).size, 12);
  assert.equal(defaultLocale, "zh-CN");
  for (const localeKey of localeOrder) assert.ok(locales[localeKey], `missing ${localeKey}`);
});

test("every language has complete interface and seven-day cinema text", () => {
  for (const localeKey of localeOrder) {
    const locale = locales[localeKey];
    assert.equal(locale.weekdays.length, 7, `${localeKey} weekdays`);
    assert.equal(locale.lines.length, 7, `${localeKey} poetic lines`);
    assert.equal(locale.credits.length, 7, `${localeKey} image credits`);
    assert.equal(locale.modernLines.length, 7, `${localeKey} modern poetic lines`);
    assert.equal(locale.modernCredits.length, 7, `${localeKey} modern image credits`);
    assert.ok(locale.label);
    assert.ok(locale.lang);
    for (const key of requiredKeys) assert.ok(locale.strings[key], `${localeKey}.${key}`);
  }
});

test("Arabic is right-to-left and the other included languages are left-to-right", () => {
  assert.equal(locales.ar.dir, "rtl");
  for (const localeKey of localeOrder.filter((key) => key !== "ar")) {
    assert.equal(locales[localeKey].dir, "ltr", localeKey);
  }
});
