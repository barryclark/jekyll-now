function setCollapseExpandIcon(button) {
	// Set the collapse expand button to the correct icon
	$(button).removeClass('fa-minus-square-o')
	$(button).removeClass('fa-minus-square')
	$(button).removeClass('fa-plus-square-o')
	$(button).removeClass('fa-plus-square')
	if ($(button).closest('.input_area').hasClass('collapsed')) {
		if ($(button).is(':hover')){$(button).addClass('fa-plus-square')} 
		else {$(button).addClass('fa-plus-square-o')}
	} else { 
		if ($(button).is(':hover')){$(button).addClass('fa-minus-square')}
		else {$(button).addClass('fa-minus-square-o')}
	}
}

$(document).ready(function(){
	// Collapse input_area and change icon upon click
	$('.collapse_expand_button').click(function(){
		$(this).closest('.input_area').toggleClass('collapsed')
		setCollapseExpandIcon(this)
	});
	// Highlight icon upon hover
	$('.collapse_expand_button').hover(
		function(){setCollapseExpandIcon(this)},
		function(){setCollapseExpandIcon(this)}
	)
	// Run on each
	$('.collapse_expand_button').each(function(){setCollapseExpandIcon(this)});
})