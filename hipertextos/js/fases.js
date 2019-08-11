var thehours = new Date().getHours();

	var themessage;
	var night = ('<img id="sun-phase" src="/hipertextos/cursors/sun-night.gif" alt="Nit">');
	var morning = ('<img id="sun-phase" src="/hipertextos/cursors/sun-morning.gif" alt="Alba">');
	var afternoon = ('<img id="sun-phase" src="/hipertextos/cursors/sun-afternoon.gif" alt="Cènit">');
	var evening = ('<img id="sun-phase" src="/hipertextos/cursors/sun-evening.gif" alt="Vespre">');

	if (thehours >= 0 && thehours < 6) {
		themessage = night; 
		$( "#theme-nox" ).prop('checked', true );

	} else if (thehours >= 6 && thehours < 12) {
		themessage = morning;
		$( "#theme-aurora" ).prop('checked', true );

	} else if (thehours >= 12 && thehours < 18) {
		themessage = afternoon;
		$( "#theme-meridianus" ).prop('checked', true );
		
	} else if (thehours >= 18 && thehours < 20) {
		themessage = evening;
		$( "#theme-vesperum" ).prop('checked', true );
		
	} else if (thehours >= 20 && thehours < 24) {
		themessage = night;
		$( "#theme-nox" ).prop('checked', true );
		
	}
	
$('#sun-phase').html(themessage);

$(function() {
   $('.th-aurora').click(function() {
   		$('#sun-phase').html('<img id="sun-phase" src="/hipertextos/cursors/sun-morning.gif" alt="Alba">');
   });

   $('.th-meridianus').click(function() {
   		$('#sun-phase').html('<img id="sun-phase" src="/hipertextos/cursors/sun-afternoon.gif" alt="Cènit">');
   });

   $('.th-vesperum').click(function() {
   		$('#sun-phase').html('<img id="sun-phase" src="/hipertextos/cursors/sun-evening.gif" alt="Vespre">');
   });

   $('.th-nox').click(function() {
   		$('#sun-phase').html('<img id="sun-phase" src="/hipertextos/cursors/sun-night.gif" alt="Nit">');
   });
});