---
layout: post
title: Enumerable Methods in Ruby
excerpt_separator: <!--more-->
img_file: numerable01.png
---
Arrays, Hashes, Ranges in Ruby are called collection classes. If a class is a collection then you would expect them to do various things such as: `traverse`, `sort` etc.
<!--more-->

What if you are writing your own class and want to give that class the same functionality of a hash or an array. By mixin the module [**Enumerable**](http://ruby-doc.org/core-2.2.3/Enumerable.html) this could easily be achieved.

By writing an iterator called `each`, you can have your class do functions such as: `map`, `include?` and `find_all?`.

If the objects in your collection implement meaningful ordering using the `<=>` method, you can also use methods such as `min`, `max` and `sort`.

Let's give an example:

You write a Ruby class called `FindWovels` which accepts a string as its argument at initialization.

Then you write an `each` method. This method scans the string using **Regular Expressions** and brings you the vowels.

It is now upto you on how to utilize the `each` method.

<pre>
    <xmp style="width:450px">
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

vowel.each do |x|
    puts x
end

# [a,e]
</xmp>
</pre>


### enumerable#map Method

Returns a new array with the results of running block once for every element in enum.

If no block is given, an enumerator is returned instead.

`map { |obj| block } → array`

If we use the map method on our previous example and print the array, you will see that it is modified...

<pre>
    <xmp style="width:450px">
arr = vowel.map { |i| i + "s" }

arr.each do |s|
    puts s
end

# [as,es]
</xmp>
</pre>

### Rest of the public methods

There are bunch of other public methods related to Enumerable module and here they are:

<ul class="link-list">
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-all-3F">#all?</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-any-3F">#any?</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-chunk">#chunk</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-collect">#collect</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-collect_concat">#collect_concat</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-count">#count</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-cycle">#cycle</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-detect">#detect</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-drop">#drop</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-drop_while">#drop_while</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-each_cons">#each_cons</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-each_entry">#each_entry</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-each_slice">#each_slice</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-each_with_index">#each_with_index</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-each_with_object">#each_with_object</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-entries">#entries</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-find">#find</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-find_all">#find_all</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-find_index">#find_index</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-first">#first</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-flat_map">#flat_map</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-grep">#grep</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-group_by">#group_by</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-include-3F">#include?</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-inject">#inject</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-lazy">#lazy</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-map">#map</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-max">#max</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-max_by">#max_by</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-member-3F">#member?</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-min">#min</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-min_by">#min_by</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-minmax">#minmax</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-minmax_by">#minmax_by</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-none-3F">#none?</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-one-3F">#one?</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-partition">#partition</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-reduce">#reduce</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-reject">#reject</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-reverse_each">#reverse_each</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-select">#select</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-slice_after">#slice_after</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-slice_before">#slice_before</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-slice_when">#slice_when</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-sort">#sort</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-sort_by">#sort_by</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-take">#take</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-take_while">#take_while</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-to_a">#to_a</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-to_h">#to_h</a></li>
          
          <li><a target="_blank" href="http://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-zip">#zip</a></li>
          
        </ul>






