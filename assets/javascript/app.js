


var bandList = ["Green Day", "Metallica", "Godsmack", ];
var apiKey = "230WNSN2hzoLsYdb7eEqC7xOyUJ6RStF";
var currentBand = $("#images");

function renderButton() {
    $("#buttons").empty();
    for (var i=0; i < bandList.length; i++) {
        var newBand = $("<button>");
        newBand.addClass("button");
        newBand.attr("data-band", bandList[i]);
        newBand.text(bandList[i]);
        $("#buttons").append(newBand);
    }
}

$("#addBand").on("click", function(event) {
    event.preventDefault();
    var band = $("#bandSearch").val().trim();
    // band list is rendered based on how the user types in band name but all entries are converted to lower case for comparison to prevent duplicate entries
    var lowerBand = band.toLowerCase();
    var newBandList = [];
    for (var i=0; i<bandList.length; i++) {
        var addBand = bandList[i].toLowerCase();
        newBandList.push(addBand);
    }
    if (lowerBand !== "" && newBandList.indexOf(lowerBand) === -1) { //prevents blank or duplicate submissions
        bandList.push(band);
    }
    renderButton();
    $("#bandSearch").val("");
});

function showGif(){
    var band = $(this).attr("data-band");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=" + apiKey + "&limit=10&rating=pg";
    console.log(queryURL);
    currentBand.empty();

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        var results = response.data;
        console.log(results);

        for (var i=0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var urlStill = results[i].images.fixed_height_still.url;
            var urlAnimated = results[i].images.fixed_height.url;
            var rating = results[i].rating;
            var gifImage = $("<img>");
            gifImage.attr("data-still", urlStill);
            gifImage.attr("data-animate", urlAnimated);
            gifImage.attr("data-state", "still");
            gifImage.attr("src", urlStill);
            gifImage.addClass("gif");
            gifDiv.append(gifImage);
            $("#images").append(gifDiv);
        }
    })
}


$(document).on("click", ".button", showGif);


renderButton();

function animateGif() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
};

$(document).on("click", ".gif", animateGif);