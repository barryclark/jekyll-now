/*  Super Search
    Author: Kushagra Gour (http://kushagragour.in)
    MIT Licensed
*/

(function () {
    var isSearchOpen = false,
        searchEl = document.querySelector('#js-search'),
        searchInputEl = document.querySelector('#js-search__input'),
        searchResultsEl = document.querySelector('#js-search__results'),
        currentInputValue = '',
        lastSearchResultHash,
        posts = [];

    // Changes XML to JSON
    // Modified version from here: http://davidwalsh.name/convert-xml-json
    function xmlToJson(xml) {

        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        // If all text nodes inside, get concatenated text from them.
        var textNodes = [].slice.call(xml.childNodes).filter(function (node) { return node.nodeType === 3; });
        if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
            obj = [].slice.call(xml.childNodes).reduce(function (text, node) { return text + node.nodeValue; }, '');
        }
        else if (xml.hasChildNodes()) {
            for(var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof(obj[nodeName]) == "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof(obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    }

    function getPostsFromXml(xml) {
        var json = xmlToJson(xml);
        return json.channel.item;
    }

    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","/sitemap.xml");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState != 4) return;
        if (xmlhttp.status != 200 && xmlhttp.status != 304) { return; }
        var node = (new DOMParser).parseFromString(xmlhttp.responseText, 'text/xml');
        node = node.children[0];
        posts = getPostsFromXml(node);
    }
    xmlhttp.send();

    window.toggleSearch = function toggleSearch() {
        _gaq.push(['_trackEvent', 'supersearch', searchEl.classList.contains('is-active')]);
        searchEl.classList.toggle('is-active');
        if (searchEl.classList.contains('is-active')) {
            // while opening
            searchInputEl.value = '';
        } else {
            // while closing
            searchResultsEl.classList.add('is-hidden');
        }
        setTimeout(function () {
            searchInputEl.focus();
        }, 210);
    }

    window.addEventListener('keyup', function onKeyPress(e) {
        if (e.which === 27) {
            toggleSearch();
        }
    });
    window.addEventListener('keypress', function onKeyPress(e) {
        if (e.which === 47 && !searchEl.classList.contains('is-active')) {
            toggleSearch();
        }
    });

    searchInputEl.addEventListener('input', function onInputChange() {
        var currentResultHash, d;

        currentInputValue = (searchInputEl.value + '').toLowerCase();
        if (!currentInputValue || currentInputValue.length < 3) {
            lastSearchResultHash = '';
            searchResultsEl.classList.add('is-hidden');
            return;
        }
        searchResultsEl.style.offsetWidth;

        var matchingPosts;
        // check the `posts` object is single or many objects.
        // if posts.title === undefined, so posts is many objects.
        if(posts.title === undefined) {
          matchingPosts = posts.filter(function (post) {
              if ((post.title + '').toLowerCase().indexOf(currentInputValue) !== -1 || (post.description + '').toLowerCase().indexOf(currentInputValue) !== -1) {
                  return true;
              }
          });
        }else {
          matchingPosts = [posts]; // assign single object to Array
        }
        if (!matchingPosts.length) {
            searchResultsEl.classList.add('is-hidden');
        }
        currentResultHash = matchingPosts.reduce(function(hash, post) { return post.title + hash; }, '');
        if (matchingPosts.length && currentResultHash !== lastSearchResultHash) {
            searchResultsEl.classList.remove('is-hidden');
            searchResultsEl.innerHTML = matchingPosts.map(function (post) {
                d = new Date(post.pubDate);
                return '<li><a href="' + post.link + '">' + post.title + '<span class="search__result-date">' + d.toUTCString().replace(/.*(\d{2})\s+(\w{3})\s+(\d{4}).*/,'$2 $1, $3') + '</span></a></li>';
            }).join('');
        }
        lastSearchResultHash = currentResultHash;
    });

})();
