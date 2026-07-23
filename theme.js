(() => {
  const storageKey = "raghuboya-theme";
  const darkTheme = "dark";
  const lightTheme = "light";
  const root = document.documentElement;
  const themeColors = {
    dark: "#101010",
    light: "#f7f5ef",
  };

  const readStoredTheme = () => {
    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      return storedTheme === darkTheme || storedTheme === lightTheme
        ? storedTheme
        : null;
    } catch {
      return null;
    }
  };

  const writeStoredTheme = (theme) => {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // The selected theme still applies for this page when storage is blocked.
    }
  };

  const getSystemTheme = () => {
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      return lightTheme;
    }

    return darkTheme;
  };

  const updateToggle = (theme) => {
    const toggle = document.querySelector("[data-theme-toggle]");

    if (!toggle) {
      return;
    }

    const nextTheme = theme === darkTheme ? lightTheme : darkTheme;
    const label = `Switch to ${nextTheme} theme`;
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute("content", themeColors[theme]);
    }

    updateToggle(theme);
  };

  const initialTheme = readStoredTheme() || getSystemTheme();
  applyTheme(initialTheme);
  root.classList.add("theme-enabled");

  const initializeToggle = () => {
    const toggle = document.querySelector("[data-theme-toggle]");

    if (!toggle) {
      return;
    }

    let manualSelection = false;
    updateToggle(root.dataset.theme);

    toggle.addEventListener("click", () => {
      const nextTheme =
        root.dataset.theme === darkTheme ? lightTheme : darkTheme;
      manualSelection = true;
      applyTheme(nextTheme);
      writeStoredTheme(nextTheme);
    });

    if (typeof window.matchMedia === "function") {
      const systemPreference = window.matchMedia(
        "(prefers-color-scheme: light)",
      );

      systemPreference.addEventListener?.("change", (event) => {
        if (!manualSelection && !readStoredTheme()) {
          applyTheme(event.matches ? lightTheme : darkTheme);
        }
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeToggle, {
      once: true,
    });
  } else {
    initializeToggle();
  }
})();
