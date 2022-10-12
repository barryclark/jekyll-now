module Jekyll
    class ButtonTagBlock < Liquid::Block
  
        def initialize(tag_name, text, tokens)
            super
            @input = text
        end

        def render(context)
            
            input_split = split_params(@input)
            theme = input_split[0].strip
            link = input_split[1].strip
            icon = input_split[2].strip

            text = super
            "<div class='sx-button'><a href='#{link}' class='sx-button__content #{theme}'><img src='#{icon}'/>#{text}</a></div>"
        end

        def split_params(params)
            params.split("|")
        end
    end
end
  
Liquid::Template.register_tag('button', Jekyll::ButtonTagBlock)