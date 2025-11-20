// apps.js — renders app cards into #apps section
// apps.js — dynamically render app cards into #apps-grid

const appList = [
  {
    title: "Discord Launcher",
    description: "Quickly open and join your favorite servers.",
    thumbnail: "images/discord.png",
    launchUrl: "apps/discord/index.html"
  },
  {
    title: "Proxy Tool",
    description: "Browse securely with a built-in proxy.",
    thumbnail: "images/proxy.png",
    launchUrl: "apps/proxy/index.html"
  }
  // Add more apps here as needed
const apps = [
  { title: "Discord", image: "images/discord.jpg" },
  { title: "Spotify", image: "images/spotify.jpg" },
  { title: "YouTube", image: "images/youtube.jpg" },
  { title: "Twitch", image: "images/twitch.jpg" }
];

function renderApps() {
  const container = document.getElementById("apps");
  if (!container) return;
  const grid = document.getElementById("apps-grid");
  if (!grid) return;

  container.innerHTML = ""; // clear previous content

  const grid = document.createElement("div");
  grid.className = "game-grid"; // reuse same layout

  appList.forEach(app => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
  grid.innerHTML = apps.map(app => `
    <div class="game-card">
     <div class="thumb">
        <img src="${app.thumbnail}" alt="${app.title}" />
        <img src="${app.image}" alt="${app.title}" />
     </div>
     <h3>${app.title}</h3>
      <p>${app.description}</p>
      <a href="${app.launchUrl}" target="_blank" class="play-btn">Open</a>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
    </div>
  `).join("");
}
