(function() {
    Set.prototype.intersection = function(setB) {
        var intersection = new Set();
        var elem;
		for (var index = 0; index < setB.length; ++index) {
			elem = setB[index];
            if (this.has(elem)) {
                intersection.add(elem);
            }
        }
        return intersection;
    }


    function displayDoc(item) {
        appendString = "";
        appendString += '<a href="' + item.url + '" class="list-group-item">';
        appendString += '<div class="panel panel-default">';
        appendString += '<div class="panel-heading">';
        if (item.state != 'open') {
            appendString += '<strike>';
        }
        appendString += '<h4>' + item.title + '</h4>';
        if (item.state != 'open') {
            appendString += '</strike>';
        }
        appendString += '</div>';
        appendString += '<div class="panel-body">';

        appendString += '<small>';
        appendString += '<p class="list-group-item-text">' + item.content.substring(0, 250) + '...</p>'
        appendString += '<p class="list-group-item-text">' + item.date + '</p>'
        appendString += '</small>';

        appendString += '</div>';
        appendString += '<div class="panel-footer">';
        itemLabels = new Set(item.label.split(','));
        //appendString += Array.from(itemLabels.intersection(usedLabels).values());
        appendString += item.label;
        appendString += '</div>';
        appendString += '</div>';
        appendString += '</a>';

        return appendString;
    }

    function displaySearchResults(results, store, usedLabels) {
        var searchResults = $('#search-results');
        if (results.length) { // Are there any results?
            var appendString = '';

            appendString += '<div class="panel-group">';
            for (var i = 0; i < results.length; i++) {  // Iterate over the results
                var item = store[results[i].ref];
                if (item.state == "open") {
                    appendString += displayDoc(item);
                }
            }
            appendString += '</div>';

            appendString += '<div class="panel-group">';
            for (var i = 0; i < results.length; i++) {  // Iterate over the results
                var item = store[results[i].ref];
                if (item.state != "open") {
                    appendString += displayDoc(item);
                }
            }
            appendString += '</div>';

            searchResults.html(appendString);
        } else {
            searchResults.html('<li>Nessuna segnalazione trovata</li>');
        }
    }

    function displayAllResults(searchLabel,store) {
        var searchResults = $('#search-results');
        if (Object.keys(store).length) { // Are there any results?
            var appendString = '';

            appendString += '<div class="panel-group">';
            $.each(store,function(index,item) {
                if (!searchLabel || $.inArray(searchLabel,item.label.toLowerCase().split(","))>=0) {
                    if (item.state == "open") {
                        appendString += displayDoc(item);
                    }
                }
            }
            )
            appendString += '</div>';

            appendString += '<div class="panel-group">';
            $.each(store,function(index,item) {
                if (!searchLabel || $.inArray(searchLabel,item.label.toLowerCase().split(","))>=0) {
                    if (item.state != "open") {
                        appendString += displayDoc(item);
                    }
                }
            }
            )
            appendString += '</div>';

            searchResults.html(appendString);
        } else {
            searchResults.html('<li>Nessuna segnalazione trovata</li>');
        }
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    function loadIssue(searchTerm,searchLabel,usedLabels){
        NProgress.start();

        if (searchTerm) {
            for (var key in window.store) { // Add the data to lunr
                if (!searchLabel || $.inArray(searchLabel,window.store[key].label.toLowerCase().split(","))>=0) {
                    idx.addDoc({
                        'id': key,
                        'title': window.store[key].title,
                        'content': window.store[key].content,
                        'state': window.store[key].state,
                        'date': window.store[key].date,
                        'label': window.store[key].label,
                    });
                }
            }
            var results = idx.search(searchTerm,{
                "fields": {
                    "title": {"boost": 10},
                },
                bool: "OR"
            }); // Get elasticlunr to perform a search

            displaySearchResults(results, window.store,usedLabels); // We'll write this in the next section 
        } else {
            displayAllResults(searchLabel, window.store,usedLabels); // We'll write this in the next section 
        }
        NProgress.done();
    }

    var usedLabels= new Set([ "Alloggi", "acquisto solidale", "Bollettino", "Bufale", "Contatti", "Donazioni", "Fabbisogni", "Notizie Utili", "Raccolte Fondi",]);

    var searchTerm = getQueryVariable('query');
    var searchLabel = getQueryVariable('label');

    if (searchLabel) {
        document.getElementById('labelchoice').value= searchLabel;
        searchLabel=searchLabel.toLowerCase();
    }

    NProgress.start();
    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);
    }

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = elasticlunr(function () {
        this.use(elasticlunr.it);
        this.addField('title', { boost: 10 });
        this.addField('label');
        this.addField('content');
        this.addField('state');
        this.setRef('id');
    });

    setTimeout( function() { 
            if (window.store) {
                    loadIssue(searchTerm,searchLabel,usedLabels); // We'll write this in the next section 
            }
    }, 0 );
})();

document.getElementById('search-box').onkeydown = function(e){
   if(e.keyCode == 13){
     NProgress.start();
   }
};
