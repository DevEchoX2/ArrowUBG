// games.js — dynamically render game cards into #game-grid

const games = [
  { title: "Cuphead", image: "images/cuphead.jpg", url: "https://example.com/cuphead" },
  { title: "Hollow Knight", image: "images/hollowknight.jpg", url: "https://example.com/hollowknight" },
  { title: "Pizza Tower", image: "images/pizzatower.jpg", url: "https://example.com/pizzatower" },
  { title: "People Playground", image: "images/peopleplayground.jpg", url: "https://example.com/peopleplayground" },
  { title: "Blood Money", image: "images/bloodmoney.jpg", url: "https://example.com/bloodmoney" },
  { title: "Dice", image: "images/dice.jpg", url: "https://example.com/dice" },
  { title: "Neon Shooter", image: "images/neonshooter.jpg", url: "https://example.com/neonshooter" },
  { title: "Celeste", image: "https://devechox2.github.io/ArrowUBG/Images/celeste.jpeg", url: "https://example.com/celeste" }
];

function renderGames() {
  const grid = document.getElementById("game-grid");
  if (!grid) return;

  grid.innerHTML = "";

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <div class="thumb">
        <img src="${game.image}" alt="${game.title}" />
      </div>
      <h3>${game.title}</h3>
    `;
    card.addEventListener("click", () => {
      // Redirect to iframe.html with game URL
      window.location.href = `iframe.html?url=${encodeURIComponent(game.url)}`;
    });
    grid.appendChild(card);
  });
}
