---
layout: post
title: Week 12R - Child Themes and Lab Time
categories: cpnt200
---

## Homework
1. Child Themes
    - Read: [How to Create and Customize a WordPress Child Theme](https://www.hostinger.com/tutorials/how-to-create-wordpress-child-theme)
    - Codex: [Child Themes](https://developer.wordpress.org/themes/advanced-topics/child-themes/)
    - Codex: [Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/)
2. Page Templates
    - Codex: [Page Templates](https://developer.wordpress.org/themes/template-files-section/page-template-files/)
    - Codex: [Custom Templates](https://developer.wordpress.org/themes/template-files-section/page-template-files/#creating-a-custom-page-template-for-one-specific-page)
    - Codex: [Template Partials](https://developer.wordpress.org/themes/template-files-section/partial-and-miscellaneous-template-files/#content-slug-php)
    - Note: Page Templates override `page-{slug}.php` and `page-{id}.php`
3. Starter Themes
    - [Underscores](https://underscores.me/)

---

## 1. The simplest theme

**Sample Code**: [Broken Theme](https://github.com/sait-wbdv/php-sample-code/tree/main/wordpress/wp-content/themes/broken)

### Activity: Fix a broken theme
1. Copy the `broken` theme folder into your Local wordpress themes directory:
    
    ```shell
    /app/public/wp-content/themes
    ```

2. Navigate to the Appearance section in your WP Admin. Notice that there is a new theme listed a the "Broken" section at the bottom of the page.
3. Fix the theme!
    1. Add an empty `styles.css` file in your `broken` theme directory
    2. Reload the Appearance Admin panel. You should now have a new error: you're missing an `index.php` file.
    3. Rename `index.html` to `index.php`
    4. Reload the Apearance Admin panel. The "broken" should no longer be broken.
    5. Activate your `broken` theme and view it in the browser. This is the bare minimum theme but it doesn't do you much good.
4. Try adding a new stylesheet to `index.php`:
    1. Create a stylesheet that sets the `background-color` of the body element and place it in the following location:

        ```shell
        /[theme-name]/app/public/wp-content/themes/broken/css/main.css
        ```
    
    2. Now link to this stylesheet in `index.php`:

        ```html
        <head>
          ...
          <link rel="stylesheet" src="css/main.css">
        </head>
        ```
    
    3. Reload your page. Does the `background-color` reflect your new declaration? Why?

---

## 2. Making a Child Theme based on Underscores

**Sample Code**: [Underscores Starter Theme](https://github.com/sait-wbdv/php-sample-code/tree/main/wordpress/wp-content/themes/underscores)
- Note: you can generate your own version of this theme on the [Underscores website](https://underscores.me/).

### Activity: Create an Underscores Child Theme
1. Copy the `underscores` theme folder into your Local wordpress themes directory:
    
    ```shell
    /[theme-name]/app/public/wp-content/themes
    ```

2. Activate this theme in the Appearance Admin section and view in your browser.
3. Create a child theme based on `underscores`
    1. Create a new directory in the `themes` directory called `underscores-child`.
    2. Create a new file called `style.css` in this empty directory and past the following code in the page:

        ```css
        /*
        Theme Name:   Underscores Child
        Template:     underscores
        */
        ```

        - Note: See the [Child Themes](https://developer.wordpress.org/themes/advanced-topics/child-themes/) page on the WP Codex for the (recommended) extra info for production themes.
        - Now we have to tell WP that this stylesheet exists so it will recognize it as a theme. 

    3. Create a `functions.php` file in your new child theme directory and paste the following code into it:

        ```php
        <?php
          add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );
          
          function enqueue_parent_styles() {
          wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );
        }
        ?>
        ```

    4. This child theme can now be Activated in the Appearance Admin panel. Do this and view the site in your browser.

### Activity: Add a custom template for an About page
See: [Custom Templates](https://developer.wordpress.org/themes/template-files-section/page-template-files/#creating-a-custom-page-template-for-one-specific-page) in the WP Codex

1. Create a new page in the Pages Admin panel and set the permalink stub to `about`. The content of the page doesn't matter. 
2. Create a new page in your child theme directory called `page-about.php`.
3. Copy and paste the content in `page.php` of the parent `underscores` theme into your `page-about.php` child theme page.
4. Add some html to `page-about.php` that you will reconize when loaded in the browser, such as:

    ```html
    <p>This is a custom About template.</p>
    ```

5. Navigate to your new About page (using the permalink slug: `http://[domain]/about`) to see your modification.

### Activity: Add a global page template
See: [Creating Custom Page Templates for Global Use](https://developer.wordpress.org/themes/template-files-section/page-template-files/#creating-custom-page-templates-for-global-use) in the WP Codex

1. Create a new page in your child theme directory called `page_fancy.php`.
    - Note: it's important that you don't start the page name with `page-` because it will br treated as a specific Custom page template that we created in the previous activity.
2. Copy and paste the content in `page.php` of the parent `underscores` theme into your `page_fancy.php` child theme page.
3. Create a global template by writing an opening PHP comment at the top of the file that states the template’s name:
    
    ```php
    <?php /* Template Name: Fancy Template */ ?>
    ```

4. Add some html to `page_fancy.php` that you will reconize when loaded in the browser, such as:

    ```html
    <p>This is a Fancy template.</p>
    ```

5. Create a new page in the Pages Admin panel. You will see your new Template listed in the `Page Attributes` side panel under `Template`.
6. Select this template and view your handy-work in the browser.

---

## 3. Open Lab Time

### Activity: Detective Work
Now that you know how Page templates work in Wordpress, find a file that is associated with a global Page Template in your favourite WP Theme: `Page Attributes` > `Template`.

---

## Clean-up Time!