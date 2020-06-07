---
layout: post
title: Summarize COVID-19 literature with GPT2
---

<br>
![Logos]({{ site.baseurl }}/images/coronavirus.jpg "COVID19")
<p align="center">
    <font size="4"> </font>
</p>
<br>

# The Challenge

The White House, NIH, and leading research groups prepare the COVID19 Research dataset to challenge the machine learning fields to come up with machine learning techniques to generate new insights or to support the medical community. One problem that the researchers is facing is the accelerating growth of coronavirus-related literature. The worry is that the medical community may not be able to keep up with the rapid growth of the knowledge. One solution that I'm interested in is to do automatic text summarization tuned for the coronavirus literature. In this blogpost, I will describe how I built an abtractive summarization pipeline, from processing the data to fine-tuning the NLP model to generating the result.

# Introduction

## Dataset

The dataset is a part of COVID-19 Open Research Dataset Challenge by NIH, and a coalition of research institutes. The dataset contains a corpus of over 59k biomedical research articles published in peer-reviewed journals. This dataset is hosted on Kaggle [here](https://www.kaggle.com/allen-institute-for-ai/CORD-19-research-challenge). and is updated regularly so the corpus will be growing. By the time I finished the work, which is about 2-3 weeks, the corpus has double in size. This just shows you how fast the field is moving. Most of the collection is mainly about the viral infectious diseases, with specific focus on coronavirus-related diseases. I cleaned up the corpus and select about 35k samples to work with.

## Automatic Summarization

There are two main approaches to summarization: extractive and abstractive. The extractive summarization  extract key sentences or keypheases from longer piece of text. This is akin to skimming. One way this could be done is to perform classification on sentence or phrases. The goal is to classify whether the sentences are to be in the summary or not.

The abstractive approach paraphases the original text. To do this the model encodes the input text in some high dimensional semantic space and decodes it back to output text, where synonym words are often appear. This is generally much harder since it involves generating human language from high dimensional hidden representation.

## Attention-Transformer Architecture

Recently, the start-of-the-art NLP models are based on the transformer architecture that rely on the attention mechanism to convert the input sequences to output sequences. In our work, we are going to use OpenAI GPT-2 model as our starting point. The OpenAI GPT-2 uses transformer decoder blocks.This model is implemented in pytorch-based Huggingface transformer package.

## About GPT-2

The version of GPT-2 we are going to use is a "distil" version, which has 12 attention heads and 6 decoder layers. The information about the decoder block of GPT2 can be found [here](http://jalammar.github.io/illustrated-gpt2/). The input to the model is a tensor of tokenized text up to 1024 token length. The ourput is a tensor of likelihood distribution over all the tokens (i.e. pre-softmax). We will then use the token sampling methods to generate a text from this likelihood distribution.

## training the model

It's becoming popular now to use a unified text-to-text framework to train a large language model on multiple NLP tasks all at once. A general intuition behind this is that the one single model, trained on multiple related tasks such as multiple choice, translation, answer completion, etc. will learn general features of the language. In this work, I'll use a similar training strategy to fine-tuned a pre-trained model to do summarization from keywords, and at the same time do multiple choice answering, The hope is that the multiple choice task will enhance the model's ability to judge which summary is the correct one.


# training strategy

## how to make it a supervised learning task

First I need a way to create a labeled data out of the text somehow. The work around that I use is to train a model to generate summary from a set of keywords and compare the generated summary against the human-geneated "gold" summary. I use the abstract of articles as the gold summary. For the keywords, I use pre-trained NLTK part of speech tagging to extract keywords based on the part of speech.

## text-to-text framework

The idea is that the model maps one input text to output text, hence the name "text-to-text".  This is in contast to other styles that map to class label, label of span, etc. This has been shown beautifully in T5 model by Google. The strategy is that I provide a context to the model to make it recognize the task it will perform. The context I use is a special token that I make "<summarize>". The model has to learn that when it sees this token it is asked to generate a summary after this token.

## Multi-loss training

As said earlier while doing the summarization, the model will also pick the correct "gold summary" among distractors. The hope is that the model will learn how map the local semantic context in the keywords to the gold summary.  At the same time, the model retains the global contextual information of the keywords so that in the end of the text, the model is able to distinguish the gold summary from the distractors.

Each task is associated with its loss function, and the total loss is the weighted sum of the losses. For the summarization, the loss is simply the cross-entropy loss over the tokens in the span of the summary. This is called the language modeling loss. The multiple choice loss is the cross entropy loss over the choices (I use 4 choices).

# Data pre-processing

## keyword extraction

The keyword extraction is done using NLTK part of speech tagging. Initially I trained BERT token classifier to do this task but I later realized that NLTK is doing pretty well on its own. As for data augmentation, we create variability in the data by randomly sampling about 80% of keywords to be used. This is maybe similar to random cropping in image data.

## tokenization

The tokenizer comes with the pre-trained GPT-2 from the Huggingface transformer package. I added a few special tokens specific for the task including the beginning of sequence token, the end of sequence token, the keyword token, the summary token, and the padding token.

## creating the training/validation set

The create the training dataset I bundle together 5 tensor objects. Since I use 4 choices in the multiple choices, each tensor have 4 choices corresponding to 4 keyword-summary pairs. Only one of which is the correct pair.

1. the input sequences has the shape of [4,1024].
2. the token type sequences [4,1024].
3. the gold summary label for the summarization task [4,1024].
4. the last token label [4].
5. the multiple choice answer [1].

<br>
![Logos]({{ site.baseurl }}/images/training_1.png "training")
<p align="center">
    <font size="4"> <b> diagram illustrating training strategy. </b> </font>
</p>
<br>

# training

The training of DistilGPT2 is carried out on a Google Colab equiped with 1x NVIDIA Tesla P100GPU. A total of 5 epochs are performed. The training dataset consists of 31246 training samples,each sample has 4 multiple choice options. The validation dataset consists of 3555 samples, eachalso has 4 multiple choices. The training parameters include the learning rate 3e−5, with batch size =1 and gradient accumulation of 5 steps. The linearly decreasing learning rate scheduler is used for every epoch. The training loss of the first epoch is shown in figure below.

<br>
![Logos]({{ site.baseurl }}/images/train_result_1_epoch.png "training_loss")
<p align="center">
    <font size="4"> <b> the loss function for the language modeling and multiple choice task in 1 epoch of training.</b> Note that the language model loss is in exponentiated form (so-called the perplexity score). The multiple choise appears to be too easy since the loss drops to zero very quickly. </font>
</p>
<br>

# Results and analysis

## sequence generation

To generate a result, we sample tokens from the output (likelihood distribution) in sequential order. The probability of word being selected is proportional to the likelihood conditional on previous words. The stochastic sampling method I use is called "top-p sampling". Roughly, The rule is that the smallest set of candidate words to consider is such that the cumulative conditional probability is greater than p. This prevents us from considering low probability words.

## sample results

<br>
![Logos]({{ site.baseurl }}/images/summary_1_crop.jpg "summary")
<p align="center">
    <font size="4"> <b> examples of the summary. </b> </font>
</p>
<br>


## what the attention attends to

 The attention can be thought of as a vector of importance weights, i.e. how strongly the tokens in the input sequences are correlated with the ouput tokens. To visualize the attention, we input the sequence illustrated in table 1and plot the attention as matrix of alignment heatmap. To see what the model learns, we compare the attention before and after the training. Note here that the total unique structures are 6*12 = 64, i.e. 6 decoder layers, each with 12 attention heads. For the sake of visualization, we will only look at 4 attention heads. The figure below shows the layer 1 head 1 does not get fine-tuned much, while layer 2 head 2 shows the vertical line pattern getting stronger in the summary part. This pattern probably indicates the attention to the tokens within the summary. The layer 4 head 9 and layer 5 head 9 shows the attention mapping the keywords in the input to the output summary. More importantly, the attention is getting stronger after the training, indicating that the model learns the mapping that we want.

<br>
![Logos]({{ site.baseurl }}/images/attention_viz_before_after_6.png "attention")
<p align="center">
    <font size="4"> <b> visualizing the attention mechanism. </b> the weights of attention mapping the input to the output is shown as a heatmap. The x-axis represents the input sequence, and the y-axis represents the aligned output. </font>
</p>
<br>

## Quantitative assessment

ROUGE score is a measurement that used for quantifying text summarization. It is based on overlapping of N-grams between the "gold" summary and the machine-generated summary. The precision version of ROUGE reports the ratio of n-grams in the generated summary that are also present in the gold summary.

Below is some of the result, using the extractive summarization as a comparison. The extractive summarization uses pre-trained BERT encoder to embed whole sentences as high dimensional vectors (i.e. the semantic space of 768 dimensions). Then I perform k-means clustering on these high dimensional vectors and select the cluster centers to be the summary sentences. So this is an unsupervised learning method.

<br>
![Logos]({{ site.baseurl }}/images/ROUGE_scores.png "score")
<p align="center">
    <font size="4"> <b> ROUGE score comparison. </b> I use the precision version of ROUGE here. ROUGE-n precision=0.5 means 50% of the n-grams in the generated summary appear in the gold summary </font>
</p>
<br>

The result is that the unsupervised extractive BERT still out-perform my abstractive summarizer by GPT-2 in the ROUGE-score metric. It should be note that the ROUGE metric only look at identical n-grams; therefore it penalizes paraphrasing. So I'm not too alarmed when the ROUGE score of the GPT-2 summarizer is lower than the extractive method.

# Conclusion

First of all, I think the abstractive summarization still represents a standing challenge in NLP, especially summarization of technical domain-specific text. Perhaps this is because there are not a lot of source material to fine-tune the model. This model could be improved further if we have more training data and more GPU resources. We can also make the multiple choice task more difficult.

The evaluation process of abstractive summarization still requires more exploration. What we need is actual meaning similarity, and readability scores.

In the end, I hope that a text summarization approach such as this can help the research community keep up with the growing literature, whether it be coronavirus or other areas of science.

# Citation

[dataset](https://www.kaggle.com/allen-institute-for-ai/CORD-19-research-challenge)

[My github on the work](https://github.com/VincentK1991/BERT_summarization_1)
here is my Github where I put all the codes. Most of it is in Colab notebook form. Currently I'm still looking for a way to upload the model weight (about 500 MB). But if you are interested, just email me and I'll share via google drive. You'll have to move stuff around the notebook directory a bit to make it run on your colab.

[Huggingface](https://github.com/huggingface/transformers)
The OpenAI GPT-2, and BERT implementation is from Huggingface's Transformer package.

[OpenAI GPT-2](https://openai.com/blog/better-language-models/)
The OpenAI GPT-2 blog post and paper.

[text-to-text](https://ai.googleblog.com/2020/02/exploring-transfer-learning-with-t5.html)
The text-to-text framework used to train Google T5 model. 

[multi-loss training](https://medium.com/huggingface/how-to-build-a-state-of-the-art-conversational-ai-with-transfer-learning-2d818ac26313)
This blog post describes how the multi-loss training works. They used it in the context of training a chatbot; but this strategy could be used for other tasks.

[sequence generation by stochastic sampling](https://huggingface.co/blog/how-to-generate)
This blog post describes how the text sampling works to generate text sequence from GPT-2.

[Attention? Attention!](https://lilianweng.github.io/lil-log/2018/06/24/attention-attention.html)
this is a nice blog post on attention. The author does a pretty nice job explaining different types of attention mechanisms and how they're used. It also has a very good visualization.