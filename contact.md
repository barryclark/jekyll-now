---
layout: page
title: Contact Me
permalink: /contact/
---

[formspree.io](http://formspree.io) allows you a simple way to host a contact form or similar on your Jekyll or static site that doesnt allow you to execute code.

**Change the email@mydomain.com to your email.**

**_next** tells the form where to send the user after they submit their email/form. sends to a the thanks page

**_subject** is the subject you'd like from the system.

**_gotcha** is a spam prevention input.

You set up your page and contact and then you have to submit your form once. Afterwards they send you a confirmation link and allow you to continue receiveing emails from the form.




<form action="//formspree.io/email@mydomain.com" method="post">
    Your Name: <input type="text" name="name" placeholder="Your name">
    <br />
    Your Email: <input type="text" name="_replyto" placeholder="Your email" />
    <br />
    What do you have to say? 
    <br /><textarea name="body"></textarea>
    <input type="hidden" name="_next" value="{{ site.url }}/thanks/" />
    <input type="hidden" name="_subject" value="Contact from website!" />
    <input type="text" name="_gotcha" style="display:none" />
    <input type="submit" value="Send">
</form>
