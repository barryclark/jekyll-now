# Lightning tutorial: Building a Jekyll Blog in 1 minute
Today I want to share the wonders of Jekyll, the gem this website is buit on.  

Jekyll is a Ruby gem that generates a blog-aware static site. Very simple and easy to just throw up with github-pages. Very slick and shares navigation and layout across multiple pages.
## Installing Jekyll
Like every gem. Install it by doing `gem install Jekyll`. This obviously installs the gem and allows you to run `jekyll new your_blog_name` to generate the project with jekyll files already configured and ready to go.
## Running Jekyll locally
In your terminal run `jekyll serve` to start the local jekyll server. __Then Boom, you're riding Jekyll__. You can view it under `localhost:4000` in your browser.
## Making posts and configuration
To make posts create a new file in the _posts folder and use this funky format `YYYY-MM-DD-Hella-Cool-title.md` for each post. Your `_config.yml` file will contain all the text you need to change so it doesn't look like you just generated a brand new jekyll blog.
## Hosting to Github Pages
Fortunately this is the most tedious part of getting setup. Depending on if you choose to use a custom domain or the github subdomain. Check out the [documentation](https://jekyllrb.com/docs/github-pages/). For a much more comprehensive experience checkout the [official docs](https://jekyllrb.com/docs/home/).  
