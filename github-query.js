jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}

jQuery.githubContrib = function(contrib_url, callback) {
   jQuery.getJSON(contrib_url,callback)
}
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos);

        console.log(data);
        var colours = ["yellow", "teal", "grey"];
        var colourCount = 0;

        target.empty();
        $(repos).each(function() {
            var colour = colours[colourCount];
            colourCount = (colourCount+1) % colours.length; // Cycle through the available colours

            // Update progress bar
            //$('.progress').progress({value:0, total:0});

            var repo = this;
            // GitHub API doesn't include # of commits in repo-json, so need to count manually 
            $.githubContrib(repo.contributors_url, function(data) {
                var contributors =  data;
                var commitCount = 0;
                for (var i=0; i<contributors.length; i++) {
                    //console.log(contributors[i].login + ': ' + contributors[i].contributions);
                    commitCount = commitCount + contributors[i].contributions; // Add up the contributions (# of commits) of each contributor
                }
                target.append("<div class='"+ /*colour +*/ " card'>"
                    + "<div class='content' style='background-color:aliceblue'>"
                    //+ '<i class="right floated like icon"></i><i class="right floated star icon"></i>'
                    + "<div style='text-align:center'><a style='' href='"+ repo.html_url + "''>" + repo.name + "</a></div>"
                    + "</div>"
                    + '<div class="extra content">'
                        + "<div class='description'><p>" + repo.description + "</p></div>"
                    + "</div>"
                    + '<div class="extra content">'
                        + "<div class='description'><em>" + repo.language + "</em></div>"
                    + "</div>"
                    + '<div class="extra content">'
                        + '<span class="left floated code"><i class="code icon"></i>' + commitCount + ' commits</span>'
                        + '<span class="right floated star"><i class="star icon"></i>' + repo.stargazers_count + '</span>'
                    + '</div>'
                    //+ '<div class="ui standard teal progress">'
                    + '<div class="ui bottom attached teal progress">'
                        + '<div class="bar"></div>'
                    + '</div>'
                    + "</div>");
            });

        });
      });
      
    function sortByName(repos) {
        repos.sort(function(a,b) {
        return b.stargazers_count - a.stargazers_count; 
       });
    }

    function createCard(title, url, language, description) {

    }
};