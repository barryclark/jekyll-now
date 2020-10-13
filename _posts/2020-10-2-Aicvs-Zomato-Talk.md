---	
layout: post	
title: Blog-Search and Personalisation at Zomato
---


AICVS hosted a session on 27th September 2020, on Search and Personalisation at Zomato. It was conducted by Mayur Bhangale, a software engineer at Zomato working on problems in NLP, Search, Ranking and their intersection.
The session started with a brief introduction to Zomato. Zomato is an e-consumer food delivery app with the goal of serving “better food to more people”. Zomato exists in 24 Countries, and has a tie up with more than 2.7M restaurants globally. The firm has expanded beyond food delivery, and has launched several entities including hyperpure, gourmet delivery, etc.

Mayur began the topic with the technical aspects of how searches work.
Multiple factors affect search, like price, availability, popularity, serviceability, etc. All these are used to create a ranking model. Ranking model, here, is a listing of restaurants you see when you search for a dish. A unique thing about food delivery search is aspects change street by street such as affordability etc

He then explained some challenges faced while implementing search ranking algorithms. such as large document (restaurants) collection to be indexed, there are extremely high rate of updates, a location specific ranking is required, and the need of Multi Objective optimisation i.e. how much money is earned per order, number of units of items bought, ads revenue, lifetime value-engaging the customer needs to be optimised.
These search ranking algorithms also provide an opportunity for personalisation, which helps Zomato provide personalised recommendations.

### Search Architecture for the “One-Plus Search” model
This is the model used by Zomato for recommendation

* Query rewrite component model : when you fire a query on the search bar, the query goes through spell check, concept retrieval, intent detection, augmentation, query rewriter(resorting the words).
* Now once we get a query, it goes to a syntactic and semantic searcher. Searches are based on generic scores that have been assigned to dishes.
Syntactic Search- Text index search which is a solar elastic search.
Semantic search- ANN index search where you are querying from embeddings
* Both the searches are blended using the NSGA model which decides which items(dishes) to pick .
* Next is the re-ranking model. It’s a pass 2 ranking ML model for personalised ranking of dishes.

And it takes only 40 milliseconds for this entire computation!


Mayur then talked about a case study on **Spell Correction**

Users end up misspelling words while searching for dishes/restaurants, and this gives the need to build a spell correction model. The model works on an implicit feedback signal. Misspelled words offer the best opportunity to collect data and act on it and thus this acts as a training dataset for the Machine Learning model used for spell correction. The aim of the Machine Learning model is to minimise the distance between incorrect and correct querying.

**How does the model work?**

* Consider the correct and wrong spellings of a word, and represent them using a matrix. We have to find the difference between these two word matrices.  
* Derive their embedding
* The correct and wrong spelling of the word is passed through a LSTM and their features are derived from the model. We then get the modified embeddings.
* The difference between these embeddings is taken. This is a contrastive loss.
* This loss is passed through a sigmoid function to get the score of these words and understand how these two words are similar/dissimilar to each other. This score is the spell correction value for each word.

![](https://im4.ezgif.com/tmp/ezgif-4-4f9b141fb3db.png)

This model corrects 2% of search queries everyday
For the next indexing cycle, these "wrong" spellings may fetch the right results!


Mayur then talked about personalisation at Zomato. Personalisation helps when a user doesn't know what they want to eat, and is looking for recommendations. Homepage recommendations are huge levers for Gross Merchandise Value (GMV).
Two types of recommendation here are- restaurants and dish recommendations

He explained one more case study on **Dish Discovery and Personalisation**

Problem faced while suggesting dishes: Exploration vs exploitation dilemma
Exploration - user likes eating variety of food
Exploited - user who does not explore
This is used to create a balance of many dishes to show in the recommendation, based on the ones which are already bought and suggestion of new dishes.
* A knowledge graph is built for this purpose, based on what every user searched and the dish actually bought. This works on relational learning. Weights are assigned to the food items and to the user. Similarity score for a user and dish should be really high, to recommend it.
* Embeddings are used to represent these weights, for the user and the dish. Embeddings here are in the hyperbolic space. If done in euclidean space, the size of embedding increases with more and more features. Hyperbolic space is spherical and has a property of infinite negative curvature. Due to this embeddings can be squeezed in lesser dimensions, and thus helps in making the computations faster.
* Distance between user vector and dish vector is computed using arc-cosine distance. * A model is built to learn the distance between the user vector and the dish not ordered vector, for creating the recommendation system.

The logarithmic equation used in the model-

![](https://im4.ezgif.com/tmp/ezgif-4-9f2714723053.png)


This is negative sampling. It helps in pushing distances between embeddings having less similarity score. Distance between the user vector and dish-ordered vector should be less than the distance between the user vector and dish-not ordered vector. Such distances are measured for all dishes not yet ordered by the user and dishes with the most similarity scores(least distance) are closest to the user’s preference and are recommended to the user.

To evaluate effectiveness of the recommendations, metrics used to measure the quality of search are-
* Mean Reciprocal Rank is used for dish recommendations
* Normalised Discounted Cumulative Gain is used for restaurant recommendations

This is how zomato tries to personalise the user’s experience, and this concluded the session. The session was a really interesting one and an important first understanding to get an idea of how recommendation systems work at companies like Zomato.

