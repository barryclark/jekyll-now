# Alias Generator for Posts.
#
# Generates redirect pages for posts with aliases set in the YAML Front Matter.
#
# Place the full path of the alias (place to redirect from) inside the
# destination post's YAML Front Matter. One or more aliases may be given.
#
# Example Post Configuration:
#
#   ---
#     layout: post
#     title: "How I Keep Limited Pressing Running"
#     alias: /post/6301645915/how-i-keep-limited-pressing-running/index.html
#   ---
#
# Example Post Configuration:
#
#   ---
#     layout: post
#     title: "How I Keep Limited Pressing Running"
#     alias: [/first-alias/index.html, /second-alias/index.html]
#   ---
#
# Author: Thomas Mango
# Site: http://thomasmango.com
# Plugin Source: http://github.com/tsmango/jekyll_alias_generator
# Site Source: http://github.com/tsmango/tsmango.github.com
# Plugin License: MIT

module Jekyll
    
    class AliasGenerator < Generator
        
        def generate(site)
            @site = site
            
            process_posts
            process_pages
        end
        
        def process_posts
            @site.posts.each do |post|
                generate_aliases(post.url, post.data['alias'])
            end
        end
        
        def process_pages
            @site.pages.each do |page|
                generate_aliases(page.destination('').gsub(/index\.(html|htm)$/, ''), page.data['alias'])
            end
        end
        
        def generate_aliases(destination_path, aliases)
            alias_paths ||= Array.new
            alias_paths << aliases
            alias_paths.compact!
            
            alias_paths.flatten.each do |alias_path|
                alias_path = alias_path.to_s
                
                alias_dir  = File.extname(alias_path).empty? ? alias_path : File.dirname(alias_path)
                alias_file = File.extname(alias_path).empty? ? "index.html" : File.basename(alias_path)
                
                fs_path_to_dir   = File.join(@site.dest, alias_dir)
                alias_index_path = File.join(alias_dir, alias_file)
                
                FileUtils.mkdir_p(fs_path_to_dir)
                
                File.open(File.join(fs_path_to_dir, alias_file), 'w') do |file|
                    file.write(alias_template(destination_path))
                end
                
                (alias_index_path.split('/').size + 1).times do |sections|
                    @site.static_files << Jekyll::AliasFile.new(@site, @site.dest, alias_index_path.split('/')[0, sections].join('/'), '')
                end
            end
        end
        
        def alias_template(destination_path)
            <<-EOF
            <!DOCTYPE html>
            <html>
            <head>
            <link rel="canonical" href="#{destination_path}"/>
            <meta http-equiv="content-type" content="text/html; charset=utf-8" />
            <meta http-equiv="refresh" content="0;url=#{destination_path}" />
            </head>
            </html>
            EOF
        end
    end
    
    class AliasFile < StaticFile
        require 'set'
        
        def destination(dest)
            File.join(dest, @dir)
        end
        
        def modified?
            return false
        end
        
        def write(dest)
            return true
        end
    end
end