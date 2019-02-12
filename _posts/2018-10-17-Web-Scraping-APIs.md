---
layout: post
title: Web Scraping - APIs
---


This is a follow up to my [first post](https://gerket.github.io/Web-Scraping-HTML/) about web scraping with HTML. As previously discussed, web scraping is the act of pulling information directly off of the internet. This is an important skill to have as a data scientist because we won't always have the data that we want in clean, local databases or `.csv` files. Sometimes we'll have to get the data for ourselves. In the case of getting data from websites, we look to web scraping. Here I'm going to collect information about a specific Pokemon, Growlithe, from [pokeapi.co]( https://pokeapi.co).

There are multiple ways of scraping data off of the internet. Last time I discussed pulling the HTML of the website directly and parsing through that data. Another way to scrape data is through the use of an API. An API, or Application Program Interface, is a tool made by the programmers of a website to help other programmers interact with their data or other aspects of their site.

So, first things first. We need to do our imports and set up the first few variables.  These first variables are the different components to our request url, the web address of the place we're trying to query data from.  

```python
import requests

url_parameters = dict(
    base_url = "pokeapi.co",
    directory = "api/v2/pokemon",
    pokemon_id = 58
)

endpoint  = "http://{base_url}/{directory}/{pokemon_id}".format(**url_parameters)
print(endpoint)
```
Outputs:
```python
'http://pokeapi.co/api/v2/pokemon/58'
```

This is the website url that I'm going to request information from. I've broken the url down into its different components so that later on, if I want to get a different Pokemon or get information from a different part of the website, I won't have to change as much and there are less points of failure. Getting to this point does require some prior knowledge of the API. For one, you need to know it exists. You also need to know what you're looking for. In this case I also need to know Growlithe's pokedex number which, as I'm sure you already know, is 58.

Now that we have the initial import and url set up, it's time to get the data. To do this I am going to send a `GET` request to the url I just made. Assuming everything goes right, I should get a `.json` object back with all of the pertinant information I could want about Growlithe.

```python
result = requests.get(endpoint)
print(result)
```
Outputs:
```python
<Response [200]>
```

This should give you an output of `<Response [200]>` which means everything went as it was supposed to and we can continue. I want to actually access the information that I just got so I'm going to pull out the `.json` object from the response and interact with it.

```python
pokemon = result.json()
print(pokemon.keys())
```
Outputs:
```python
dict_keys(  ['abilities',
            'base_experience',
            'forms',
            'game_indices',
            'height',
            'held_items',
            'id',
            'is_default',
            'location_area_encounters',
            'moves',
            'name',
            'order',
            'species',
            'sprites',
            'stats',
            'types',
            'weight'])
```

 These are all of the different details accessible through this `.json` data that I now have. Let's make sure that I got the right one and look at some information.

```python
print(pokemon['name'])
print(pokemon['stats'])
```
Outputs:
```python
'growlithe'
[{'base_stat': 60,
  'effort': 0,
  'stat': {'name': 'speed', 'url': 'https://pokeapi.co/api/v2/stat/6/'}},
 {'base_stat': 50,
  'effort': 0,
  'stat': {'name': 'special-defense',
   'url': 'https://pokeapi.co/api/v2/stat/5/'}},
 {'base_stat': 70,
  'effort': 0,
  'stat': {'name': 'special-attack',
   'url': 'https://pokeapi.co/api/v2/stat/4/'}},
 {'base_stat': 45,
  'effort': 0,
  'stat': {'name': 'defense', 'url': 'https://pokeapi.co/api/v2/stat/3/'}},
 {'base_stat': 70,
  'effort': 1,
  'stat': {'name': 'attack', 'url': 'https://pokeapi.co/api/v2/stat/2/'}},
 {'base_stat': 55,
  'effort': 0,
  'stat': {'name': 'hp', 'url': 'https://pokeapi.co/api/v2/stat/1/'}}]
```

There you have it! All of the stats about Growlithe at your disposal to use as you see fit. Now I guess unless you're trying to create a Pokedex for some kind of Pokemon Lab, having Pokemon data might not be the most useful thing for you. With that in mind, I've got a few different sources of APIs that you might find useful:
- [apilist.fun](https://apilist.fun/)
- [Toddmotto's public-apis github repo](https://github.com/toddmotto/public-apis)
- [ProgrammableWeb's API Directory](https://www.programmableweb.com/apis/directory)

I'm sure there are many and more APIs out there that aren't covered in these links but they should give you a good start. Good data hunting!
