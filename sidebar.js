// Neon Sidebar Navigation Logic for ArrowUBG

// Grab all nav icons
const navIcons = document.querySelectorAll('.nav-icon');
const viewer = document.getElementById('viewer');

// Attach click events
navIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    // Remove active class from all icons
    navIcons.forEach(i => i.classList.remove('active'));

    // Add active class to the clicked icon
    icon.classList.add('active');

    // Get the page type from data attribute
    const page = icon.getAttribute('data-page');

    // Decide what to load into the iframe
    switch (page) {
      case 'home':
        viewer.src = 'home.html';
        break;
      case 'games':
        viewer.src = 'games.html';
        break;
      case 'apps':
        viewer.src = 'apps.html';
        break;
      case 'search':
        viewer.src = 'proxy.html';
        break;
      case 'donate':
        viewer.src = 'donate.html';
        break;
      case 'settings':
        viewer.src = 'settings.html';
        break;
      default:
        viewer.src = '';
    }

    // Make sure iframe is visible
    viewer.style.display = 'block';
  });
});

// Optional: set default page on load
window.addEventListener('DOMContentLoaded', () => {
  const defaultIcon = document.querySelector('.nav-icon.active');
  if (defaultIcon) {
    const page = defaultIcon.getAttribute('data-page');
    if (page === 'home') viewer.src = 'home.html';
  }
});
