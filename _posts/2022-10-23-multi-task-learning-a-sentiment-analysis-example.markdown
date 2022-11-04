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
  <img src="/images/2022-10-23/multitasking.jpeg" style="max-width: 80%;" />
  <br />
  Image by <a href="https://www.taylorintime.com/there-are-three-types-of-multitasking/">Harold Taylor</a>
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

## Data Splitting

It can be observed that in the review data, there are multiple classes within each aspect. With pandas' <code class="inline">value_counts</code> function, we can have a quick overview on the distribution of labels for different aspects. There are more than just positive and negative labels.

{% highlight txt %}

          service  food  anecdotes/miscellaneous  price  ambience
absent       2441  1806                     1911   2717      2607
positive      324   867                      544    179       263
negative      218   209                      199    115        98
conflict       35    66                       30     17        47
neutral        20    90                      354     10        23

{% endhighlight %}

Interestingly, in addition to the typical positive, negative and neutral labels, we also see some reviews with a "conflict" label. **Conflict** indicates that both positive and negative sentiment were detected from a review. Here's one example of such reviews.

> It took half an hour to get our check, which was perfect since we could sit, have drinks and talk!

To split the given training data for model training and validation, we'd like to maintain the proportion of different classes for all 5 aspects as much as possible. This can be achieved with the [<code class="inline">IterativeStratification</code> module](http://scikit.ml/api/skmultilearn.model_selection.iterative_stratification.html) from the *skmultilearn* library. The idea is to consider the combination of labels from different aspects, and assign the examples based on the predefined training/validation split ratio. I used a *train_size* of 0.8 in practice. The following function was used to perform the stratified split of the data.

{% highlight python %}

from skmultilearn.model_selection import IterativeStratification


def iterative_train_test_split(
    self, X: np.array, y: np.array
) -> Tuple[np.array, np.array]:
    """Custom iterative train test split which maintains the
    distribution of labels in the training and test sets
    Parameters
    ----------
    X : np.array
        features array
    y : np.array
        labels array
    Returns
    -------
    Tuple[np.array, np.array]
        indices of training and test examples
    """
    stratifier = IterativeStratification(
        n_splits=2,
        order=1,
        sample_distribution_per_fold=[
            1.0 - self.train_size,
            self.train_size,
        ],
    )
    train_indices, test_indices = next(stratifier.split(X, y))

    return train_indices, test_indices

{% endhighlight %}

## Dataset Creation

To create the datasets for training our neural network. I first define a vectorizer class to tokenize the review words and convert them into pre-trained word vectors with a medium-sized English model provided by [Spacy](https://spacy.io/models/en). This model can be replaced with a transfermer based model, which can potentially improve the accuracy of classification. Alternatively, we can train the embedding layer with the neural network. For the POC purpose, the Spacy model I chose is sufficient. It will help us quickly finish training the model.

Note that the Spacy model needs to be downloaded before using.


{% highlight python %}

import en_core_web_md


class ABSAVectorizer:
    def __init__(self):
        """Convert review sentences to pre-trained word vectors"""
        self.model = en_core_web_md.load()

    def vectorize(self, words):
        """
        Given a sentence, tokenize it and returns a pre-trained word vector
        for each token.
        """

        sentence_vector = []
        # Split on words
        for _, word in enumerate(words.split()):
            # Tokenize the words using spacy
            spacy_doc = self.model.make_doc(word)
            word_vector = [token.vector for token in spacy_doc]
            sentence_vector += word_vector

        return

{% endhighlight %}

Then we can create the dataset class as follows. Since we need to make predictions for 5 aspects, the sentiment labels need to be fed as a vector for each review.

{% highlight python %}

from torch.utils.data import Dataset


class ABSADataset(Dataset):
    """Creates an pytorch dataset to consume our pre-loaded text data
    Reference: https://pytorch.org/tutorials/beginner/basics/data_tutorial.html
    """

    def __init__(self, data, vectorizer):
        self.dataset = data
        self.vectorizer = vectorizer

    def __len__(self):
        return len(self.dataset)

    def __getitem__(self, idx):
        (labels, sentence) = self.dataset[idx]
        sentence_vector = self.vectorizer.vectorize(sentence)
        return {
            "vectors": sentence_vector,
            "labels": labels,
            "sentence": sentence,  # for debugging only
        }

{% endhighlight %}


## Model Training

Now it's time to build our neural network. How can we enable our network to handle multiple tasks at the same time? The trick is to create multiple "heads" so that each "head" can undertake a specific task. Since all tasks need to be tackled based on the same set of features created out of the reviews, we need to declare a "backbone" to connect the source features with the different "heads". That's why we arrive at the following network architecture.

<div class="img-div-any-width">
  <img src="https://raw.githubusercontent.com/shenghaowang/absa-for-restaurant-reviews/main/absa-network.png" style="max-width: 80%;" />
  <br />
</div>

{% highlight python %}

from typing import List

import torch
from omegaconf import DictConfig

from attention import MultiHeadAttention


class MultiTaskClassificationModel(torch.nn.Module):
    def __init__(
        self,
        aspects: List[str],
        num_classes: int,
        hyparams: DictConfig,
    ):
        super().__init__()
        self.aspects = aspects
        self.backbone = torch.nn.LSTM(
            input_size=hyparams.word_vec_dim,
            hidden_size=hyparams.hidden_dim,
            num_layers=hyparams.num_layers,
            batch_first=True,
            bidirectional=True,
        )  # Output dimension = (batch_size, seq_length, num_directions * hidden_dim)

        # Define task specific layers
        num_directions = 2
        self.heads = torch.nn.ModuleList([])
        for aspect in aspects:
            module_name = f"h_{aspect}"
            module = torch.nn.Sequential(
                MultiHeadAttention(
                    embed_dim=hyparams.hidden_dim * num_directions,
                    num_heads=hyparams.num_heads,
                ),
                torch.nn.Linear(
                    hyparams.hidden_dim * num_directions, int(hyparams.hidden_dim / 2)
                ),
                torch.nn.Dropout(hyparams.dropout),
                torch.nn.Linear(int(hyparams.hidden_dim / 2), num_classes),
            )
            setattr(self, module_name, module)

    def forward(self, batch, batch_len):
        """Projection from word_vec_dim to n_classes
        Batch in is shape (batch_size, max_seq_len, word_vector_dim)
        Batch out is shape (batch, num_classes)
        """

        # This deals with variable length sentences. Sorted works faster.
        packed_input = torch.nn.utils.rnn.pack_padded_sequence(
            batch, batch_len, batch_first=True, enforce_sorted=True
        )
        lstm_output, (h, c) = self.backbone(packed_input)
        output_unpacked, _ = torch.nn.utils.rnn.pad_packed_sequence(
            lstm_output, batch_first=True
        )
        hs = [getattr(self, f"h_{aspect}")(output_unpacked) for aspect in self.aspects]
        return torch.cat(hs, axis=1)

{% endhighlight %}

## Results and Conclusion

## References

* [An Overview of Multi-Task Learning in Deep Neural Networks](https://arxiv.org/abs/1706.05098)
