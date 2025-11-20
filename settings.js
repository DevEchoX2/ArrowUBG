function renderSettings() {
  const page = document.getElementById("settings");
  if (!page) return;

  page.innerHTML = `
    <h2 id="settings-title">Settings</h2>
    <div class="settings-list">

      <!-- About:blank launcher -->
      <label class="setting-item">
        <i class="fas fa-window-restore"></i>
        <span>Launch in about:blank</span>
        <button id="blank-btn" class="play-btn">Open</button>
      </label>

      <!-- Tab cloaker -->
      <label class="setting-item">
        <i class="fas fa-mask"></i>
        <span>Tab Cloaker</span>
        <button id="cloak-btn" class="play-btn">Toggle</button>
      </label>

      <!-- Language switcher -->
      <label class="setting-item">
        <i class="fas fa-language"></i>
        <span>Language</span>
        <select id="lang-select" class="play-btn">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </label>
    </div>
  `;

  // ✅ About:blank launcher — iframe shell with absolute URL
  const blankBtn = document.getElementById("blank-btn");
  blankBtn?.addEventListener("click", () => {
    const win = window.open("about:blank", "_blank");
    if (!win) return;

    const doc = win.document;
    const fullUrl = location.href; // full absolute URL to current page

    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>ArrowUBG</title>
          <link rel="icon" href="/favicon.ico">
          <style>
            html,body { margin:0; height:100%; overflow:hidden; background:#000; }
            iframe { border:none; width:100%; height:100%; }
          </style>
        </head>
        <body>
          <iframe src="${fullUrl}" allow="fullscreen"></iframe>
        </body>
      </html>
    `);
    doc.close();
  });

  // 🕵️ Tab cloaker
  let cloaked = false;
  const cloakBtn = document.getElementById("cloak-btn");
  cloakBtn?.addEventListener("click", () => {
    cloaked = !cloaked;
    if (cloaked) {
      document.title = "Google Drive";
      const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
      link.rel = "icon";
      link.href = "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";
      document.head.appendChild(link);
      cloakBtn.textContent = "Uncloak";
    } else {
      document.title = "ArrowUBG";
      const link = document.querySelector("link[rel~='icon']");
      if (link) link.href = "/favicon.ico";
      cloakBtn.textContent = "Toggle";
    }
  });

  // 🌐 Language switcher
  const langSelect = document.getElementById("lang-select");
  const tagline = document.querySelector(".tagline");

  const translations = {
    en: "Peak gaming. Peak style. Peak freedom.",
    es: "Máximo juego. Máximo estilo. Máxima libertad.",
    fr: "Jeu ultime. Style ultime. Liberté ultime.",
    de: "Top Gaming. Top Stil. Top Freiheit."
  };

  const savedLang = localStorage.getItem("arrowLang") || "en";
  if (langSelect) langSelect.value = savedLang;
  if (tagline) tagline.textContent = translations[savedLang];

  langSelect?.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("arrowLang", lang);
    if (tagline) {
      tagline.textContent = translations[lang] || translations["en"];
    }
  });
}
