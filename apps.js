// apps.js — dynamically render app cards into #apps-grid

const apps = [
  { title: "Discord", image: "images/discord.jpg", url: "https://discord.com" },
  { title: "Spotify", image: "images/spotify.jpg", url: "https://open.spotify.com" },
  { title: "AI", image: "images/AI.jpg", url: "https://youtube.com" },
  { title: "Twitch", image: "images/twitch.jpg", url: "https://twitch.tv" }
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
      // Redirect to iframe.html with app URL
      window.location.href = `iframe.html?url=${encodeURIComponent(app.url)}`;
    });
    grid.appendChild(card);
  });
}
