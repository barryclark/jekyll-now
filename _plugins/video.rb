class Video < Liquid::Tag
  Syntax = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/

  def initialize(tagName, markup, tokens)
    super

    @url = Jekyll.configuration({})['url'] || 'http://example.com'

    if markup =~ Syntax then
      @id = $1

      if $2.nil? then
          @width = 560
          @height = 420
      else
          @width = $2.to_i
          @height = $3.to_i
      end
    else
      raise "No Video Source provided"
    end

  end

  def lookup(context, name)
    lookup = context
    name.split(".").each { |value| lookup = lookup[value] }
    lookup
  end

  def render(context)
     "<iframe width=\"#{@width}\" height=\"#{@height}\" src=\"#{@base_url}/#{@id}\" ></iframe>"
  end

  Liquid::Template.register_tag "Video", self
end