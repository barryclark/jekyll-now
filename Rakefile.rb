require "rubygems"
require 'rake'
require 'yaml'
require 'time'

SOURCE = "."
CONFIG = {
  'layouts' => File.join(SOURCE, "_layouts"),
  'post' => File.join(SOURCE, "_posts"),
  'page' => File.join(SOURCE, "page"),
  'life' => File.join(SOURCE, "life"),
  'post_ext' => "md",
}

def ask(message, valid_options)
  if valid_options
    answer = get_stdin("#{message} #{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
  else
    answer = get_stdin(message)
  end
  answer
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

# Usage: rake post title="Post Name"
desc "Begin a new post in #{CONFIG['post']}"
task :post do
  abort("rake aborted: '#{CONFIG['post']}' directory not found.") unless FileTest.directory?(CONFIG['post'])
  title = ENV["title"] || "New-Post"
  slug = title.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD!"
    exit -1
  end
  filename = File.join(CONFIG['post'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: #{title.gsub(/-/,' ')}"
    post.puts "category: "
    post.puts "date: #{date}"
    post.puts "---"
  end
end

# Usage: rake life title="Post Name"
desc "Begin a new life-post in #{CONFIG['life']}"
task :life do
  abort("rake aborted: '#{CONFIG['life']}' directory not found.") unless FileTest.directory?(CONFIG['life'])
  title = ENV["title"] || "New-Life"
  filename = File.join(CONFIG['life'], "#{title.gsub(/ /,'-').gsub(/[^\w-]/, '')}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  puts "Creating new life-post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: life"
    post.puts "title: #{title.gsub(/-/,' ')}"
    post.puts "---"
  end
end

# Usage: rake page title="Page Name"
desc "Begin a new page in #{CONFIG['page']}"
task :page do
  abort("rake aborted: '#{CONFIG['page']}' directory not found.") unless FileTest.directory?(CONFIG['page'])
  title = ENV["title"] || "New-Page"
  filename = File.join(CONFIG['page'], "#{title.gsub(/ /,'-').gsub(/[^\w-]/, '')}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  puts "Creating new page: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: blog"
    post.puts "title: #{title.gsub(/-/,' ')}"
    post.puts "---"
  end
end
