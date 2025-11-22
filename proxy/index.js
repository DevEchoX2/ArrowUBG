const searchInput = document.getElementById('search-input');
const engineSelect = document.getElementById('engine-select');
const searchButton = document.getElementById('search-button');
const iframe = document.getElementById('proxy-iframe');
const loadingIndicator = document.getElementById('loading-indicator');
const closeButton = document.getElementById('close-button');
const fullscreenButton = document.getElementById('fullscreen-button');

function buildSearchUrl(query, engine) {
  if (query.startsWith("http://") || query.startsWith("https://")) return query;
  switch(engine) {
    case "brave": return "https://search.brave.com/search?q=" + encodeURIComponent(query);
    case "duckduckgo": return "https://duckduckgo.com/?q=" + encodeURIComponent(query);
    case "google": return "https://www.google.com/search?q=" + encodeURIComponent(query);
    case "bing": return "https://www.bing.com/search?q=" + encodeURIComponent(query);
    default: return "https://search.brave.com/search?q=" + encodeURIComponent(query);
  }
}

function performSearch() {
  const query = searchInput.value.trim();
  if (!query) return;
  const engine = engineSelect.value;
  const url = buildSearchUrl(query, engine);

  if (engine === "google" || engine === "bing") {
    window.location.href = url;
    return;
  }

  loadingIndicator.textContent = "Loading...";
  iframe.style.display = "none";
  iframe.src = url;

  iframe.onload = () => {
    loadingIndicator.style.display = "none";
    iframe.style.display = "block";
  };
  iframe.onerror = () => {
    loadingIndicator.textContent = "Error loading site.";
  };
}

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keydown", e => { if (e.key === "Enter") performSearch(); });

closeButton.addEventListener("click", () => {
  window.location.href = "../index.html";
});

fullscreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    iframe.requestFullscreen().catch(err => console.log(err));
  } else {
    document.exitFullscreen();
  }
});
