const apps = [
  { title: "Discord", image: "https://devechox2.github.io/ArrowUBG/Images/discord.png", url: "https://devechox2.github.io/ArrowUBG/apps/discord.html" },
  { title: "Helios", image: "https://devechox2.github.io/ArrowUBG/Images/Helios.ico", url: "https://devechox2.github.io/ArrowUBG/apps/Helios-Offline.html" },
  { title: "AI", image: "https://devechox2.github.io/ArrowUBG/Images/chatgpt.png", url: "https://devechox2.github.io/ArrowUBG/apps/AI.html" },
  { title: "Twitch", image: "images/twitch.tv" }
];

function renderApps() {
  const grid = document.getElementById("apps-grid");
  if (!grid) return;

  grid.innerHTML = "";

  apps.forEach(app => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <div class="thumb">
        <img src="${app.image}" alt="${app.title}" />
      </div>
      <h3>${app.title}</h3>
    `;
    card.addEventListener("click", () => {
      window.location.href = `iframe.html?url=${encodeURIComponent(app.url)}`;
    });
    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderApps);
