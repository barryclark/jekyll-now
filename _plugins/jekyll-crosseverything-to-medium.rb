require 'json'
require 'net/http'
require 'net/https'
require 'kramdown'
require 'uri'
require 'date'

module Jekyll
  class MediumCrosseverythingGenerator < Generator
    safe true
    priority :low

    def generate(site)
      @site = site

      @settings = @site.config['jekyll-crosseverything_to_medium'] || {}
      
      globally_enabled = if @settings.has_key?('enabled') then @settings['enabled'] else true end
      backdate = if @settings.has_key? 'backdate' then @settings['backdate'] else true end

      if globally_enabled
        user_id = ENV['MEDIUM_USER_ID'] or false
        token = ENV['MEDIUM_INTEGRATION_TOKEN'] or false
        entity = ENV['MEDIUM_ENTITY'] or false

        if ! user_id or ! token or ! entity
          raise ArgumentError, "MediumCrosseverythingGenerator: Environment variables not found"
          return
        end

          crossposteverything = Array.new
          uri = URI(@settings['useraccount'])
          res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
            req = Net::HTTP::Get.new(uri, 'Accept' => 'application/json')
            http.request(req)
          end

          j = JSON.load(res.body[16..-1])
          if(! j['payload']['references']['Post'].nil?)
            j['payload']['references']['Post'].each_value do |x|
              crossposteverything.push(x['title'].to_s.gsub!(/[^0-9A-Za-z]/, ''))
            end
          end

          Jekyll::Hooks.register entity.to_sym, :post_render do |post|
            if ! post.published?
              next
            end

            checktitle = post.data['title'].dup
            crosseverything = crossposteverything.include? checktitle.to_s.gsub!(/[^0-9A-Za-z]/, '')
            if crosseverything or ! post.data['crosseverything_to_medium']
              next
            end

          content = post.content
            url = "#{@site.config['url']}#{post.url}"
            title = post.data['title']
            
            published_at = backdate ? post.date : DateTime.now

          crosseverything_payload(post, content, title, url, published_at)
          end
      end
    end


    def crosseverything_payload(post, content, title, url, published_at)
      # Update any absolute URLs
      # But don’t clobber protocol-less (i.e. "//") URLs
      content = content.gsub /href=(["'])\/(?!\/)/, "href=\\1#{@site.config['url']}/"
      content = content.gsub /src=(["'])\/(?!\/)/, "src=\\1#{@site.config['url']}/"


      # Save canonical URL
      canonical_url = url

      # Prepend the title and add a link back to originating site
      content.prepend("<h1>#{title}</h1>")
      # Append a canonical link and text
      # TODO Accept a position option, e.g., top, bottom.
      #
      # User the user's config if it exists
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

      payload = {
        'title'         => title,
        'contentFormat' => "html",
        'content'       => content,
        'tags'          => tags,
        'publishStatus' => "public",
        'publishedAt'   => published_at.iso8601,
        'license'       => @settings['license'] || "all-rights-reserved",
        'canonicalUrl'  => canonical_url
      }
      crosseverything_to_medium(payload)

    end


    def crosseverything_to_medium(payload)
      user_id = ENV['MEDIUM_USER_ID'] or false
      token = ENV['MEDIUM_INTEGRATION_TOKEN'] or false
      medium_api = URI.parse("https://api.medium.com/v1/publications/#{user_id}/posts")

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
