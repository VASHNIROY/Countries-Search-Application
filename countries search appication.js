let searchInputE1 = document.getElementById("searchInput");
let resultCountriesE1 = document.getElementById("resultCountries");
let spinner = document.getElementById("spinner");

let searchInputVal = "";
let countriesList = [];

function createAndAppendCountry(country) {
    let countryE1 = document.createElement("div");
    countryE1.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesE1.appendChild(countryE1);

    let countryFlagE1 = document.createElement("img");
    countryFlagE1.src = country.flag;
    countryFlagE1.classList.add("country-flag", "mt-auto", "mb-auto");
    countryE1.appendChild(countryFlagE1);

    let countryInfoE1 = document.createElement("div");
    countryInfoE1.classList.add("d-flex", "flex-column", "ml-4");
    countryE1.appendChild(countryInfoE1);

    let countryNameE1 = document.createElement("p");
    countryNameE1.textContent = country.name;
    countryNameE1.classList.add("country-name");
    countryInfoE1.appendChild(countryNameE1);

    let countryPopulationE1 = document.createElement("p");
    countryPopulationE1.textContent = country.population;
    countryPopulationE1.classList.add("country-population");
    countryInfoE1.appendChild(countryPopulationE1);
}

function displayresults() {
    resultCountriesE1.textContent = "";
    for (let country of countriesList) {
        let countryName = country.name.toLowerCase();
        if (countryName.includes(searchInputVal)) {
            createAndAppendCountry(country);
        }
    }
}

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";

    let options = {
        method: "GET"
    };
    spinner.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinner.classList.add("d-none");
            countriesList = jsonData;
            displayresults();
        });
}

function onChangeSearchInput(event) {
    searchInputVal = event.target.value;
    displayresults();
}
getCountries();
searchInputE1.addEventListener("keyup", onChangeSearchInput);