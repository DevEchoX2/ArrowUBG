// settings.js — interactive Settings controls

function renderSettings() {
  const page = document.getElementById("settings");
  if (!page) return;

  page.innerHTML = `
    <h2 id="settings-title">Settings</h2>
    <div class="settings-list">

      <!-- About:blank toggle -->
      <label class="setting-item">
        <i class="fas fa-window-restore"></i>
        <span>Launch in about:blank</span>
        <button id="blank-btn" class="play-btn">Open</button>
      </label>

      <!-- Tab cloaker toggle -->
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
          <option value="en" selected>English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </label>
    </div>
  `;

  // About:blank launcher
  const blankBtn = document.getElementById("blank-btn");
  blankBtn?.addEventListener("click", () => {
    const win = window.open("about:blank", "_blank");
    if (win) {
      const doc = win.document;
      doc.write(`<iframe src="${location.href}" style="border:none;width:100%;height:100%"></iframe>`);
      doc.close();
    }
  });

  // Tab cloaker
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

  // Language switcher
  const langSelect = document.getElementById("lang-select");
  langSelect?.addEventListener("change", (e) => {
    const lang = e.target.value;
    alert("Language switched to: " + lang);
    // Hook: you can load translations or redirect here
  });
}
