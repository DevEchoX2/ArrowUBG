// main.js — handles navigation, routing, and page rendering

document.addEventListener("DOMContentLoaded", () => {
  const navIcons = document.querySelectorAll(".nav-icon");
  const pages = document.querySelectorAll(".page");

  // Map routes to page IDs
  const routeMap = {
    "/": "home",
    "/home": "home",
    "/games": "games",
    "/apps": "apps",
    "/search": "search",
    "/donate": "donate",
    "/settings": "settings"
  };

  const validPages = Array.from(pages).map(p => p.id);

  function switchPage(targetPage, pushState = true) {
    if (!validPages.includes(targetPage)) return;

    // Reset all pages and icons
    navIcons.forEach(i => i.classList.remove("active"));
    pages.forEach(p => {
      p.classList.remove("active");
      p.setAttribute("aria-hidden", "true");
    });

    // Activate target page
    const icon = document.querySelector(`.nav-icon[data-page="${targetPage}"]`);
    const page = document.getElementById(targetPage);

    if (icon) icon.classList.add("active");
    if (page) {
      page.classList.add("active");
      page.removeAttribute("aria-hidden");
      page.style.animation = "contentFade 0.5s ease both";
    }

    // Update URL
    if (pushState) {
      const path = Object.keys(routeMap).find(k => routeMap[k] === targetPage) || "/";
      history.pushState({ page: targetPage }, "", path);
    }

    // Delegate rendering
    if (targetPage === "games" && typeof renderGames === "function") {
      renderGames();
    }
    if (targetPage === "apps" && typeof renderApps === "function") {
      renderApps();
    }
    if (targetPage === "settings" && typeof renderSettings === "function") {
      renderSettings();
    }
  }

  function routeFromPath() {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const target = routeMap[path] || "home";
    switchPage(target, false);
  }

  window.addEventListener("popstate", routeFromPath);

  navIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      const targetPage = icon.getAttribute("data-page");
      switchPage(targetPage, true);
    });
  });

  // Skip link accessibility
  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", (e) => {
      e.preventDefault();
      const current = document.querySelector(".page.active") || document.getElementById("home");
      if (!current) return;
      const focusable = current.querySelector(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      (focusable || current).focus({ preventScroll: true });
    });
  }

  // Initial route
  routeFromPath();
});
