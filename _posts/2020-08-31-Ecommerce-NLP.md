---
layout: post
title: "Exercise: The Importance of NLP for E-commerce"
---

If it’s one thing that COVID-19 has made us realize, is that there is an accelerated need for businesses to find digital solutions for their products. This is especially evident in retail commerce, where now more than ever, we are seeing consumers turning towards shopping online rather than in stores. To be fair, this was not so much of a choice, but a requirement. Even though there is a need for greater investments in order for businesses to adapt to this change, the light at the end of the tunnel is that there is now even more consumer data being generated. We can in turn use this data to improve the digital shopping experience, by allowing us to better understand consumer behaviour. 

While we are all spending more time at home these days, in a way we are more connected than ever - directly and indirectly - through online interactions with each other on a global scale. At any given moment, there are millions of online users interacting through instant messaging, direct messaging through social media, leaving comments on posts, leaving reviews on products - there are so many conversations happening. Personally, I am often basing my shopping decisions on the collective reviews and ratings that others have provided, as it provides me with reassurance on purchase decisions. So for marketers and business owners, we need to be able to make sense of these conversations - why our customers enjoy our products and why they do not. For this reason, I wanted to take this opportunity to highlight the importance of listening to the consumers. To accomplish this, I had used a [Kaggle dataset](https://www.kaggle.com/nicapotato/womens-ecommerce-clothing-reviews) of reviews from a women’s e-commerce website, and leveraging [NLP](https://medium.com/greyatom/a-dive-into-natural-language-processing-103ae9b0a588) through the [bag-of-words](https://medium.com/greyatom/an-introduction-to-bag-of-words-in-nlp-ac967d43b428) model in Python.

Without going into the technicalities of NLP (if you are interested in learning about NLP and bag-of-words, [Jocelyn D'Souza](https://medium.com/@djocz) does a great job of explaining it in the two posts I've shared above), what we as marketers and business owners care about at the end of the day, is the potential benefits. In this dataset, we are provided with the users' reviews and whether or not they would recommend their item of purchase, among other things (sample of the dataset below). With these two columns, we can build predictive models to determine the likelihood that a user will recommend an item based on their review. However, for the purposes of this exercise, I wanted to focus on a more exploratory approach by analyzing the correlation between the two columns, to see what insights we can find. 

![E-Commerce Dataset Sample](/images/EC NLP 1.png)

Note: in this dataset, there are 22,641 reviews made by customers and of which 82% of the reviews, customers claimed they would recommend the item of purchase. 

As a visual learner myself, through using word clouds, I was able to showcase the key terminology (AKA tokens) that frequently appear in the reviews so we can easily see what the general topics these conversations are about. And of course, as great as visuals are, it is still important to see numbers so I have included the frequency tables of these words as well to see exactly how often these words are appearing. This is what I was able to find:

![E-Commerce Dataset Sample](/images/EC NLP 2.png) ![E-Commerce Dataset Sample](/images/EC NLP 3.png)

![E-Commerce Dataset Sample](/images/EC NLP 4.png) ![E-Commerce Dataset Sample](/images/EC NLP 5.png)

Off the bat, there are a few points we can see (to preface, I also took into account words that appear in combination and also the stems of words):
1) There are similar words that appear in reviews where customers noted they would recommend (for simplicity, we will call these positive reviews) and those that say they would not recommend (negative reviews).
2) The term 'love' appears proportionately more frequently in positive reviews whereas 'like' appears more frequently in negative reviews.
3) Looking at the differences in the top 10 words, 'great' does not crack the top 10 for negative reviews, and 'fabric' does not appear in the top 10 words for positive reviews.  

As mentioned earlier, this is a quick exploratory analysis and as you can see, we can easily capture the essence of the reviews. There are many next steps that can be taken to further analyze these conversations/reviews such as:
1) Identifying if specific divisions or product categories have more positive/negative reviews, especially for similar words. Is the surrounding context also similar?
2) In the case of negative reviews containing the word 'fabric', what about the fabric and which type of fabric is commonly raised as a concern?
3) Could we use methods like KNN or Decision Trees to help us identify demographics that favour our products? 


