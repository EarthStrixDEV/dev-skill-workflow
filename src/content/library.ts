import type { Bi } from "./types";
import {
  overviewSteps,
  setupStep,
  useCases,
  type ToolKind,
  type UseCaseId,
} from "./workflow";

/*
 * The skill library lists installable skills and commands only. Install routes were
 * checked against the Claude Code plugin docs and each project's README; nothing here
 * is a guessed command. Files are never redistributed: the page only shows how to install.
 */

export type ProviderId = "claude-mem" | "engineering" | "feature-dev" | "mattpocock" | "builtin";

export type Provider = {
  id: ProviderId;
  name: string;
  tagline: Bi;
  /** Typed into Claude Code one line at a time, in order. Empty for built-ins. */
  commands: string[];
  note?: Bi;
  source: { label: string; href: string };
};

export const providers: Provider[] = [
  {
    id: "claude-mem",
    name: "claude-mem",
    tagline: {
      th: "skill สำหรับวางแผน ลงมือทำ ปล่อยงาน และส่งต่องาน",
      en: "Skills for planning, executing, releasing and handing off work.",
    },
    commands: ["/plugin marketplace add thedotmack/claude-mem", "/plugin install claude-mem"],
    note: {
      th: "ต้องเพิ่ม marketplace ของ claude-mem ก่อน (บรรทัดแรก)",
      en: "Add the claude-mem marketplace first (the first line).",
    },
    source: { label: "github.com/thedotmack/claude-mem", href: "https://github.com/thedotmack/claude-mem" },
  },
  {
    id: "engineering",
    name: "engineering",
    tagline: {
      th: "skill วิศวกรรมซอฟต์แวร์: ออกแบบ ทดสอบ ดีบัก เอกสาร",
      en: "Software-engineering skills: design, test, debug, document.",
    },
    commands: [
      "/plugin marketplace add anthropics/knowledge-work-plugins",
      "/plugin install engineering@knowledge-work-plugins",
    ],
    note: {
      th: "ไม่ได้อยู่ใน marketplace หลัก ต้องเพิ่ม knowledge-work-plugins ก่อน",
      en: "Not in the default marketplace; add knowledge-work-plugins first.",
    },
    source: {
      label: "github.com/anthropics/knowledge-work-plugins",
      href: "https://github.com/anthropics/knowledge-work-plugins",
    },
  },
  {
    id: "feature-dev",
    name: "feature-dev",
    tagline: {
      th: "คำสั่งพัฒนาฟีเจอร์แบบมีไกด์",
      en: "A guided feature-development command.",
    },
    commands: ["/plugin install feature-dev@claude-plugins-official"],
    note: {
      th: "marketplace claude-plugins-official มีมาให้แล้ว ติดตั้งได้เลย",
      en: "The claude-plugins-official marketplace is built in, so install directly.",
    },
    source: {
      label: "github.com/anthropics/claude-plugins-official",
      href: "https://github.com/anthropics/claude-plugins-official",
    },
  },
  {
    id: "mattpocock",
    name: "mattpocock-skills",
    tagline: {
      th: "skill เวิร์กโฟลว์วิศวกรรมจาก Matt Pocock",
      en: "Engineering-workflow skills by Matt Pocock.",
    },
    commands: ["/plugin install mattpocock-skills@claude-plugins-official"],
    note: {
      th: "marketplace claude-plugins-official มีมาให้แล้ว ติดตั้งได้เลย",
      en: "The claude-plugins-official marketplace is built in, so install directly.",
    },
    source: { label: "github.com/mattpocock/skills", href: "https://github.com/mattpocock/skills" },
  },
  {
    id: "builtin",
    name: "Claude Code",
    tagline: {
      th: "มากับ Claude Code ไม่ต้องติดตั้ง",
      en: "Ships with Claude Code, nothing to install.",
    },
    commands: [],
    source: { label: "code.claude.com/docs/en/commands", href: "https://code.claude.com/docs/en/commands" },
  },
];

export const providerById = Object.fromEntries(providers.map((p) => [p.id, p])) as Record<
  ProviderId,
  Provider
>;

export type LibraryItem = {
  /** Same string as the tool name used in workflow.ts. */
  name: string;
  kind: Exclude<ToolKind, "agent">;
  provider: ProviderId;
  summary: Bi;
};

export const libraryItems: LibraryItem[] = [
  {
    name: "init",
    kind: "command",
    provider: "builtin",
    summary: {
      th: "สร้างไฟล์ CLAUDE.md ที่อธิบายโปรเจกต์ให้ Claude",
      en: "Creates a CLAUDE.md guide that explains the project to Claude.",
    },
  },
  {
    name: "claude-mem:learn-codebase",
    kind: "skill",
    provider: "claude-mem",
    summary: {
      th: "อ่านซอร์สโค้ดทุกไฟล์แบบเต็ม ๆ เพื่อให้รู้จักโปรเจกต์ที่ไม่คุ้นเคย",
      en: "Reads every source file in full to prime Claude on an unfamiliar codebase.",
    },
  },
  {
    name: "grill-me",
    kind: "skill",
    provider: "mattpocock",
    summary: {
      th: "สัมภาษณ์ไล่ถามแผนหรือดีไซน์ไม่ยั้ง จนไม่เหลือช่องโหว่",
      en: "A relentless interview that sharpens a plan or design.",
    },
  },
  {
    name: "grill-with-docs",
    kind: "skill",
    provider: "mattpocock",
    summary: {
      th: "เหมือน grill-me แต่เขียน ADR และ glossary ไปด้วยระหว่างทาง",
      en: "Like grill-me, and also writes ADRs and a glossary as it goes.",
    },
  },
  {
    name: "claude-mem:make-plan",
    kind: "skill",
    provider: "claude-mem",
    summary: {
      th: "สร้างแผนแบ่งเฟส โดยเริ่มจากค้นหาเอกสารก่อนลงมือ",
      en: "Builds a phased implementation plan, starting with documentation discovery.",
    },
  },
  {
    name: "feature-dev:feature-dev",
    kind: "command",
    provider: "feature-dev",
    summary: {
      th: "พัฒนาฟีเจอร์แบบมีไกด์ เน้นเข้าใจโค้ดเดิมและสถาปัตยกรรม",
      en: "Guided feature development focused on codebase understanding and architecture.",
    },
  },
  {
    name: "engineering:architecture",
    kind: "skill",
    provider: "engineering",
    summary: {
      th: "สร้างหรือประเมิน architecture decision record (ADR) เมื่อต้องเลือกเทคโนโลยี",
      en: "Creates or evaluates an architecture decision record (ADR) when choosing technologies.",
    },
  },
  {
    name: "engineering:system-design",
    kind: "skill",
    provider: "engineering",
    summary: {
      th: "ออกแบบระบบ บริการ และสถาปัตยกรรม",
      en: "Designs systems, services and architectures.",
    },
  },
  {
    name: "claude-mem:do",
    kind: "skill",
    provider: "claude-mem",
    summary: {
      th: "ลงมือทำตามแผนแบ่งเฟส โดยใช้ subagent",
      en: "Executes a phased implementation plan using subagents.",
    },
  },
  {
    name: "engineering:testing-strategy",
    kind: "skill",
    provider: "engineering",
    summary: {
      th: "ออกแบบกลยุทธ์และแผนการทดสอบ",
      en: "Designs test strategies and test plans.",
    },
  },
  {
    name: "run",
    kind: "skill",
    provider: "builtin",
    summary: {
      th: "เปิดและขับแอปของโปรเจกต์ เพื่อดูว่าการเปลี่ยนแปลงทำงานจริง ไม่ใช่แค่เทสต์ผ่าน",
      en: "Launches and drives the project's app to see a change working, not only passing tests.",
    },
  },
  {
    name: "simplify",
    kind: "skill",
    provider: "builtin",
    summary: {
      th: "ตรวจโค้ดที่เปลี่ยนเพื่อหาจุดเก็บกวาด แล้วแก้ให้",
      en: "Reviews the changed code for cleanup opportunities and applies the fixes.",
    },
  },
  {
    name: "code-review",
    kind: "skill",
    provider: "builtin",
    summary: {
      th: "ตรวจ diff, PR, สาขา หรือพาธ เพื่อหาบั๊กด้านความถูกต้อง",
      en: "Reviews the current diff, a PR, branch or path for correctness bugs.",
    },
  },
  {
    name: "claude-mem:version-bump",
    kind: "skill",
    provider: "claude-mem",
    summary: {
      th: "ขึ้นเวอร์ชันแบบ semantic และรันขั้นตอนปล่อยของ Claude Code plugin อัตโนมัติ",
      en: "Automates semantic versioning and the release workflow for Claude Code plugins.",
    },
  },
  {
    name: "claude-mem:release",
    kind: "skill",
    provider: "claude-mem",
    summary: {
      th: "ปล่อยงานอัตโนมัติครบวงจร โดยใช้ version-bump และ childhood",
      en: "Fully automates a release using version-bump and childhood.",
    },
  },
  {
    name: "claude-mem:build-and-release",
    kind: "skill",
    provider: "claude-mem",
    summary: {
      th: "สร้างงานโค้ดและปล่อยแบบอัตโนมัติครบวงจร",
      en: "Fully automates building and releasing a coding task.",
    },
  },
  {
    name: "engineering:deploy-checklist",
    kind: "skill",
    provider: "engineering",
    summary: {
      th: "เช็กลิสต์ตรวจก่อนปล่อย ใช้ก่อนส่งมอบ release",
      en: "A pre-deployment verification checklist for use before shipping a release.",
    },
  },
  {
    name: "engineering:documentation",
    kind: "skill",
    provider: "engineering",
    summary: {
      th: "เขียนและดูแลเอกสารทางเทคนิค",
      en: "Writes and maintains technical documentation.",
    },
  },
  {
    name: "claude-mem:handoff",
    kind: "skill",
    provider: "claude-mem",
    summary: {
      th: "สร้าง HANDOFF.md สรุปเป้าหมาย สถานะ ไฟล์ที่แตะ ความพยายามที่ล้มเหลว และขั้นต่อไป",
      en: "Generates a HANDOFF.md with goal, state, files touched, failed attempts and next steps.",
    },
  },
  {
    name: "engineering:debug",
    kind: "skill",
    provider: "engineering",
    summary: {
      th: "ดีบักอย่างเป็นระบบ: ทำซ้ำ แยกแยะ วินิจฉัย แล้วแก้",
      en: "A structured debugging session: reproduce, isolate, diagnose, fix.",
    },
  },
  {
    name: "engineering:code-review",
    kind: "skill",
    provider: "engineering",
    summary: {
      th: "รีวิวโค้ดด้านความปลอดภัย ประสิทธิภาพ และความถูกต้อง",
      en: "Reviews code changes for security, performance and correctness.",
    },
  },
  {
    name: "engineering:tech-debt",
    kind: "skill",
    provider: "engineering",
    summary: {
      th: "ระบุ จัดหมวด และจัดลำดับหนี้ทางเทคนิค",
      en: "Identifies, categorises and prioritises technical debt.",
    },
  },
  {
    name: "claude-mem:smart-explore",
    kind: "skill",
    provider: "claude-mem",
    summary: {
      th: "ค้นโครงสร้างโค้ดแบบประหยัดโทเค็นด้วย tree-sitter AST",
      en: "Token-optimised structural code search using tree-sitter AST parsing.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Where an item is used in the workflow (derived, never hand-written) */
/* ------------------------------------------------------------------ */

export type Usage = {
  /** 0 = setup, 1-7 = the general overview steps. */
  overview: number[];
  cases: { id: UseCaseId; steps: number[] }[];
};

export function usageOf(name: string): Usage {
  const overview: number[] = [];
  if (setupStep.tools.some((t) => t.name === name)) overview.push(0);
  overviewSteps.forEach((s, i) => {
    if (s.tools.some((t) => t.name === name)) overview.push(i + 1);
  });

  const cases: Usage["cases"] = [];
  for (const uc of useCases) {
    const steps: number[] = [];
    uc.steps.forEach((s, i) => {
      if (s.tools.some((t) => t.name === name)) steps.push(i + 1);
    });
    if (steps.length) cases.push({ id: uc.id, steps });
  }
  return { overview, cases };
}
