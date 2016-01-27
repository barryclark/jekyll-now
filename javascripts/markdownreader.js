(function(document) {

    function updateOutline() {
        var arrAllHeader = document.querySelectorAll("#markdown-container h1,#markdown-container h2,#markdown-container h3,#markdown-container h4,#markdown-container h5,#markdown-container h6");
        var arrOutline = ['<ul>'];
        var header, headerText;
        var id = 0;
        var level = 0,
            lastLevel = 1;
        var levelCount = 0;
        for (var i = 0, c = arrAllHeader.length; i < c; i++) {
            header = arrAllHeader[i];
            headerText = header.innerText;

            header.setAttribute('id', id);

            level = header.tagName.match(/^h(\d)$/i)[1];
            levelCount = level - lastLevel;

            if (levelCount > 0) {
                for (var j = 0; j < levelCount; j++) {
                    arrOutline.push('<ul>');
                }
            } else if (levelCount < 0) {
                levelCount *= -1;
                for (var j = 0; j < levelCount; j++) {
                    arrOutline.push('</ul>');
                }
            };
            arrOutline.push('<li>');
            arrOutline.push('<a href="#' + id + '">' + headerText + '</a>');
            arrOutline.push('</li>');
            lastLevel = level;
            id++;
        }
        arrOutline.push('</ul>')
        var outline = document.getElementById('markdown-outline');
        if(arrOutline.length > 2){
            outline.innerHTML = arrOutline.join('');
            showOutline();
        }
        else outline.style.display = 'none';
    }

    function showOutline() {
        var outline = document.getElementById('markdown-outline');
        var markdownContainer = document.getElementById('markdown-container');
        // outline.style.left = markdownContainer.offsetLeft + markdownContainer.offsetWidth + 10 + 'px';
        outline.style.maxHeight = document.body.clientHeight - 30;
        outline.style.display = 'block';
    }

    updateOutline();

}(document));
