export type CommandTable = Record<string, string[]>;

export type TerminalResult =
  | { kind: "output"; lines: string[] }
  | { kind: "clear" }
  | { kind: "exit" };

/** Resolves one terminal command. Lookups use own keys only, so input like "constructor" is just an unknown command. */
export function runCommand(input: string, table: CommandTable, now = new Date()): TerminalResult {
  const trimmed = input.trim();
  const command = trimmed.toLowerCase();

  if (Object.hasOwn(table, command)) return { kind: "output", lines: table[command] };
  if (command === "date") return { kind: "output", lines: [now.toString()] };
  if (command === "echo" || command.startsWith("echo ")) return { kind: "output", lines: [trimmed.slice(5)] };
  if (command === "clear") return { kind: "clear" };
  if (command === "exit" || command === "quit") return { kind: "exit" };
  return { kind: "output", lines: [`  command not found: ${trimmed.split(/\s+/)[0]}`] };
}
