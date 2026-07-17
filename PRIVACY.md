# Privacy Notice

Pianke Daily is a fully offline planner. It does not require an account and does not send planner data over the internet.

## Data storage

- Daily titles, reflections, tasks, times, notes, and completion states are stored in Electron's system application-data directory.
- Planner data is never written to the source-code directory.
- The application contains no telemetry, advertising, analytics, or cloud-sync features.
- A JSON file is exported only when the user selects **Backup** and chooses a save location.

## Content excluded from the public repository

This repository does not include:

- `planner-data.json` or other schedule JSON files;
- backups exported by users;
- Windows EXE files or local build directories;
- local caches, test user-data directories, logs, or environment files.

The repository's `.gitignore` excludes all JSON files by default, except for the `package.json` and `package-lock.json` files required to build the project. Contributors should still inspect staged files before every commit to make sure no personal content is included.

## Removing local data

Deleting the portable EXE does not automatically remove saved planner data. To find the data folder, open Pianke Daily and select **Data location**. Back up any information you want to keep before deleting that folder manually.
