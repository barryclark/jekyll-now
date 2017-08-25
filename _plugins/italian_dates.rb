module Jekyll
    module ItalianDates
        MONTHS = {"01" => "gennaio", "02" => "febbraio", "03" => "marzo",
                "04" => "aprile", "05" => "maggio", "06" => "giugno",
                "07" => "luglio", "08" => "agosto", "09" => "settembre",
                "10" => "ottobre", "11" => "novembre", "12" => "dicembre"}

        # http://man7.org/linux/man-pages/man3/strftime.3.html
        def italianDate(date)
            day = time(date).strftime("%e") # leading zero is replaced by a space
            month = time(date).strftime("%m")
            year = time(date).strftime("%Y")
            hour = time(date).strftime("%H")
            minute = time(date).strftime("%M")
            second = time(date).strftime("%S")
            day+' '+MONTHS[month]+' '+year+', '+hour+':'+minute+':'+second
        end
    end
end

Liquid::Template.register_filter(Jekyll::ItalianDates)
