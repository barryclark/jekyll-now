---
title: Site Level Config
slug: site-level-config
chapter: 2
links:
  - https://github.com/barryclark/jekyll-now
  - https://jekyllrb.com/docs/configuration/
aside: config-yml-and-local.html
---
Now that you have a site, your first task is to personalize it.
We do that by editing the "_config.yml" file.

Jekyll's _config.yml file serves a couple of purposes:

* Sets build options
* Defines "site" level properties

<details>
  <summary><em>Tips if you are new to YAML (*.yml)</em></summary>
  <p><ul>
    <li>Do not use tabs to align content, only spaces</li>
    <li> If your value causes parsing error, just wrap it with quotes (single or double)</li>
    <li>Github sends you an email if it can't read your _config.yml</li>
  </ul></p>
</details>

### Personalize Site Header Properties
<figure>
<figcaption> Change the name, description, and avatar for your site </figcaption>
<img src="/images/config.png" />
</figure>

###  Personalize Footer Links

```ruby
footer-links:
  dribbble:
  email: binbrain@rightbox.com
  facebook:
  flickr:
  github: lauramoore
  instagram:
  linkedin: laurakmoore
  pinterest:
  rss: # just type anything here for a working RSS icon
  twitter: lk_moore
  stackoverflow: # your stackoverflow profile, e.g. "users/50476/bart-kiers"
  youtube: # channel/<your_long_string> or user/<user-name>
  googleplus: # anything in your profile username that comes after plus.google.com/
```
# While We Wait
Jekyll is now re-rendering your site and replacing Barry's information with yours.
While that happens,  let's take a quick look at Jekyll's templating system.  
There are two main categories of re-usable content.
1. Includes
2. Layouts

## 1. Includes example __includes/svg-icons.html_

"Includes" are templates to define re-usable fragments of markdown or html,
as in this example a list of icons to show in the footer.

<details>
<summary><strong>Quiz:</strong> "site" refers to what jekyll file?</summary>
<p><strong>__config.yml_</strong></p>
</details>

## Layouts example __layouts/default.html_

Layouts provide a consistent look and feel for your content by combining
structural elements for a given page.

This default layout, for example, defines everything that goes into a page from
the html tag down.

## Layouts example __layouts/post.html_

Thankfully,  we only need one low level html layout as layouts can be nested.
This post layout controls how specific elements of each post will render within
the default layout.
