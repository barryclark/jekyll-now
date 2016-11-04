(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');
    if (results.length) { // Are there any results?
      var appendString = '';

        appendString += '<div class="panel-group">';
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
              var item = store[results[i].ref];
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
              appendString += '</div>';
              appendString += '</a>';
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
  
  function loadIssue(searchTerm){
    NProgress.start();
    for (var key in window.store) { // Add the data to lunr
      idx.addDoc({
        'id': key,
        'title': window.store[key].title,
        'category': window.store[key].category,
        'content': window.store[key].content,
        'date': window.store[key].date
      });

      var results = idx.search(searchTerm,{
    "fields": {
        "title": {"boost": 10},
    }
      }); // Get elasticlunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section 
    }
    //NProgress.done();
  }

  var searchTerm = getQueryVariable('query');
    
    
  if (searchTerm) {
    NProgress.start();
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = elasticlunr(function () {
      this.use(elasticlunr.it);
      this.addField('title', { boost: 10 });
      this.addField('category');
      this.addField('content');
      this.setRef('id');
    });

    setTimeout( function() { 
      loadIssue(searchTerm); // We'll write this in the next section 
    }, 0 );
  }
})();

document.getElementById('search-box').onkeydown = function(e){
   if(e.keyCode == 13){
     NProgress.start();
   }
};
