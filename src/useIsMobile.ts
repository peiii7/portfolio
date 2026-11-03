import { useEffect, useState } from "react";

/** true when viewport width is at or below `bp` (default 760px). */
export function useIsMobile(bp = 760) {
  const [m, setM] = useState(typeof window !== "undefined" ? window.innerWidth <= bp : false);
  useEffect(() => {
    const on = () => setM(window.innerWidth <= bp);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [bp]);
  return m;
}
