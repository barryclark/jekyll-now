## Contact Me

<form class="form-horizontal" action="//formspree.io/admin@taylorjhawkins.com" method="POST">
<fieldset>
  <div class="form-group">
    <input type="text" name="name" placeholder="Your Name">
  </div>
  <div class="form-group">
    <input type="email" name="_replyto" placeholder="Your Email">
  </div>
  <div class="form-group">
    <textarea class="form-control" id="textarea" name="message">Your Message</textarea>
  </div>
  <div class="form-group">
    <input type="submit" value="Send">
  </div>
    <input type="text" name="_gotcha" style="display:none" />
</fieldset>
</form>

<form action="//formspree.io/email@domain.com" method="POST">
    <fieldset>
        <label for="name">Your name</label><br>
        <input type="text" name="name" placeholder="Name" required>
    </fieldset>
    <fieldset>
        <label for="_replyto">Your email</label><br>
        <input type="email" name="_replyto" placeholder="example@domain.com" required>
    </fieldset>
    <fieldset>
        <label for="message">Your message</label><br>
        <textarea name="message" rows="1" placeholder="Message" required></textarea>
    </fieldset>
    <input class="hidden" type="text" name="_gotcha" style="display:none">
    <input class="hidden" type="hidden" name="_subject" value="Message via http://domain.com">

    <input class="button submit" type="submit" value="Send">
</form>

<form class="form" id="contactform" action="//formspree.io/email@domain.com" method="POST">
    <fieldset class="field">
        <input class="input" type="text" name="name" placeholder="Name" required>
        <label class="label" for="name"><span class="label-content">Your name</span></label>
    </fieldset>
    <fieldset class="field">
        <input class="input" type="email" name="_replyto" placeholder="example@domain.com" required>
        <label class="label" for="_replyto"><span class="label-content">Your email</span></label>
    </fieldset>
    <fieldset class="field">
        <textarea class="input" name="message" rows="1" placeholder="Message" required></textarea>
        <label class="label" for="message"><span class="label-content">Your message</span></label>
    </fieldset>
    <input class="hidden" type="text" name="_gotcha" style="display:none">
    <input class="hidden" type="hidden" name="_subject" value="Message via http://domain.com">
    <fieldset class="field">
        <input class="button submit" type="submit" value="Send">
    </fieldset>
</form>