// ⚠️ METS TA CLE API ICI
const API_KEY = "TA_CLE_API";

// Charger favoris au démarrage
window.onload = loadFavorites;

function getWeather(cityParam = null) {
  const city = cityParam || document.getElementById("cityInput").value;

  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("weather").innerHTML = "❌ Ville non trouvée";
        return;
      }

      displayWeather(data);
      addFavorite(city);
    });
}

function displayWeather(data) {
  const html = `
    <h2>${data.name}</h2>
    <p>🌡️ Température : ${data.main.temp}°C</p>
    <p>☁️ ${data.weather[0].description}</p>
    <p>💨 Vent : ${data.wind.speed} km/h</p>
  `;

  document.getElementById("weather").innerHTML = html;
}

function addFavorite(city) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
  }
}

function loadFavorites() {
  const list = document.getElementById("favorites");
  list.innerHTML = "";

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.onclick = () => getWeather(city);
    list.appendChild(li);
  });
}
