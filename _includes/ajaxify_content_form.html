<script>
    var contactForm = document.querySelector('form'),
    inputEmail = contactForm.querySelector('[name="email"]'),
    textAreaMessage = contactForm.querySelector('[name="content"]'),
    sendButton = contactForm.querySelector('button');

    sendButton.addEventListener('click', function(event){
      event.preventDefault();

      sendButton.innerHTML = 'sending..';

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '//formspree.io/{{ site.email }}', true);
      xhr.setRequestHeader("Accept", "application/json")
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

      xhr.send(
        "email=" + inputEmail.value +
        "&message=" + textAreaMessage.value);

      xhr.onloadend = function (res) {
        if (res.target.status === 200){
          sendButton.innerHTML = 'Message sent!';
        }
        else {
          sendButton.innerHTML = 'Error!';
        }
      }
    });
</script>
