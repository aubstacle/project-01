var titleListEl = $("#titleList")
var titleArray = [];
var buttonIdArray = [];
var cors = "https://cors-anywhere.herokuapp.com/"
var currentTime = moment().format("YYYY-MM-DDTHH:mm:ss") + "Z";
var settings = {
    "url": cors + "https://api-gate2.movieglu.com/filmsNowShowing/?",
    "method": "GET",
    "timeout": 0,
    "headers": {
    "x-api-key" :	"Mp2rRwXPBY7u6E65iDkcP8hvW5DHwtjf565GbJw8",
    "client":	"GT",
    "authorization":	"Basic R1Q6RHQwS3ZEVmdCNDl4",
    "territory":	"US",
    "api-version":	"v200",
    "geolocation":	"33.753746;-84.386330",
    "device-datetime":	currentTime
    
    },
    };
    
    $.ajax(settings).done(function (response) {
    console.log(response);
    for(i = 0; i < 10; i++){
        console.log(response.films[i].film_name)
        titleArray.push(response.films[i].film_name)
        buttonIdArray.push(response.films[i].film_id)
        
    }
    console.log(titleArray)
    console.log(buttonIdArray)
    for(i = 0; i < titleArray.length; i++){
        var listEl = $("<li>");
        var titleButtonEl = $("<button>");
        titleButtonEl.attr("class", "btn btn-primary");
        titleButtonEl.attr("type", "button")
        titleButtonEl.attr("id", buttonIdArray[i]);
        titleButtonEl.text(titleArray[i]);
        listEl.append(titleButtonEl);
        titleListEl.append(listEl);
    
    
    }
    });

    console.log(currentTime)
    