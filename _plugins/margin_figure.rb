## Liquid tag 'maincolumn' used to add image data that fits within the main column
## area of the layout
## Usage {% marginfigure /path/to/image 'This is the caption' %}
#
module Jekyll
  class RenderMarginFigureTag < Liquid::Tag

  	require "shellwords"

    def initialize(tag_name, text, tokens)
      super
      @text = text.shellsplit
    end

    def render(context)
      "<span class='marginnote'><img class='fullwidth' src='#{@text[0]}'/>#{@text[1]}</span>"
    end
  end
end

Liquid::Template.register_tag('marginfigure', Jekyll::RenderMarginFigureTag)