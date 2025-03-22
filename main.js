async function getCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        renderCountries(countries);

        // Qidiruv eventini qo'shish
        document.getElementById('search-box').addEventListener('input', function () {
            filterCountries(countries, this.value);
        });

    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
}

function renderCountries(countries) {
    const container = document.getElementById('countries-container');
    container.innerHTML = '';

    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');

        countryCard.innerHTML = `
            <div class="flag-container">
                <img class="flag" src="${country.flags?.svg || country.flags?.png}" alt="${country.name.common} bayrog'i">
            </div>
            <div class="info">
                <h3 class="country-name">${country.name.common}</h3>
                <p class="detail"><strong>Poytaxt:</strong> ${country.capital ? country.capital[0] : 'Noma’lum'}</p>
                <p class="detail"><strong>Hudud:</strong> ${country.region}</p>
                <p class="detail"><strong>Aholi:</strong> ${country.population.toLocaleString()}</p>
            </div>
        `;

        container.appendChild(countryCard);
    });
}

// Qidiruv funksiyasi
function filterCountries(countries, searchText) {
    const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
    );
    renderCountries(filtered);
}

document.addEventListener('DOMContentLoaded', getCountries);
