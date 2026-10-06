# Easter Egg

[← Documentation index](index.md)

## Konami Code Terminal

The site includes a hidden interactive terminal triggered by the **Konami code**.

### How to Activate

Press these keys in sequence anywhere on the page while the terminal is closed:

```text
↑ ↑ ↓ ↓ ← → ← → B A
```

The key listener lowercases single-character keys, so `B`/`b` and `A`/`a` both match (Shift and Caps Lock are fine).

### Terminal Features

- Native modal `<dialog>` opened with `showModal()`: the browser contains focus inside the dialog, makes the page behind it inert, and restores focus when it closes
- Command history with arrow up/down
- Ctrl+L or `clear` clears the terminal
- Escape, `exit`, `quit`, or the close button closes the terminal
- Clicking the backdrop closes the terminal
- Clicking inside the terminal body refocuses the input unless text is selected
- Jumps to the newest terminal output (no smooth-scroll animation)

### Available Commands

| Command | Description |
|---|---|
| `help` | Lists supported commands |
| `about` | Short Jonathan Peris profile summary |
| `stack` | All six `SKILL_GROUPS` (backend runtime, architecture, delivery, data, languages, interface) |
| `contact` | GitHub, LinkedIn, and email |
| `neofetch` | ASCII "JP" logo with "Astro 7 / static HTML" runtime, years of experience, and country |
| `git log` | Five most recent career roles as commit-style rows, plus a derived count of earlier roles |
| `ls` | Lists faux terminal files/directories |
| `cat availability.txt` | Prints current availability text from `AVAILABILITY.full` |
| `whoami` | Current user/profile summary |
| `pwd` | Faux current directory |
| `date` | Current browser date/time |
| `sudo hire me` | Fake recruiter-auth flow |
| `echo <text>` | Echoes text back |
| `clear` | Clears terminal output |
| `exit` / `quit` | Closes the terminal |

### Hint

The footer contains a subtle hint:

```text
Built as a small systems manual. Hidden shell: ↑↑↓↓←→←→BA
```

### Implementation

- Markup and client script live in [`src/components/Terminal.astro`](../src/components/Terminal.astro). The Konami listener tracks the last 10 keys while the dialog is closed and compares them with the target sequence.
- Static command output is built at **build time** by `buildCommandTable()` in [`src/lib/terminal-commands.ts`](../src/lib/terminal-commands.ts), derived from `PROFILE`, `SKILLS`/`SKILL_GROUPS`, `EXPERIENCES`, `AVAILABILITY`, and `YEARS_OF_EXPERIENCE` in `data.ts`. The table is embedded in the page as `<script type="application/json" id="terminal-commands">` (with `<` escaped).
- At runtime, `runCommand()` in [`src/lib/terminal.ts`](../src/lib/terminal.ts) lowercases and trims input, looks it up with `Object.hasOwn` (so `constructor`, `__proto__`, and similar names are reported as unknown commands), and handles the dynamic commands `date`, `echo`, `clear`, and `exit`/`quit`.
- Output lines are rendered with `textContent`, so command input and data are never parsed as HTML.

The terminal is an in-page command simulation; it does not execute operating-system commands. Opening it has no custom analytics event. Browser keyboard and screen-reader validation remains separate from these source-level behaviors.
