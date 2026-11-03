import HomeCarousel, { HomeSlide } from "../components/HomeCarousel";
import { PROJECTS } from "../data/projects";
import { useLang, usePick } from "../lang";

export default function Home() {
  const { lang } = useLang();
  const pick = usePick();
  const slides: HomeSlide[] = PROJECTS.map((p) => ({
    image: p.hero, slug: p.slug, tag: p.tag[lang], title: p.title[lang],
  }));
  return (
    <main>
      <HomeCarousel
        slides={slides}
        headline={pick("I'm Peichi, a product designer", "我是 Peichi，產品設計師")}
        sub={pick(
          "I always love exploring different media and tools, mixing interaction, imagination, and storytelling into digital experiences worth staying for.",
          "我喜歡探索不同媒材與工具，把互動、想像與敘事揉進值得停留的數位體驗裡。"
        )}
      />
    </main>
  );
}
