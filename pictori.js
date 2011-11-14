$(document).ready(function() {
    $.getJSON("http://api.twicsy.com/search?q=love&callback=?", function(json) {
	for(i in json.results) {
	    $("<img>").attr("src", json.results[i].thumb).appendTo($("#images"));
	}
	$("#images img").wrap('<div class="image" />');

	/* Some of these images take a long time to load, so masonry isn't applied. Disable for now.
	$("#images").imagesLoaded(function() {
	    alert("Masonising");
	    $("#images").masonry({itemSelector: '.image'});
	});
	*/
    });
});