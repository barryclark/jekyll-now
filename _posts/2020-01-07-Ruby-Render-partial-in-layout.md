---
layout: post

title: Ruby - How to render partial in an .erb layout
---

```ruby
require 'erb'

# define a string:
template = %(
  <!DOCTYPE html>
    <html>
      <body>
          <%= yield %>
      </body>
    </html>
)
# define an object ERB.new(template) avec use the method .result
ERB.new(template).result
```
will render:


    <html>
      <body>

          <%= yield %>

      </body>
    </html>

A step further: insert a partial into the yield

```ruby
require 'erb'

template = %( <!DOCTYPE html> <html> <body> <%= yield %> </body> </html> )

# define the partial you want to pass to 'yield' as the string:
partial = %(
    <h1>Hello <%= name %> </h1>
      <ul>
        <% messages.each do |message| %>
          <li><%= message %></li>
        <% end %>
      </ul>)

# define a lambda with params 'name','messages' and let 'binding' pass them to '.result'
# on the object 'ERB.new(partial)

set_partial = ->(name,messages) { ERB.new(partial).result(binding) }

# this lambda will by called by 'set_partial.call(my_name, my_messages)'

# we define a method with binding to bind the bloc 'set_partial.call'
def set_binding
  binding
end

# define a new object
obj = ERB.new(template)

name = "ERB from yield"
messages = [ "Ligne 1", "Ligne 2" ]

# the online to get the result:

view = obj.result(set_binding {set_partial.call(name, messages)})

# save this in a file and render it with Google Chrome

File.open("my_app.html", "w") { |file| file.puts view}
%x[ open -a 'Google Chrome' app.html ]
```
will render:

    <html>
      <body>
        <h1>Hello ERB from yield </h1>
        <ul>
          <li>Ligne 1</li>
          <li>Ligne 2</li>
        </ul>)
      </body>
    </html
