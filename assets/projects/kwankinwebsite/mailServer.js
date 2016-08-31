var mandrill = require('node-mandrill')('API KEY')

function sendEmail(_name, _email, _subject, _message) {
  mandrill('/messages/send', {
    message: {
      to: [{email: _email, name: _name}],
      from_email: 'noreply@yourdomain.com',
      subject: _subject,
      text: _message
    }
  }, function(error, response) {
    if (error) console.log(error)
    else console.log(response)
  })
}

app.post('/api/sendemail', function(req, res) {
  var _name = req.body.name
  var _email = req.body.email
  var _subject = req.body.subject
  var _message = req.body.message

  sendEmail(_name, _email, _subject, _message)
  
})