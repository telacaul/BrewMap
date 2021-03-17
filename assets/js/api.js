// Document variables
var inputEl = document.querySelector(".input");
var searchButton = document.querySelector("#searchBtn");
var modalEl = document.querySelector(".modal");
var modalBg = document.querySelector(".modal-background");
var closeBtn = document.querySelector(".delete");
var closeBtnBottom = document.querySelector("#close");

searchButton.addEventListener("click", function() {
    modalEl.classList.add("is-active");
    var enterCity = inputEl.value.split("").join("");
    findBrewery(enterCity);
});

// clickable function for modal buttons
modalBg.addEventListener("click", function() {
    modalEl.classList.remove("is-active");
});

closeBtn.addEventListener("click", function() {
    modalEl.classList.remove("is-active");
});

closeBtnBottom.addEventListener("click", function() {
    modalEl.classList.remove("is-active");
});

// Function to fetch data
function findBrewery(city) {

    let breweryAPI = "https://api.openbrewerydb.org/breweries?by_city=" + city;

    fetch(breweryAPI).then(response => response.json()).then(data => console.log("brewery", data));
    // console.log to get API info

    // OpenBrewery API Section ------
    fetch(breweryAPI).then(response => response.json()).then(function(data) {
        var labelsEl = document.querySelectorAll("#brewery");
        for (var i = 0; i < labelsEl.length; i++) {
            labelsEl[i].innerHTML = "";

            // get Brew Name
            var nameData = data[i].name;
            var names = document.createElement("p");

            names.innerHTML = "* " + nameData;
            labelsEl[i].append(names);

            // get Brew Type
            var type = data[i].brewery_type;
            var brewType = document.createElement("h2");

            brewType.innerHTML = "Type: " + type;
            labelsEl[i].append(brewType);

            //get Address
            var address = data[i].street;
            var brewAddy = document.createElement("h2");

            brewAddy.innerHTML = "address: " + address;
            labelsEl[i].append(brewAddy);

            //get Website
            var website = data[i].website_url;
            var webAddress = document.createElement("a");
            webAddress.classList.add("button", "is-white");
            webAddress.setAttribute("href", website);
            
            webAddress.innerHTML = website;
            labelsEl[i].append(webAddress);

            // Dynamic Click Event Section
            var lat = data[i].latitude;
            var lon = data[i].longitude;
            var barName = data[i].name;
            var street = data[i].street;
            names.dataset.lat = lat;
            names.dataset.lon = lon;
            names.dataset.barName = barName;
            names.dataset.street = street;

            names.addEventListener('click', function() {
                GetMap(this.dataset.lat, this.dataset.lon, this.dataset.barName, this.dataset.street);
            })

        }


        // Bing Maps API Section ------

        // variables 
        var lat = data[i].latitude;
        var lon = data[i].longitude;
        var postalCode = data[i].postal_code;
        var barName = data[i].name;
        var street = data[i].street;

        var mapKey = "Ava6c7xEN-FISpqll60LNKEhdYNkr0RGC2jZoFb2l02vg2lTmQ3aLT8BFWivGKEO";

        // API link
        let mapAPI = `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=us&postalCode=${postalCode}&addressLine=${street}&maxResults=5&key=${mapKey}`;

        
        fetch(mapAPI).then(response => response.json()).then(map => console.log("map", map));
        // console log to see data from API 

        // Bing Maps function ----
        function GetMap(latitude, longitude, barTitle, address) {

            // Code below is acquired from Bing Maps website
            var map = new Microsoft.Maps.Map('.map', {
                credentials: mapKey,
                center: new Microsoft.Maps.Location(latitude, longitude)
            });
            console.log("map", map);
    
            var center = map.getCenter();
    
            //Create custom Pushpin
            var pin = new Microsoft.Maps.Pushpin(center, {
                title: barTitle,
                subTitle: address,
                text: '!'
            });
    
            //Add the pushpin to the map
            map.entities.push(pin);
        }

        GetMap(lat, lon, barName, street);
    });
}