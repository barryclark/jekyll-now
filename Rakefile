require 'rubygems'
require 'rake'
require 'open-uri'
require 'multi_json'
require 'awesome_print'
require 'hashie'

class Post < Hashie::Mash
  def date
    Time.parse(self['published'])
  end
  
  def filename
    "_posts/#{date.strftime('%Y-%m-%d')}-#{slug}.html"
  end
  
  def slug
    self["link"].split('/').last
  end
  
  def body
    self.content.content
  end
end

task :pull do
  posts = MultiJson.decode(open("http://pipes.yahoo.com/pipes/pipe.run?_id=50f63f64c70a2a032bdaa5dbb3458224&_render=json").read)['value']['items'].map{|p| Post.new(p) }
  
  posts.each do |p|
    if File.exists?(p.filename)
      puts "- Blog post at #{p.filename} exists, ignoring"
    else
      puts "- Creating blog post at #{p.filename}"
      File.open(p.filename,'w') do |f|
        f.write <<-YAML
---
layout: post
title: "#{p.title}"
---

#{p.body}
YAML
      end
    end
  end
end