import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// On a fresh page load (full refresh, not SPA navigation), redirect to home —
// EXCEPT for admin/auth deep links which must remain shareable & refreshable.
if (typeof window !== "undefined") {
  const SPA_MARKER = "__spa_session__";
  const path = window.location.pathname;
  const KEEP_ON_REFRESH = ["/admin", "/auth", "/portal"];
  const shouldKeep = KEEP_ON_REFRESH.some((p) => path === p || path.startsWith(p + "/"));
  const isFreshLoad = !sessionStorage.getItem(SPA_MARKER);
  if (isFreshLoad && path !== "/" && !shouldKeep) {
    sessionStorage.setItem(SPA_MARKER, "1");
    window.history.replaceState({}, "", "/");
  } else {
    sessionStorage.setItem(SPA_MARKER, "1");
  }
}

createRoot(document.getElementById("root")!).render(<App />);
