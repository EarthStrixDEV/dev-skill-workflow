import type { Bi } from "./types";

/** Text for the /library page. Skill and command names are never translated. */
export const libUi = {
  navLabel: { th: "คลัง Skill", en: "Skill library" } satisfies Bi,
  back: { th: "กลับหน้าแรก", en: "Back to home" } satisfies Bi,

  page: {
    eyebrow: { th: "คลัง Skill", en: "Skill library" } satisfies Bi,
    title: { th: "ติดตั้ง skill ที่ใช้ใน workflow", en: "Install the skills used in the workflow" } satisfies Bi,
    subtitle: {
      th: "ทุกรายการในหน้านี้มีอยู่ใน workflow ของเว็บนี้ ที่นี่บอกวิธีติดตั้งและแหล่งต้นฉบับ ไม่ได้แจกไฟล์",
      en: "Every entry appears in this site's workflow. This page shows how to install each one and where it comes from; no files are distributed.",
    } satisfies Bi,
  },

  install: {
    eyebrow: { th: "วิธีติดตั้ง", en: "How to install" } satisfies Bi,
    title: { th: "ติดตั้งตามแหล่ง", en: "Install by source" } satisfies Bi,
    hint: {
      th: "พิมพ์ในช่องแชตของ Claude Code ทีละบรรทัด ตามลำดับ แล้วกด Enter",
      en: "Type these into the Claude Code chat one line at a time, in order, pressing Enter after each.",
    } satisfies Bi,
    copy: { th: "คัดลอก", en: "Copy" } satisfies Bi,
    copyAll: { th: "คัดลอกทั้งชุด", en: "Copy all" } satisfies Bi,
    copied: { th: "คัดลอกแล้ว", en: "Copied" } satisfies Bi,
    failed: { th: "คัดลอกไม่ได้", en: "Copy failed" } satisfies Bi,
    copyAllHint: {
      th: "วางและกด Enter ทีละบรรทัด",
      en: "Paste and press Enter one line at a time.",
    } satisfies Bi,
    showItems: { th: "ดูรายการ", en: "Show items" } satisfies Bi,
    source: { th: "ต้นฉบับ", en: "Source" } satisfies Bi,
    nothing: { th: "ไม่ต้องติดตั้ง", en: "Nothing to install" } satisfies Bi,
    commandsLabel: { th: "คำสั่ง", en: "Commands" } satisfies Bi,
  },

  browse: {
    eyebrow: { th: "รายการทั้งหมด", en: "All items" } satisfies Bi,
    title: { th: "ค้นหาและกรอง", en: "Search and filter" } satisfies Bi,
    searchLabel: { th: "ค้นหา skill", en: "Search skills" } satisfies Bi,
    searchPlaceholder: { th: "ค้นหาชื่อหรือคำอธิบาย", en: "Search by name or description" } satisfies Bi,
    kind: { th: "ชนิด", en: "Type" } satisfies Bi,
    provider: { th: "แหล่ง", en: "Source" } satisfies Bi,
    useCase: { th: "Use case", en: "Use case" } satisfies Bi,
    all: { th: "ทั้งหมด", en: "All" } satisfies Bi,
    empty: { th: "ไม่พบรายการที่ตรงกับตัวกรอง", en: "No items match the filters." } satisfies Bi,
    clear: { th: "ล้างตัวกรอง", en: "Clear filters" } satisfies Bi,
  },

  detail: {
    close: { th: "ปิด", en: "Close" } satisfies Bi,
    from: { th: "แหล่ง", en: "Source" } satisfies Bi,
    usedIn: { th: "ใช้ใน workflow", en: "Used in the workflow" } satisfies Bi,
    overviewLabel: { th: "ภาพรวม", en: "Overview" } satisfies Bi,
    setupLabel: { th: "เตรียม repo", en: "Prepare the repo" } satisfies Bi,
    stepLabel: { th: "ขั้น", en: "step" } satisfies Bi,
    installTitle: { th: "วิธีติดตั้ง", en: "How to install" } satisfies Bi,
    viewSource: { th: "ดูต้นฉบับ", en: "View source" } satisfies Bi,
  },
};

/** "N items" in both languages. */
export const itemsLabel = (n: number): Bi => ({ th: `${n} รายการ`, en: n === 1 ? "1 item" : `${n} items` });
