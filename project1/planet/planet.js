let nameH1;
let climateSpan;
let terrainSpan;
let populationSpan;
let gravitySpan;
let diameterSpan;
let rotation_periodSpan;
let surface_waterSpan;
let oribital_periodSpan
let characterListUl;
let filmUl;
const baseUrl = `http://localhost:9001/api/planets`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  climateSpan = document.querySelector("span#climate");
  terrainSpan = document.querySelector("span#terrain");
  populationSpan = document.querySelector("span#population");
  gravitySpan = document.querySelector("span#gravity");
  diameterSpan = document.querySelector("span#diameter");
  rotation_periodSpan = document.querySelector("span#rotation_period");
  surface_waterSpan = document.querySelector("span#surface_water");
  oribital_periodSpan = document.querySelector("span#orbital_period");
  characterListUl = document.querySelector("#characterList>ul");
  filmsUl = document.querySelector("#films>ul");
  sp = new URLSearchParams(window.location.search);
  id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id);
    planet.films = await fetchFilm(planet);
    planet.characters = await fetchCharacters(planet);
  } catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/${id}`;
  return await fetch(planetUrl).then((res) => res.json());
}

async function fetchFilm(planet) {
  const url = `${baseUrl}/${planet?.id}/films`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/${film?.id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

const renderPlanet = (planet) => {
  nameH1.textContent = planet.name;
  climateSpan.textContent = planet.climate;
  terrainSpan.textContent = planet.terrain;
  populationSpan.textContent = planet.population;
  gravity.textContent = planet.gravity;
  diameter.textContent = planet.diameter;
  rotation_periodSpan.textContent = planet.rotation_period;

  if (!(planet.surface_water === "unknown")) {
    surface_waterSpan.textContent = planet.surface_water + "%";
  }
  else {
    surface_waterSpan.textContent = planet.surface_water;
  }

  oribital_periodSpan.textContent = planet.orbital_period;
  filmsList = planet?.films?.map(
    (films) =>
      `<li><a href="/film/index.html?id=${films.id}">${films.title}</li>`
  );
  const characterList = planet?.characters?.map(
    (characters) =>
      `<li><a href="/character/index.html?id=${characters.id}">${characters.name}</li>`
  );
  console.log(characterList);
  filmsUl.innerHTML = filmsList.join("");
  characterListUl.innerHTML = characterList.join("");
};
