// 🌤 Weather Widget (OpenWeatherMap API)
const weatherEl = document.getElementById('weather');
const timeEl = document.getElementById('time');
const eventsGrid = document.getElementById('eventsGrid');

// ====== LIVE CLOCK ======
function updateTime() {
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// ====== WEATHER ======
async function getWeather(lat, lon) {
  const API_KEY = 'YOUR_API_KEY_HERE'; // 🔑 Get from https://openweathermap.org/api
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const temp = Math.round(data.main.temp);
    const city = data.name;
    const desc = data.weather[0].description;
    weatherEl.textContent = `${city} • ${temp}°C • ${desc}`;
  } catch (err) {
    weatherEl.textContent = "Unable to fetch weather 🌧️";
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => getWeather(pos.coords.latitude, pos.coords.longitude),
    () => weatherEl.textContent = "Location blocked 🔒"
  );
} else {
  weatherEl.textContent = "Geolocation not supported.";
}

// ====== DUMMY EVENTS ======
const events = [
  {
    image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa",
    title: "Annual Tech Conference",
    date: "2025-11-15",
    status: "Upcoming"
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    title: "Food Festival 2025",
    date: "2025-10-10",
    status: "Completed"
  },
  {
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
    title: "Startup Meetup",
    date: "2025-11-02",
    status: "Upcoming"
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    title: "AI Hackathon",
    date: "2025-09-22",
    status: "Completed"
  }
];

// ====== Render Events ======
function renderEvents() {
  eventsGrid.innerHTML = "";
  events.forEach(e => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <img src="${e.image}" alt="${e.title}">
      <h3>${e.title}</h3>
      <p>${new Date(e.date).toDateString()}</p>
      <span class="status ${e.status.toLowerCase()}">${e.status}</span>
    `;
    eventsGrid.appendChild(card);
  });
}
renderEvents();
