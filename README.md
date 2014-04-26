# Jekyll Now

Create your Jekyll blog in minutes, without touching the command line.

I wrote a more detailed walkthrough including details of a lot of the workflow benefits and intro to Jekyll here: [Getting Started With Jekyll](#). You can use the Setup guide below to try Jekyll Now out fast. 

### Setup

##### Step 1) Fork Jekyll Now

I love starting out by forking first as you can get a feel for what Jekyll is like _extremely quickly_. You don't have to set up a local development environment, install dependancies and figure out how the Jekyll build process works to get your site up and running.

![Step 1](/images/step1.gif "Step 1")

1. Hit the fork button at the top right of the repository to fork a copy to your GitHub account.
2. Click the Settings button on your new forked repository and change the repository name to yourusername.github.io (ensure that yourusername is replaced with your GitHub username).
3. Your site should be live immediately! (although it can take up to 10 minutes)

##### Step 2) Customize your site

You can now edit your site name, gravatar and other options using the _config.yml file. 

![Step 2](/images/step2.gif "Step 2")

##### Step 3) Publish your first blog post

Your site is customized and looking great. Now you just have to write that epic blog post!

![Step 3](/images/step3.gif "Step 3")

1. Edit the Hello World post in the _posts folder, deleting the placeholder content and entering your own.
2. Change the filename to include today's date and the title of your post. Jekyll requires posts to be named year-month-day-title.md
3. Update the Title. Those variables at the top of the blog post are called front-matter. In this case they specify which layout to use and the title of the blog post. There are [additional front-matter variables](http://jekyllrb.com/docs/frontmatter/) too, like permalink, tags, and category.
4. You can also create new blog posts without setting up local development, you can just hit the + icon in the _posts folder to create new content. Just remember to format the filename correctly and to include the front matter block to ensure that the file gets processed by Jekyll. 

## Features

✓ Fully responsive and mobile optimized theme ([Theme Demo](http://jekyllkickstart.com))  
✓ Workflow using GitHub.com to create, customize and post to your blog  
✓ Host on your free GitHub Pages user site  
✓ Blog in markdown!  
✓ Syntax highlighting  
✓ Disqus commenting  
✓ Google Analytics integration  
✓ Optional Grunt workflow for local development using SASS  

✘ No setting up local development  
✘ No installing dependancies  
✘ No configuring plugins  
✘ No need to spend time on theming  
✘ No setting up hosting  
✘ More time to code other things! ... wait that's a ✓  

## More things you can do without touching the command line

#### Publish new content

To publish new blog posts, go into the _posts folder and click the New File button. Name your post in this format: year-month-day-Title.md, save it, and you're set! 

(You can also publish new content via command line by git cloning down your repo, and pushing up your new markdown files)

#### Set up your domain name

Follow the latest [GitHub Pages Custom Domain Guide](https://help.github.com/articles/setting-up-a-custom-domain-with-pages) to set up your custom domain name. I've created the CNAME file already, so that you can easily edit it within the repository.

## Any questions?

[Open an Issue](https://github.com/barryclark/jekyll-now/issues/new) and let's chat!

## Get notified when I release new themes

If you'd like me to let you know when I release a new theme, just [drop me your email for updates](http://getresponse.com). I'm currently working on a personal portfolio site Jekyll Now theme.

## Credits

- SVG icons
- Code/design reviewers
- Jekyll!