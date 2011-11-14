$(document).ready(function() {
    $.getJSON("http://api.twicsy.com/search?q=love&callback=?", function(json) {
	alert(json.count);
    });
});