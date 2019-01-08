#  By Aaron Gustafson, based on the work of Jeremy Keith
#  https://github.com/aarongustafson/jekyll-crosspost_to_medium
#  https://gist.github.com/adactio/c174a4a68498e30babfd
#  Licence : MIT
#
#  This generator cross-posts entries to Medium. To work, this script requires
#  a MEDIUM_USER_ID environment variable and a MEDIUM_INTEGRATION_TOKEN.
#
#  The generator will only pick up posts with the following front matter:
#
#  `crosspost_to_medium: true`
#
#  You can control crossposting globally by setting `enabled: true` under the
#  `jekyll-crosspost_to_medium` variable in your Jekyll configuration file.
#  Setting it to false will skip the processing loop entirely which can be
#  useful for local preview builds.

require 'json'
require 'net/http'
require 'net/https'
require 'uri'
require 'date'

module Jekyll
  class MediumCrossPostGenerator < Generator
    safe true
    priority :low

    def generate(site)
      @site = site

      @settings = @site.config['jekyll-crosspost_to_medium'] || {}
      globally_enabled = if @settings.has_key? 'enabled' then @settings['enabled'] else true end
      cache_dir = @settings['cache'] || @site.config['source'] + '/.jekyll-crosspost_to_medium'
      backdate = if @settings.has_key? 'backdate' then @settings['backdate'] else true end
      @crossposted_file = File.join(cache_dir, "medium_crossposted.yml")

      if globally_enabled
        # puts "Cross-posting enabled"
        user_id = ENV['MEDIUM_USER_ID'] or false
        token = ENV['MEDIUM_INTEGRATION_TOKEN'] or false

        if ! user_id or ! token
          raise ArgumentError, "MediumCrossPostGenerator: Environment variables not found"
          return
        end

        if defined?(cache_dir)
          FileUtils.mkdir_p(cache_dir)

          if File.exists?(@crossposted_file)
            crossposted = open(@crossposted_file) { |f| YAML.load(f) }
            # convert from an array to a hash (upgrading older versions of this plugin)
            if crossposted.kind_of?(Array)
              new_crossposted = {}
              crossposted.each do |url|
                new_crossposted[url] = 'unknown'
              end
              crossposted = new_crossposted
            end
            # end upgrade
          else
            crossposted = {}
          end

          # If Jekyll 3.0, use hooks
          if (Jekyll.const_defined? :Hooks)
            Jekyll::Hooks.register :posts, :post_render do |post|
              if ! post.published?
                next
              end

              crosspost = post.data.include? 'crosspost_to_medium'
              if ! crosspost or ! post.data['crosspost_to_medium']
                next
              end

              content = post.content
              url = "#{@site.config['url']}#{post.url}"
              title = post.data['title']
              
              published_at = backdate ? post.date : DateTime.now

              crosspost_payload(crossposted, post, content, title, url, published_at)
            end
          else
            
            # post Jekyll commit 0c0aea3
            # https://github.com/jekyll/jekyll/commit/0c0aea3ad7d2605325d420a23d21729c5cf7cf88
            if defined? site.find_converter_instance
              markdown_converter = @site.find_converter_instance(Jekyll::Converters::Markdown)
            # Prior to Jekyll commit 0c0aea3
            else
              markdown_converter = @site.getConverterImpl(Jekyll::Converters::Markdown)
            end

            @site.posts.each do |post|

              if ! post.published?
                next
              end

              crosspost = post.data.include? 'crosspost_to_medium'
              if ! crosspost or ! post.data['crosspost_to_medium']
                next
              end

              # Convert the content
              content = markdown_converter.convert(post.content)
              # Render any plugins
              content = (Liquid::Template.parse content).render @site.site_payload

              url = "#{@site.config['url']}#{post.url}"
              title = post.title
              
              published_at = backdate ? post.date : DateTime.now

              crosspost_payload(crossposted, post, content, title, url, published_at)
              
            end
          end
        end
      end
    end


    def crosspost_payload(crossposted, post, content, title, url, published_at)
      # Update any absolute URLs
      # But don’t clobber protocol-less (i.e. "//") URLs
      content = content.gsub /href=(["'])\/(?!\/)/, "href=\\1#{@site.config['url']}/"
      content = content.gsub /src=(["'])\/(?!\/)/, "src=\\1#{@site.config['url']}/"
      # puts content

      # Save canonical URL
      canonical_url = url

      # Prepend the title and add a link back to originating site
      content.prepend("<h1>#{title}</h1>")
      # Append a canonical link and text
      # TODO Accept a position option, e.g., top, bottom.
      #
      # Use the user's config if it exists
      if @settings['text']
          canonical_text = "#{@settings['text']}"
          canonical_text = canonical_text.gsub /{{ url }}/, canonical_url
      # Otherwise, use boilerplate
      else
          canonical_text = "<p><i>This article was originally posted <a href=\"#{url}\" rel=\"canonical\">on my own site</a>.</i></p>"
      end
      content << canonical_text

      # Strip domain name from the URL we check against
      url = url.sub(/^#{@site.config['url']}?/,'')

      # coerce tage to an array
      tags = post.data['tags']
      if tags.kind_of? String
        tags = tags.split(',')
      end

      # Only cross-post if content has not already been cross-posted
      if url and ! crossposted.has_key? url
        payload = {
          'title'         => title,
          'contentFormat' => "html",
          'content'       => content,
          'tags'          => tags,
          'publishStatus' => @settings['status'] || "public",
          'publishedAt'   => published_at.iso8601,
          'license'       => @settings['license'] || "all-rights-reserved",
          'canonicalUrl'  => canonical_url
        }

        if medium_url = crosspost_to_medium(payload)
          crossposted[url] = medium_url
          # Update cache
          File.open(@crossposted_file, 'w') { |f| YAML.dump(crossposted, f) }
        end
      end
    end


    def crosspost_to_medium(payload)
      user_id = ENV['MEDIUM_USER_ID'] or false
      token = ENV['MEDIUM_INTEGRATION_TOKEN'] or false
      medium_api = URI.parse("https://api.medium.com/v1/users/#{user_id}/posts")

      # Build the connection
      https = Net::HTTP.new(medium_api.host, medium_api.port)
      https.use_ssl = true
      request = Net::HTTP::Post.new(medium_api.path)

      # Set the headers
      request['Authorization'] = "Bearer #{token}"
      request['Content-Type'] = "application/json"
      request['Accept'] = "application/json"
      request['Accept-Charset'] = "utf-8"

      # Set the payload
      request.body = JSON.generate(payload)

      # Post it
      response = https.request(request)

      if response.code == '201'
        medium_response = JSON.parse(response.body)
        puts "Posted '#{payload['title']}' to Medium as #{payload['publishStatus']} (#{medium_response['data']['url']})"
        return medium_response['data']['url']
      else
        puts "Attempted to post '#{payload['title']}' to Medium. They responded #{response.body}"
        return false
      end
    end

  end
  
end