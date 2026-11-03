import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import About from "./pages/About";
import Playground from "./pages/Playground";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/about" element={<About />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
