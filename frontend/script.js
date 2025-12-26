const API_URL = "http://localhost:3000/movies";

const movieForm = document.getElementById("movieForm");
const movieIdInput = document.getElementById("movieId");
const titleInput = document.getElementById("title");
const genreInput = document.getElementById("genre");
const ratingInput = document.getElementById("rating");
const moviesList = document.getElementById("moviesList");

// Bootstrap modal
const messageModal = new bootstrap.Modal(document.getElementById("messageModal"));
const modalMessage = document.getElementById("modalMessage");

// Funktion för att visa meddelande i modal
function showMessage(message) {
  modalMessage.textContent = message;
  messageModal.show();
}

// Hämta och visa filmer
async function fetchMovies() {
  const res = await fetch(API_URL);
  const movies = await res.json();

  moviesList.innerHTML = movies.map(movie => `
    <div class="col-md-4 mb-3">
      <div class="card p-3 h-100">
        <h5>${movie.title}</h5>
        <p>Genre: ${movie.genre || 'Okänd'}</p>
        <p>Betyg: ${movie.rating || '-'}</p>
        <button class="btn btn-sm btn-warning me-2" onclick="editMovie(${movie.id})">Redigera</button>
        <button class="btn btn-sm btn-danger" onclick="deleteMovie(${movie.id})">Radera</button>
      </div>
    </div>
  `).join('');
}

// Skapa/uppdatera film
movieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const movie = {
    title: titleInput.value,
    genre: genreInput.value,
    rating: ratingInput.value
  };

  if (movieIdInput.value) {
    await fetch(`${API_URL}/${movieIdInput.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie)
    });
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie)
    });
  }

  movieForm.reset();
  movieIdInput.value = '';
  fetchMovies();
});

// Redigera film
async function editMovie(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const movie = await res.json();
  movieIdInput.value = movie.id;
  titleInput.value = movie.title;
  genreInput.value = movie.genre;
  ratingInput.value = movie.rating;
}

// Radera film
async function deleteMovie(id) {
  if (!confirm("Är du säker på att du vill radera denna film?"))return;
  
  try{
    const res = await fetch(`{$API_URL}`, {metod: "DELETE"});
    const data = await res.json();
    showMessage("Filmen har raderats!");
    fetchMovies();
} catch (err){
    showMessage(" Det uppstod ett fel vid borttagningen av filmen, den raderades ej! "+ err.message);
}
   
  
}
 // await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    // fetchMovies();
    
// Init
fetchMovies();
