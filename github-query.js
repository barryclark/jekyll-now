
$(document).ready(function () {
    function githubReadme(repoUrl, callback) {
        jQuery.getJSON(repoUrl+'/readme', callback)
    }

    function githubRepo(repoName, callback) {
        jQuery.getJSON(`https://api.github.com/repos/${repoName}`,callback)
    }

    function parseForImage(text) {
        var foundImage = false;
        var startIndex = null;
        var endIndex = null;
        for (var i=0; i<text.length; i++) {
            if (foundImage == true) {
                // Looking for the image link, starts after a '(' and ends at the first space
                if (startIndex && endIndex) {
                    var url = text.substring(startIndex, endIndex);
                    return(url);
                } else if (startIndex && text[i]==' ') {
                    endIndex = i; 
                } else if (text[i]=='(') { 
                    startIndex = i + 1; 
                }
            // Looking for Markdown's opening image tag '!['
            } else if (text[i] == '!' && text[i + 1] == '[') { 
                foundImage = true;
            }
        }
        // If no image found
        return(null);
    }

    function addPicture(data, repoName) {
        var readmeUrl = data.download_url;
        $.get(readmeUrl, function(data) {
            var imgUrl = parseForImage(data);
            if (imgUrl) {
                $(`#${repoName}`).css("background-size", 'cover').css("background-image", 'url(\''+imgUrl+'\')');
                $(`#${repoName}`).css("background-position", 'center').css("min-height", '150px');
            } else {
                // Draw a cross in the box if no images are available
                $(`#${repoName}`).append(`<canvas id='${repoName}_canvas'></canvas>`);
                var canvas = document.getElementById(`${repoName}_canvas`);
                var div = document.getElementById(repoName);
                canvas.width = div.clientWidth;
                canvas.height = div.clientHeight;
                var ctx = canvas.getContext("2d");
                ctx.strokeStyle = "#E0E1E2";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(canvas.width, canvas.height);
                ctx.stroke();
                ctx.beginPath()
                ctx.moveTo(canvas.width, 0);
                ctx.lineTo(0, canvas.height)
                ctx.stroke();	
                // Handle resizing
                window.onresize = function() {
                    c.width = theDiv.clientWidth;
                    c.height = theDiv.clientHeight;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(c.width, c.height);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(c.width, 0);
                    ctx.lineTo(0, c.height);
                    ctx.stroke();	
                };
            }
        });
    }

    function addCard(repo) {
        const lastUpdated = new Date(repo.updated_at).toLocaleDateString();

        $('#cardsContainer').append(`
            <div class = 'yellow card'>
                <div id = ${repo.name} class='content' style='background-color:white; padding:0px'></div>
                <div class="extra content">
                    <a class='header' style='color:rgb(60,60,60)' href='${repo.html_url}'>${repo.name}</a>
                </div>
                <div class="extra content">
                    <div class='description'><p>${repo.description}</p></div>
                </div>
                <div class="extra content">
                    <div class='description'><em>${repo.language}</em></div>
                </div>
                <div class="extra content">
                    <span class="left floated code"><i class="code icon"></i>Last updated: ${lastUpdated}</span>
                    <span class="right floated star"><i class="star icon"></i>${repo.stargazers_count}</span>
                </div>
                <a style="" href='${repo.html_url}'><div class="ui bottom attached button">
                    <i class="github alternate icon"></i>
                    View on GitHub
                </div></a>
            </div>`);
        githubReadme(repo.url, (data) => { addPicture(data, repo.name); });
    }

    $('#cardsContainer').empty();
    ['junshern/Polygraphy', 'junshern/Pyano', 'junshern/RainCatcher', 'junshern/sliced', 
        'junshern/Sensorium', 'JornVoegtli/BCI', 'junshern/Present', 'junshern/embedded-systems', 
        'junshern/junshern.github.io', 'aaronlws95/hlp-project-2017'].forEach((x) => {
        githubRepo(x, addCard);
    });
    
});
