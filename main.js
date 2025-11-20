document.addEventListener("DOMContentLoaded", () => {
  const navIcons = document.querySelectorAll(".nav-icon");
  const pages = document.querySelectorAll(".page");

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

    navIcons.forEach(i => i.classList.remove("active"));
    pages.forEach(p => {
      p.classList.remove("active");
      p.setAttribute("aria-hidden", "true");
    });

    const icon = document.querySelector(`.nav-icon[data-page="${targetPage}"]`);
    const page = document.getElementById(targetPage);

    if (icon) icon.classList.add("active");
    if (page) {
      page.classList.add("active");
      page.removeAttribute("aria-hidden");
      page.style.animation = "contentFade 0.5s ease both";
    }

    if (pushState) {
      const path = Object.keys(routeMap).find(k => routeMap[k] === targetPage) || "/";
      history.pushState({ page: targetPage }, "", path);
    }

    if (targetPage === "games" && typeof renderGames === "function") renderGames();
    if (targetPage === "apps" && typeof renderApps === "function") renderApps();
    if (targetPage === "settings" && typeof renderSettings === "function") renderSettings();
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

  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", (e) => {
      e.preventDefault();
      const current = document.querySelector(".page.active") || document.getElementById("home");
      const focusable = current.querySelector('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
      (focusable || current).focus({ preventScroll: true });
    });
  }

  routeFromPath();
});

// Load game/app into player
function loadPlayer(url) {
  const frame = document.getElementById("player-frame");
  if (frame) frame.src = url;
  switchPage("player");
}

function toggleFullscreen() {
  const iframe = document.getElementById("player-frame");
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) {
    iframe.webkitRequestFullscreen();
  } else if (iframe.msRequestFullscreen) {
    iframe.msRequestFullscreen();
  }
}
