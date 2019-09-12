#############################################################################
#
# Modified version of jekyllrb Rakefile
# https://github.com/jekyll/jekyll/blob/master/Rakefile
#
#############################################################################

require 'rake'
require 'date'
require 'yaml'

CONFIG = YAML.load(File.read('_config.yml'))
USERNAME = CONFIG["username"] || ENV['GIT_NAME']
REPO = CONFIG["repo"] || "#{USERNAME}.github.io"

# Determine source and destination branch
# User or organization: source -> master
# Project: master -> gh-pages
# Name of source branch for user/organization defaults to "source"
if REPO == "#{USERNAME}.github.io"
  SOURCE_BRANCH = CONFIG['branch'] || "source"
  DESTINATION_BRANCH = "master"
else
  SOURCE_BRANCH = "master"
  DESTINATION_BRANCH = "gh-pages"
end

#############################################################################
#
# Helper functions
#
#############################################################################

def replace_header(head, header_name)
  head.sub!(/(\.#{header_name}\s*= ').*'/) { "#{$1}#{send(header_name)}'"}
end

def normalize_bullets(markdown)
  markdown.gsub(/\s{2}\*{1}/, "-")
end

def linkify_prs(markdown)
  markdown.gsub(/#(\d+)/) do |word|
    "[#{word}]({{ site.repository }}/issues/#{word.delete("#")})"
  end
end

def linkify_users(markdown)
  markdown.gsub(/(@\w+)/) do |username|
    "[#{username}](https://github.com/#{username.delete("@")})"
  end
end

def linkify(markdown)
  linkify_users(linkify_prs(markdown))
end

def liquid_escape(markdown)
  markdown.gsub(/(`{[{%].+[}%]}`)/, "{% raw %}\\1{% endraw %}")
end

def remove_head_from_history(markdown)
  index = markdown =~ /^##\s+\d+\.\d+\.\d+/
  markdown[index..-1]
end

def converted_history(markdown)
  remove_head_from_history(liquid_escape(linkify(normalize_bullets(markdown))))
end

# File activesupport/lib/active_support/inflector/transliterate.rb, line 80
def parameterize(string, sep = '-')
  # replace accented chars with their ascii
  # simplified from original to remove dependency
  parameterized_string = string.dup.force_encoding('US-ASCII')
  # Turn unwanted chars into the separator
  # changed from original: allow A-Z
  parameterized_string.gsub!(/[^a-zA-Z0-9\-_]+/, sep)
  unless sep.nil? || sep.empty?
    re_sep = Regexp.escape(sep)
    # No more than one of the separator in a row.
    parameterized_string.gsub!(/#{re_sep}{2,}/, sep)
    # Remove leading/trailing separator.
    parameterized_string.gsub!(/^#{re_sep}|#{re_sep}$/, '')
  end
  parameterized_string.downcase
end

def check_destination
  unless Dir.exist? CONFIG["destination"]
    sh "git clone https://#{ENV['GIT_NAME']}:#{ENV['GH_TOKEN']}@github.com/#{USERNAME}/#{REPO}.git #{CONFIG["destination"]}"
  end
end

#############################################################################
#
# Post and page tasks
#
#############################################################################

namespace :post do
  desc "Create a new post"
  task :create do
    title = ENV["title"] || "new-post"
    begin
      slug = parameterize(title)
      puts slug
    rescue => e
      puts "Error: invalid characters in title"
      exit -1
    end

    begin
      date = ENV['date'] ? Date.parse(ENV['date']) : Date.today
    rescue => e
      puts "Error: date format must be YYYY-MM-DD"
      exit -1
    end

    filename = File.join("_posts", "#{date}-#{slug}.md")
    if File.exist?(filename)
      puts "Error: post already exists"
      exit -1
    end

    header = { "layout" => "post", "title" => title }
    content = header.to_yaml + "---\n"

    if IO.write(filename, content)
      puts "Post #{filename} created"
    else
      puts "Error: #{filename} could not be written"
    end
  end
end

namespace :page do
  desc "Create a new page"
  task :create do
    title = ENV["title"] || "new-page"
    begin
      slug = parameterize(title)
      puts slug
    rescue => e
      puts "Error: invalid characters in title"
      exit -1
    end

    folder = ENV["folder"] || "."

    filename = File.join(folder, "#{slug}.md")
    if File.exist?(filename)
      puts "Error: page already exists"
      exit -1
    end

    header = { "layout" => "page", "title" => title }
    content = header.to_yaml + "---\n"

    if IO.write(filename, content)
      puts "Page #{filename} created"
    else
      puts "Error: #{filename} could not be written"
    end
  end
end

#############################################################################
#
# Site tasks
#
#############################################################################

namespace :site do
  desc "Generate the site"
  task :build do
    check_destination
    sh "bundle exec jekyll build"
  end

  desc "Generate the site and serve locally"
  task :serve do
    check_destination
    sh "bundle exec jekyll serve"
  end

  desc "Generate the site, serve locally and watch for changes"
  task :watch do
    sh "bundle exec jekyll serve --watch"
  end

  desc "Generate the site and push changes to remote origin"
  task :deploy do
    # Detect pull request
    if ENV['TRAVIS_PULL_REQUEST'].to_s.to_i > 0
      puts 'Pull request detected. Not proceeding with deploy.'
      exit
    end

    # Configure git if this is run in Travis CI
    if ENV["TRAVIS"]
      sh "git config --global user.name '#{ENV['GIT_NAME']}'"
      sh "git config --global user.email '#{ENV['GIT_EMAIL']}'"
      sh "git config --global push.default simple"
    end

    # Make sure destination folder exists as git repo
    check_destination

    sh "git checkout #{SOURCE_BRANCH}"
    Dir.chdir(CONFIG["destination"]) { sh "git checkout #{DESTINATION_BRANCH}" }

    # Generate the site
    sh "bundle exec jekyll build"

    # Commit and push to github
    sha = `git log`.match(/[a-z0-9]{40}/)[0]
    Dir.chdir(CONFIG["destination"]) do
      sh "git add --all ."
      sh "git commit -m 'Updating to #{USERNAME}/#{REPO}@#{sha}.'"
      sh "git push --quiet origin #{DESTINATION_BRANCH}"
      puts "Pushed updated branch #{DESTINATION_BRANCH} to GitHub Pages"
    end
  end
end
