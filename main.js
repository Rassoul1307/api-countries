const allCountries = document.querySelector('.contries');
const africaCountries = document.querySelector('.contries-africa');
const europeCountries = document.querySelector('.contries-europe');
const asiaCountries = document.querySelector('.contries-asia');
const americaCountries = document.querySelector('.contries-america');
const oceaniaCountries = document.querySelector('.contries-oceania');
const selectElement = document.getElementById("regionSelect");
const countrySearchInput = document.getElementById('inputBox');
const searchButton = document.getElementById('searchButton');
const darkModeButton = document.querySelector('.dark-mode')
const body = document.body; 
// console.log(darkMode);
// Vérifiez si le mode sombre est activé dans le localStorage au chargement de la page
const isDarkMode = localStorage.getItem('bg-dark') === 'true';

// Appliquez le mode sombre si nécessaire
if (isDarkMode) {
    body.classList.add('bg-dark');
    document.querySelector('.banner').classList.add('bg-dark');
    document.querySelector('.banner').classList.add('text-white');
    document.querySelector('.inputBox_container').classList.add('bg-secondary');
}

// Gestion du mode sombre
darkModeButton.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    body.classList.toggle('bg-dark');
    document.querySelector('.banner').classList.toggle('bg-dark');
    document.querySelector('.banner').classList.toggle('text-white');
    document.querySelector('.inputBox_container').classList.toggle('bg-secondary');

    // Enregistrez l'état du mode sombre dans le localStorage
    const isDarkModeEnabled = body.classList.contains('bg-dark');
    localStorage.setItem('bg-dark', isDarkModeEnabled);
}


// Ajoutez un gestionnaire d'événements pour la recherche
searchButton.addEventListener('click', () => {
    searchCountryByName();
});

countrySearchInput.addEventListener('input', () => {
    searchCountryByName();
});

function searchCountryByName() {
    const searchValue = countrySearchInput.value.trim().toLowerCase();

    // Montrez ou cachez les pays en fonction de la recherche
    Array.from(allCountries.children).forEach(country => {
        const countryName = country.querySelector('h6').textContent.toLowerCase();
        if (countryName.includes(searchValue)) {
            country.style.display = 'block';
        } else {
            country.style.display = 'none';
        }
    });
}


function createCountryBox(country) {
  let boxCountry = document.createElement('div');
  boxCountry.classList.add('box-contry');

  // Crée un lien pour ouvrir la page de détails du pays
  const countryLink = document.createElement('a');
  countryLink.href = `country-details.html?code=${country.cca2}`;


  const boxImg = document.createElement('div');
  const boxText = document.createElement('div');
  boxImg.className += 'boximg'
boxText.className += 'boxtext'
  const countryFlag = document.createElement('img');
  countryFlag.src = country.flags.png;
  boxImg.appendChild(countryFlag);
  boxCountry.appendChild(boxImg);
  boxText.innerHTML = `
    <h6>${country.name.common}</h6>
    <p><b>Population</b>: ${country.population}</p>
    <p><b>Region</b>: ${country.region}</p>
    <p><b>Capital</b>: ${country.capital}</p>
  `;
  boxCountry.appendChild(boxText);

  // Ajoute le lien au conteneur
  countryLink.appendChild(boxImg);
  countryLink.appendChild(boxText);
  boxCountry.appendChild(countryLink);
  return boxCountry;
}

function displayCountries(container, data) {
  container.innerHTML = '';
  data.forEach((country) => {
    const boxCountry = createCountryBox(country);
    container.appendChild(boxCountry);
  });
  container.classList.remove("d-none");
}

function fetchCountriesByRegion(region, container) {
  fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then(response => response.json())
    .then((data) => {
      displayCountries(container, data);
    });
}

selectElement.addEventListener("change", function () {
  let selectedValue = selectElement.value;

  if (selectedValue === "africa") {
    fetchCountriesByRegion('africa', africaCountries);
    allCountries.classList.add("d-none");
    europeCountries.classList.add("d-none");
    asiaCountries.classList.add("d-none");
    americaCountries.classList.add("d-none");
    oceaniaCountries.classList.add("d-none");
  } else if (selectedValue === "europe") {
    fetchCountriesByRegion('europe', europeCountries);
    allCountries.classList.add("d-none");
    africaCountries.classList.add("d-none");
    asiaCountries.classList.add("d-none");
    americaCountries.classList.add("d-none");
    oceaniaCountries.classList.add("d-none");
  } else if (selectedValue === "asia") {
    fetchCountriesByRegion('asia', asiaCountries);
    allCountries.classList.add("d-none");
    africaCountries.classList.add("d-none");
    americaCountries.classList.add("d-none");
    oceaniaCountries.classList.add("d-none");
    europeCountries.classList.add("d-none");
  } else if (selectedValue === "america") {
    fetchCountriesByRegion('america', americaCountries);
    allCountries.classList.add("d-none");
    africaCountries.classList.add("d-none");
    europeCountries.classList.add("d-none");
    europeCountries.classList.add("d-none");
    asiaCountries.classList.add("d-none");
    oceaniaCountries.classList.add("d-none");
  } else if (selectedValue === "oceania") {
    fetchCountriesByRegion('oceania', oceaniaCountries);
    allCountries.classList.add("d-none");
    africaCountries.classList.add("d-none");
    europeCountries.classList.add("d-none");
    asiaCountries.classList.add("d-none");
    americaCountries.classList.add("d-none");
  } else {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then((data) => {
        displayCountries(allCountries, data);
        africaCountries.classList.add("d-none");
        europeCountries.classList.add("d-none");
        asiaCountries.classList.add("d-none");
        americaCountries.classList.add("d-none");
        oceaniaCountries.classList.add("d-none");
      });
  }
});

// Charge tous les pays au démarrage
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    displayCountries(allCountries, data);
  });
