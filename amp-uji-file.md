---
layout: post
title: Medizaa Beri Bantuan untuk Anak Yatim di Banjarbaru
description: Bantuan yang diberikan ѕendiri berupa bahan ѕembako. Seperti beras, tepung, minyak goreng dan lainnya. Sasaran bantuannya ѕendiri juga random. Tapi terkhusus untuk masyarakat kurang mampu atau lansia.
keyword: Medizaa Peduli, bantuan anak yatim, medizaa banjarbaru, bantuan medizaa
permalink: /amp/uji-file/
permalinkcanonical: /medizaa-beri-bantuan-untuk-anak-yatim-di-banjarbaru/
gambar: https://apahabar.s3.ap-southeast-1.amazonaws.com/storage/20230627/153100-yatim-di-cempaka-webp-large.webp
---
<div id="result">Loading...</div>

<script>
$(function() {
    $.ajax({
        url: 'https://medizaaindonesia.biz.id/feed.json',
        type: 'get',
        dataType: 'jsonp',
        success: function(data) {
            var link, title, skeleton = '',
                content = data.feed.entry;
            if (content !== undefined) {
                skeleton = "<ol>";
                for (var i = 0; i < content.length; i++) {
                    title = content[i].title.$t;
                    for (var j = 0; j < content[i].link.length; j++) {
                        if (content[i].link[j].rel == "alternate") {
                            link = content[i].link[j].href;
                            break;
                        }
                    }
                    skeleton += '<li><a href="' + link + '">' + title + '</a></li>';
                }
                skeleton += '</ol>';
                $('#result').html(skeleton);
            } else {
                $('#result').html('<span>No result!</span>');
            }
        },
        error: function() {
            $('#result').html('<strong>Error loading feed!</strong>');
        }
    });
});
</script>
