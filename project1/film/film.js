let titleH1;
let episodeIdSpan;
let directorSpan;
let releaseDateSpan;
let openingcrawlSpan;
let characterListUl;
let planetListUl;
const baseUrl = `http://localhost:9001/api/films`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  titleH1 = document.querySelector("h1#title");
  episodeIdSpan = document.querySelector("span#episode_id");
  directorSpan = document.querySelector("span#director");
  releaseDateSpan = document.querySelector("span#release_date");
  openingcrawlSpan = document.querySelector("span#opening_crawl");
  planetListUl = document.querySelector("#planetList>ul");
  characterListUl = document.querySelector("#characterList>ul");
  sp = new URLSearchParams(window.location.search);
  id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id);
    film.planet = await fetchPlanet(film);
    film.characters = await fetchCharacters(film);
  } catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);
}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/${id}`;
  return await fetch(filmUrl).then((res) => res.json());
}

async function fetchPlanet(film) {
  const url = `${baseUrl}/${film?.id}/planets`;
  const planet = await fetch(url).then((res) => res.json());
  return planet;
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/${film?.id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

const renderFilm = (film) => {
  // const producerH1 = document.querySelector('h1#producer');
  //   const titleSpan = document.querySelector('span#title');
  //   const episodeIdSpan = document.querySelector('span#episode_id');
  //   const directorSpan = document.querySelector('span#director');
  //   const releaseDateSpan = document.querySelector('span#release_date');
  //   const openingcrawlSpan = document.querySelector('span#opnening_crawl');
  //   const planetListUl = document.querySelector('#planetList>ul');
  //   const characterListUl = document.querySelector('#characterList>ul');
  document.title = `SWAPI - ${film.title}`; // Just to make the browser tab say their name
  titleH1.textContent = film.title;
  episodeIdSpan.textContent = film.episode_id;
  directorSpan.textContent = film.director;
  releaseDateSpan.textContent = film.release_date;
  openingcrawlSpan.textContent = film.opening_crawl;
  planetsList = film?.planet?.map(
    (planets) =>
      `<li><a href="/planet/index.html?id=${planets.id}">${planets.name}</li>`
  );
  const characterList = film?.characters?.map(
    (characters) =>
      `<li><a href="/character/index.html?id=${characters.id}">${characters.name}</li>`
  );
  planetListUl.innerHTML = planetsList.join("");
  characterListUl.innerHTML = characterList.join("");
};
