


var bandList = ["Green Day", "Metallica", "Godsmack", ];
var apiKey = "230WNSN2hzoLsYdb7eEqC7xOyUJ6RStF";

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
    // band list is rendered how the user types in band name but all entries are converted to lower case for comparison to prevent duplicate entries
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


renderButton();