# Refer to https://github.com/plusjade/jekyll-bootstrap/blob/master/Rakefile

require "rubygems"
require 'rake'
require 'yaml'
require 'time'

SOURCE = "."
CONFIG = {
  'posts' => File.join(SOURCE, "_posts"),
  'drafts' => File.join(SOURCE, "_drafts"),
  'post_ext' => "md",
}

# Usage: rake post title="A Title" [date="2012-02-09"] [tags=[tag1,tag2]]
desc "Begin a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  tags = ENV["tags"] || "[]"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts 'description: ""'
    post.puts "date: #{date}"
    post.puts "tags: #{tags}"
    post.puts "comments: true"
    post.puts "---"
  end
end # task :post

# Usage: rake draft title="A Title" [date="2012-02-09"] [tags=[tag1,tag2]]
desc "Begin a new post in #{CONFIG['drafts']}"
task :draft do
  abort("rake aborted: '#{CONFIG['drafts']}' directory not found.") unless FileTest.directory?(CONFIG['drafts'])
  title = ENV["title"] || "new-draft"
  tags = ENV["tags"] || "[]"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['drafts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new drafts: #{filename}"
  open(filename, 'w') do |draft|
    draft.puts "---"
    draft.puts "layout: post"
    draft.puts "title: \"#{title.gsub(/-/,' ')}\""
    draft.puts 'description: ""'
    draft.puts "date: #{date}"
    draft.puts "tags: #{tags}"
    draft.puts "comments: true"
    draft.puts "---"
  end
end # task :draft

desc "Install Jekyll Plugins"
task :geminstall do
  system "sudo gem install jekyll-seo-tag jekyll-paginate jekyll-admin"
end # task :geminstall

desc "Launch preview environment"
task :preview do
  system "jekyll serve --incremental"
end # task :preview
