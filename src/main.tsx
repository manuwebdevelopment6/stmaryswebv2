import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// On a fresh page load (full refresh, not SPA navigation), always start at home.
// We detect SPA navigations via a sessionStorage marker that is set after first mount.
if (typeof window !== "undefined") {
  const SPA_MARKER = "__spa_session__";
  const isFreshLoad = !sessionStorage.getItem(SPA_MARKER);
  if (isFreshLoad && window.location.pathname !== "/") {
    sessionStorage.setItem(SPA_MARKER, "1");
    window.history.replaceState({}, "", "/");
  } else {
    sessionStorage.setItem(SPA_MARKER, "1");
  }
}

createRoot(document.getElementById("root")!).render(<App />);
