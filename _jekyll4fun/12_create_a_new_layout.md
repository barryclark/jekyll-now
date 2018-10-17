---
title: Add A Layout for Your Collection
slug: customize-a-collection-style
chapter: 12
---
Your final assignment today is to work with layouts and includes in order
to improve the look and feel of your published conference notes.  I'm only
going to give you the core necessary steps, unleash your creativity and
explore options for your style.

## Define a new layout
Open up the *_layouts* directory .

__Step 1.__ Copy the posts layouts to create a new layout.
```sh
cp post.html collection-post.html
```
__Step 2.__  Reuse the html scaffolding
```ruby
layout: default
```
Layouts can be nested, so often you have a default to handle the basic
html structure, that then delegates to specific types of layout.

__Step 3.__ Update your front matter defaults to use your new layout

* Open _config.yml file
* Set the defaults.connecttech2018.layout value

  ```ruby
  defaults:
    - scope:
        path: ""
        type: "connecttech2018"
      values:
        layout: "conference-post"
  ```

__Step 4.__ Restart Jekyll

## Explore And Design Your Perfect Layout

Ideas to get you started.

_Add a Track under the post title_

{% raw %}
```html
<strong>Track:</strong> {{page.track}}
```
{% endraw %}

```yaml
track: Other Tech
```

_Get "Written On" To Show A Date_

* What's up with the "written on" section in the page?
* Does the _posts convention for dates work here?

_Replace "Written On" with a list of tags_

* Liquid Snippet for displaying tags
{% raw %}
```
{% for t in page.tags %}
  <span> {{ t }} </span>
{% endfor %}
```
{% endraw %}
<details>
 <summary>Where do you define the tags?</summary>
 Post Front Matter
 Add A new object "tags"
 Add values with array syntax
 </details>

_Add Collection Defaults And Track Info_

* Add additional variables to your collection definition
```yaml
collections:
  connecttech2018:
    output: true
    title: Notes from Connect Tech
    description: What I learned at Connect Tech!
```
<details>
<summary>Where is this?</summary>
_config.yml
Working locally?  Don't forget to restart!
</details>

* Before post content add a new section to display the default properties

   {% raw %}
```html
   <div>
     {% assign current_collection = site.collections | where: "label", page.collection | first %}
     <h4> {{ current_collection.title }} </h4>
     {{ current_collection.description }}
    </div>
```
   {% endraw %}

<details>
  <summary>Why do I have to filter where by first?</summary>
  The <em>where</em> always returns and array, even of just one item.
  If you don't also ask for the first item, you'll get weird results.
  (I did mention that Liquid is <em>verbose</em>!)
</details>
