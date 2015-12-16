# Includes

There are two types of includes...



## 1. includes for templates.

All includes with `_` are used for templates, like for example the `_head.html` or `_footer.html`.



## 2. includes as commands

Includes without an underscore are commands you can use in posts and pages. I left out the `.html`-ending to reduce the typing and though the commands look cleaner. They only look messy when you open them in your coding-editor of choice.

Checkout for example `alert`:

{% include alert success="Yay! you did it!" %}

or

{% include gallery %}

Enjoy :)