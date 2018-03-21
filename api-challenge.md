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

```html
<html>
<head>
<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
  <meta charset="utf-8">
  <title>API Weather Query</title>
  <script>

  function getSurfReport() {

// use AJAX to avoid CORS restrictions in API calls.
 var output = $.ajax({
    url: 'https://simple-weather.p.mashape.com/surfreport/123?units=imperial&days=1&time=1433772000',
    type: 'GET',
    data: {},
    dataType: 'json',
    success: function(data) {
        //Here we pull out the recommendation from the JSON object.
        //To see the whole object, you can output it to your browser console using console.log(data);
        document.getElementById("output").innerHTML = data.surfreport[0].monday.2pm.recommendation;
        },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "WOyzMuE8c9mshcofZaBke3kw7lMtp1HjVGAjsndqIPbU9n2eET"); // Enter here your Mashape key
    }
});

}

</script>
</head>
<body>

  <button onclick="getSurfReport()">See the surfing recommendation</button>
  <div id="output"></div>

</body>
</html>
```
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