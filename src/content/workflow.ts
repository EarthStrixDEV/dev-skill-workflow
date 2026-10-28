import type { Bi } from "./types";

export type ToolKind = "skill" | "agent";
export type Tool = { name: string; kind: ToolKind };

const skill = (name: string): Tool => ({ name, kind: "skill" });
const agent = (name: string): Tool => ({ name, kind: "agent" });

export type Step = {
  title: Bi;
  desc: Bi;
  tools: Tool[];
  /** Short result of the step, shown under the description. */
  outcome: Bi;
};

/* ------------------------------------------------------------------ */
/* Overview: setup (once per repo) + the 7 general steps               */
/* ------------------------------------------------------------------ */

export const setupStep: Step = {
  title: { th: "เตรียม repo", en: "Prepare the repo" },
  desc: {
    th: "ทำครั้งเดียวต่อ repo ให้ Claude รู้จักโปรเจกต์ก่อนเริ่มงานจริง",
    en: "Once per repo, so Claude knows the project before real work starts.",
  },
  tools: [skill("init"), skill("claude-mem:learn-codebase")],
  outcome: {
    th: "ได้ CLAUDE.md และความเข้าใจโครงสร้างโค้ด",
    en: "A CLAUDE.md and an understanding of the code structure.",
  },
};

export const overviewSteps: Step[] = [
  {
    title: { th: "ซักให้ชัด", en: "Clarify" },
    desc: {
      th: "ไล่ถามแผนหรือไอเดียจนไม่เหลือช่องโหว่ ถ้ามีศัพท์โดเมนใหม่ให้เขียน glossary/ADR ไปด้วย",
      en: "Interview the plan until no gaps remain; write a glossary/ADR as you go if the domain has new terms.",
    },
    tools: [skill("grill-me"), skill("grill-with-docs")],
    outcome: {
      th: "requirement ที่ชัดและไม่มีข้อสมมติเงียบ ๆ",
      en: "Clear requirements with no silent assumptions.",
    },
  },
  {
    title: { th: "วางแผน / ออกแบบ", en: "Plan & design" },
    desc: {
      th: "แตกงานเป็นเฟส ระบุไฟล์ที่จะแตะ งานใหญ่ให้ออกแบบสถาปัตยกรรมก่อน",
      en: "Split the work into phases and name the files to touch; design the architecture first for big work.",
    },
    tools: [
      skill("claude-mem:make-plan"),
      skill("feature-dev:feature-dev"),
      skill("engineering:architecture"),
      skill("engineering:system-design"),
    ],
    outcome: {
      th: "แผนแบ่งเฟสที่ลงมือตามได้ทันที",
      en: "A phased plan ready to execute.",
    },
  },
  {
    title: { th: "ลงมือเขียน", en: "Build" },
    desc: {
      th: "เขียนโค้ดตามแผนทีละเฟส พร้อมเทสต์ที่ออกแบบตามความเสี่ยง",
      en: "Implement the plan phase by phase, with risk-based tests.",
    },
    tools: [
      skill("claude-mem:do"),
      agent("backend-engineer"),
      agent("frontend-engineer"),
      skill("engineering:testing-strategy"),
      agent("qa-engineer"),
    ],
    outcome: {
      th: "โค้ดและเทสต์ทีละเฟส",
      en: "Code and tests, one phase at a time.",
    },
  },
  {
    title: { th: "ลองรันจริง", en: "Run it for real" },
    desc: {
      th: "เปิดแอปจริงดูว่าทำงาน ไม่ใช่แค่เทสต์ผ่าน",
      en: "Launch the real app and see it work, not just passing tests.",
    },
    tools: [skill("run")],
    outcome: {
      th: "เห็นฟีเจอร์ทำงานในแอปจริง",
      en: "The change seen working in the real app.",
    },
  },
  {
    title: { th: "รีวิว", en: "Review" },
    desc: {
      th: "เก็บกวาดความซ้ำซ้อนก่อน แล้วค่อยหาบั๊ก งานที่แตะ auth หรือข้อมูลสำคัญให้ตรวจความปลอดภัยเพิ่ม",
      en: "Tidy first, then hunt bugs; add a security pass for anything touching auth or sensitive data.",
    },
    tools: [skill("simplify"), skill("code-review"), agent("security-engineer")],
    outcome: {
      th: "diff ที่สะอาดและผ่านการรีวิว",
      en: "A clean, reviewed diff.",
    },
  },
  {
    title: { th: "ปล่อยงาน", en: "Ship" },
    desc: {
      th: "เช็กลิสต์ก่อนปล่อย ขึ้นเวอร์ชัน แล้วปล่อย โดยมีแผน rollback เสมอ",
      en: "Run the pre-deploy checklist, bump the version, release, always with a rollback plan.",
    },
    tools: [
      skill("engineering:deploy-checklist"),
      skill("claude-mem:version-bump"),
      skill("claude-mem:release"),
      skill("claude-mem:build-and-release"),
    ],
    outcome: {
      th: "งานขึ้น production พร้อมแผนถอยกลับ",
      en: "Live in production with a way back.",
    },
  },
  {
    title: { th: "ปิดงาน", en: "Wrap up" },
    desc: {
      th: "เขียนเอกสารและสรุปส่งต่อ เพื่อให้คนถัดไปทำต่อได้",
      en: "Write the docs and a hand-off summary so the next person can continue.",
    },
    tools: [skill("engineering:documentation"), skill("claude-mem:handoff")],
    outcome: {
      th: "เอกสารและสรุปส่งต่อพร้อมใช้",
      en: "Docs and a hand-off summary ready to use.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* The four use cases                                                  */
/* ------------------------------------------------------------------ */

export type UseCaseId = "feature" | "bug" | "perf" | "review";

export type UseCase = {
  id: UseCaseId;
  name: Bi;
  tagline: Bi;
  /** Which pastel/brand colour the bento card uses. */
  accent: "violet" | "blue" | "lime" | "ink";
  /** false: the steps are independent jobs, not a sequence. */
  ordered: boolean;
  steps: Step[];
  note?: Bi;
};

export const useCases: UseCase[] = [
  {
    id: "feature",
    name: { th: "ความต้องการ / ฟีเจอร์ใหม่", en: "New requirement / feature" },
    tagline: {
      th: "จากไอเดียที่ยังเบลอ ไปสู่ฟีเจอร์ที่ปล่อยได้",
      en: "From a fuzzy idea to a shippable feature.",
    },
    accent: "ink",
    ordered: true,
    steps: [
      {
        title: { th: "ซักให้ชัด", en: "Clarify" },
        desc: {
          th: "ไล่ถามจนความต้องการไม่มีช่องโหว่",
          en: "Interview until the requirement has no gaps.",
        },
        tools: [skill("grill-me"), skill("grill-with-docs")],
        outcome: {
          th: "requirement ที่ชัดเจน (มีศัพท์โดเมนใหม่ใช้ grill-with-docs)",
          en: "A clear requirement (use grill-with-docs for new domain terms).",
        },
      },
      {
        title: { th: "วางแผน", en: "Plan" },
        desc: {
          th: "แตกเป็นเฟส งานใหญ่เพิ่มการออกแบบสถาปัตยกรรม",
          en: "Split into phases; add architecture design for big work.",
        },
        tools: [
          skill("claude-mem:make-plan"),
          skill("feature-dev:feature-dev"),
          skill("engineering:architecture"),
          skill("engineering:system-design"),
        ],
        outcome: {
          th: "แผนแบ่งเฟสพร้อมไฟล์ที่จะแตะ",
          en: "A phased plan with the files to touch.",
        },
      },
      {
        title: { th: "เขียนโค้ด + เทสต์", en: "Code + tests" },
        desc: {
          th: "ลงมือทีละเฟส พร้อมเทสต์ตามความเสี่ยง",
          en: "Build phase by phase with risk-based tests.",
        },
        tools: [
          skill("claude-mem:do"),
          agent("backend-engineer"),
          agent("frontend-engineer"),
          skill("engineering:testing-strategy"),
          agent("qa-engineer"),
        ],
        outcome: { th: "โค้ดและเทสต์ของแต่ละเฟส", en: "Code and tests per phase." },
      },
      {
        title: { th: "ลองรันจริง", en: "Run it" },
        desc: {
          th: "เปิดแอปจริงยืนยันว่าทำงาน",
          en: "Launch the real app to confirm it works.",
        },
        tools: [skill("run")],
        outcome: { th: "เห็นฟีเจอร์ทำงานจริง", en: "The feature seen working." },
      },
      {
        title: { th: "รีวิว", en: "Review" },
        desc: {
          th: "เก็บกวาดก่อน แล้วหาบั๊ก",
          en: "Tidy first, then find bugs.",
        },
        tools: [skill("simplify"), skill("code-review")],
        outcome: { th: "diff ที่ผ่านรีวิว", en: "A reviewed diff." },
      },
      {
        title: { th: "ปล่อย + เอกสาร", en: "Ship + docs" },
        desc: {
          th: "เช็กลิสต์ ปล่อย และเขียนเอกสาร",
          en: "Checklist, release, and write the docs.",
        },
        tools: [
          skill("engineering:deploy-checklist"),
          skill("claude-mem:release"),
          skill("engineering:documentation"),
        ],
        outcome: { th: "ขึ้น production พร้อมเอกสาร", en: "Live, with docs." },
      },
    ],
  },
  {
    id: "bug",
    name: { th: "แก้บั๊ก", en: "Fix bug" },
    tagline: {
      th: "หาสาเหตุจริงก่อน แล้วค่อยแก้พร้อมเทสต์ที่กันซ้ำ",
      en: "Find the real cause first, then fix it with a test that prevents a repeat.",
    },
    accent: "violet",
    ordered: true,
    note: {
      th: "ถ้าเป็น incident บน production ให้ใช้ engineering:incident-response ก่อน แล้วค่อยกลับมาตามขั้นตอนนี้",
      en: "For a production incident, start with engineering:incident-response, then come back to these steps.",
    },
    steps: [
      {
        title: { th: "จัดประเภท / ทำซ้ำ", en: "Triage / reproduce" },
        desc: {
          th: "ถ้ารายงานยังไม่ชัด ให้จัดประเภทและทำซ้ำให้ได้ก่อน",
          en: "If the report is unclear, classify it and reproduce it first.",
        },
        tools: [agent("bug-reviewer")],
        outcome: { th: "บั๊กที่ทำซ้ำได้", en: "A reproducible bug." },
      },
      {
        title: { th: "หา root cause", en: "Find the root cause" },
        desc: {
          th: "ไล่หาสาเหตุจริง บั๊กยากให้ใช้ผู้เชี่ยวชาญ",
          en: "Trace the real cause; bring in the specialist for hard bugs.",
        },
        tools: [skill("engineering:debug"), agent("debugging-specialist")],
        outcome: { th: "สาเหตุที่พิสูจน์ได้", en: "A proven cause." },
      },
      {
        title: { th: "เทสต์ที่ fail ก่อน แล้วแก้", en: "Failing test, then fix" },
        desc: {
          th: "เขียนเทสต์ที่พังตามบั๊กก่อน แล้วแก้ให้ผ่าน",
          en: "Write a test that fails on the bug, then make it pass.",
        },
        tools: [
          agent("backend-engineer"),
          agent("frontend-engineer"),
          agent("qa-engineer"),
        ],
        outcome: { th: "แก้แล้วและมีเทสต์กันซ้ำ", en: "Fixed, with a regression test." },
      },
      {
        title: { th: "ยืนยันในแอปจริง", en: "Confirm in the real app" },
        desc: {
          th: "เปิดแอปจริงดูว่าบั๊กหายแล้ว",
          en: "Launch the real app and see the bug gone.",
        },
        tools: [skill("run")],
        outcome: { th: "บั๊กหายในแอปจริง", en: "Bug gone in the real app." },
      },
      {
        title: { th: "รีวิว", en: "Review" },
        desc: { th: "ตรวจ diff ของการแก้", en: "Review the fix diff." },
        tools: [skill("code-review")],
        outcome: { th: "การแก้ที่ผ่านรีวิว", en: "A reviewed fix." },
      },
    ],
  },
  {
    id: "perf",
    name: { th: "ปรับปรุง Performance", en: "Improve performance" },
    tagline: {
      th: "วัดก่อนแก้ ปรับเฉพาะจุดที่วัดได้ แล้ววัดซ้ำ",
      en: "Measure first, tune only what you measured, then measure again.",
    },
    accent: "blue",
    ordered: true,
    note: {
      th: "ถ้าต้องรื้อโครงสร้าง ใช้ engineering:architecture หรือ engineering:tech-debt",
      en: "If the structure itself must change, use engineering:architecture or engineering:tech-debt.",
    },
    steps: [
      {
        title: { th: "วัด baseline", en: "Measure a baseline" },
        desc: {
          th: "รันจริงและวัดค่าก่อนแก้ เพื่อหาจุดช้า",
          en: "Run it and measure before changing anything to find the slow spot.",
        },
        tools: [skill("run"), skill("engineering:debug")],
        outcome: { th: "ตัวเลขก่อนแก้", en: "The numbers before the change." },
      },
      {
        title: { th: "หาคอขวด", en: "Find the bottleneck" },
        desc: {
          th: "หาจุดที่ช้าจริง ฝั่งฐานข้อมูลใช้ผู้เชี่ยวชาญ SQL",
          en: "Find what is really slow; use the SQL specialist for database work.",
        },
        tools: [agent("debugging-specialist"), agent("sql-database-engineer")],
        outcome: { th: "คอขวดที่ยืนยันด้วยตัวเลข", en: "A bottleneck confirmed by numbers." },
      },
      {
        title: { th: "ปรับโค้ด", en: "Tune the code" },
        desc: {
          th: "ปรับเฉพาะจุดที่วัดแล้ว พฤติกรรมภายนอกต้องเหมือนเดิม",
          en: "Change only the measured spot; external behaviour must stay identical.",
        },
        tools: [agent("code-improver")],
        outcome: { th: "โค้ดที่เร็วขึ้นโดยพฤติกรรมไม่เปลี่ยน", en: "Faster code, same behaviour." },
      },
      {
        title: { th: "วัดซ้ำเทียบ baseline", en: "Re-measure" },
        desc: {
          th: "วัดอีกครั้งเทียบกับ baseline",
          en: "Measure again against the baseline.",
        },
        tools: [skill("run")],
        outcome: { th: "ตัวเลขหลังแก้ที่เทียบได้", en: "Comparable after-numbers." },
      },
      {
        title: { th: "รีวิว", en: "Review" },
        desc: {
          th: "เก็บกวาดแล้วหาบั๊ก",
          en: "Tidy, then hunt bugs.",
        },
        tools: [skill("simplify"), skill("code-review")],
        outcome: { th: "diff ที่ผ่านรีวิว", en: "A reviewed diff." },
      },
    ],
  },
  {
    id: "review",
    name: { th: "ตรวจ / รีวิวโค้ด", en: "Check / review code" },
    tagline: {
      th: "เลือกเครื่องมือให้ตรงกับสิ่งที่อยากตรวจ",
      en: "Pick the tool that matches what you want to check.",
    },
    accent: "lime",
    ordered: false,
    note: {
      th: "code-review หาบั๊ก ส่วน simplify แค่เก็บกวาด ไม่หาบั๊ก ควรรัน simplify ก่อนแล้วค่อย code-review",
      en: "code-review hunts bugs; simplify only tidies. Run simplify first, then code-review.",
    },
    steps: [
      {
        title: { th: "ตรวจความถูกต้องของ diff / PR", en: "Correctness of a diff / PR" },
        desc: {
          th: "หาบั๊กในการเปลี่ยนแปลง โพสต์เป็นคอมเมนต์ใน PR หรือให้แก้เลยได้",
          en: "Find bugs in the change; post as PR comments or apply fixes directly.",
        },
        tools: [skill("code-review"), skill("engineering:code-review")],
        outcome: { th: "รายการบั๊กเรียงตามความรุนแรง", en: "Findings ranked by severity." },
      },
      {
        title: { th: "ลดความซ้ำ / ความซับซ้อน", en: "Reduce duplication / complexity" },
        desc: {
          th: "เก็บกวาดโค้ดที่เพิ่งเปลี่ยน",
          en: "Tidy the code that just changed.",
        },
        tools: [skill("simplify")],
        outcome: { th: "โค้ดที่เรียบขึ้น", en: "Simpler code." },
      },
      {
        title: { th: "ตรวจความปลอดภัย", en: "Security check" },
        desc: {
          th: "ไล่ช่องโหว่ของระบบที่เป็นของเราเอง",
          en: "Look for vulnerabilities in our own system.",
        },
        tools: [agent("security-engineer")],
        outcome: { th: "รายงานช่องโหว่", en: "A vulnerability report." },
      },
      {
        title: { th: "ตรวจความพร้อมปล่อย", en: "Release readiness" },
        desc: {
          th: "ประเมินว่าเทสต์ครอบคลุมพอจะปล่อยหรือยัง",
          en: "Judge whether test coverage is enough to ship.",
        },
        tools: [skill("engineering:testing-strategy"), agent("qa-engineer")],
        outcome: { th: "คำตอบว่าพร้อมปล่อยไหม", en: "A go / no-go answer." },
      },
      {
        title: { th: "ตรวจทั้ง codebase", en: "Whole-codebase check" },
        desc: {
          th: "สำรวจภาพรวมและหนี้ทางเทคนิค",
          en: "Survey the big picture and technical debt.",
        },
        tools: [skill("claude-mem:smart-explore"), skill("engineering:tech-debt")],
        outcome: { th: "ภาพรวมและรายการหนี้ที่จัดลำดับแล้ว", en: "An overview and a prioritised debt list." },
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Size tiers: which overview steps to use                             */
/* ------------------------------------------------------------------ */

export type SizeTier = {
  id: "small" | "medium" | "large";
  name: Bi;
  example: Bi;
  /** Overview step numbers (0 = setup, 1-7 = the general steps). */
  steps: number[];
};

export const sizeTiers: SizeTier[] = [
  {
    id: "small",
    name: { th: "เล็ก", en: "Small" },
    example: { th: "แก้จุดเดียว", en: "A single-spot change" },
    steps: [3, 4, 5],
  },
  {
    id: "medium",
    name: { th: "กลาง", en: "Medium" },
    example: { th: "ฟีเจอร์เดียว", en: "One feature" },
    steps: [1, 2, 3, 4, 5],
  },
  {
    id: "large",
    name: { th: "ใหญ่ / เสี่ยง", en: "Large / risky" },
    example: { th: "งานข้ามระบบหรือกระทบ production", en: "Cross-system or production-impacting work" },
    steps: [0, 1, 2, 3, 4, 5, 6, 7],
  },
];

/* ------------------------------------------------------------------ */
/* Derived numbers for the hero (never hard-coded)                     */
/* ------------------------------------------------------------------ */

const everyTool = [
  ...setupStep.tools,
  ...overviewSteps.flatMap((s) => s.tools),
  ...useCases.flatMap((u) => u.steps.flatMap((s) => s.tools)),
];

export const stats = {
  steps: overviewSteps.length,
  useCases: useCases.length,
  skills: new Set(everyTool.filter((t) => t.kind === "skill").map((t) => t.name)).size,
  agents: new Set(everyTool.filter((t) => t.kind === "agent").map((t) => t.name)).size,
};
