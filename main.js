const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const { createStore } = require("./data-store");

const APP_ID = "com.marklao.pianke.daily";
let mainWindow;
let store;

app.setName("片刻日程");
app.setAppUserModelId(APP_ID);

if (process.env.PIANKE_CAPTURE_DATA_DIR) {
  app.setPath("userData", path.resolve(process.env.PIANKE_CAPTURE_DATA_DIR));
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1380,
    height: 860,
    minWidth: 1040,
    minHeight: 680,
    show: false,
    backgroundColor: "#171711",
    icon: path.join(__dirname, "build", "icon.png"),
    title: "片刻日程",
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#171711",
      symbolColor: "#eee8dc",
      height: 42,
    },
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  const previewLanguage = process.env.PIANKE_CAPTURE_LANG;
  const previewTheme = process.env.PIANKE_CAPTURE_THEME;
  const previewDate = process.env.PIANKE_CAPTURE_DATE;
  const previewQuery = {};
  if (previewLanguage) previewQuery.lang = previewLanguage;
  if (previewTheme) previewQuery.theme = previewTheme;
  if (previewDate) previewQuery.date = previewDate;
  const loadOptions = Object.keys(previewQuery).length ? { query: previewQuery } : undefined;
  mainWindow.loadFile(path.join(__dirname, "app", "index.html"), loadOptions);
  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));

  if (process.env.PIANKE_CAPTURE_PATH) {
    mainWindow.webContents.once("did-finish-load", () => {
      setTimeout(async () => {
        const image = await mainWindow.webContents.capturePage();
        fs.writeFileSync(process.env.PIANKE_CAPTURE_PATH, image.toPNG());
        app.quit();
      }, 900);
    });
  }
}

function registerHandlers() {
  ipcMain.handle("planner:get-day", (_event, dateKey) => store.getDay(dateKey));
  ipcMain.handle("planner:save-meta", (_event, dateKey, values) => store.saveDayMeta(dateKey, values));
  ipcMain.handle("planner:create-task", (_event, dateKey, values) => store.createTask(dateKey, values));
  ipcMain.handle("planner:update-task", (_event, dateKey, id, patch) => store.updateTask(dateKey, id, patch));
  ipcMain.handle("planner:delete-task", (_event, dateKey, id) => store.deleteTask(dateKey, id));
  ipcMain.handle("planner:show-data", () => shell.showItemInFolder(store.filePath));
  ipcMain.handle("planner:backup", async (_event, labels = {}) => {
    const appName = typeof labels.appName === "string" ? labels.appName : "片刻日程";
    const backupLabel = typeof labels.backup === "string" ? labels.backup : "备份";
    const defaultName = `${appName}-${backupLabel}-${new Date().toISOString().slice(0, 10)}.json`;
    const result = await dialog.showSaveDialog(mainWindow, {
      title: `${backupLabel} · ${appName}`,
      defaultPath: path.join(app.getPath("documents"), defaultName),
      filters: [{ name: backupLabel, extensions: ["json"] }],
    });
    if (result.canceled || !result.filePath) return { canceled: true };
    if (!fs.existsSync(store.filePath)) fs.writeFileSync(store.filePath, JSON.stringify({ version: 1, days: {} }, null, 2));
    fs.copyFileSync(store.filePath, result.filePath);
    return { canceled: false };
  });
}

app.whenReady().then(() => {
  store = createStore(path.join(app.getPath("userData"), "planner-data.json"));
  registerHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => app.quit());
