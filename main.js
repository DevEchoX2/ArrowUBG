// main.js — navigation + loader overlay integration

document.addEventListener("DOMContentLoaded", () => {
  const navIcons = document.querySelectorAll(".nav-icon");
  const pages = document.querySelectorAll(".page");
  const validPages = Array.from(pages).map(p => p.id);

  // Loader helpers
  function showLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.display = "flex";
      loader.style.opacity = "1";
    }
  }

  function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 600);
    }
  }

  // Switch page logic
  function switchPage(targetPage, pushHash = true) {
    if (!validPages.includes(targetPage)) return;

    showLoader();

    setTimeout(() => {
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

      // Update hash for deep linking
      if (pushHash) {
        history.replaceState(null, "", `#${targetPage}`);
      }

      // Delegate rendering to external scripts
      if (targetPage === "games" && typeof renderGames === "function") {
        renderGames();
      }
      if (targetPage === "apps" && typeof renderApps === "function") {
        renderApps();
      }

      hideLoader();
    }, 800); // simulate load delay
  }

  // Attach click listeners to nav icons
  navIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const targetPage = icon.getAttribute("data-page");
      switchPage(targetPage);
    });
  });

  // Handle hash routing (e.g., /#games)
  function routeFromHash() {
    const hash = (location.hash || "").replace("#", "");
    if (validPages.includes(hash)) {
      switchPage(hash, false);
    } else {
      switchPage("home", false);
    }
  }

  window.addEventListener("hashchange", routeFromHash);

  // Accessibility: Skip to content
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

  // Initial route on page load
  routeFromHash();
});
