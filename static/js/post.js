function complementCSS() {
	complementImgParentCSS();
}

function complementImgParentCSS() {
	var imgs = document.getElementsByTagName("img");
	for (var index = imgs.length - 1; index >= 0; index--) {
		var img = imgs[index];
		var imgParent = imgs[index].parentNode;
		if (imgParent.tagName == "P") {
			// Adding 'imgParent' class
			imgParent.classList.add("imgParent");

			// Adding img's footer
			var h3Element = document.createElement("H3");
			h3Element.innerHTML = img.getAttribute("alt");
			imgParent.appendChild(h3Element);
		}
 	}
}

// EXECUTION

complementCSS();

