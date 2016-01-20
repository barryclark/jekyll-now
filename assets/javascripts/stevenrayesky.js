$(document).ready(function(){
	$("#profile_portrait_box img").delay(500).queue(function (){
		$(this).css("visibility", "visible").dequeue();
	}).animate({
			width: "300px",
			top: 0,
			left: 0
	})
	$("#profile_resume_inner").delay(750).queue(function (){
		$(this).css("visibility", "visible").dequeue();
	}).animate({
		height: "100px",
		width: "100px",
		top: 0,
		left: 0
	});
	$("#profile_projects_inner").delay(1000).queue(function (){
		$(this).css("visibility", "visible").dequeue();
	}).animate({
		height: "100px",
		width: "100px",
		top: 0,
		left: 0
	});
	$("#profile_contact_inner").delay(1250).queue(function (){
		$(this).css("visibility", "visible").dequeue();
	}).animate({
		height: "100px",
		width: "100px",
		top: 0,
		left: 0
	});

	// Change view to Resume box.
	$("#profile_resume_box").click(function(){
		shrink()
		$(".resume_layer").delay(1800).queue(function(){
			$(this).css("display", "block").dequeue()});
		$(".about_layer").delay(1800).queue(function(){
			$(this).css("display", "none").dequeue()});
		
	});

	// Change view to Projects box.
	$("#profile_projects_box").click(function(){
		shrink()
		$(".projects_layer").delay(1800).queue(function(){
			$(this).css("display", "block").dequeue()});
		$(".about_layer").delay(1800).queue(function(){
			$(this).css("display", "none").dequeue()});
		
	});

	// Change view to Contact box.
	$("#profile_contact_box").click(function(){
		$(".contact_layer").delay(1800).queue(function(){
			$(this).css("display", "block").dequeue()});
		$(".about_layer").delay(1800).queue(function(){
			$(this).css("display", "none").dequeue()});
		shrink()
	});


	// *******************************************
	function shrink(){
		$("#profile_portrait_box img").delay(500).queue(function (){
			$(this).css("visibility", "visible").dequeue();
		}).animate({
			width: "0px",
			top: "50%",
			left: "50%"
		});
		$("#profile_resume_inner").delay(750).queue(function (){
			$(this).css("visibility", "visible").dequeue();
		}).animate({
			height: "0px",
			width: "0px",
			top: "50%",
			left: "50%"
		});
		$("#profile_projects_inner").delay(1000).queue(function (){
			$(this).css("visibility", "visible").dequeue();
		}).animate({
			height: "0px",
			width: "0px",
			top: "50%",
			left: "50%"
		});
		$("#profile_contact_inner").delay(1250).queue(function (){
			$(this).css("visibility", "visible").dequeue();
		}).animate({
			height: "0px",
			width: "0px",
			top: "50%",
			left: "50%"
		});
	};
	// *******************************************

});

