const CLASSICAL_DAY_ART = {
  1: { image: "../assets/days/monday.png" },
  2: { image: "../assets/days/tuesday.png" },
  3: { image: "../assets/days/wednesday.png" },
  4: { image: "../assets/days/thursday.png" },
  5: { image: "../assets/days/friday.png" },
  6: { image: "../assets/days/saturday.png" },
  0: { image: "../assets/days/sunday.png" },
};

const MODERN_DAY_ART = {
  1: { image: "../assets/themes/modern/monday.png" },
  2: { image: "../assets/themes/modern/tuesday.png" },
  3: { image: "../assets/themes/modern/wednesday.png" },
  4: { image: "../assets/themes/modern/thursday.png" },
  5: { image: "../assets/themes/modern/friday.png" },
  6: { image: "../assets/themes/modern/saturday.png" },
  0: { image: "../assets/themes/modern/sunday.png" },
};

const THEMES = {
  classical: { labelKey: "classicalTheme", art: CLASSICAL_DAY_ART },
  modern: { labelKey: "modernTheme", art: MODERN_DAY_ART },
};

const { locales: LOCALES, localeOrder: LOCALE_ORDER, defaultLocale: DEFAULT_LOCALE } = window.PIANKE_I18N;
const CHINESE_DIGITS = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const MONTH_NAMES = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const KOREAN_BRANCHES = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const ROMAN_BRANCHES = ["Zi", "Chou", "Yin", "Mao", "Chen", "Si", "Wu", "Wei", "Shen", "You", "Xu", "Hai"];
const MODERN_CLOCK_MARKS = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
const CHAPTER_NUMBERS = ["", "壹", "贰", "叁", "肆", "伍", "陆", "柒"];
const TRADITIONAL_CHAPTER_NUMBERS = ["", "壹", "貳", "參", "肆", "伍", "陸", "柒"];
const ROMAN_SCENES = ["", "I", "II", "III", "IV", "V", "VI", "VII"];

const queryParams = new URLSearchParams(window.location.search);
const queryLocale = queryParams.get("lang");
const queryTheme = queryParams.get("theme");
const queryDate = queryParams.get("date");
const savedLocale = window.localStorage.getItem("pianke-language");
const savedTheme = window.localStorage.getItem("pianke-theme");
const startingLocale = LOCALES[queryLocale] ? queryLocale : (LOCALES[savedLocale] ? savedLocale : DEFAULT_LOCALE);
const startingTheme = THEMES[queryTheme] ? queryTheme : (THEMES[savedTheme] ? savedTheme : "classical");
const currentDate = toDateKey(new Date());
const startingDate = /^\d{4}-\d{2}-\d{2}$/.test(queryDate || "") ? queryDate : currentDate;

const state = {
  today: currentDate,
  selectedDate: startingDate,
  day: { title: "", voiceover: "", tasks: [] },
  loading: false,
  locale: startingLocale,
  theme: startingTheme,
};

const elements = {
  panel: document.getElementById("cinema-panel"),
  dayImage: document.getElementById("day-image"),
  sceneIndex: document.getElementById("scene-index"),
  heroWeekday: document.getElementById("hero-weekday"),
  heroLine: document.getElementById("hero-line"),
  heroMonth: document.getElementById("hero-month"),
  heroDay: document.getElementById("hero-day"),
  heroYear: document.getElementById("hero-year"),
  imageCredit: document.getElementById("image-credit"),
  fullDate: document.getElementById("full-date"),
  weekStrip: document.getElementById("week-strip"),
  dayTitle: document.getElementById("day-title"),
  dayVoiceover: document.getElementById("day-voiceover"),
  takeProgress: document.getElementById("take-progress"),
  progressRing: document.getElementById("progress-ring"),
  progressPercent: document.getElementById("progress-percent"),
  taskList: document.getElementById("task-list"),
  addForm: document.getElementById("add-form"),
  newTime: document.getElementById("new-time"),
  newTitle: document.getElementById("new-title"),
  previousDay: document.getElementById("previous-day"),
  nextDay: document.getElementById("next-day"),
  todayButton: document.getElementById("today-button"),
  themeSelect: document.getElementById("theme-select"),
  languageSelect: document.getElementById("language-select"),
  errorBar: document.getElementById("error-bar"),
  saveStatus: document.getElementById("save-status"),
  saveStatusCopy: document.getElementById("save-status-copy"),
  showData: document.getElementById("show-data"),
  backupData: document.getElementById("backup-data"),
  shichenClock: document.getElementById("shichen-clock"),
  clockBranches: document.getElementById("clock-branches"),
  clockLabel: document.getElementById("clock-label"),
  shichenReading: document.getElementById("shichen-reading"),
  exactTime: document.getElementById("exact-time"),
  hourHand: document.getElementById("hour-hand"),
  minuteHand: document.getElementById("minute-hand"),
  secondHand: document.getElementById("second-hand"),
};

function localeData() {
  return LOCALES[state.locale] || LOCALES[DEFAULT_LOCALE];
}

function t(key) {
  return localeData().strings[key] || LOCALES[DEFAULT_LOCALE].strings[key] || key;
}

function themeData() {
  return THEMES[state.theme] || THEMES.classical;
}

function themeLines(locale) {
  return state.theme === "modern" && Array.isArray(locale.modernLines) ? locale.modernLines : locale.lines;
}

function themeCredits(locale) {
  return state.theme === "modern" && Array.isArray(locale.modernCredits) ? locale.modernCredits : locale.credits;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function addDays(key, count) {
  const date = fromDateKey(key);
  date.setDate(date.getDate() + count);
  return toDateKey(date);
}

function chineseYear(year) {
  return String(year).split("").map((digit) => CHINESE_DIGITS[Number(digit)]).join("");
}

function chineseNumber(value) {
  if (value < 10) return CHINESE_DIGITS[value];
  if (value === 10) return "十";
  if (value < 20) return `十${CHINESE_DIGITS[value % 10]}`;
  const tens = `${CHINESE_DIGITS[Math.floor(value / 10)]}十`;
  return value % 10 ? `${tens}${CHINESE_DIGITS[value % 10]}` : tens;
}

function weekDates(key) {
  const date = fromDateKey(key);
  const offset = date.getDay() === 0 ? -6 : 1 - date.getDay();
  return Array.from({ length: 7 }, (_, index) => addDays(key, offset + index));
}

function formatDate(date, options) {
  return new Intl.DateTimeFormat(localeData().lang, options).format(date);
}

function formatDayNumber(date) {
  return new Intl.NumberFormat(localeData().lang, { minimumIntegerDigits: 2, useGrouping: false }).format(date.getDate());
}

function formatFullDate(date) {
  if (state.locale === "zh-CN" || state.locale === "zh-TW") {
    return `${chineseYear(date.getFullYear())}年${chineseNumber(date.getMonth() + 1)}月${chineseNumber(date.getDate())}日`;
  }
  return formatDate(date, { year: "numeric", month: "long", day: "numeric" });
}

function sceneLabel(dayIndex) {
  const ordinal = dayIndex === 0 ? 7 : dayIndex;
  if (state.locale === "zh-CN") return `第${CHAPTER_NUMBERS[ordinal]}幕`;
  if (state.locale === "zh-TW") return `第${TRADITIONAL_CHAPTER_NUMBERS[ordinal]}幕`;
  if (state.locale === "ja") return `第${ordinal}幕`;
  if (state.locale === "ko") return `제 ${ordinal}막`;
  return `${t("scene")} ${ROMAN_SCENES[ordinal]}`;
}

function clockReading(branchIndex, quarterIndex) {
  const quarter = quarterIndex === 0 ? t("firstQuarter") : `${quarterIndex} ${t("quarterWord")}`;
  if (state.locale === "zh-CN" || state.locale === "zh-TW") {
    const chineseQuarter = quarterIndex === 0 ? t("firstQuarter") : `${CHINESE_DIGITS[quarterIndex]}${t("quarterWord")}`;
    return `${EARTHLY_BRANCHES[branchIndex]}${t("hourWord")}${chineseQuarter}`;
  }
  if (state.locale === "ja") return `${EARTHLY_BRANCHES[branchIndex]}${t("hourWord")} · ${quarter}`;
  if (state.locale === "ko") return `${KOREAN_BRANCHES[branchIndex]}${t("hourWord")} · ${quarter}`;
  return `${ROMAN_BRANCHES[branchIndex]} ${t("hourWord")} · ${quarter}`;
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const hourRotation = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;
  const minuteRotation = (minutes + seconds / 60) * 6;
  const secondRotation = seconds * 6;

  elements.hourHand.style.setProperty("--rotation", `${hourRotation}deg`);
  elements.minuteHand.style.setProperty("--rotation", `${minuteRotation}deg`);
  elements.secondHand.style.setProperty("--rotation", `${secondRotation}deg`);

  const exact = new Intl.DateTimeFormat(localeData().lang, {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).format(now);
  let reading;

  if (state.theme === "modern") {
    reading = formatDate(now, { weekday: "short", month: "short", day: "numeric" });
  } else {
    const branchIndex = Math.floor(((hours + 1) % 24) / 2);
    const shichenStart = branchIndex === 0 ? 23 : branchIndex * 2 - 1;
    const minutesFromStart = ((hours - shichenStart + 24) % 24) * 60 + minutes;
    const quarterIndex = Math.min(7, Math.floor(minutesFromStart / 15));
    reading = clockReading(branchIndex, quarterIndex);
  }

  elements.clockLabel.textContent = t(state.theme === "modern" ? "modernClockLabel" : "clockLabel");
  elements.shichenReading.textContent = reading;
  elements.exactTime.textContent = exact;
  elements.exactTime.dateTime = now.toISOString();
  elements.shichenClock.setAttribute("aria-label", `${reading} · ${exact}`);
}

function updateClockFace() {
  const marks = state.theme === "modern" ? MODERN_CLOCK_MARKS : EARTHLY_BRANCHES;
  [...elements.clockBranches.children].forEach((element, index) => {
    element.textContent = marks[index];
  });
}

function populateLanguageSelect() {
  elements.languageSelect.replaceChildren();
  for (const localeKey of LOCALE_ORDER) {
    const option = document.createElement("option");
    option.value = localeKey;
    option.lang = LOCALES[localeKey].lang;
    option.textContent = LOCALES[localeKey].label;
    elements.languageSelect.append(option);
  }
}

function populateThemeSelect() {
  elements.themeSelect.replaceChildren();
  for (const [themeKey, theme] of Object.entries(THEMES)) {
    const option = document.createElement("option");
    option.value = themeKey;
    option.textContent = t(theme.labelKey);
    elements.themeSelect.append(option);
  }
  elements.themeSelect.value = state.theme;
}

function applyLanguage() {
  const locale = localeData();
  document.documentElement.lang = locale.lang;
  document.documentElement.dir = locale.dir;
  document.title = locale.strings.appName;
  elements.languageSelect.value = state.locale;
  elements.languageSelect.setAttribute("aria-label", locale.strings.language);
  elements.themeSelect.setAttribute("aria-label", t("theme"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });

  elements.dayTitle.setAttribute("aria-label", t("titleLabel"));
  elements.dayVoiceover.setAttribute("aria-label", t("voiceoverPlaceholder"));
  populateThemeSelect();
  updateClockFace();
  renderDate();
  renderDay();
  updateClock();
  setSaving(false);
}

function setSaving(saving, statusKey = "saved") {
  elements.saveStatus.classList.toggle("is-saving", saving);
  elements.saveStatusCopy.textContent = t(saving ? "saving" : statusKey);
}

function showError(error) {
  elements.errorBar.hidden = false;
  const canShowOriginal = state.locale === "zh-CN" || state.locale === "zh-TW";
  elements.errorBar.textContent = canShowOriginal && error instanceof Error ? error.message : t("genericError");
}

function clearError() {
  elements.errorBar.hidden = true;
  elements.errorBar.textContent = "";
}

function renderDate() {
  const date = fromDateKey(state.selectedDate);
  const dayIndex = date.getDay();
  const art = themeData().art[dayIndex];
  const locale = localeData();
  const lines = themeLines(locale);
  const credits = themeCredits(locale);
  document.body.dataset.weekday = String(dayIndex);
  elements.panel.classList.add("is-changing");
  window.setTimeout(() => {
    elements.dayImage.src = art.image;
    elements.dayImage.alt = `${credits[dayIndex]} · ${locale.weekdays[dayIndex]}`;
    elements.panel.classList.remove("is-changing");
  }, 120);

  elements.sceneIndex.textContent = sceneLabel(dayIndex);
  elements.heroWeekday.textContent = locale.weekdays[dayIndex];
  elements.heroLine.textContent = lines[dayIndex];
  if (state.locale === "zh-CN" || state.locale === "zh-TW") {
    elements.heroMonth.textContent = MONTH_NAMES[date.getMonth()];
    elements.heroYear.textContent = chineseYear(date.getFullYear());
  } else {
    elements.heroMonth.textContent = formatDate(date, { month: "long" });
    elements.heroYear.textContent = formatDate(date, { year: "numeric" });
  }
  elements.heroDay.textContent = formatDayNumber(date);
  elements.imageCredit.textContent = credits[dayIndex];
  elements.fullDate.textContent = formatFullDate(date);
  renderWeek();
}

function renderWeek() {
  const locale = localeData();
  elements.weekStrip.replaceChildren();
  for (const key of weekDates(state.selectedDate)) {
    const date = fromDateKey(key);
    const dayIndex = date.getDay();
    const art = themeData().art[dayIndex];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "week-day";
    if (key === state.selectedDate) button.classList.add("is-active");
    if (key === state.today) button.classList.add("is-today");
    button.style.setProperty("--thumb", `url("${art.image}")`);
    button.setAttribute("aria-label", `${locale.weekdays[dayIndex]} · ${formatDate(date, { month: "short", day: "numeric" })}`);
    if (key === state.selectedDate) button.setAttribute("aria-current", "date");

    const weekday = document.createElement("span");
    weekday.textContent = locale.weekdays[dayIndex];
    const day = document.createElement("strong");
    day.textContent = formatDayNumber(date);
    const todayDot = document.createElement("i");
    button.append(weekday, day, todayDot);
    button.addEventListener("click", () => selectDate(key));
    elements.weekStrip.append(button);
  }
}

function renderDay() {
  elements.dayTitle.value = state.day.title;
  elements.dayVoiceover.value = state.day.voiceover;
  renderTasks();
}

function renderTasks() {
  elements.taskList.replaceChildren();
  const tasks = state.day.tasks;
  const completed = tasks.filter((task) => task.completed).length;
  const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  elements.takeProgress.textContent = `${completed} / ${tasks.length}`;
  elements.progressPercent.textContent = `${percent}%`;
  elements.progressRing.style.setProperty("--progress", `${percent * 3.6}deg`);

  if (!tasks.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    const symbol = document.createElement("div");
    symbol.className = "empty-symbol";
    symbol.textContent = "01";
    const title = document.createElement("strong");
    title.textContent = t("emptyTitle");
    const hint = document.createElement("span");
    hint.textContent = t("emptyHint");
    empty.append(symbol, title, hint);
    elements.taskList.append(empty);
    return;
  }

  tasks.forEach((task, index) => elements.taskList.append(createTaskRow(task, index)));
}

function createTaskRow(task, index) {
  const row = document.createElement("article");
  row.className = `task-row${task.completed ? " is-complete" : ""}`;

  const check = document.createElement("button");
  check.type = "button";
  check.className = "task-check";
  check.textContent = task.completed ? "✓" : "";
  check.setAttribute("aria-label", `${task.completed ? t("reopen") : t("complete")}: ${task.title}`);
  check.addEventListener("click", async () => {
    await updateTask(task.id, { completed: !task.completed });
  });

  const number = document.createElement("span");
  number.className = "task-number";
  number.textContent = String(index + 1).padStart(2, "0");

  const fields = document.createElement("div");
  fields.className = "task-fields";
  const title = document.createElement("input");
  title.className = "task-title";
  title.value = task.title;
  title.maxLength = 120;
  title.setAttribute("aria-label", `${t("taskItem")} ${index + 1}`);
  title.addEventListener("blur", () => {
    const value = title.value.trim();
    if (value && value !== task.title) updateTask(task.id, { title: value });
    else if (!value) title.value = task.title;
  });
  title.addEventListener("keydown", (event) => {
    if (event.key === "Enter") title.blur();
  });
  const note = document.createElement("input");
  note.className = "task-note";
  note.value = task.note;
  note.maxLength = 400;
  note.placeholder = t("voiceoverPlaceholder");
  note.setAttribute("aria-label", `${task.title}${t("taskNote")}`);
  note.addEventListener("blur", () => {
    if (note.value.trim() !== task.note) updateTask(task.id, { note: note.value });
  });
  fields.append(title, note);

  const time = document.createElement("input");
  time.className = "task-time";
  time.type = "time";
  time.value = task.time;
  time.setAttribute("aria-label", `${t("time")}: ${task.title}`);
  time.addEventListener("change", () => updateTask(task.id, { time: time.value }));

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "task-delete";
  remove.textContent = "×";
  remove.setAttribute("aria-label", `${t("remove")}: ${task.title}`);
  remove.addEventListener("click", () => deleteTask(task.id));

  row.append(check, number, fields, time, remove);
  return row;
}

async function selectDate(key) {
  if (key === state.selectedDate && state.day) return;
  state.selectedDate = key;
  renderDate();
  await loadDay();
}

async function loadDay() {
  clearError();
  state.loading = true;
  setSaving(true);
  try {
    state.day = await window.pianke.getDay(state.selectedDate);
    renderDay();
    setSaving(false);
  } catch (error) {
    showError(error);
    setSaving(false, "unsaved");
  } finally {
    state.loading = false;
  }
}

async function saveMeta() {
  if (state.loading) return;
  clearError();
  setSaving(true);
  try {
    state.day = await window.pianke.saveMeta(state.selectedDate, {
      title: elements.dayTitle.value,
      voiceover: elements.dayVoiceover.value,
    });
    setSaving(false);
  } catch (error) {
    showError(error);
    setSaving(false, "unsaved");
  }
}

async function updateTask(id, patch) {
  clearError();
  setSaving(true);
  try {
    const updated = await window.pianke.updateTask(state.selectedDate, id, patch);
    state.day.tasks = state.day.tasks.map((task) => task.id === id ? updated : task);
    renderTasks();
    setSaving(false);
  } catch (error) {
    showError(error);
    setSaving(false, "unsaved");
  }
}

async function deleteTask(id) {
  clearError();
  setSaving(true);
  try {
    state.day = await window.pianke.deleteTask(state.selectedDate, id);
    renderTasks();
    setSaving(false);
  } catch (error) {
    showError(error);
    setSaving(false, "unsaved");
  }
}

elements.addForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = elements.newTitle.value.trim();
  if (!title) return elements.newTitle.focus();
  clearError();
  setSaving(true);
  try {
    const task = await window.pianke.createTask(state.selectedDate, { title, time: elements.newTime.value });
    state.day.tasks.push(task);
    elements.newTitle.value = "";
    elements.newTime.value = "";
    renderTasks();
    elements.newTitle.focus();
    setSaving(false);
  } catch (error) {
    showError(error);
    setSaving(false, "unsaved");
  }
});

elements.languageSelect.addEventListener("change", () => {
  if (!LOCALES[elements.languageSelect.value]) return;
  state.locale = elements.languageSelect.value;
  window.localStorage.setItem("pianke-language", state.locale);
  applyLanguage();
});
elements.themeSelect.addEventListener("change", () => {
  if (!THEMES[elements.themeSelect.value]) return;
  state.theme = elements.themeSelect.value;
  window.localStorage.setItem("pianke-theme", state.theme);
  document.body.dataset.theme = state.theme;
  updateClockFace();
  renderDate();
  updateClock();
});
elements.dayTitle.addEventListener("blur", saveMeta);
elements.dayVoiceover.addEventListener("blur", saveMeta);
elements.previousDay.addEventListener("click", () => selectDate(addDays(state.selectedDate, -1)));
elements.nextDay.addEventListener("click", () => selectDate(addDays(state.selectedDate, 1)));
elements.todayButton.addEventListener("click", () => selectDate(state.today));
elements.showData.addEventListener("click", () => window.pianke.showData());
elements.backupData.addEventListener("click", async () => {
  const result = await window.pianke.backup({ appName: t("appName"), backup: t("backup") });
  if (!result.canceled) setSaving(false, "backupDone");
});

document.addEventListener("keydown", (event) => {
  if (event.altKey && event.key === "ArrowLeft") selectDate(addDays(state.selectedDate, -1));
  if (event.altKey && event.key === "ArrowRight") selectDate(addDays(state.selectedDate, 1));
  if (event.ctrlKey && event.key.toLowerCase() === "n") {
    event.preventDefault();
    elements.newTitle.focus();
  }
});

for (const theme of Object.values(THEMES)) {
  for (const art of Object.values(theme.art)) {
    const image = new Image();
    image.src = art.image;
  }
}

document.body.dataset.theme = state.theme;
populateLanguageSelect();
applyLanguage();
loadDay();
window.setInterval(updateClock, 1000);
