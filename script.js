function connect() {
    var searchTerm = document.getElementById("searchBox").value;
    var url = `https://restcountries.com/v3.1/name/${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => display(data));
}

function display(data) {
    var countryInfo = data;
    var oldContent = document.getElementById("resultscontainer");
    oldContent.textContent = "";

    var newDiv = document.createElement("div");

    newDiv.innerHTML = `Country Name: ${countryInfo[0].name.common}<br>
                        Official Name: ${countryInfo[0].name.official}<br>
                        Capital: ${countryInfo[0].capital}<br>
                        Independent: ${countryInfo[0].independent}
                        <button onclick="fetchAdditionalDetails('${countryInfo[0].capital}')">More Details</button>`;

    newDiv.classList.add("countryStyle");
    oldContent.appendChild(newDiv);
}

function fetchAdditionalDetails(countryName) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=7a4b54086e73ae11a4546bb1df43ef4d`;

    fetch(weatherUrl)
        .then(res => res.json())
        .then(weatherData => displayAdditionalDetails(weatherData))
        .catch(error => console.error("Error fetching additional details:", error));
}

function displayAdditionalDetails(weatherData) {
    var oldContent = document.getElementById("resultscontainer");
    var additionalDetailsDiv = document.createElement("div");

    additionalDetailsDiv.innerHTML = `Temperature: ${weatherData.main.temp} °C<br>
                                      Feels Like: ${weatherData.main.feels_like}°C<br>
                                      Min Temperature: ${weatherData.main.temp_min}°C<br>
                                      Max Temperature: ${weatherData.main.temp_max} °C<br>`


    additionalDetailsDiv.classList.add("additionalDetailsStyle");
    oldContent.appendChild(additionalDetailsDiv);
}