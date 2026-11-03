import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "zh";

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; }
const Ctx = createContext<LangCtx>({ lang: "en", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

/** pick(en, zh) → returns the value for the active language */
export function usePick() {
  const { lang } = useLang();
  return <T,>(en: T, zh: T): T => (lang === "en" ? en : zh);
}
