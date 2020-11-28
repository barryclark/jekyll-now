function complementCSS() {
	complementImgParentCSS();
}

function complementImgParentCSS() {
	var imgs = document.getElementsByTagName("img");
	for (var index = imgs.length - 1; index >= 0; index--) {
		var imgParent = imgs[index].parentNode;
		if (imgParent.tagName == "P") {
			imgParent.classList.add("imgParent");
		}
 	}
}

// EXECUTION

complementCSS();

