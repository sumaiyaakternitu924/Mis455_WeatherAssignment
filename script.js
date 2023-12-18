function connect() {

    var searchTerm = document.getElementById("searchBox").value;

    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=7a4b54086e73ae11a4546bb1df43ef4d`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => display(data))

}

function display(data) {

    var weatherInfo = data.list;
    console.log(weatherInfo);

    var oldContent = document.getElementById("resultscontainer");
    oldContent.textContent = "";

    for (var i = 0; i < 5; i++) {

        var newDiv = document.createElement("div");

        var dt_txt = weatherInfo[i].dt_txt;
        var todayDate = dt_txt.substr(0, 10);
        var todayTime = dt_txt.substr(12, 20);

        newDiv.innerHTML = `Date: ${todayDate}<br>
                           Time: ${todayTime}<br>
                           Temperature: ${weatherInfo[i].main.temp}°C<br>
                           Feels Like: ${weatherInfo[i].main.feels_like}°C<br>
                           Min Temperature: ${weatherInfo[i].main.temp_min}°C<br>
                           Max Temperature: ${weatherInfo[i].main.temp_max} °C<br>
                           Humidity: ${weatherInfo[i].main.humidity}%<br>
                           Weather: <img src="https://openweathermap.org/img/wn/${weatherInfo[i].weather[0].icon}@2x.png" alt="Weather image">`


        newDiv.classList.add("weatherStyle");
        oldContent.appendChild(newDiv);
    }

}