$(document).ready(function() {
    $.getJSON("http://api.twicsy.com/search?q=love&callback=?", function(json) {
	for(i in json.results) {
	    $("<img>").attr("src", json.results[i].thumb).appendTo($("#images"));
	}
    });
});