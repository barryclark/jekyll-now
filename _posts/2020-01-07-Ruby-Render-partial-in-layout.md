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

set_partial = ->(nom,messages) { ERB.new(partial).result(binding) }

def set_binding
  binding
end

# define a new object
obj = ERB.new(template)

name = "ERB from yield"
messages = [ "Ligne 1", "Ligne 2" ]

view = obj.result(set_binding {set_partial.call(name, messages)})

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
