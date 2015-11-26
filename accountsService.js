window.accountsService = (() => {
    "use strict";
    
    var accountsList = [];
    function fetchItems(cb) {
        var xmlhttp = new XMLHttpRequest();
        var url = "https://api.github.com/users";

        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
                accountsList = JSON.parse(xmlhttp.responseText);
                cb(accountsList);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    return {
        fetchItems: fetchItems,
        getAccountsList: () => accountsList
    };
})();
