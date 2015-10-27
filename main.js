(function(){
	"use strict";

	var listElement = document.getElementById('list-container');
	var cardElement = document.getElementById('card-container');
	var moviesList = [];

	fetchItems(drawItems);

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
			row.setAttribute('data-id', el.id);
			row.onclick = event => {
				var id = +event.currentTarget.attributes.getNamedItem('data-id').value;
				var movie = moviesList.find(m => m.id === id);
				listElement.style.display = 'none';
				cardElement.style.display = 'block';

				var backButton = document.createElement('BUTTON');
				backButton.innerText = "Back";
				backButton.onclick = () => {
					listElement.style.display = 'block';
					cardElement.style.display = 'none';
				}
				var abstract = document.createElement('DIV');
				abstract.innerText = movie.abstract;
				var externalLink = document.createElement('A');
				externalLink.href = el.url;

				while(cardElement.firstChild) {
					cardElement.removeChild(cardElement.firstChild);
				}

				cardElement.appendChild(backButton);
				cardElement.appendChild(abstract);
				cardElement.appendChild(externalLink);
			};
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