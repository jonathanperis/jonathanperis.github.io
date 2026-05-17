# Easter Egg

## Konami Code Terminal

The site includes a hidden interactive terminal triggered by the **Konami code**.

### How to Activate

Press these keys in sequence anywhere on the page while the terminal is closed:

```text
↑ ↑ ↓ ↓ ← → ← → B A
```

### Terminal Features

- In-page modal terminal with focus restoration when closed
- Command history with arrow up/down
- Tab focuses the close button
- Ctrl+L or `clear` clears the terminal
- Escape, `exit`, `quit`, or the close button closes the terminal
- Auto-scrolls to the newest terminal output

### Available Commands

| Command | Description |
|---|---|
| `help` | Lists supported commands |
| `about` | Short Jonathan Peris profile summary |
| `stack` | Backend, architecture, delivery, and data stack overview |
| `contact` | GitHub, LinkedIn, and email |
| `neofetch` | ASCII "JP" logo with Astro/React/TypeScript runtime info |
| `git log` | Most recent career roles rendered as commit-style rows |
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
// ↑↑↓↓←→←→BA
```

### Implementation

- Konami listener lives in `src/components/Portfolio.tsx` inside a `useEffect` hook.
- The listener tracks the last 10 keystrokes and compares them with the target sequence.
- Terminal state is managed with React state (`termOpen`, `termInput`, `termHist`, `cmdHist`, `histIdx`).
- `runCmd()` maps commands to responses and uses `EXPERIENCES`, `AVAILABILITY`, and hardcoded terminal strings.
