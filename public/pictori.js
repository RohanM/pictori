var topics = ['love', 'hate', 'think', 'believe', 'feel', 'wish'];
// TODO: Should we store the colours here and generate some CSS?

var imageIDs = new Array();

$(document).ready(function() {
    initPage();

    setInterval("loadFreshImages()", 30000);
    loadFreshImages();

    setInterval("displayImage()", 2000);
});

// Set up HTML elements
function initPage() {
    var menu = $("#menu");
    var content = $("#content");

    // Build menu and loading/loaded images divs
    for(i in topics) {
	var topic = topics[i];
	$('<a href="#" class="'+topic+'" title="i '+topic+'">').html(topic).appendTo($("<li>")).parent().appendTo(menu);
	$('<div id="images-loading-'+topic+'" class="images-loading" />').appendTo(content);
	$('<div id="images-loaded-'+topic+'" class="images-loaded" />').appendTo(content);
    }

    // Wire up menu events, select first
    menu.find("a").click(function() {
	menu.find("a.selected").removeClass("selected");
	$(this).addClass("selected");

	loadFreshImages();
    });
    menu.find("a:first").click();
}

// Transfer one loaded image from #images-loaded into #images
function displayImage() {
    var topic = $("#menu a.selected").html();

    if($("#images-loaded-"+topic+" .image").length > 0) {
	var image = $("#images-loaded-"+topic+" .image:first");
	image.detach().prependTo($("#images"));
	if($("#images .image").length < 2) {
	    $("#images").masonry({itemSelector: '.image'});
	} else {
	    $("#images").masonry('appended', image);
	}
	console.log("Images in queue: "+$("#images-loaded-"+topic+" .image").length);
    }
}


// Search Twicsy for images and load them into the hidden #images-loaded div
function loadFreshImages() {
    var topic = $("#menu a.selected").html();
    var topic_uri = encodeURIComponent($("#menu a.selected").attr('title'));

    $.getJSON("http://api.twicsy.com/search?q="+topic_uri+"&sort=date&callback=?", function(json) {
	// Load each image into #images-loading-xyz, a hidden div
	for(i in json.results) {
	    if(!imageIDs[json.results[i].id]) {
		$("<img>")
		    .attr("src", json.results[i].thumb)
		    .wrap('<div class="image '+topic+'" />').parent()
		    .appendTo($("#images-loading-"+topic));
		imageIDs[json.results[i].id] = true;
		console.log("Added fresh image");
	    }
	}

	// Mark images that fail to load
	$("#images-loading-"+topic+" .image img").error(function() {
	    $(this).data('error', 1);
	});

	// Move loaded images into #images-loaded, remove images that failed to load
	$("#images-loading-"+topic+" .image").each(function() {
	    $(this).imagesLoaded(function() {
		if(!this.find("img").data('error')) {
		    $(this).detach().prependTo($("#images-loaded-"+topic));
		} else {
		    $(this).remove();
		}
	    });
	});
    });
}
