# Easter Egg

## Konami Code Terminal

The site includes a hidden interactive terminal triggered by the **Konami code**.

### How to Activate

Press these keys in sequence anywhere on the page:

```
↑ ↑ ↓ ↓ ← → ← → B A
```

### Terminal Features

- macOS-style window with traffic light buttons
- Command history (arrow up/down)
- Ctrl+L to clear
- Escape or red button to close
- Click outside to dismiss

### Available Commands

| Command | Description |
|---|---|
| `help` | List all commands |
| `about` | Bio and Seu Madruga quote |
| `skills` | Tech stack overview |
| `contact` | Social links and email |
| `neofetch` | ASCII art "JP" logo with system info |
| `git log` | Career history as commits |
| `ls` | List sections |
| `cat about.txt` | Read about section |
| `whoami` | Current user info |
| `pwd` | Current directory |
| `date` | Current date/time |
| `sudo hire me` | Fake auth flow |
| `rm -rf /` | Plot armor response |
| `cat .easter-egg` | Hidden file |
| `echo <text>` | Echo text back |
| `clear` | Clear terminal |
| `exit` | Close terminal |

### Hint

The footer contains a subtle hint:

```
// ↑↑↓↓←→←→BA
```

### Implementation

- Konami code listener in a `useEffect` hook
- Tracks last 10 keystrokes and matches against the sequence
- Terminal state managed with `useState` (history, input, command history)
- `handleTerminalCommand()` function maps commands to responses
