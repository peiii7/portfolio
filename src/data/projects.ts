// card media = the case study's hero (image or video), so home card and hero always match
const fubon = "/case/fubon/hero.webm";
const ctbc = "/case/ctbc/hero.webm";
const tea = "/case/tea/hero.mp4";
const xnfun = "/case/xnfun/hero.jpg";

import type { Lang } from "../lang";

export interface ProjectCard {
  slug: string;
  hero: string;                        // image or video (.mp4/.webm/.mov)
  tag: Record<Lang, string>;
  title: Record<Lang, string>;
}

// Order matches the Notion "2026作品集" deck: Fubon → CTBC → Tea → XnFun.
export const PROJECTS: ProjectCard[] = [
  {
    slug: "fubon-life", hero: fubon,
    tag: { en: "Finance & Insurance ｜ Website Redesign", zh: "金融保險 ｜ 官方網站改版" },
    title: { en: "Visual retune and modular convergence of a sprawling site", zh: "從品牌定調視覺，模組化收斂龐大頁面" },
  },
  {
    slug: "ctbc-bank", hero: ctbc,
    tag: { en: "Banking & Finance ｜ Website Redesign", zh: "金融銀行 ｜ 官方網站改版" },
    title: { en: "Repositioning the Website Experience in the AI Era,  From Visual Direction to a Site-Wide Accessible System", zh: " AI 時代的官網體驗，從視覺定調到全站無障礙設計系統" },
  },
  {
    slug: "tea-island-tea-stories", hero: tea,
    tag: { en: "Cultural Experience ｜ Service Design & Gamification", zh: "文化體驗 ｜ 服務設計與遊戲化系統" },
    title: { en: "An immersive tea-house service, mapped from the service blueprint", zh: "從服務藍圖釐清需求，打造沉浸式茶館服務設計" },
  },
  {
    slug: "xnfun-app", hero: xnfun,
    tag: { en: "Cloud Storage ｜ Shared Album App", zh: "雲端儲存 ｜ 共享相簿 App" },
    title: { en: "Refining a live system and building modular features from 0 to 1", zh: "優化既有系統，從 0 到 1 打造模組化新功能" },
  },
];

export const getProject = (slug?: string) => PROJECTS.find((p) => p.slug === slug);
