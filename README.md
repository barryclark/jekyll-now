# Jekyll Now

I found Jekyll a little tricky to set up. I ran into complications setting up local development, configuring plugins, and figuring out a good workflow for blogging. After [publishing my blog](http://jekyllkickstart.com), I found that I really didn't need a lot of those complexities in the first place.

I created Jekyll Now to help you get your Jekyll blog set up extremely quickly, avoiding the pitfalls that I fell into. It features my lovely GitHub influenced responsive base theme and most importantly **no need to touch the command line**.

#### Jekyll Now lets you create, personalize and post to your Jekyll blog in minutes — _all directly on GitHub.com_

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

## 5 Minute Blog Setup—all on GitHub.com

#### 1) Fork Jekyll Now

Click the fork button at the top right of the repository. 

#### 2) Rename it to be your GitHub user site

After forking, click the Settings button on your new repository and change the repository name to username.github.io -- make sure that username is replaced with your GitHub username! 

#### 3) Your blog is live!

Go to http://username.github.io and you'll see your site live! This can take up to 10 minutes to update, but often it's there right away. 

#### 4) Customize your blog

Input your details by simply editing the configuration file. Go to your forked repository and open up _config.yml. In there you'll be able to input your:

- Blog name
- Description
- Avatar
- Social links
- Disqus comments code
- Google Analytics code

#### 5) Publish your first post

Go to the _posts folder and edit the Hello World post that's there to create your first post! Jekyll pulls the date of the post from the filename, so change that to today's date. 

## More things you can do directly on GitHub.com

#### Publish new content

To publish new blog posts, go into the _posts folder and click the New File button. Name your post in this format: year-month-day-Title.md, save it, and you're set! 

(You can also publish new content via command line by git cloning down your repo, and pushing up your new markdown files)

#### Set up your domain name

Follow the latest [GitHub Pages Custom Domain Guide](https://help.github.com/articles/setting-up-a-custom-domain-with-pages) to set up your custom domain name. I've created the CNAME file already, so that you can easily edit it within the repository. 

#### Customize your theme

Any files that you edit within your repo will trigger a rebuild of your GitHub Pages site. 

- HTML templates are located in _layouts, _includes and index.html
- CSS is at style.css (Jekyll doesn't compile SASS, that requires using the local development workflow below)

Read more about theme development at the [Jekyll documentation](http://jekyllrb.com/docs/home/). 

## Local Theme Development

List of reasons that you might want to use local theme development: 

- Cover importing posts from another blogging platform. http://import.jekyllrb.com/docs/home/

The first step of local development is git cloning your repo. 

PIC

Then pick option 1 or 2 depending on whether you want to be able to build/view you site locally—that's the part where things get a little more tricky. 

#### Option 1) Building and viewing your site via GitHub Pages

You can make quick changes to the theme without needing to set up Jekyll and it's dependancies on your local machine if you allow GitHub Pages to tackle building and deploying the site for you. Here's what the workflow looks like:

- Type "grunt" in the command line to watch and compile any edits that you make to sass files within the SCSS folder. 
- Edit layout, styles and content. 
- Push your changes back up to your repo, triggering GitHub Pages to rebuild your site, to view them. 

If you're just looking to make a couple of quick theme changes, then this might do the trick for you.

#### Option 2) Building and viewing your Jekyll site locally

If you're looking to do significant theme development, then you might prefer to set up Jekyll to build your site locally so that you can watch your local changes and view the site. 

To do that you'll first need to install Jekyll and it's dependancies:

- 

Here's what the workflow looks like:

- 

## Questions or requests?

[Open an Issue](https://github.com/barryclark/jekyll-now/issues/new) and let's chat!

## Credits

## Get notified when I release new themes

Next up: A Jekyll based portfolio site theme to showcase projects and content. 

If you'd like me to let you know when I release a new theme, just [drop me your email for updates](http://getresponse.com). 
