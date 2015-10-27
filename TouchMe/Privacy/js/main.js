$(function() {



	if(isMobile()){

		$(".showMobile").show();
		$(".showDesktop").hide();
	} else {

		$(".showMobile").hide();
		$(".showDesktop").show();
	}
});

function showSection(page){
	if(isMobile()){
		location.href=page+'.html';
	} else {
		$("#iframe").attr('src',page+'.html');
	}

}


function isMobile(){
	var windowSize = window.parent.screenSize;
	if (typeof windowSize === "undefined") {
		windowSize = $(window).width();
	}
	if(windowSize <=767){
		return true;
	} else {
		return false;
	}
}

function closeContact(){
$(".contactOptions").hide();
}

function showContact(){
$(".contactOptions").show();

}

function showItemDetails(id){
	if($("#arrow-"+id).attr("src")=="img/arrow-up.png"){
		$("#arrow-"+id).attr("src","img/arrow-down.png");
		$("#details-"+id).slideDown();
	} else {
		$("#arrow-"+id).attr("src","img/arrow-up.png");
		$("#details-"+id).slideUp();
	}
}