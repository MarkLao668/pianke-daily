const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { createStore } = require("../data-store");

test("stores, edits and removes a day task locally", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pianke-test-"));
  const store = createStore(path.join(directory, "planner-data.json"));
  const date = "2026-07-14";

  const created = store.createTask(date, { title: "走过竹林", time: "09:30" });
  assert.equal(created.title, "走过竹林");
  assert.equal(store.getDay(date).tasks.length, 1);

  const updated = store.updateTask(date, created.id, { completed: true, note: "听一场雨" });
  assert.equal(updated.completed, true);
  assert.equal(updated.note, "听一场雨");

  const withMeta = store.saveDayMeta(date, { title: "竹林听雨", voiceover: "静里见动。" });
  assert.equal(withMeta.title, "竹林听雨");
  assert.equal(withMeta.voiceover, "静里见动。");

  store.deleteTask(date, created.id);
  assert.equal(store.getDay(date).tasks.length, 0);
  fs.rmSync(directory, { recursive: true, force: true });
});
