import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LangProvider } from "./lang";
import { HoverCursorProvider } from "./components/HoverCursor";
import TilesLoader from "./components/originkit/tiles-loader";
import "./index.css";

function Root() {
  const [done, setDone] = useState(false);
  return (
    <>
      <BrowserRouter>
        <LangProvider>
          <HoverCursorProvider>
            <App />
          </HoverCursorProvider>
        </LangProvider>
      </BrowserRouter>
      {!done && (
        <TilesLoader
          minTime={1.4}
          background="#080808"
          accent="#262626"
          style={{ position: "fixed", inset: 0, width: "100%", height: "100%", minWidth: 0, minHeight: 0, zIndex: 10000 }}
          onComplete={() => window.setTimeout(() => setDone(true), 500)}
        />
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
