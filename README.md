# Pianke Daily

Pianke Daily is a private, fully offline planner for Windows with a cinematic visual identity. Each day of the week has its own scene, turning everyday planning into a quiet sequence of seven distinct frames.

[Download the latest Windows release](https://github.com/MarkLao668/pianke-daily/releases/latest)

## Preview

### Classical theme

Landscapes, solitary pines, long stairways, and wandering figures shape the seven daily scenes. The interface pairs them with Chinese-inspired serif typography, warm paper tones, and a traditional twelve-period clock.

![Pianke Daily classical theme](docs/screenshot-classical.png)

### Modern theme

Modern architecture, glass, open spaces, and distant figures form a second set of seven scenes. The interface changes with them, using cool mineral colors, geometric typography, and an architectural clock.

![Pianke Daily modern theme](docs/screenshot-modern.png)

> All titles and tasks shown in the screenshots are fictional demo content. They do not contain any real schedule or personal information.

## Features

- Runs entirely on your computer, with no account, cloud service, or network connection required.
- Includes Classical and Modern visual themes; your selected theme is saved locally.
- Provides seven original daily artworks for each theme.
- Changes the artwork, typography, colors, and clock together when switching themes.
- Supports daily titles, reflections, task times, notes, completion states, and progress tracking.
- Displays real-time clocks in both themes; the Classical theme also includes a traditional Chinese time-period reading.
- Supports 12 interface languages: Simplified Chinese, Traditional Chinese, English, Japanese, Korean, Spanish, French, German, Portuguese, Russian, Arabic, and Hindi.
- Exports all planner data as a JSON backup.
- Keeps schedule data outside the source-code directory and never uploads it.

## Download for Windows

Pianke Daily currently supports 64-bit Windows 10 and Windows 11. You do not need Node.js or the source code to use the application.

1. Open the [latest release](https://github.com/MarkLao668/pianke-daily/releases/latest).
2. Under **Assets**, download `pianke-daily-*-windows-x64.exe`.
3. Place the EXE in any folder and double-click it to launch Pianke Daily. It is a portable application and does not require installation.

The application is not currently code-signed, so Windows may display a security warning the first time it is opened. Confirm that the file came from this repository's official Releases page before running it.

## How to use

### 1. Choose a day

The seven thumbnails across the top represent the seven days of the selected week. Select any thumbnail to view and edit that day's plan. Use the arrows beside the date to move one day backward or forward, or select **Today** to return to the current date.

### 2. Set the tone for the day

Use the daily title field to name the day. The text area beneath it can hold a reminder, reflection, or main intention. Your changes are saved automatically on your computer after you leave the field.

### 3. Add and complete tasks

Choose a time, enter a task, and select **Add**. After a task has been created, you can:

- Select the circle on the left to mark it complete or incomplete.
- Edit its title, note, or time directly.
- Use the delete button on the right to remove it.
- Check the progress ring to see how much of the day's plan is complete.

### 4. Change the theme and language

Use the **Theme** menu in the upper-right corner to switch between the Classical and Modern themes. The seven daily images, typography, interface colors, and clock will change together. Your choice is saved locally.

Use the **Language** menu to select any of the 12 supported languages. Dates, buttons, messages, and theme labels update immediately.

### 5. Find or back up your data

Two data controls are available in the lower-right corner:

- **Data location** opens the folder containing your local planner data.
- **Backup** exports your complete schedule as a JSON file to a location you choose.

Your schedule stays on your own computer. Pianke Daily does not upload it to this repository or to any server.

## Keyboard shortcuts

- `Ctrl + N`: Move directly to the new-task field.
- `Alt + Left Arrow / Right Arrow`: Move to the previous or next day.

## Run from source

Install Node.js and npm, then run the following commands in the project directory:

```powershell
npm install
npm start
```

Run the automated tests:

```powershell
npm test
```

Build the 64-bit Windows portable application:

```powershell
npm run dist
```

Build output is written to the local `release` directory. This directory is excluded from the repository.

## Data and privacy

Pianke Daily stores `planner-data.json` in Electron's system application-data directory. Select **Data location** inside the application to open the exact folder.

- The application does not make network requests.
- The repository does not contain personal planner data.
- Removing the application does not automatically delete previously saved planner data.
- Regular JSON backups are recommended.

Read the full [Privacy Notice](PRIVACY.md). The repository ignores schedule JSON files, EXE files, build output, local caches, logs, and environment files by default.

## Project structure

```text
app/                  Interface, styling, localization, and interaction logic
assets/days/          Seven Classical-theme artworks
assets/themes/modern/ Seven Modern-theme artworks
build/                Windows application icon
tests/                Local-data and localization tests
main.js               Electron main process
data-store.js         Local planner-data storage
```

## Contributing

Issues, translation improvements, design suggestions, and pull requests are welcome. Before submitting code, run `npm test` and make sure your commit does not include personal schedules, exported backups, EXE files, or build output.

## License

Pianke Daily is released under the [MIT License](LICENSE). Copyright © 2026 Mark LAO.
