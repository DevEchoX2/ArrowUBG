// games.js — dynamically render game cards into #game-grid

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
  const grid = document.getElementById("game-grid");
  if (!grid) return;

  grid.innerHTML = games.map(game => `
    <div class="game-card">
      <div class="thumb">
        <img src="${game.image}" alt="${game.title}" />
      </div>
      <h3>${game.title}</h3>
    </div>
  `).join("");
}
