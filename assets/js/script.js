var titleListEl = $("#titleList");
var headlinEl = $("#headline");
var titleArray = [];
var buttonIdArray = [];
var titlePosterArray = [];
var titleSynopsisArray = [];
var titleTrailerArray = [];
var selectedPoster = "";
var selectedSynopsis = "";
var selectedTrailer = "";
var cinemaArray = [];
var cinemaAddressArray = [];
var cinemaCityArray = [];
var cinemaStateArray = [];
var cinemaZipArray = [];
var cinemaDistanceArray = [];
var selectedAddress = "";
var selectedCity = "";
var selectedState = "";
var selectedZip = "";
var selectedDistance = "";
var restaurantArray = [];
var cinemaLatArray = [];
var cinemaLongArray = [];
var restaurantDistanceArray = [];
var restaurantImageArray = [];
var restaurantURLArray = [];
var selectedRestaurantDistance = "";
var selectedRestaurantImage = "";
var selectedRestaurantURL = "";
var cors = "https://cors-anywhere.herokuapp.com/";
var currentTime = moment().format("YYYY-MM-DDTHH:mm:ss") + "Z";
var selectedFilmName = "";
var selectedTheaterName = "";
var selectedRestaurantName = "";
var currentLat = "";
var currentLong = "";
var filmSettings = {
    url: cors + "https://api-gate2.movieglu.com/filmsNowShowing/?",
    method: "GET",
    timeout: 0,
    headers: {
        "x-api-key": "6tgtdCPOgm4uOBytbc1op77M72MMCvAk6JfcNWiT",
        client: "GT",
        authorization: "Basic UFJPSl8xNDpWYU5wTXcxS2xMZ2I=",
        territory: "US",
        "api-version": "v200",
        geolocation: "33.753746;-84.386330",
        "device-datetime": currentTime,
    },
};

$.ajax(filmSettings).done(function (response) {
    for (i = 0; i < 10; i++) {
        titleArray.push(response.films[i].film_name);
        buttonIdArray.push(response.films[i].film_id);
        titlePosterArray.push(response.films[i].images.poster[1].medium.film_image)
        titleSynopsisArray.push(response.films[i].synopsis_long)
        titleTrailerArray.push(response.films[i].film_trailer)
       
    }
    
    for (i = 0; i < titleArray.length; i++) {
        var listEl = $("<h6>");
        var titleButtonEl = $("<button>");
        titleButtonEl.attr("class", "card titleBtn");
        titleButtonEl.attr("type", "button");
        titleButtonEl.attr("id", i);
        titleButtonEl.text(titleArray[i]);
        listEl.append(titleButtonEl);
        titleListEl.append(listEl);
    }
});

// console.log(currentTime)

$(document).on("click", ".titleBtn", function (event) {
    selectedFilmName = $(event.target).text();
    selectedFilmId = buttonIdArray[$(event.target).attr("id")];
    titleListEl.empty();
    headlinEl.text("Nearby Theaters");
    console.log(selectedFilmId);
    selectedPoster = titlePosterArray[$(event.target).attr("id")]
    selectedSynopsis = titleSynopsisArray[$(event.target).attr("id")]
    selectedTrailer = titleTrailerArray[$(event.target).attr("id")]


    var closestSettings = {
        url:
            cors +
            "https://api-gate2.movieglu.com/closestShowing/?film_id=" +
            selectedFilmId,
        method: "GET",
        timeout: 0,
        headers: {
            "x-api-key": "6tgtdCPOgm4uOBytbc1op77M72MMCvAk6JfcNWiT",
            client: "GT",
            authorization: "Basic UFJPSl8xNDpWYU5wTXcxS2xMZ2I=",
            territory: "US",
            "api-version": "v200",
            geolocation: "33.753746;-84.386330",
            "device-datetime": currentTime,
        },
    };

    $.ajax(closestSettings).done(function (response) {
        for (i = 0; i < 5; i++) {
            cinemaArray.push(response.cinemas[i].cinema_name);
            cinemaLatArray.push(response.cinemas[i].lat);
            cinemaLongArray.push(response.cinemas[i].lng);
            cinemaAddressArray.push(response.cinemas[i].address);
            cinemaCityArray.push(response.cinemas[i].city);
            cinemaStateArray.push(response.cinemas[i].state);
            cinemaZipArray.push(response.cinemas[i].postcode);
            cinemaDistanceArray.push(response.cinemas[i].distance);
        }
       
        for (i = 0; i < cinemaArray.length; i++) {
            var listEl = $("<h6>");
            var titleButtonEl = $("<button>");
            titleButtonEl.attr("class", "card theaterBtn");
            titleButtonEl.attr("type", "button");
            titleButtonEl.attr("id", i);
            titleButtonEl.text(cinemaArray[i]);
            listEl.append(titleButtonEl);
            titleListEl.append(listEl);
        }
    });
});

$(document).on("click", ".theaterBtn", function (event) {
    titleListEl.empty();
    headlinEl.text("Nearest Restaurants");
    selectedTheaterId = cinemaLatArray[$(event.target).attr("id")] + "," + cinemaLongArray[$(event.target).attr("id")];
    selectedTheaterName = $(event.target).text();
    selectedAddress = cinemaAddressArray[$(event.target).attr("id")]
    selectedCity = cinemaCityArray[$(event.target).attr("id")]
    selectedState = cinemaStateArray[$(event.target).attr("id")]
    selectedZip = cinemaZipArray[$(event.target).attr("id")]
    selectedDistance = cinemaDistanceArray[$(event.target).attr("id")]
    latLongArray = selectedTheaterId.split(",");
    var yelpSettings = {
        url:
            cors +
            "https://api.yelp.com/v3/businesses/search?latitude=" +
            latLongArray[0] +
            "&longitude=" +
            latLongArray[1],
        method: "GET",
        headers: {
            authorization:
                "Bearer qItHfBqMcXSXkVpMIcSF71I2KbHwRJ-rxNbzAQGIHcPc-OHxM0V-xAedcHX55dgcgoxi_VEKSgbC9RBnQjdAqDQDgvbo_lENXqYxeGhD6GV_KLJHPCKKYznDY1diX3Yx",
        },
    };

    $.ajax(yelpSettings).done(function (yelpResponse) {
        console.log(yelpResponse);
        for (i = 0; i < 10; i++) {
            restaurantArray.push(yelpResponse.businesses[i].name);
            restaurantDistanceArray.push(yelpResponse.businesses[i].distance);
            restaurantImageArray.push(yelpResponse.businesses[i].image_url);
            restaurantURLArray.push(yelpResponse.businesses[i].url);
           
        }
        console.log(restaurantArray);
        for (i = 0; i < restaurantArray.length; i++) {
            var listEl = $("<h6>");
            var titleButtonEl = $("<button>");
            titleButtonEl.attr("class", "card restaurantBtn");
            titleButtonEl.attr("type", "button");
            titleButtonEl.attr("id", i);
            titleButtonEl.text(restaurantArray[i]);
            listEl.append(titleButtonEl);
            titleListEl.append(listEl);
        }
    });
});

$(document).on("click", ".restaurantBtn", function (event) {
    selectedRestaurantName = $(event.target).text();
    selectedRestaurantDistance = restaurantDistanceArray[$(event.target).attr("id")];
    selectedRestaurantImage = restaurantImageArray[$(event.target).attr("id")];
    selectedRestaurantURL = restaurantURLArray[$(event.target).attr("id")];
    console.log(selectedRestaurantDistance);
    console.log(selectedRestaurantImage);
    console.log(selectedRestaurantURL);
    var x = document.createElement("BR");
    titleListEl.empty();
    headlinEl.text("Your Picks");
    console.log(selectedFilmName);
    console.log(selectedTheaterName);
    console.log(selectedRestaurantName);
    var filmEl = $("<h6>");
    var finalFilm = $("<div>");
    finalFilm.attr("class", "card endPage");
    finalFilm.text("You're seeing: " + selectedFilmName);
    filmEl.append(finalFilm);
    x;
    var cinEl = $("<h6>");
    var finalCin = $("<div>");
    finalCin.attr("class", "card endPage");
    finalCin.text("Playing at " + selectedTheaterName);
    cinEl.append(finalCin);
    x;
    var restEl = $("<h6>");
    var finalRest = $("<div>");
    finalRest.attr("class", "card endPage");
    finalRest.text("Enjoy your dinner at " + selectedRestaurantName + "!");
    restEl.append(finalRest);
    titleListEl.append(filmEl, cinEl, restEl);
});
