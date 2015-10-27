(function(){
	var listElement = document.getElementById('list-container');
	var cardElement = document.getElementById('card-container');

	fetchItems(drawItems);

	function fetchItems(cb) {
		var xmlhttp = new XMLHttpRequest();
		var url = "http://api.nytimes.com/svc/mostpopular/v2/mostviewed/movies/30.json?api-key=52c786f7d5fcb689e304bcbd58687057%3A5%3A73132144";

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var response = JSON.parse(xmlhttp.responseText);
				cb(response.results);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}

	function drawItems(items) {
		var table = document.createElement('TABLE');
		var tableHeader = document.createElement('THEAD');
		var tableHeaderCaptions = ['image', 'title'];
		for(var el of tableHeaderCaptions){
			var caption = document.createElement('TD');
			caption.textContent = el;
			tableHeader.appendChild(caption);
		}

		table.appendChild(tableHeader);
		for(var el of items){
			var row = document.createElement('TR');
			row.setAttribute('data-src', el.url);
			var imgCell = document.createElement('TD');
			var titleCell = document.createElement('TD');
			var image = document.createElement('IMG');
			image.src = el.media[0]['media-metadata'][0].url
			imgCell.appendChild(image);
			titleCell.textContent = el.title;
			row.appendChild(imgCell);
			row.appendChild(titleCell);
			table.appendChild(row);
		}

		listElement.appendChild(table);
	}
})();