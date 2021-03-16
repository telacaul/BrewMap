
function findBrewery(zipCode) {

    let breweryAPI = "https://api.openbrewerydb.org/breweries?by_postal=" + zipCode;

    fetch(breweryAPI).then(response => response.json()).then(data => console.log(data));
    // console.log to get API info

    fetch(breweryAPI).then(response => response.json()).then(function)
}
