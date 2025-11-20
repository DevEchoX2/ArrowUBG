// games.js — renders game cards into #games section
// games.js — dynamically render game cards into #game-grid

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
const games = [
  { title: "Cuphead", image: "images/cuphead.jpg" },
  { title: "Hollow Knight", image: "images/hollowknight.jpg" },
  { title: "Pizza Tower", image: "images/pizzatower.jpg" },
  { title: "People Playground", image: "images/peopleplayground.jpg" },
  { title: "Blood Money", image: "images/bloodmoney.jpg" },
  { title: "Dice", image: "images/dice.jpg" },
  { title: "Neon Shooter", image: "images/neonshooter.jpg" },
  { title: "Celeste", image: "images/celeste.jpg" }
];

function renderGames() {
  const container = document.getElementById("games");
  if (!container) return;
  const grid = document.getElementById("game-grid");
  if (!grid) return;

  container.innerHTML = ""; // clear previous content

  const grid = document.createElement("div");
  grid.className = "game-grid";

  gameList.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
  grid.innerHTML = games.map(game => `
    <div class="game-card">
     <div class="thumb">
        <img src="${game.thumbnail}" alt="${game.title}" />
        <img src="${game.image}" alt="${game.title}" />
     </div>
     <h3>${game.title}</h3>
      <p>${game.description}</p>
      <a href="${game.launchUrl}" target="_blank" class="play-btn">Play</a>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
    </div>
  `).join("");
}
