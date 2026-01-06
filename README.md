# GIK339 – Projekt: CRUD med en resurs
Av Tove & Pernilla

Detta repository innehåller vår lösning av **projektuppgiften** i kursen **GIK339 – Dynamiska webbapplikationer** vid Högskolan Dalarna.

Projektet är en CRUD-applikation (Create, Read, Update, Delete) för resursen **filmer**.

---

## Tekniker
**Backend**
- Node.js
- Express
- SQLite (sqlite3)
- REST API

**Frontend**
- HTML
- CSS
- JavaScript 
- Bootstrap (responsivt gränssnitt)


---

## Funktionalitet
- Skapa, visa, uppdatera och ta bort filmer
- All data hämtas och ändras via ett eget API
- Listan med filmer skapas och uppdateras dynamiskt utan sidomladdning
- Formulär används för både skapande och uppdatering
- Knappar finns för redigering och borttagning
- Feedback visas till användaren via modal

---

## API-endpoints
- `GET /movies`
- `GET /movies/:id`
- `POST /movies`
- `PUT /movies`
- `DELETE /movies/:id`

---

## Databas
- En SQLite-databas med en tabell
- Automatisk id-hantering (AUTOINCREMENT)
- Minst en kolumn påverkar utseendet i gränssnittet

---

## Köra projektet
1. Installera beroenden i backend:
   ```bash
   npm install
   npm start
