const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const EMPTY_DATA = () => ({ version: 1, days: {} });

function cleanText(value, limit) {
  return String(value ?? "").trim().slice(0, limit);
}

function cleanTime(value) {
  const time = String(value ?? "");
  return /^(|[01]\d|2[0-3]):[0-5]\d$/.test(time) ? time : "";
}

function validDateKey(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value));
}

function normalizeDay(day = {}) {
  return {
    title: cleanText(day.title, 80),
    voiceover: cleanText(day.voiceover, 240),
    tasks: Array.isArray(day.tasks)
      ? day.tasks.map((task, index) => ({
          id: cleanText(task.id, 80) || crypto.randomUUID(),
          title: cleanText(task.title, 120) || "未命名事项",
          note: cleanText(task.note, 400),
          time: cleanTime(task.time),
          completed: Boolean(task.completed),
          position: Number.isFinite(task.position) ? task.position : index,
        })).sort((a, b) => a.position - b.position)
      : [],
  };
}

function createStore(filePath) {
  function readAll() {
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || typeof parsed.days !== "object") return EMPTY_DATA();
      return parsed;
    } catch (error) {
      if (error.code !== "ENOENT") console.error("Unable to read planner data", error);
      return EMPTY_DATA();
    }
  }

  function writeAll(data) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const temporaryPath = `${filePath}.tmp`;
    fs.writeFileSync(temporaryPath, JSON.stringify(data, null, 2), "utf8");
    fs.renameSync(temporaryPath, filePath);
  }

  function getDay(dateKey) {
    if (!validDateKey(dateKey)) throw new Error("日期格式不正确");
    const data = readAll();
    return normalizeDay(data.days[dateKey]);
  }

  function updateDay(dateKey, updater) {
    if (!validDateKey(dateKey)) throw new Error("日期格式不正确");
    const data = readAll();
    const current = normalizeDay(data.days[dateKey]);
    const next = normalizeDay(updater(current));
    data.days[dateKey] = next;
    writeAll(data);
    return next;
  }

  return {
    filePath,
    getDay,
    saveDayMeta(dateKey, values) {
      return updateDay(dateKey, (day) => ({
        ...day,
        title: cleanText(values?.title, 80),
        voiceover: cleanText(values?.voiceover, 240),
      }));
    },
    createTask(dateKey, values) {
      let created;
      updateDay(dateKey, (day) => {
        created = {
          id: crypto.randomUUID(),
          title: cleanText(values?.title, 120),
          note: cleanText(values?.note, 400),
          time: cleanTime(values?.time),
          completed: false,
          position: day.tasks.length,
        };
        if (!created.title) throw new Error("请先写下要做的事");
        return { ...day, tasks: [...day.tasks, created] };
      });
      return created;
    },
    updateTask(dateKey, id, patch) {
      let updated = null;
      updateDay(dateKey, (day) => ({
        ...day,
        tasks: day.tasks.map((task) => {
          if (task.id !== id) return task;
          updated = {
            ...task,
            ...(typeof patch.title === "string" ? { title: cleanText(patch.title, 120) || task.title } : {}),
            ...(typeof patch.note === "string" ? { note: cleanText(patch.note, 400) } : {}),
            ...(typeof patch.time === "string" ? { time: cleanTime(patch.time) } : {}),
            ...(typeof patch.completed === "boolean" ? { completed: patch.completed } : {}),
          };
          return updated;
        }),
      }));
      if (!updated) throw new Error("事项不存在");
      return updated;
    },
    deleteTask(dateKey, id) {
      return updateDay(dateKey, (day) => ({
        ...day,
        tasks: day.tasks.filter((task) => task.id !== id).map((task, index) => ({ ...task, position: index })),
      }));
    },
    exportTo(targetPath) {
      fs.copyFileSync(filePath, targetPath);
    },
  };
}

module.exports = { createStore, normalizeDay };
