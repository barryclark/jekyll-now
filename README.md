> March, 2016: If you're on an old version of Jekyll Now and run into a) build warnings or b) syntax highlighting issues caused by [Jekyll 3 and GitHub Pages updates](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0), just :sparkles:[update your _config.yml](https://github.com/barryclark/jekyll-now/pull/445/files):sparkles: and you'll be set!

# Jekyll Now

**Jekyll** is a static site generator that's perfect for GitHub hosted blogs ([Jekyll Repository](https://github.com/jekyll/jekyll))
It's what we're using for our website.

## Quick Start

If you have a Windows, your mileage may vary.

### Step 1) Clone this repository.

The following command will do:

`git clone https://github.com/uclaacm/uclaacm.github.io.git`

You should now have a working copy of this repository on your machine now.

### Step 2) Get Jekyll up and running.
If you have Ruby up and running, you can simply run the following command:
`gem install jekyll`

You may get some permission denied error. Which is fine. You'll just have to head on over to http://rvm.io/ which stands for Ruby Version Manager. You can use this to manage your gems.
Install rvm: `\curl -sSL https://get.rvm.io | bash -s stable`

Run the following command once rvm is installed: 
`rvm install 2.3.1`

You may have to close your terminal and re-open it, and if that still doesn't work you'll need to modify your ~/bash_profile file

Now, when you run the following commands:
`which ruby`
`ruby -v`
Outputs:
/Users/yourcomputername/.rvm/rubies/ruby-2.3.1/bin/ruby
ruby 2.3.1p112 (2016-04-26 revision 54768) [x86_64-darwin15]

Now you have two choices:
First, you can use a Gemfile + bundle install.
So cd into uclaac.github.io folder...
`gem install bundler`
Create a file named `Gemfile`
Add the following lines to this file:
`source 'https://rubygems.org'`
`gem 'github-pages', group: :jekyll_plugins`
Now in your terminal, you can run:
`bundle install`
`bundle exec jekyll serve` to see the magic happen.

### Step 3) View this site!

Run the command `jekyll serve` or `bundle exec jekyll serve` and see the magic happen at http://127.0.0.1:4000/

Make sure you're in the top level directory and not in /_posts or some other folder as you might encounter some issues.

### Step 4a) Adding blog posts

To add a blog post, create a file in `/_posts/` with the format `YYYY-MM-DD-Your-File-Name.md`. There's should already be some blog posts up for reference.

Make sure you add layout and title, which you can also see other posts for reference.

Save your file, and at index.html (the home screen) you should be able to see your newly added blog post.

### Step 4b) Adding other things

You're not just limited to adding blog posts. We'll need actual event pages for Hack On The Hill, Hacker Showcase, JS.LA, etc. These will be created in our root folder.
