const createBtn = document.getElementById("createBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const eventForm = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");
const filterBtns = document.querySelectorAll(".filter-btn");

let events = [];

createBtn.addEventListener("click", () => modal.classList.add("active"));
closeModal.addEventListener("click", () => modal.classList.remove("active"));

eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const fileInput = document.getElementById("image");
  const image = fileInput.files[0]
    ? URL.createObjectURL(fileInput.files[0])
    : "https://via.placeholder.com/300x150.png?text=No+Image";

  const today = new Date();
  const eventDate = new Date(`${date}T${time}`);
  const status = eventDate < today ? "completed" : "active";

  events.push({ title, date, time, image, status });
  eventForm.reset();
  modal.classList.remove("active");
  renderEvents();
});

function renderEvents(filter = "all") {
  eventList.innerHTML = "";
  const filtered = events.filter(e => filter === "all" || e.status === filter);

  filtered.forEach(e => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <img src="${e.image}" alt="${e.title}">
      <h3>${e.title}</h3>
      <p>${e.date} ${e.time}</p>
      <p>Status: <b style="color:${e.status === 'active' ? '#2cb67d' : '#ccc'}">${e.status}</b></p>
    `;
    eventList.appendChild(card);
  });

  document.getElementById("totalEvents").innerText = events.length;
  document.getElementById("activeEvents").innerText = events.filter(e => e.status === "active").length;
  document.getElementById("completedEvents").innerText = events.filter(e => e.status === "completed").length;
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderEvents(btn.dataset.filter);
  });
});

renderEvents();
