# A Liquid tag for Jekyll sites that allows embedding Instagrams
# by: Luke Karrys
#
# Example usage: {% instagram media_id %}

require 'instagram'
require 'json'

module Jekyll
  class InstagramTag < Liquid::Tag
    def initialize(tag_name, markup, token)
      super
      access_token_file = File.expand_path "../.instagram_access_token", File.dirname(__FILE__)
      @access_token     = File.open(access_token_file).gets
      @image_res        = "standard_resolution"
      @markup           = markup
      @cache_folder     = File.expand_path "../.instagram-cache", File.dirname(__FILE__)
      FileUtils.mkdir_p @cache_folder
    end

    def render(context)
      id = @markup.strip
      media = get_cached_media(id) || get_media(id)
      gen_html_output JSON.parse(media)
    end

    def gen_html_output(media)
      loc_name, lat, lon = nil, nil, nil
      id              = media["id"]
      link            = media["link"]
      src             = media["images"][@image_res]["url"]
      image_w         = media["images"][@image_res]["width"]
      image_h         = media["images"][@image_res]["height"]
      location        = media["location"]
      filter          = media["filter"]
      caption         = media["caption"]
      created         = Time.at(Integer(media["created_time"])).strftime("%I:%M%p %B %e, %Y")
      title           = caption ? caption["text"] : "Untitled Instagram"

      output = "<p><a href='#{link}'><img src='#{src}' alt='#{title}' /></a>"
      output += "<br/>Filtered with #{filter} through <a href='http://instagram.com'>Instagram</a></p><!--more-->"

      if location
        loc_name      = location["name"]
        lat           = location["latitude"]
        lon           = location["longitude"]
        coords        = "#{lat},#{lon}"
        loc_alt       = loc_name || coords

        output += "<p><a href='http://maps.google.com?q=#{coords}'>"
        output += "<img border='0' "
        output += "src='http://maps.googleapis.com/maps/api/staticmap?center=#{coords}&markers=#{coords}&zoom=14&size=#{image_w}x200&sensor=false' "
        output += "alt='#{loc_alt}' /></a>"
        if loc_name
          output += "<br/>Taken at #{loc_name}"
        end
        output += "</p>"
      end

      output += "<p><a href='http://web.stagram.com/p/#{id}#photo#{id}'>Leave a comment</a></p>"
    end

    def get_cache_file_for(id)
      File.join @cache_folder, "#{id}.cache"
    end

    def cache(id, data)
      cache_file = get_cache_file_for id
      File.open(cache_file, "w") do |io|
        io.write data
      end
    end

    def get_media(id)
      client = Instagram.client(:access_token => @access_token)
      data = client.media_item(id).to_json
      cache id, data unless @cache_disabled
      data
    end

    def get_cached_media(id)
      cache_file = get_cache_file_for id
      File.read cache_file if File.exist? cache_file
    end
  end
end

Liquid::Template.register_tag("instagram", Jekyll::InstagramTag)
