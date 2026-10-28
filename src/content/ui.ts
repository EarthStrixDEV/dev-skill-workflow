import type { Bi } from "./types";
import { useCases } from "./workflow";

/** Counted from the data so the page text never drifts from the use cases shown. */
const useCaseCount = useCases.length;

/** Page-level text. Skill and agent names are never translated and live in workflow.ts. */
export const ui = {
  brand: "Dev Skill Workflow",

  nav: {
    usecases: { th: "Use case", en: "Use cases" },
    flow: { th: "ขั้นตอน", en: "Steps" },
    overview: { th: "ภาพรวม", en: "Overview" },
    sizes: { th: "ขนาดงาน", en: "Work size" },
  },

  hero: {
    badge: { th: "แผนผังสำหรับงาน dev", en: "A map for dev work" },
    title: { th: "ใช้ skill ถูกตัว ถูกจังหวะ", en: "The right skill at the right moment" },
    subtitle: {
      th: `จากไอเดียถึงโค้ดที่ปล่อยได้ ครบ ${useCaseCount} use case ของงานพัฒนาซอฟต์แวร์`,
      en: `From idea to shipped code, across the ${useCaseCount} use cases of software development.`,
    },
    ctaPrimary: { th: "ดูขั้นตอน", en: "See the steps" },
    ctaSecondary: { th: "ภาพรวม 7 ขั้น", en: "The 7-step overview" },
    statSteps: { th: "ขั้นตอนหลัก", en: "Core steps" },
    statUseCases: { th: "Use case", en: "Use cases" },
    statSkills: { th: "Skill", en: "Skills" },
    statAgents: { th: "Agent", en: "Agents" },
  },

  usecases: {
    eyebrow: { th: "เลือกงานที่กำลังทำ", en: "Pick what you are doing" },
    title: {
      th: `${useCaseCount} use case ของงาน dev`,
      en: `The ${useCaseCount} dev use cases`,
    },
    open: { th: "ดูขั้นตอน", en: "View steps" },
  },

  flow: {
    eyebrow: { th: "ขั้นตอนของ use case นี้", en: "Steps for this use case" },
    stepLabel: { th: "ขั้นที่", en: "Step" },
    unorderedHint: {
      th: "งานเหล่านี้เป็นอิสระต่อกัน เลือกเฉพาะที่ต้องการ",
      en: "These jobs are independent; pick only what you need.",
    },
    outcome: { th: "ผลลัพธ์", en: "Outcome" },
    skill: { th: "Skill", en: "Skill" },
    command: { th: "Command", en: "Command" },
    agent: { th: "Agent", en: "Agent" },
    legend: { th: "ชนิดเครื่องมือ", en: "Tool types" },
  },

  overview: {
    eyebrow: { th: "ภาพรวม", en: "The big picture" },
    title: { th: "7 ขั้นของ workflow", en: "The 7-step workflow" },
    setupBadge: { th: "ทำครั้งเดียวต่อ repo", en: "Once per repo" },
  },

  sizes: {
    eyebrow: { th: "ขนาดงาน", en: "Work size" },
    title: { th: "ใช้กี่ขั้นดี", en: "How many steps do you need?" },
    stepsUsed: { th: "ขั้นที่ใช้", en: "Steps used" },
    setup: { th: "เตรียม repo", en: "Prepare" },
  },

  footer: {
    credit: { th: "แอนิเมชันโดย", en: "Animations by" },
    creditName: "React Bits",
    creditHref: "https://reactbits.dev",
    note: {
      th: "แผนผังนี้เป็นแนวทาง ปรับตามขนาดและความเสี่ยงของงานได้",
      en: "This map is a guide; adapt it to the size and risk of your work.",
    },
  },
} satisfies Record<string, unknown>;

export type { Bi };
