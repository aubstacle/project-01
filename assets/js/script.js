// our first two variables are declared so we can manipulate the DOM
var titleListEl = $("#titleList");
var headlinEl = $("#headline");
// the following 2 vars are used to dynamically populate the page with data from the movieGlu API (first ajax call - films now showing)
var titleArray = [];
var buttonIdArray = [];
// the following 3 vars are used to dynamically populate the page with more data from movieGlu API (the second ajax call - cinemas nearby)
var cinemaArray = [];
var cinemaLatArray = [];
var cinemaLongArray = [];
// This variable is used to dynamically populate the page with data from the Yelp fusion API (third ajax call - restaurants available)
var restaurantArray = [];
// var cors is being used to avoid a cors error when testing the page locally
var cors = "https://cors-anywhere.herokuapp.com/";
// the following var is using moment.js to store the current time in the format necessary for the ajax calls
var currentTime = moment().format("YYYY-MM-DDTHH:mm:ss") + "Z";
// the following five empty strings are being used to store the users choices and then display them at the time of our final page population
var selectedFilmName = "";
var selectedTheaterName = "";
var selectedRestaurantName = "";
var currentLat = "";
var currentLong = "";

// this variable calls the MovieGlu API with key, client ID, auth code, territory, geolocation etc.
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

// this first ajax call is calling on the films showing in the area from MovieGLu API, pushing the film name data into our empty Title array and pushing film ID number to our empty Button array
// The for loop iterates through the title array and populates buttons for each returned film
$.ajax(filmSettings).done(function (response) {
  for (i = 0; i < 10; i++) {
    // console.log(response.films[i].film_name)
    titleArray.push(response.films[i].film_name);
    buttonIdArray.push(response.films[i].film_id);
  }
  // console.log(titleArray)
  // console.log(buttonIdArray)
  for (i = 0; i < titleArray.length; i++) {
    var listEl = $("<h6>");
    var titleButtonEl = $("<button>");
    titleButtonEl.attr("class", "card titleBtn");
    titleButtonEl.attr("type", "button");
    titleButtonEl.attr("id", buttonIdArray[i]);
    titleButtonEl.text(titleArray[i]);
    listEl.append(titleButtonEl);
    titleListEl.append(listEl);
  }
});

// console.log(currentTime)

// our first click event listener empties title div and replaces it with the new nearby theatres title
// before calling for the movieglue data for nearby cinemas showing selected film
$(document).on("click", ".titleBtn", function (event) {
  selectedFilmName = $(event.target).text();
  selectedFilmId = $(event.target).attr("id");
  titleListEl.empty();
  headlinEl.text("Nearby Theaters");
  console.log(selectedFilmId);

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

// second ajax call is pushing data for cinema name, lat and long to corresponding empty arrays
// the for loop iterates through the filled cinema array and populates next list of buttons for each nearby cinema
  $.ajax(closestSettings).done(function (response) {
    for (i = 0; i < 5; i++) {
      cinemaArray.push(response.cinemas[i].cinema_name);
      cinemaLatArray.push(response.cinemas[i].lat);
      cinemaLongArray.push(response.cinemas[i].lng);
    }
    console.log(response);
    console.log(cinemaLatArray);
    console.log(cinemaLongArray);
    for (i = 0; i < cinemaArray.length; i++) {
      var listEl = $("<h6>");
      var titleButtonEl = $("<button>");
      titleButtonEl.attr("class", "card theaterBtn");
      titleButtonEl.attr("type", "button");
      titleButtonEl.attr("id", cinemaLatArray[i] + "," + cinemaLongArray[i]);
      titleButtonEl.text(cinemaArray[i]);
      listEl.append(titleButtonEl);
      titleListEl.append(listEl);
    }
  });
});

// Second click event listener empties the title div once again and brings in Yelp API to get nearby restaurant data based on lat and long of selected theater
$(document).on("click", ".theaterBtn", function (event) {
  titleListEl.empty();
  headlinEl.text("Nearest Restaurants");
  selectedTheaterId = $(event.target).attr("id");
  selectedTheaterName = $(event.target).text();
  console.log(selectedTheaterId);
  latLongArray = selectedTheaterId.split(",");
  console.log(latLongArray);
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
  // third ajax call grabs our restaurant data, pushes the restaurant names into our empy restaurantArray & iterates through it, populating buttons for each restaurant
  $.ajax(yelpSettings).done(function (yelpResponse) {
    console.log(yelpResponse);
    for (i = 0; i < 10; i++) {
      restaurantArray.push(yelpResponse.businesses[i].name);
    }
    console.log(restaurantArray);
    for (i = 0; i < restaurantArray.length; i++) {
      var listEl = $("<h6>");
      var titleButtonEl = $("<button>");
      titleButtonEl.attr("class", "card restaurantBtn");
      titleButtonEl.attr("type", "button");
      titleButtonEl.attr("id", restaurantArray[i]);
      titleButtonEl.text(restaurantArray[i]);
      listEl.append(titleButtonEl);
      titleListEl.append(listEl);
    }
  });
});

// final onclick listener dislays all of our selected data (selected movie, theater and nearby restaurant)
$(document).on("click", ".restaurantBtn", function (event) {
  selectedRestaurantName = $(event.target).text();
  console.log("test");
  var x = document.createElement("BR");
  titleListEl.empty();
  headlinEl.text("Your Picks");
  console.log(selectedFilmName);
  console.log(selectedTheaterName);
  console.log(selectedRestaurantName);
  var filmEl = $("<h6>");
  var finalFilm = $("<div>");
  finalFilm.attr("class", "card restaurantBtn");
  finalFilm.text("You're seeing: " + selectedFilmName);
  filmEl.append(finalFilm);
  x;
  var cinEl = $("<h6>");
  var finalCin = $("<div>");
  finalCin.attr("class", "card restaurantBtn");
  finalCin.text("Playing at " + selectedTheaterName);
  cinEl.append(finalCin);
  x;
  var restEl = $("<h6>");
  var finalRest = $("<div>");
  finalRest.attr("class", "card restaurantBtn");
  finalRest.text("Enjoy your dinner at " + selectedRestaurantName + "!");
  restEl.append(finalRest);
  titleListEl.append(filmEl, cinEl, restEl);
  document.getElementById("titleList").style.pointerEvents = "none";
});
