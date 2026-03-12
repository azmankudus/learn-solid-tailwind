import { useNavigate, useLocation } from "@solidjs/router";
import { createEffect } from "solid-js";
import { isLoggedIn, isLoaded } from "~/lib/store";

export function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  createEffect(() => {
    if (!isLoaded()) return;

    const currentPath = location.pathname;
    const auth = isLoggedIn();

    // 1. Canonicalization: Remove index.html and trailing slashes (except root)
    let canonicalPath = currentPath.replace(/\/index\.html$/i, "");
    if (canonicalPath.length > 1 && canonicalPath.endsWith("/")) {
      canonicalPath = canonicalPath.slice(0, -1);
    }

    // 2. Perform canonical redirect if path changed
    if (canonicalPath !== currentPath) {
      navigate(canonicalPath, { replace: true });
      return;
    }

    // 3. /user/ redirects
    if (canonicalPath === "/user") {
      if (auth) {
        navigate("/protected/dashboard", { replace: true });
      } else {
        navigate("/user/login", { replace: true });
      }
      return;
    }

    // 4. If logged in and trying to access login/register/forgot, go to dashboard
    if (auth && (canonicalPath === "/user/login" || canonicalPath === "/user/register" || canonicalPath === "/user/forgot")) {
      navigate("/protected/dashboard", { replace: true });
      return;
    }

    // 5. /protected and its group roots to /protected/dashboard
    const groups = ["analytics", "management", "profile", "test"];
    if (canonicalPath === "/protected" || groups.some(g => canonicalPath === `/protected/${g}`)) {
      navigate("/protected/dashboard", { replace: true });
      return;
    }
  });

  return null;
}
