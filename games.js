// games.js — renders game cards into #games section

const gameList = [
  {
    title: "Slope",
    description: "Dodge obstacles in a neon tunnel.",
    thumbnail: "images/slope.png", // place your slope image here
    launchUrl: "games/slope/index.html" // path to slope game
  },
  {
    title: "Highway Racer",
    description: "Speed through traffic and dodge collisions.",
    thumbnail: "images/highway.png",
    launchUrl: "games/highway/index.html"
  }
  // Add more games here as needed
];

function renderGames() {
  const container = document.getElementById("games");
  if (!container) return;

  container.innerHTML = ""; // clear previous content

  const grid = document.createElement("div");
  grid.className = "game-grid";

  gameList.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <div class="thumb">
        <img src="${game.thumbnail}" alt="${game.title}" />
      </div>
      <h3>${game.title}</h3>
      <p>${game.description}</p>
      <a href="${game.launchUrl}" target="_blank" class="play-btn">Play</a>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
}
