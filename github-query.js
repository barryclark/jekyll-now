jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        //sortByName(repos);    
     
        var list = $('<dl/>');
        target.empty().append(list);
        var colours = ["yellow", "teal", "grey"];
        var colourCount = 0;
        $(repos).each(function() {
            var colour = colours[colourCount];
            colourCount = (colourCount+1) % colours.length; // Cycle through the available colours

            $('#cardsContainer').append("<div class='"+ /*colour +*/ " card'>"
                + "<div class='content' style='background-color:aliceblue'>"
                //+ '<i class="right floated like icon"></i><i class="right floated star icon"></i>'
                + "<div style='text-align:center'><a style='' href='"+(this.homepage?this.homepage:this.html_url) + "''>" + this.name + "</a></div>"
                + "</div>"
                + '<div class="extra content">'
                + "<div class='description'><p>" + this.description + "</p></div>"
                + "</div>"
                + '<div class="extra content">'
                + "<div class='description'><em>" + this.language + "</em></div>"
                + "</div>"
                + '<div class="extra content">'
                + '<span class="left floated like"><i class="like icon"></i>Like</span>'
                + '<span class="right floated star"><i class="star icon"></i>Favorite</span>'
                + '</div>'
                + "</div>");
        });
      });
      
    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
       });
    }

    function createCard(title, url, language, description) {

    }
};