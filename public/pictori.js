var imageIDs = new Array();

$(document).ready(function() {
    setInterval("loadFreshImages()", 30000);
    loadFreshImages();

    setInterval("displayImage()", 2000);
});


// Transfer one loaded image from #images-loaded into #images
function displayImage() {
    if($("#images-loaded .image").length > 0) {
	console.log("Images in queue: "+$("#images-loaded .image").length);
	var image = $("#images-loaded .image:first");
	image.detach().prependTo($("#images"));
	if($("#images .image").length < 2) {
	    $("#images").masonry({itemSelector: '.image'});
	} else {
	    $("#images").masonry('appended', image);
	}
    }
}


// Search Twicsy for images and load them into the hidden #images-loaded div
function loadFreshImages() {
    $.getJSON("http://api.twicsy.com/search?q=love&sort=date&callback=?", function(json) {
	// Load each image into #images-loading, a hidden div
	for(i in json.results) {
	    if(!imageIDs[json.results[i].id]) {
		$("<img>")
		    .attr("src", json.results[i].thumb)
		    .wrap('<div class="image" />').parent()
		    .appendTo($("#images-loading"));
		imageIDs[json.results[i].id] = true;
		console.log("Added fresh image");
	    }
	}

	// Hide images that fail to load
	// TODO: Remove them instead
	$("#images-loading .image img").error(function() {
	    $(this).parent().hide();
	});

	// Move loaded images into #images-loaded
	$("#images-loading .image").each(function() {
	    $(this).imagesLoaded(function() {
		$(this).detach().prependTo($("#images-loaded"));
	    });
	});
    });
}
