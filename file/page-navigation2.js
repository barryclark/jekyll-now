  /*<![CDATA[*/
    if (typeof firstText == "undefined") firstText = "First"; 
    if (typeof lastText == "undefined") lastText = "Last";
    var noPage;
    var currentPage;
    var currentPageNo;
    var postLabel;
    pagecurrentg();

    function looppagecurrentg(pageInfo) {
        var html = '';
        pageNumber = parseInt(numPages / 2);
        if (pageNumber == numPages - pageNumber) {
            numPages = pageNumber * 2 + 1
        }
        pageStart = currentPageNo - pageNumber;
        if (pageStart < 1) pageStart = 1;
        lastPageNo = parseInt(pageInfo / perPage) + 1;
        if (lastPageNo - 1 == pageInfo / perPage) lastPageNo = lastPageNo - 1;
        pageEnd = pageStart + numPages - 1;
        if (pageEnd > lastPageNo) pageEnd = lastPageNo;
        html += "<span class='showpageOf'>Page " + currentPageNo + ' of ' + lastPageNo + "</span>";
        var prevNumber = parseInt(currentPageNo) - 1;
      
		//Iccsi was here, doing magic      
        if (currentPageNo > 1) {
			if (currentPage == "page") {
			  html += '<span class="showpage firstpage"><a href="' + home_page + '">' + firstText + '</a></span>'
			} else {
			  html += '<span class="displaypageNum firstpage"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + firstText + '</a></span>'
			}
		}
		
		if (currentPageNo > 2) {
            if (currentPageNo == 3) { 
                if (currentPage == "page") {
                    html += '<span class="showpage"><a href="' + home_page + '">' + prevText + '</a></span>'
                } else {
                    html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + prevText + '</a></span>'
                }
            } else {
                if (currentPage == "page") {
                    html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + prevNumber + ');return false">' + prevText + '</a></span>'
                } else {
                    html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + prevNumber + ');return false">' + prevText + '</a></span>'
                }
            }
        }
        if (pageStart > 1) {
            if (currentPage == "page") {
                html += '<span class="displaypageNum"><a href="' + home_page + '">1</a></span>'
            } else {
                html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
            }
        }
        if (pageStart > 2) {
            html += ' ... '
        }
        for (var jj = pageStart; jj <= pageEnd; jj++) {
            if (currentPageNo == jj) {
                html += '<span class="pagecurrent">' + jj + '</span>'
            } else if (jj == 1) {
                if (currentPage == "page") {
                    html += '<span class="displaypageNum"><a href="' + home_page + '">1</a></span>'
                } else {
                    html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
                }
            } else {
                if (currentPage == "page") {
                    html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + jj + ');return false">' + jj + '</a></span>'
                } else {
                    html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + jj + ');return false">' + jj + '</a></span>'
                }
            }
        }
        if (pageEnd < lastPageNo - 1) {
            html += '...'
        }
        if (pageEnd < lastPageNo) {
            if (currentPage == "page") {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
            } else {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
            }
        }


        var nextnumber = parseInt(currentPageNo) + 1;
        if (currentPageNo < (lastPageNo - 1)) {
            if (currentPage == "page") {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + nextnumber + ');return false">' + nextText + '</a></span>'
            } else {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + nextnumber + ');return false">' + nextText + '</a></span>'
            }
		}
		
		if (currentPageNo < lastPageNo) {
			//Iccsi was here, doing magic
			if (currentPage == "page") {
			  html += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastText + '</a></span>'
			} else {
			  html += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastText + '</a></span>'
			}
        }

        var pageArea = document.getElementsByName("pageArea");
        var blogPager = document.getElementById("blog-pager");
        for (var p = 0; p < pageArea.length; p++) {
            pageArea[p].innerHTML = html
        }
        if (pageArea && pageArea.length > 0) {
            html = ''
        }
        if (blogPager) {
            blogPager.innerHTML = html
        }
    }

    function totalcountdata(root) {
        var feed = root.feed;
        var totaldata = parseInt(feed.openSearch$totalResults.$t, 10);
        looppagecurrentg(totaldata)
    }

    function pagecurrentg() {
        var thisUrl = urlactivepage;
        if (thisUrl.indexOf("/search/label/") != -1) {
            if (thisUrl.indexOf("?updated-max") != -1) {
                postLabel = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"))
            } else {
                postLabel = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?&max"))
            }
        }
        if (thisUrl.indexOf("?q=") == -1 && thisUrl.indexOf(".html") == -1) {
            if (thisUrl.indexOf("/search/label/") == -1) {
                currentPage = "page";
                if (urlactivepage.indexOf("#PageNo=") != -1) {
                    currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
                } else {
                    currentPageNo = 1
                }
                document.write("<script src=\"" + home_page + "feeds/posts/summary?max-results=1&alt=json-in-script&callback=totalcountdata\"><\/script>")
            } else {
                currentPage = "label";
                if (thisUrl.indexOf("&max-results=") == -1) {
                    perPage = 20
                }
                if (urlactivepage.indexOf("#PageNo=") != -1) {
                    currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
                } else {
                    currentPageNo = 1
                }
                document.write('<script src="' + home_page + 'feeds/posts/summary/-/' + postLabel + '?alt=json-in-script&callback=totalcountdata&max-results=1" ><\/script>')
            }
        }
    }

    function redirectpage(numberpage) {
        jsonstart = (numberpage - 1) * perPage;
        noPage = numberpage;
        var nameBody = document.getElementsByTagName('head')[0];
        var newInclude = document.createElement('script');
        newInclude.type = 'text/javascript';
        newInclude.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
        nameBody.appendChild(newInclude)
    }

    function redirectlabel(numberpage) {
        jsonstart = (numberpage - 1) * perPage;
        noPage = numberpage;
        var nameBody = document.getElementsByTagName('head')[0];
        var newInclude = document.createElement('script');
        newInclude.type = 'text/javascript';
        newInclude.setAttribute("src", home_page + "feeds/posts/summary/-/" + postLabel + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
        nameBody.appendChild(newInclude)
    }

    function finddatepost(root) {
        post = root.feed.entry[0];
        var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
        var timestamp = encodeURIComponent(timestamp1);
        if (currentPage == "page") {
            var pAddress = "/search?updated-max=" + timestamp + "&max-results=" + perPage + "#PageNo=" + noPage
        } else {
            var pAddress = "/search/label/" + postLabel + "?updated-max=" + timestamp + "&max-results=" + perPage + "#PageNo=" + noPage
        }
        location.href = pAddress
    }
  /*]]>*/