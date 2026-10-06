import { AVAILABILITY, EXPERIENCES, PROFILE, SKILLS, SKILL_GROUPS, YEARS_OF_EXPERIENCE } from "./data";
import type { CommandTable } from "./terminal";

const GIT_LOG_LIMIT = 5;

const NEOFETCH = [
  "",
  "   ██╗██████╗     jonathan@workstation",
  "   ██║██╔══██╗    runtime:   Astro 7 / static HTML",
  "   ██║██████╔╝    shell:     TypeScript 6.x",
  `██ ██║██╔═══╝     uptime:    ${YEARS_OF_EXPERIENCE} years in production code`,
  `╚███╔╝██║         region:    ${PROFILE.address.country}, remote-first`,
  " ╚══╝ ╚═╝         focus:     backend systems, delivery, reliability",
  "",
];

/** Static command output, rendered at build time so the client never ships profile data. */
export function buildCommandTable(): CommandTable {
  const earlierRoles = EXPERIENCES.length - GIT_LOG_LIMIT;
  const labelWidth = Math.max(...SKILL_GROUPS.map((group) => group.label.length)) + 2;

  return {
    help: ["", "  help · about · stack · contact · neofetch", "  ls · cat availability.txt · git log · whoami · pwd · date", "  echo <text> · sudo hire me · clear · exit", ""],
    whoami: ["jonathan.peris", PROFILE.title.toLowerCase(), "backend architecture and reliable delivery"],
    neofetch: NEOFETCH,
    pwd: ["/home/jonathan/portfolio"],
    ls: ["availability.txt  architecture/  experience.log  projects/  resume.pdf"],
    "cat availability.txt": [AVAILABILITY.full],
    about: ["", `  ${PROFILE.name}`, `  ${PROFILE.title}, ${YEARS_OF_EXPERIENCE} years`, "  C#, .NET, Azure, CQRS, DDD", `  Remote from ${PROFILE.address.country}`, ""],
    stack: ["", ...SKILL_GROUPS.map(({ key, label }) => `  ${label.padEnd(labelWidth)}${SKILLS[key].join(", ")}`), ""],
    contact: ["", `  GitHub     ${PROFILE.github}`, `  LinkedIn   ${PROFILE.linkedin}`, `  Email      ${PROFILE.email}`, ""],
    "git log": [
      "",
      ...EXPERIENCES.slice(0, GIT_LOG_LIMIT).map((e, i) => `  ${String(i).padStart(2, "0")} ${e.period.split(" — ")[0].padEnd(9)} ${e.title} @ ${e.company}`),
      ...(earlierRoles > 0 ? [`  ... +${earlierRoles} earlier commits`] : []),
      "",
    ],
    "sudo hire me": ["", "  [sudo] password for recruiter: ********", "  access granted", `  route opened: ${PROFILE.linkedin}`, ""],
  };
}
