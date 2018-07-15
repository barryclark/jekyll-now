---
title: Testing static man 
excerpt: Testing static man
---
<form method="POST" action="https://api.staticman.net/v2/entry/prashant2400/prashant2400.github.io/master/comments">
	<input name="options[redirect]" type="hidden" value="https://prashant2400.github.io">
	<!-- e.g. "2016-01-02-this-is-a-post" -->
	<input name="options[slug]" type="hidden" value="{{ page.slug }}">
	<label><input name="fields[name]" type="text">Name</label>
	<label><input name="fields[email]" type="email">E-mail</label>
	<label><textarea name="fields[message]"></textarea>Message</label>

<button type="submit">Go!</button>
</form>
