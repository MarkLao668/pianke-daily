const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("pianke", {
  getDay: (dateKey) => ipcRenderer.invoke("planner:get-day", dateKey),
  saveMeta: (dateKey, values) => ipcRenderer.invoke("planner:save-meta", dateKey, values),
  createTask: (dateKey, values) => ipcRenderer.invoke("planner:create-task", dateKey, values),
  updateTask: (dateKey, id, patch) => ipcRenderer.invoke("planner:update-task", dateKey, id, patch),
  deleteTask: (dateKey, id) => ipcRenderer.invoke("planner:delete-task", dateKey, id),
  showData: () => ipcRenderer.invoke("planner:show-data"),
  backup: (labels) => ipcRenderer.invoke("planner:backup", labels),
});
