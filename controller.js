window.controller = (() => {
    "use strict";

    var listElement = document.getElementById('list-container');
    var cardElement = document.getElementById('card-container');

    function showList() {
        listElement.style.display = 'block';
        cardElement.style.display = 'none';
    }

    function showDetails() {
        listElement.style.display = 'none';
        cardElement.style.display = 'block';
    }

    function createRow(el) {
        var row = document.createElement('TR');
        row.setAttribute('data-id', el.id);
        var imgCell = document.createElement('TD');
        var titleCell = document.createElement('TD');
        var image = document.createElement('IMG');
        image.src = el.avatar_url
        image.width = 100;
        imgCell.appendChild(image);
        titleCell.textContent = el.login;
        row.appendChild(imgCell);
        row.appendChild(titleCell);

        return row;
    }

    function drawDetails(account) {
        var backButton = document.createElement('BUTTON');
        backButton.innerText = "Back";
        backButton.classList.add('btn');
        backButton.classList.add('btn-default');
        backButton.onclick = showList;
        var login = document.createElement('DIV');
        login.innerText = `${account.login} (${account.site_admin ? 'admin' : 'user'})`;
        var externalLink = document.createElement('A');
        externalLink.href = account.html_url;
        externalLink.innerText = "Show more...";

        while (cardElement.firstChild) {
            cardElement.removeChild(cardElement.firstChild);
        }

        cardElement.appendChild(backButton);
        cardElement.appendChild(login);
        cardElement.appendChild(externalLink);

        showDetails();
    }

    function drawTableHeader(table, captions) {
        var tableHeader = document.createElement('THEAD');
        var row = document.createElement('TR');
        tableHeader.appendChild(row);
        for (var el of captions) {
            var caption = document.createElement('TH');
            caption.textContent = el;
            row.appendChild(caption);
        }

        table.appendChild(tableHeader);
    }

    function drawList(list) {
        var table = document.createElement('TABLE');
        table.classList.add('table');

        drawTableHeader(table, ['image', 'title'])

        var tableBody = document.createElement('TBODY');
        tableBody.onclick = event => {
            var id = +event.path.find(el => el.nodeName === 'TR').attributes.getNamedItem('data-id').value;
            var account = accountsService.getAccountsList().find(m => m.id === id);
            drawDetails(account);
        }
        table.appendChild(tableBody);

        for (var el of list) {
            tableBody.appendChild(createRow(el));
        }

        listElement.appendChild(table);
    }

    return {
        drawList: drawList
    }
})();
