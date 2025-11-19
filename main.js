// main.js — ArrowUBG full navigation, path routing (/games, /apps), and delegation to games.js/apps.js

document.addEventListener("DOMContentLoaded", () => {
  const navIcons = document.querySelectorAll(".nav-icon");
  const pages = document.querySelectorAll(".page");

  // Map routes to page IDs (supports /, /home, /games, /apps, /donate)
  const routeMap = {
    "/": "home",
    "/home": "home",
    "/games": "games",
    "/apps": "apps",
    "/donate": "donate"
  };

  const validPages = Array.from(pages).map(p => p.id);

  // Core page switcher
  function switchPage(targetPage, pushState = true) {
    if (!validPages.includes(targetPage)) return;

    // Deactivate icons and pages
    navIcons.forEach(i => i.classList.remove("active"));
    pages.forEach(p => {
      p.classList.remove("active");
      p.setAttribute("aria-hidden", "true");
    });

    // Activate target icon and page
    const icon = document.querySelector(`.nav-icon[data-page="${targetPage}"]`);
    const page = document.getElementById(targetPage);

    if (icon) icon.classList.add("active");
    if (page) {
      page.classList.add("active");
      page.removeAttribute("aria-hidden");
      page.style.animation = "contentFade 0.5s ease both";
    }

    // Update the URL path (SPA-style)
    if (pushState) {
      const path = Object.keys(routeMap).find(k => routeMap[k] === targetPage) || "/";
      history.pushState({ page: targetPage }, "", path);
    }

    // Delegate rendering to external scripts
    if (targetPage === "games" && typeof renderGames === "function") {
      renderGames();
    }
    if (targetPage === "apps" && typeof renderApps === "function") {
      renderApps();
    }
  }

  // Route based on current path
  function routeFromPath() {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const target = routeMap[path] || "home";
    switchPage(target, false);
  }

  // Handle browser back/forward
  window.addEventListener("popstate", routeFromPath);

  // Sidebar clicks -> switch page and push path
  navIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      const targetPage = icon.getAttribute("data-page");
      switchPage(targetPage, true);
    });
  });

  // Skip to content accessibility
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

  // Initial route on load
  routeFromPath();
});
