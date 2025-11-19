// apps.js — dynamically render app cards into #apps-grid

const apps = [
  { title: "Discord", image: "images/discord.jpg" },
  { title: "Spotify", image: "images/spotify.jpg" },
  { title: "YouTube", image: "images/youtube.jpg" },
  { title: "Twitch", image: "images/twitch.jpg" }
];

function renderApps() {
  const grid = document.getElementById("apps-grid");
  if (!grid) return;

  grid.innerHTML = apps.map(app => `
    <div class="game-card">
      <div class="thumb">
        <img src="${app.image}" alt="${app.title}" />
      </div>
      <h3>${app.title}</h3>
    </div>
  `).join("");
}
