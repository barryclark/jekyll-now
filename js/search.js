(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');
    if (results.length) { // Are there any results?
      var appendString = '';

        appendString += '<div class="panel-group">';
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
              var item = store[results[i].ref];
              if (item.state == "open") {
                      appendString += '<a href="' + item.url + '" class="list-group-item">';
                      appendString += '<div class="panel panel-default">';
                      appendString += '<div class="panel-heading">';
                      appendString += '<h4>' + item.title + '</h4>';
                      appendString += '</div>';
                      appendString += '<div class="panel-body">';

                      appendString += '<small>';
                      appendString += '<p class="list-group-item-text">' + item.content.substring(0, 250) + '...</p>'
                      appendString += '<p class="list-group-item-text">' + item.date + '</p>'
                      appendString += '</small>';

                      appendString += '</div>';
                      appendString += '<div class="panel-footer">';
                      appendString += item.label;
                      appendString += '</div>';
                      appendString += '</div>';
                      appendString += '</a>';
              }
      }
        appendString += '</div>';

        appendString += '<div class="panel-group">';
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
              var item = store[results[i].ref];
              if (item.state != "open") {
                      appendString += '<a href="' + item.url + '" class="list-group-item">';
                      appendString += '<div class="panel panel-default">';
                      appendString += '<div class="panel-heading">';
                      appendString += '<strike><h4>' + item.title + '</h4></strike>';
                      appendString += '</div>';
                      appendString += '<div class="panel-body">';

                      appendString += '<small>';
                      appendString += '<p class="list-group-item-text">' + item.content.substring(0, 250) + '...</p>'
                      appendString += '<p class="list-group-item-text">' + item.date + '</p>'
                      appendString += '</small>';

                      appendString += '</div>';
                      appendString += '<div class="panel-footer">';
                      appendString += item.label;
                      appendString += '</div>';
                      appendString += '</div>';
                      appendString += '</a>';
              }
      }
        appendString += '</div>';

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>Nessuna segnalazione trovata</li>';
    }
  }

    function displayAllResults(searchLabe,store) {
        var searchResults = document.getElementById('search-results');
        if (Object.keys(store).length) { // Are there any results?
            var appendString = '';

            appendString += '<div class="panel-group">';
            for (var item of Object.values(store)) {  // Iterate over the results
                if (!searchLabel || $.inArray(searchLabel,item.label.toLowerCase().split(","))>=0) {
                    if (item.state == "open") {
                        appendString += '<a href="' + item.url + '" class="list-group-item">';
                        appendString += '<div class="panel panel-default">';
                        appendString += '<div class="panel-heading">';
                        appendString += '<h4>' + item.title + '</h4>';
                        appendString += '</div>';
                        appendString += '<div class="panel-body">';

                        appendString += '<small>';
                        appendString += '<p class="list-group-item-text">' + item.content.substring(0, 250) + '...</p>'
                        appendString += '<p class="list-group-item-text">' + item.date + '</p>'
                        appendString += '</small>';

                        appendString += '</div>';
                        appendString += '<div class="panel-footer">';
                        appendString += item.label;
                        appendString += '</div>';
                        appendString += '</div>';
                        appendString += '</a>';
                    }
                }
            }
            appendString += '</div>';

            appendString += '<div class="panel-group">';
            for (var item of Object.values(store)) {  // Iterate over the results
                if (!searchLabel || $.inArray(searchLabel,item.label.toLowerCase().split(","))>=0) {
                    if (item.state != "open") {
                        appendString += '<a href="' + item.url + '" class="list-group-item">';
                        appendString += '<div class="panel panel-default">';
                        appendString += '<div class="panel-heading">';
                        appendString += '<strike><h4>' + item.title + '</h4></strike>';
                        appendString += '</div>';
                        appendString += '<div class="panel-body">';

                        appendString += '<small>';
                        appendString += '<p class="list-group-item-text">' + item.content.substring(0, 250) + '...</p>'
                        appendString += '<p class="list-group-item-text">' + item.date + '</p>'
                        appendString += '</small>';

                        appendString += '</div>';
                        appendString += '<div class="panel-footer">';
                        appendString += item.label;
                        appendString += '</div>';
                        appendString += '</div>';
                        appendString += '</a>';
                    }
                }
            }
            appendString += '</div>';

            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '<li>Nessuna segnalazione trovata</li>';
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
  
    function loadIssue(searchTerm,searchLabel){
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

            displaySearchResults(results, window.store); // We'll write this in the next section 
        } else {
            displayAllResults(searchLabel, window.store); // We'll write this in the next section 
        }
        //NProgress.done();
    }

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
        loadIssue(searchTerm,searchLabel); // We'll write this in the next section 
    }, 0 );
})();

document.getElementById('search-box').onkeydown = function(e){
   if(e.keyCode == 13){
     NProgress.start();
   }
};
