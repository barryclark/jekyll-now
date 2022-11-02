---
layout: post
title:  Multi-Task Learning, a Sentiment Analysis Example
author: Wang Shenghao
date:   2022-10-23 15:40:00 +0800
categories: jekyll update
excerpt_separator: <!--more-->
post_description: The article explains the concept of multi-task learning using an example of aspect based sentiment analysis. This POC solution can be used to generate rating scores for pre-defined aspects of real world product or services out of the customer reviews.
---

<div class="img-div-any-width">
  <img src="https://raw.githubusercontent.com/shenghaowang/absa-for-restaurant-reviews/main/absa-network.png" style="max-width: 80%;" />
  <br />
</div>

<!--more-->

Imagine at an autonomous driving company, you are tasked with building an object detection solution to identify pedestrians, vehicles, traffic lights, and stop signs in images. How will you tackle this problem?

One simple approach is to frame a multi-label classification problem, which can be solved by building 4 binary classifiers. In this case, each classifier will be in charge of identifying one of the aspects within our interest, such as traffic lights. However, building multiple independent models can be tedious especially if there are dozens of aspects you need to work on. Given the fact that we aim to solve multiple problems with the same nature of image classification, is it possible for us to develop an all-in-one solution to simultaneously address all the problems? This leads to the topic of this article, **multi-task learning (MTL)**.

The general idea of multi-task learning is to learn multiple tasks in parallel by allowing the lower-level features to be shared across the tasks. The training signals learned from one task can help improve the generalization of the other tasks. Let's take a look at an example using MTL for aspect based sentiment analysis.

## Problem Statement & Dataset

Aspect based sentiment analysis (ABSA) requires us to identify the polarity of text data with respect to multiple aspects relevant to the business use case. In ecommerce, extracting sentiment for different quality specs from user reviews allow us to generate product ratings by features such as appearance, battery life, and cost efficiency. With the feature-wise product ratings, customers can gain a comprehensive understanding on the pros and cons of the product, and therefore make better purchase decisions.

<div class="img-div-any-width">
  <img src="/images/2022-10-23/amazon_product_review.png" style="max-width: 80%;" />
  <br />
  Amazon product review
</div>

In this article, we are going to use a restaurant review dataset, which is well studied in the ABSA related research. The dataset was taken from SemEval 2014, an international NLP research workshop. The training and test datasets contain 3041 and 800 restaurant reviews with annotations for 5 common aspects: service, food, anecdotes/miscellaneous, price, and ambience. A snippet of raw data is given as follows.

{% highlight julia %}

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sentences>
    <sentence id="3121">
        <text>But the staff was so horrible to us.</text>
        <aspectTerms>
            <aspectTerm term="staff" polarity="negative" from="8" to="13"/>
        </aspectTerms>
        <aspectCategories>
            <aspectCategory category="service" polarity="negative"/>
        </aspectCategories>
    </sentence>
    <sentence id="2777">
        <text>To be completely fair, the only redeeming factor was the food, which was above average, but couldn't make up for all the other deficiencies of Teodora.</text>
        <aspectTerms>
            <aspectTerm term="food" polarity="positive" from="57" to="61"/>
        </aspectTerms>
        <aspectCategories>
            <aspectCategory category="food" polarity="positive"/>
            <aspectCategory category="anecdotes/miscellaneous" polarity="negative"/>
        </aspectCategories>
    </sentence>

{% endhighlight %}

The first review sentence carries a sentiment towards *service*, whereas the second review has sentiments for both *food* and *anecdotes/miscellaneous*. The raw data is in the .xml format. To make our life eaiser, we can parse the review sentences and sentiment labels into the standard table format using the [xml.dom](https://docs.python.org/3/library/xml.dom.html) API from Python.

{% highlight txt %}

                                                text      food   service  ambience   price    misc
0                                  staff horrible us  negative    absent    absent  absent  absent
1                               bread top notch well  positive    absent    absent  absent  absent
2                say one fastest delivery times city    absent  positive    absent  absent  absent
3                    food always fresh hot ready eat  positive    absent    absent  absent  absent
4                         mention coffee outstanding  positive    absent    absent  absent  absent

{% endhighlight %}

Althought the sentiment labels were created for 5 aspects, it is not necessary for a review to have labels available for all the aspects. In fact, each review in the training data has labels for ~1.2 aspects on average. Here I imputed the missing labels with "absent". Our task is to make predictions for the sentiment of all 5 aspects. To tackle this multi-task problem, we are going to build a multi-head deep learning model. Let's go!

# Dataset Creation

Now it's time to create datasets for training our neural network. Take note that in the review data, there are multiple classes within each aspect. With pandas' `value_counts` function, we can have a quick overview on the distribution of labels for different aspects.

# Model Training

# Results and Conclusion

## References

* [An Overview of Multi-Task Learning in Deep Neural Networks](https://arxiv.org/abs/1706.05098)
