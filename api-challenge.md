---
layout: page
title: API Challenge
permalink: /api-challenge/
---

Use the JSON language to find the Spotify song!

<!-- Edit markdown here! -->
<textarea class="mdhtmlform-md">## Write markdown in the textarea!</textarea>
<br /><br />

<!-- Display converted html here! -->
<div class="mdhtmlform-html"></div>
<br /><br />

<!-- And insert converted html for submission here. -->
<textarea class="mdhtmlform-html" style="display: none;"></textarea>

### More Information

A place to include any other types of information that you'd like to include about yourself.

### Let's Get To Work!
<script async src="//jsfiddle.net/JMPerez/0u0v7e1b/embed/"></script>
<!-- 
<div class="container">
    <h1>Search for an Artist</h1>
    <p>Type an artist name and click on "Search". Then, click on any album from the results to play 30 seconds of its first track.</p>
    <form id="search-form">
        <input type="text" id="query" value="" class="form-control" placeholder="Type an Artist Name"/>
        <input type="submit" id="search" class="btn btn-primary" value="Search" />
    </form>
    <div id="results"></div>
</div>
<script id="results-template" type="text/x-handlebars-template">
    {{#each albums.items}}
    <div style="background-image:url({{images.0.url}})" data-album-id="{{id}}" class="cover"></div>
    {{/each}}
</script> -->

<!-- 
function getTweets(nextToken, callback) {

    var oauth2 = new OAuth.OAuth2(
        'fqEwvzuaE12FTIeZp2EYVlaIL',
        'xc7GoBOEXW8ESPhxwA65eRGxteUR7j4p8B40gfdtnVYXcb5zWr',
        'https://api.twitter.com/',
        null,
        'oauth2/token',
        null
    );


    // const searchPath = buildRequestURL(nextToken);
    const searchPath = buildStandardApiUrl(nextToken);

    oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
    }, function (e, access_token) {

        var options = {
            hostname: 'api.twitter.com',
            path: searchPath,
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        };

        https.get(options, function (result) {
            var data = '';
            result.setEncoding('utf8');
            result.on('data', (buffer) => {
                data += buffer;
            });
            result.on('end', () => {
                var tweets = JSON.parse(data);

                if (tweets && tweets.statuses) {
                    sendTwitterDataToKinesis(tweets, callback);
                } else {
                    callback('Error: Invalid Twitter Data');
                }
            });
        }).on('error', (e) => {
            console.log('Error: ' + e.message);
            callback(e);
        });
    });
} -->