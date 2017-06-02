module More
    def more(input, type)
        if input.include? "<!--more-->"
            if type == "excerpt"
                input.split("<!--more-->").first
            elsif type == "remaining"
                input.split("<!--more-->").last
            else
                input
            end
        else
            input
        end
    end
end

Liquid::Template.register_filter(More)