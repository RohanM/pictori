$(document).ready(function() {
    $.getJSON("http://api.twicsy.com/search?q=love&sort=date&callback=?", function(json) {
	// Load each image into #images-loading, a hidden div
	for(i in json.results) {
	    $("<img>")
		.attr("src", json.results[i].thumb)
		.wrap('<div class="image" />').parent()
		.appendTo($("#images-loading"));
	}

	// Hide images that fail to load
	// TODO: Remove them instead
	$("#images-loading .image img").error(function() {
	    $(this).parent().hide();
	});

	// Move loaded images into #images (TODO: and masonrify them)
	// To confirm: you can multi-call masonry() with new images and it'll gracefully update.
	$("#images-loading .image").each(function() {
	    $(this).imagesLoaded(function() {
		$(this).detach().prependTo($("#images"));
		//$("#images").masonry({itemSelector: '.image'});
	    });
	});
    });
});