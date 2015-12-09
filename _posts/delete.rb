class FindVowels
    include Enumerable
    def initialize(string)
        @string = string
    end
    
    def each
        @string.scan(/[aeiou]/) do |vowel| yield vowel
        end
    end
end

vowel = FindVowels.new("abcdefg")

# vowel.each do |x|
#     puts x
# end
arr = vowel.map { |i| i + "s" }

arr.each do |s|
	puts s
end