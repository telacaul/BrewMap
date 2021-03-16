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

function findBrewery(city) {

    let breweryAPI = "https://api.openbrewerydb.org/breweries?by_city=" + city;

    fetch(breweryAPI).then(response => response.json()).then(data => console.log("brewery", data));
    // console.log to get API info

    // OpenBrewery API Section ------
    fetch(breweryAPI).then(response => response.json()).then(function(data) {
        var labelsEl = document.querySelector("#brewery");
        for (var i = 0; i < labelsEl.clientHeight; i++) {
            labelsEl[i].innerHTML = "";

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
    });
}
