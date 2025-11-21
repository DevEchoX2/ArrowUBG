// main.js — handles navigation and page switching for ArrowUBG

document.addEventListener("DOMContentLoaded", () => {
  const navIcons = document.querySelectorAll(".nav-icon");
  const pages = document.querySelectorAll(".page");

  // Map URL paths to page IDs
  const routeMap = {
    "/": "home",
    "/home": "home",
    "/games": "games",
    "/apps": "apps",
    "/settings": "settings"
  };

  // Collect valid page IDs
  const validPages = Array.from(pages).map(p => p.id);

  function switchPage(targetPage, pushState = true) {
    if (!validPages.includes(targetPage)) return;

    // Reset all nav icons and pages
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

    // Update browser history
    if (pushState) {
      const path = Object.keys(routeMap).find(k => routeMap[k] === targetPage) || "/";
      history.pushState({ page: targetPage }, "", path);
    }

    // Render dynamic content
    if (targetPage === "apps" && typeof renderApps === "function") renderApps();
    if (targetPage === "games" && typeof renderGames === "function") renderGames();
    if (targetPage === "settings" && typeof renderSettings === "function") renderSettings();
  }

  function routeFromPath() {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const target = routeMap[path] || "home";
    switchPage(target, false);
  }

  // Handle back/forward navigation
  window.addEventListener("popstate", routeFromPath);

  // Handle nav icon clicks
  navIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      const targetPage = icon.getAttribute("data-page");
      switchPage(targetPage, true);
    });
  });

  // Initial route
  routeFromPath();
});
