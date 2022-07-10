# Grape-Academic-Theme

<a href="https://jekyll-themes.com">
    <img src="https://img.shields.io/badge/featured%20on-JekyllThemes-red.svg" height="20" alt="Jekyll Themes Shield" loading="lazy">
</a>

---

![home](https://chrjabs.github.io/Grape-Academic-Theme/assets/img/portfolio.png)

Welcome to Grape Academic Theme!
This theme is based on [Grape Theme](https://github.com/naye0ng/Grape-Theme) and modifies it to be more directly applicable as an academic portfolio page.
It can still include a blog, but that is optional.

[Demo](https://chrjabs.github.io/Grape-Academic-Theme)

## Installation and Serving Local Version for Testing

1. Fork and clone the Grape Academic Theme repo

   ```
   git clone https://github.com/chrjabs/Grape-Academic-Theme.git
   ```

2. Install Jekyll 

   ```
   gem install jekyll
   ```

3. Install the theme's dependencies

   ```
   bundle install
   ```

4. Update `_config.yml`, `_data/projects.yml`, `_data/projects.yml` and `_bibliography/publications.bib` with your own settings.

5. Run the Jekyll server

   ```
   bundle exec jekyll serve
   ```

## Publishing

Grape-Academic-Theme uses jekyll-scholar and therefore needs to manually be published to GitHub pages.
A script for publishing on a `gh-pages` branch is included.
Run `_scripts/publish.sh` from the main project directory and the page will be built, copied to the `gh-pages` branch and published.
Make sure that GitHub pages is set up to publish that branch.
If additional scripts should be executed in the HTML root, they can be placed in `_scripts/publish.d` and will be automatically executed.

These are step-by-step instructions for forking and publishing the theme at your `<username>.github.io` github pages website:

1. For the repository to a repository named `<username>/<username>.github.io`
2. Go to the settings of the new repository and navigate to the "Pages" tab.
  There, change the source for github pages to the `gh-pages` branch of the repository.
3. Clone the repository and go through the installation steps listed above
4. In `_config.yml`, change the `baseurl` option to an empty string (`""`) to host the webpage in the root of your `github.io` page
5. Commit the change and (with a working jekyll install) run `_scripts/publish.sh`
6. _Wait a couple of minutes_ and the demo content will show up at `<username>.github.io`

## Customizing

Grape-Theme has two great features: the profile section and the project section of the portfolio page. Just by changing `_config.yml` and `projects.yml`, you can use all of these features.

### Blog Settings

The blog configuration is available in `_config.yml`.
If you do not want to include a blog in your page, set `blog: False`.
This will remove the navigation bar linking to the blog.

### Favicon

Generate your favicons with [realfavicongenerator.net](https://realfavicongenerator.net/) and place them in the root directory.
The code to include them is already set up in the template.

### Site configuration

```
baseurl: "{subpath}"

theme_settings :
  title: {blog title}
```

### Profile Settings

Profile is displayed on the index page, and also experience and skills are displayed on the portfolio page.
The profile is configured in `_data/profile.yml`.

```
image: assets/img/smile.png
username: Christoph Jabs
description: creator of the Grape-Academic-Theme! Grape-Academic-Theme is a modification of the Grape-Theme by naye0ng, making it more suitable as an academic portfolio.
webpage: https://chrjabs.github.io
experience:
  - start: 2017-05-03
    end: 2018-05-06
    experience : company name, title
interests:
  - Interest 1
  - Interest 2
skills: 
  - skill: HTML5 & CSS
    value: 85  # Percent value
```

### Presentations

The data for the presentations page can be defined in `data/presentations.yml`.

```
- presentation:
    title: A nice presentation
    event: Fancy conference
    date: 05/2022
    comment: This is some comment text that can do _Markdown_
    slides: https://www.google.com # potential link to slides
- presentation:
    title: A second presentation
    event: Another conference
    date: 03/2022
```

### Pagination

Defines the number of posts to be shown on one page.

```
paginate: 5
```

### Portfolio Settings

![home](https://chrjabs.github.io/Grape-Academic-Theme/assets/img/portfolio.png)

The Project configuration is available in `_data/projects.yml`.

The portfolio page provides projects and detailed views by modal.
If `modal : False` is selected, modal will not be displayed on site. 

- **print** : 
  
  - If `print: True` is selected, it will be displayed on landing page
  
- **modal** 
  
  - If `modal: True` is selected, modal will be displayed on the Portfolio page
  
    ![home](https://chrjabs.github.io/Grape-Academic-Theme/assets/img/modal.png)

```
print: True
modal: True  
```

Add details(link, description) about your projects

```
url: https://github.com/naye0ng/Grape-Theme # Full URL
image: "portfolio.png" # path: assets/project/
date: 2019.06.09 - 2019.07.11
title: 
summary: 
description:  
# modal contents
contents:
  - title:
    image:      	    
    description: 
```

### Colors

You can change colors at once. colors are in `_sass/base/_variable.scss`

## Posts in Grape theme

You can confirm how to draw tags at [here](https://grape-theme.netlify.com/2019/06/08/markdown-and-html.html) and [here](https://grape-theme.netlify.com/2019/06/09/grape-theme-style.html)

### Create a new post

1. Create a `.md` inside `_posts` folder
   ```
   2019-07-11-grape-theme.md
   ```

2. Write the [Front Matter](https://jekyllrb.com/docs/front-matter/) and content in the file.
   ```
   ---
   layout: post
   title: title
   subtitle : subtitle
   tags: [tag1, tag2]
   author: 
   comments : 
   ---
   ```

## Licence

The theme is available as open source under the terms of the [MIT Licence](https://opensource.org/licenses/MIT).