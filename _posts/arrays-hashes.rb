cities_array = ["san clemente", "san diego", "san dimas", "san fernando", "san francisco"]


cities_hash = { "san clemente" => "8.00%", "san diego" => "8.00%", "san dimas" => "9.00%", "san fernando" => "9.50%", "san francisco" => "8.75%" }

puts cities_hash["san clemente"]

test_string = "Word"
puts test_string.downcase

puts cities_array.is_a? Enumerable
puts cities_hash.is_a? Enumerable

cities_hash.each do |city,tax|
  puts "#{city} is a California city and its tax rate is: #{tax}"
end