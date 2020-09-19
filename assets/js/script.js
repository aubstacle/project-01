var titleListEl = $("#titleList")
var titleArray = [];
var buttonIdArray = [];
var cinemaArray = [];
var restaurantArray = [];
var cors = "https://cors-anywhere.herokuapp.com/"
var currentTime = moment().format("YYYY-MM-DDTHH:mm:ss") + "Z";
var selectedFilmName = "";
var selectedFilmId = "";
var currentLat = "";
var currentLong = "";
var theaterLat = "";
var theaterLong = "";
var filmSettings = {
    "url": cors + "https://api-gate2.movieglu.com/filmsNowShowing/?",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "x-api-key": "4KvTx6Itb83s7wFOmUo4kaMdXwaRQE6SVK9CmIFa",
        "client": "GT",
        "authorization": "Basic R1RGVDpEclNYOEVpNlFKVFo=",
        "territory": "US",
        "api-version": "v200",
        "geolocation": "33.753746;-84.386330",
        "device-datetime": currentTime

    },
};

$.ajax(filmSettings).done(function (response) {
    for (i = 0; i < 10; i++) {
        // console.log(response.films[i].film_name)
        titleArray.push(response.films[i].film_name)
        buttonIdArray.push(response.films[i].film_id)

    }
    // console.log(titleArray)
    // console.log(buttonIdArray)
    for (i = 0; i < titleArray.length; i++) {
        var listEl = $("<li>");
        var titleButtonEl = $("<button>");
        titleButtonEl.attr("class", "btn btn-primary titleBtn");
        titleButtonEl.attr("type", "button")
        titleButtonEl.attr("id", buttonIdArray[i]);
        titleButtonEl.text(titleArray[i]);
        listEl.append(titleButtonEl);
        titleListEl.append(listEl);


    }
});

// console.log(currentTime)



var yelpSettings = {
    "url": cors + "https://api.yelp.com/v3/businesses/search?latitude=33.771568&longitude=-84.386330",
    "method": "GET",
    "headers": {           
    "authorization":	"Bearer qItHfBqMcXSXkVpMIcSF71I2KbHwRJ-rxNbzAQGIHcPc-OHxM0V-xAedcHX55dgcgoxi_VEKSgbC9RBnQjdAqDQDgvbo_lENXqYxeGhD6GV_KLJHPCKKYznDY1diX3Yx", 
    },
    };

$.ajax(yelpSettings).done(function (yelpResponse){
    console.log(yelpResponse)
})

$(document).on("click", ".titleBtn", function (event) {
    selectedFilmName = $(event.target).text();
    selectedFilmId = $(event.target).attr("id");
    titleListEl.empty();
    console.log(selectedFilmId)

    var closestSettings = {
        "url": cors + "https://api-gate2.movieglu.com/closestShowing/?film_id=" + selectedFilmId,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "x-api-key": "4KvTx6Itb83s7wFOmUo4kaMdXwaRQE6SVK9CmIFa",
            "client": "GT",
            "authorization": "Basic R1RGVDpEclNYOEVpNlFKVFo=",
            "territory": "US",
            "api-version": "v200",
            "geolocation": "33.753746;-84.386330",
            "device-datetime": currentTime
    
        },
    };
    
    $.ajax(closestSettings).done(function (response) {
        for(i = 0; i < 5; i ++){
            cinemaArray.push(response.cinemas[i].cinema_name)
          }
          for (i = 0; i < cinemaArray.length; i++) {
            var listEl = $("<li>");
            var titleButtonEl = $("<button>");
            titleButtonEl.attr("class", "btn btn-primary theaterBtn");
            titleButtonEl.attr("type", "button")
            titleButtonEl.attr("id", cinemaArray[i]);
            titleButtonEl.text(cinemaArray[i]);
            listEl.append(titleButtonEl);
            titleListEl.append(listEl);
    
    
        }
    
    })
    

  



  
});

$(document).on("click", ".theaterBtn", function (event) {
    selectedTheaterId = $(event.target).attr("id");
    console.log(selectedTheaterId)
});
