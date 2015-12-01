---
layout: post
title: Arrays Hashes in Ruby
excerpt_separator: <!--more-->
img_file: arrays-hashes.png
---
In programming general, you not only deal with methods, procedures etc but you also deal with lists of data. For example you may want to create a list of **California Cities**. And once your list is created you may want to add **Sales Tax Rate** for each city appropriately.
<!--more-->



By creating such a list, your program can easily tell you the tax rate of each city. In Ruby we call such data groups as **collections**. Once we have a collection as seen below we can then do bunch of stuff like sorting, including or excluding certain items, searching for a certain item etc.

* San Clemente - 8.00%
* San Diego - 8.00%
* San Dimas - 9.00%
* San Fernando - 9.50%
* San Francisco - 8.75%

Ruby represents collections of objects in two ways: **Arrays** and **Hashes**. Let's see each of them in detail and understand the differences:

### Arrays

Here is how you would create an array of CA cities:

```
>> cities_array = ["san clemente", "san diego", "san dimas", "san fernando", "san francisco"]
```

It is important for you to know that both arrays and hashes always contain two elements: **"key"**, and **"value"**.

In our sample array, the city names are called "values", but then you might wonder where the "keys" are. In arrays, keys are implicit, meaning that they are not explicityly written. Each array key starts with the number zero and goes as one, two, three... So if you want to retrieve the value of key "0", you simply write:

```
>>  puts cities_array[0]
=> san clemente
```

```
>>  puts cities_array[3]
=> san fernando
```

Although this is good, it has a shortcoming. We have no control over the keys. What if we want to list all city tax rates next to city names. We would need to assign city names as the keys and the tax rates as the values.

### Hashes To The Rescue

The biggest difference between Hashes and Arrays is that in hashes we have the freedom of assigning our own keys. So here is how we would create such a hash.

```
>> cities_hash = { "san clemente" => "8.00%", "san diego" => "8.00%", "san dimas" => "9.00%", "san fernando" => "9.50%", "san francisco" => "8.75%" }
```

As you see hashes and arrays are closely connected. An array in a sense is a hash, where the keys happen to be **consequitive integers**.

```
puts cities_array[0]
#gives us san clemente
```

```
puts cities_hash["san clemente"]
#gives us the city tax rate: 8.00%
```

I don't want to get things complicated but there is something else I would like to share with you. Arrays and Hashes are members of Enumerables class. Enumerable module gives you a package deal of methods that sort, sift, filter, count and transform collections.

Here is how you can test this membership:

```
puts cities_array.is_a? Enumerable
=> true
```

```
puts cities_hash.is_a? Enumerable
=> true
```

Classes that use Enumerable enter into a kind of contract: the class has to define an instance method called each, and in return, Enumerable endows the objects of the class with all sorts of collection-related behaviors.

### Gaining Enumerability Through Each

By using each, you can easily use hashes and arrays in your code.

```
cities_array.each do |city|
  puts "#{city} is a California city..."
end
```

```
cities_hash.each do |city,tax|
  puts "#{city} is a California city and its tax rate is: #{tax}"
end
```

### Why Would You Prefer One Over Other

Ruby's arrays and hashes are indexed collections. Both store collections of objects, accessible using a key. With arrays, the key is an integer, whereas hashes support any object as a key. Both arrays and hashes grow as needed to hold new elements. It's more efficient to access array elements, but hashes provide more flexibility. Any particular array or hash can hold objects of differing types; you can have an array containing an integer, a string, and a floating point number.

The preference all comes down to coding requirements. If you can get away with one dimensional data collection then go with an Array. If you need flexibility and two dimensional data objects then go with a Hash.




