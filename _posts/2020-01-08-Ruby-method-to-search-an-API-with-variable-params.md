---
published: false
---
## A New Post


We define a method that fetches data on github's API  with some parameters. Params are:
- usernames defined as `String`, and `#{username}`will by passed as a param for the API search
- data-types defined as `Symbol`, and will be used as keys    to retrieve the value of the hash returned by the query.
We have an unknow number of params so we pass `*vars` (could be `*anything`). We separate the strings from the symbols (which are the data-types of the API), and query Github's API for each username, and then extract the data-types values. 

```ruby
require 'json'
require 'open-uri'

def get_github(*vars)
  profiles = []
  usernames = []
  data_types = []

  usernames = vars.select { |elt| elt.class != Symbol }
  data_types = (vars - usernames).map!(&:to_s)
 
  usernames.each do |username|
    url = "https://api.github.com/users/#{username}"
    json = open(url).read
    data = JSON.parse(json)
    data_types.each { |type| profiles << data[type] unless data[type].nil? }
  end
  profiles
end
```
For example, wer can run:
```ruby
get_github('ssaunier', 'cveneziani', :name, :id, :location)
```

