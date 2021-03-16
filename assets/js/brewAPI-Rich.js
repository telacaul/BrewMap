
function findBrewery(city) {

    let breweryAPI = "https://api.openbrewerydb.org/breweries?by_city=" + city;

    fetch(breweryAPI).then(response => response.json()).then(data => console.log(data));
    // console.log to get API info

    fetch(breweryAPI).then(response => response.json()).then(function(data) {
        
    });
}
