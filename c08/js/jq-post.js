// NOTE: This example will only work if you run it on a web server (it will not work locally)
// You can try it out on the website for the book http://javascriptbook.com/code/c08/
// or run it on your own server.

$('#register').on('submit', function(e) {           // When form is submitted
  e.preventDefault();                               // Prevent it being sent
  var details = $('#register').serialize();         // Serialize form data
  $.post('register.php', details, function(data) {  // Use $.post() to send it
    $('#register').html(data);                    // Where to display result
  });
});