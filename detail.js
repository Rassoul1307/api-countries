
// Récupère le code du pays depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get('code');
const countryDetailsContainer = document.getElementById('country-details');

// Charge les détails du pays en utilisant le code
fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
    .then(response => response.json())
    .then(data => {
        const country = data[0];
        const countryFlag = document.createElement('img');
        countryFlag.src = country.flags.png;

        const countryName = document.createElement('h2');
        countryName.textContent = country.name.common;

        const population = document.createElement('p');
        population.innerHTML = `<b>Population</b>: ${country.population}`;

        const region = document.createElement('p');
        region.innerHTML = `<b>Region</b>: ${country.region}`;

        const area = document.createElement('p');
        area.innerHTML = `<b>area</b>: ${country.area}`;

        const cca2 = document.createElement('p');
        cca2.innerHTML = `<b>cca2</b>: ${country.cca2}`;

        const maps = document.createElement('p');
        maps.innerHTML = `<b>maps</b>: ${country.maps.googleMaps}`;

        const capital = document.createElement('p');
        capital.innerHTML = `<b>capital</b>: ${country.capital}`;

        const status = document.createElement('p');
        status.innerHTML = `<b>status</b>: ${country.status}`;

        countryDetailsContainer.appendChild(countryFlag);
        countryDetailsContainer.appendChild(countryName);
        countryDetailsContainer.appendChild(population);
        countryDetailsContainer.appendChild(region);
        countryDetailsContainer.appendChild(capital);
        countryDetailsContainer.appendChild(area);
        countryDetailsContainer.appendChild(cca2);
        countryDetailsContainer.appendChild(maps);
        countryDetailsContainer.appendChild(status);
    })
    .catch(error => {
        console.error('Une erreur est survenue :', error);
    });