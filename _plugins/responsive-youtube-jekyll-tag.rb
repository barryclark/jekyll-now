#
# responsive-youtube-jekyll-tag.rb
#
# by Jeffrey Morgan
# http://usabilityetc.com/
#
# Use Twitter Bootstrap's CSS to embed responsive YouTube videos.
#
# Usage:
#
#   1. Copy this file into your Jekyll _plugins folder
#
#   2. Add the youtube tag with a YouTube video ID where you
#      want to embed the video
#
# For example, to embed the video with the link
# https://www.youtube.com/watch?v=tnq2gwBhvCc
# use the following tag:
#
#   {% youtube tnq2gwBhvCc %}
#

module Jekyll
  class ResponsiveYouTubeTag < Liquid::Tag
    def initialize(tag_name, markup, options)
      super
      @video_id = markup.strip
    end

    def render(context)
      %Q[
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" width="560" height="315" src="https://www.youtube.com/embed/#{@video_id}" frameborder="0" allowfullscreen>
  </iframe>
</div>
      ]
    end
  end
end

Liquid::Template.register_tag("youtube", Jekyll::ResponsiveYouTubeTag)
