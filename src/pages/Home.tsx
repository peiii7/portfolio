import HomeCarousel, { HomeSlide } from "../components/HomeCarousel";
import { PROJECTS } from "../data/projects";
import { useLang } from "../lang";
import SlotWord from "../components/SlotWord";

const ROLES = ["Visual Thinker", "Interaction Explorer", "Design Builder", "Curious Experimenter"];

export default function Home() {
  const { lang } = useLang();
  const slides: HomeSlide[] = PROJECTS.map((p) => ({
    image: p.hero, slug: p.slug, tag: p.tag[lang], title: p.title[lang],
  }));
  return (
    <main>
      <HomeCarousel
        slides={slides}
        headline="I design, explore and make things happen"
        sub={<>Hello! It’s Peichi. I am a <SlotWord words={ROLES} /></>}
      />
    </main>
  );
}
