"use strict";

window.moviesService = (function(){
	var moviesList = [];
	function fetchItems(cb) {
		var xmlhttp = new XMLHttpRequest();
		var url = "http://api.nytimes.com/svc/mostpopular/v2/mostviewed/movies/30.json?api-key=52c786f7d5fcb689e304bcbd58687057%3A5%3A73132144";

		xmlhttp.onreadystatechange = () => {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var response = JSON.parse(xmlhttp.responseText);
				moviesList = response.results;
				cb(response.results);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
	
	return {
		fetchItems: fetchItems,
		getMoviesList: () => moviesList
	};
})();