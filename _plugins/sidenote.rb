module Jekyll
  class RenderSideNoteTag < Liquid::Tag

    require "shellwords"

    def initialize(tag_name, text, tokens)
      super
      @text = text.shellsplit
    end

    def render(context)
      "<sup class='sidenote-number'>#{@text[0]}</sup><span class='sidenote'><sup class='sidenote-number'>#{@text[0]}</sup> #{@text[1]}</span>"
    end
  end
end

Liquid::Template.register_tag('sidenote', Jekyll::RenderSideNoteTag)

