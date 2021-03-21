let favoritePlaces = JSON.parse(localStorage.getItem("favoritePlaces"))
let ulPlaces = $("#places")


// Place-holder code below for appending localStorage
var favSectionEl = document.querySelector(".fav-section");

// Grab brew names from local storage (array)
var favorites = JSON.parse(localStorage.getItem("brew-name"));
console.log("favorites", favorites);

// Function to show brewery names on page

function ShowBrew() {
    favSectionEl.innerHTML = "";
    for (var i = 0; i < favorites.length; i++) {
        var favBrew = document.createElement("li");
        favBrew.innerHTML = favorites[i];
        favSectionEl.append(favBrew);
    }
}