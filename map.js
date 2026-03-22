// Wait for page to load
document.addEventListener("DOMContentLoaded", () => {
  // Create the map (centered on Vancouver)
  const map = L.map("map").setView([49.2827, -123.1207], 11);

  // Add map tiles (this is the actual map)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
});

