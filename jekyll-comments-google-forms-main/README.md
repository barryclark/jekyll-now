# jekyll-comments-google-forms

Files necessary to add commenting functionality to Jekyll sites using Google Sheets as storage.

See this article for more details: [Using Google Forms for Jekyll Comments, Revisited]

## Configuration Options

Images of all of these features can be seen in the article linked above.

### Adding to Jekyll

The baisc idea is to copy `comment-section.html` to your `_includes` folder in your Jekyll project.

Then use the following liquid statement on any page or layout template in which you want to add comments:

```liquid
{% include comment-section.html %}
```

Comments are stored with reference to the current page's url (via `page.url`), so if you have a page generated with comments and change the url later (adding a permalink or something), then it would not show the existing comments. You could update the Google Sheets to change the url though for existing commnets.

If you have some other id you want to use instead of `page.url`, update the following line inside `comment-section.html`:

```javascript
var thisPageUrl = "{{ page.url }}";
```

### Data Source

If using Google Sheets + Google Forms as described in the [original article], you should have the following items in your `_config.yml` file:

```yml
comment-read: https://docs.google.com/spreadsheets/d/xxxx
comment-post: https://docs.google.com/forms/d/e/xxxxxx
comment-post-fields: [ entry.1111111, entry.1111111, entry.1111111]
```
See [this article] if you need a refresher on how to get these values.

--

If using Google Sheets + Google Apps Script, you should have the following in your `_config.yml` file instead:
```yml
google_forms_comments:
  google_app_script: Apps Script URL
```
For a refresher on how to get your app's script URL, see the [Using Google Forms for Jekyll Comments, Revisited] article.

### Chunked Comments

This feature shows the user only 5 comments at a time. If there are more comments, a "Load Older Comments" button is displayed.

This feature is ON by default.

This feature can be enabled or disabled on a site-level and a page-level.

To enable/disable the feature for the entire site, update `_config.yml` with the following boolean item
```yml
google_forms_comments:
  chunked_comment_loading: false
```
To enable/disable this feature on a per-page basis, update the page's front-matter:
```
chunked_comment_loading: false
```

If the page's front-matter value for `chunked_comment_loading` differs from the configuration option mentioned in the base site config, the page's value will be used. Therefore, you can have a site with chunked comments off on all but a single page or vice versa.

### Lazy Loaded Comments

This feature waits to load any comments or scripts required for the comments (jQuery, jquery-csv, validator) until the user signifies that they actually want to read the comments.

This feature is OFF by default.

This feature can be enabled or disabled on a site-level and a page-level.

To enable/disable the feature for the entire site, update `_config.yml` with the following boolean item
```yml
google_forms_comments:
  lazy_load_comments: false
```
To enable/disable this feature on a per-page basis, update the page's front-matter:
```
lazy_load_comments: false
```

If the page's front-matter value for `lazy_load_comments` differs from the configuration option mentioned in the base site config, the page's value will be used. Therefore, you can have a lazy loaded comments an all but a single page or vice versa.

### reCAPTCHA

This feature can be enabled when using the Google Sheets + Google Apps Script. 

After adding the relevant secret key to the Google Apps Script `RECAPTCHA_SECRET_KEY` variable, the Jekyll site's `_config.yml` should have the site key added in the following variable:
```yml
google_forms_comments:
  recaptcha_site_key: Site Key Here
```

For more specific details on setup required, please see the reCAPTCHA section of [Using Google Forms for Jekyll Comments, Revisited]


### Comment replies

This feature allows users to reply to other comments directly which gives more context to the comments. To see a preview of this feature, see the January 29 update on the [Using Google Forms for Jekyll Comments, Revisited] article.

This feature is set using the `comment_replies_enabled` option and is disabled by default.
```yml codeCopyEnabled
google_forms_comments:
  comment_replies_enabled: true
```

If you happen to enable the feature for your site and later turn it off, everything should still work as expected. In the very worst case, you would need to remove extra data from the beginning of comments that had been replies to other comments, but that does not currently appear to be necessary.

Deleting comments that are being replied to also ensures that the replies no longer try to link to the deleted comment.

### Comment caching

This feature only applies when using Google Apps Script. 

Comment data is now cached for 1 hour after a successful GET call retrieves comment data while using the AppsScript method. This cache is cleared in any of the following scenarios:
* An hour elapses
* A new comment is added via API
* The underlying spreadsheet or form are updated manually
* An error occurs when either adding or retrieving comments

This seems to significantly speed up time to load comments when cached data is available as shown in the [v2.2.0 release notes].

Although this feature is on by default, you can disable it by setting the `CACHING_ENABLED` variable in `Code.gs` to `false`.


[Using Google Forms for Jekyll Comments, Revisited]: https://jdvp.me/articles/Google-Forms-Jekyll-Comments-Revisited
[original article]: https://jdvp.me/articles/Google-Forms-Jekyll-Comments
[this article]: https://jdvp.me/articles/Google-Forms-Jekyll-Comments
[v2.2.0 release notes]: https://github.com/jdvp/jekyll-comments-google-forms/releases/tag/v2.2.0
