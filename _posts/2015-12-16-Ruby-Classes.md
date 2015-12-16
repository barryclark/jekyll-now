---
layout: post
title: Ruby Classes - Instance Variables - Parameters vs. Arguments
excerpt_separator: <!--more-->
img_file: 151216-ruby-classes.png
---
If you ever read a Ruby book, you most likely heard that everything in *Ruby is an object*. And every object is generated directly or indirectly from a class.
<!--more-->
Before we talk more about Ruby classes. I would like explain what an object is:

Computers use data to create models of things in the real world. The events, methods, and properties of an object all relate to each other. Events can trigger methods and methods can retrieve or update an object's properties.

Let's imagine a **HOTEL** as an object. If Hotel is an object then it will have the following:

1. Properties
2. Events
3. Methods

Let's expand on that...

1. Properties
	1. name of the hotel: Double Tree San Francisco
	2. rating: 4
	3. total number of rooms: 42
	4. gym: false
	5. pool: true

2. Events
	1. book a room
	2. cancel a reservation

3. Methods
	1. make a booking
	2. cancel booking
	3. check availability

Let's create an hotel class:


<pre><xmp style="width:450px">
class Hotel
end
</xmp></pre>

And let's create an instance of this class:

<pre><xmp style="width:450px">
nice_hotel = Hotel.new 
</xmp></pre>


Our hotel object actually doesn’t hold any of the information we need it to hold. The best way to fix this is to provide it with an **initialize method**. This lets us set the state of each object as it is constructed.

We store this state in **instance** variables *(start with an @ sign)* inside the object.  Because each object in Ruby has its own distinct set of instance variables, each object can have its own unique state.


So, here’s our updated class definition:

<pre><xmp style="width:450px">
class Hotel
	def initialize(name, rating)
		@name = name
    	@rating = rating
	end
end

nice_hotel = Hotel.new('Double Tree', 4) 
</xmp></pre>

For class Hotel, the *initialize method* takes two parameters. These parameters act just like local variables within the method, so they follow the local variable naming convention of starting with a lowercase letter.

But, as local variables, they would just evaporate once the initialize method returns, so we need to transfer them into instance variables. This is very common behavior in an initialize method— the intent is to have our object set up and usable by the time initialize returns.

This method also illustrates something that often trips up newcomers to Ruby. Notice how we say `@name = name`. It’s easy to imagine that the two variables here, `@name` and `name`, are somehow related. It looks like they have the same name. But they don’t. The former is an instance variable, and the “at” sign is actually part of its name.

Let's open up a parenthesis and give you a quick tip about **Parameters vs. Arguments**

People often use parameters and arguments interchangeably but there is a difference. In this code:

`nice_hotel = Hotel.new('Double Tree', 4)` => "Double Tree" & "4" are arguments. And 

`def initialize(name, rating) end` => Name and rating are parameters.

Let's go back to our Class topic.

We created our Hotel class. Assigned two properties: `Name` and `Rating`. And now we should be able to ask to our hotel class its name and we should get a respond, right? Unfortunately not because there are no methods defined for that question. Let's create them.
<pre><xmp style="width:450px">
class Hotel
	def initialize(name, rating)
		@name = name
    	@rating = rating
	end

	def name
		@name
	end

	def rating
		@rating
	end

end

nice_hotel = Hotel.new('Double Tree', 4) 

nice_hotel.name gives 'Double Tree'
nice_hotel.rating gives 4
</xmp></pre>

Here we’ve defined two accessor methods to return the values of the two instance variables. Because writing accessor methods is such a common idiom, Ruby provides a convenient shortcut. `attr_reader` creates these attribute reader methods for you:

There is also a writer version of this method which is: `attr_writer`. And if an instance variable requires both writing and reading then you simply write: `attr_accessor`

<pre><xmp style="width:450px">
class Hotel
	attr_accessor :rating
	attr_reader :name
end

nice_hotel = Hotel.new('Double Tree', 4) 
nice_hotel.name gives 'Double Tree'

nice_hotel.rating gives 4
nice_hotel.rating = 8
nice_hotel.rating gives 8
</xmp></pre>

We briefly looked at Ruby classes, its methods and variables. For a much more detailed tutorial you may want to visit <a href="http://www.codeacademy.com" target="_blank">CodeAcademy.com</a> website for free courses.

