---
layout: post
title: Creating a Deep Learning Trap Lyric Generator, or, How Trap Music is not as Formulaic as Music Critics Think
---
![_config.yml]({{ site.baseurl }}/images/trap_house.jpg)
*2 Chainz's Pink Trap House in Atlanta, GA*

If you’re not interested in getting into the technical details of this project and just want to play around with generating your own trap lyrics, you can use the web app I created [here](trap-generator.zeager.xyz).

*Warning: This post will have some foul language (just the nature of the data)*

<<generated lyrics>>
<<maybe a migos song or st>>

**Intro to the Trap Music Genre**

Trap music is a sub genre of hip hop, which emerged in the early aughts with Atlanta-based rappers like Young Jeezy and Gucci Mane and now includes rappers like Lil Yachty and Migos, describes the cycle of poverty and the ‘trap’: a place where drugs are dealt: (https://www.theguardian.com/music/2015/aug/13/trap-kings-how-hip-hop-sub-genre-dominated-decade)

> The United Parcel Service and the people at the post office / 
> didn’t call you back because you had cloudy piss /
> So now you back at the trap just that, trapped /
> Go on and marinate on that for a minute/
> *SpottieOttieDopaliscious - Outkast*

In addition to the subject matter of the lyrics, trap music also has common lyrical and beat characteristics throughout the genre, which has given it the reputation for being repetitive and formulaic amongst music critics and fans:

> the formula [for trap] has become almost comically predictable: Open with an ambient intro that encompasses the song’s main 
> theme, build the groove with some vocal booth ad-libs and producer drops, then open up with the beat track. Now, throw in a  
> handful of “uuhhs!”s and “whats!” and dive into your first verse. Producers seem perfectly content to allow this sound to 
> proliferate as is — but what’s keeping this repetitive formula from getting old?(https://flypaper.soundfly.com/produce
> /why-does-trap-music-keep-working/)


So I sought out to see: if trap music is *really* so easy to produce, could a computer write convincing trap lyrics?

**The Problem**

In this text generation problem, I am essentially trying to predict the next word given a sequence of words (a lot of people have also talked about the effectiveness of character-RNN as well, like Andrej Karpathy’s post on the effectiveness of RNNs). Take this example:

![_config.yml]({{ site.baseurl }}/images/trap_images/1.png)

So in this case, we’d like to feed in the input sequence ‘The quick brown foxed jumped over the’ and try to predict the last word in the sentence. If we move this input sequence window to the right by one word, the input would be “quick brown fox jumped over the lazy” and then it would attempt to predict the next word in the sequence (dog, in this case).
 
![_config.yml]({{ site.baseurl }}/images/trap_images/2.png)

By moving this window of input sequences as we predict more words, the model can generate an entire text based on the data it was trained on.

**The Data**

The first thing you need to train such a model is a large database of sequences like the ones above to train on. There’s no common database for trap lyrics, so for this model I created a simple web scraper to scrape lyrics from AZLyrics for a selection of hand-selected trap artists. I scraped around X number of songs from X number of artists for this project. These were further broken down into five word sequences (the input sequence), with a corresponding output word, which created about 500,000 unique training examples. 

**Explaining the Model**

**Word2Vec**

The model is trying to predict one word out of the 34,000 unique words in the training data, but if you one-hot encode the data, it has no context into how words relate to one another and the definition of words. Let’s take the previous sentence as an example: the quick brown fox jumped over the lazy dog. If fox was replaced by a very similar word, like foxes, the model would treat that word as an entirely different word. This would make training a text generation model extremely difficult. 

Instead, I used skip-gram Word2Vec to as the input to the model, which produces word embeddings rather than a simple one-hot encoding for words. Word2Vec is a model that creates word embeddings by finding similar words based on them showing up in common contexts. 
From these, we now have contextualized output for each word that can find different verb tenses and synonyms. 

For this model, because the training data is so specific, I chose to train my own Word2Vec model on trap lyrics using a package called gensim, rather than relying on pre-trained Word2Vec models trained on more formal corpuses like news articles. 

{% highlight python %}

list_lyrics = pickle.load(open('clean_list_lyrics.p','rb'))

#Word2Vec Embedding
len(list_lyrics) #4584 songs

max_seq_length = 10

#create lines/sentences

sequences=[]

for lyric in list_lyrics:
    #add spaces around all new line characters
    lyric = re.sub(r'\n([a-zA-Z])',r'\n \1',lyric)
    lyric = re.sub(r'([a-zA-Z])\n',r'\1 \n',lyric)
    #deal with multiple new line characters, but keeping single new line characters
    lyric = re.sub('\n\n','\n',lyric)
    lyric = re.sub('\n\n\n','\n',lyric)
    lyric = re.sub('\n\n\n\n','\n',lyric)
    lyric = re.sub('\n\n\n\n\n','\n',lyric)
    #remove return characters
    lyric = re.sub('\r',' ',lyric)
    #split into words
    words = lyric.split(' ')
    #split into sequences
    lines = [words[i:i+max_seq_length] for i in range(0,len(words), max_seq_length)]
    sequences.append(lines)
 



#now we have a list of each song, with a list containing the words in the song, split by sequence seq_length

w2vmodel = Word2Vec(lines,min_count=1,iter=200)

w2vmodel.wv.most_similar('dollar')

{% endhighlight %}

**Plain “Vanilla” Neural Network**

![_config.yml]({{ site.baseurl }}/images/trap_images/3.png)

Neural networks have become some of the best models for more complex problems in machine learning because of the hidden layers, which allows the model to create a more complex set of features (weights) from the input layer through a process called backpropagation. I’m not going to go into too much detail here about exactly how neural networks work, since there’s a good amount of online resources available online (try Andrew Ng’s Deep Learning Coursera specialization, for example).

The problem with the simple, feed-forward vanilla neural network shown above for text generation is that they don’t take into account features learned over different parts of the input text, which is important for something sequential like text.

**Recurrent Neural Network**
![_config.yml]({{ site.baseurl }}/images/trap_images/4.png)

Recurrent neural networks (RNN) try to solve the problem of learning over time that is present in a vanilla neural network. In a nutshell, the recurrent neural network takes information from the prior time steps and the current time step, where the feed-forward neural network can only take information from the current timestep. 

![_config.yml]({{ site.baseurl }}/images/trap_images/5.png)

A recurrent neural network does this by essentially stacking the hidden layers, so that the input to the activation function (A in the below graph) includes the input from the current time step *and* the previous timestep. 

This very quickly runs into the vanishing gradient problem, and because of this, the model becomes unable to learn over many time steps. Furthermore, it has no mechanism for determining whether or not the information is important.

**Long Short Term Memory Networks**
When you are trying to create cohesive lyrics, you need to remember things like the chorus, that may have happened several sequences before the currently predicted one. A simple RNN has no capability of knowing what is important, so it would not know that a chorus is important and would need to be remembered so that it could be repeated after a verse.

This is where a Long Short Term Memory (LSTM) network comes in to place. LSTM models are an extension of Recurrent Neural Networks that include the ability to determine what is important to remember. This is done through two additional trainable gates: *forget gates* and *input gates*.

*Forget Gates*
Forget gates allow the model to ‘forget’ the hidden state from the previous time step. Much like how you dump most of the information from you memory moments after the final exam, this forget gate essentially allows the model to learn what is important and what isn’t important to remember. 

*Input Gates*
Input gates allow the LSTM model to decide whether or not to update the current hidden state using the data from the previous state. This is a gate that prevents unnecessary information to have an impact on the output for the current time step. This is sort of analogous to hearing a professor say “this won’t be on the next exam, but it may be on the final,” and you  immediately stop using learning any of the information for the current test (which in this case would be the current time step), but you keep it in your notebook in case it’s important for the final exam (which could be any future time step).

All of these gates are trainable weights, just like the weights of the hidden layers of a neural network.

If you want to learn about LSTM networks and how they work, I can’t recommend Andrej Karpathy’s [post](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) 

**Code**

Because I wanted to use a Word2Vec embedding for the words, we have to first create a mapping from the word to the corresponding index from the word to vector model. The following functions translate between the word2vec embedding index and the word itself

{% highlight python %}

def load_w2v_model():
    #load word 2 vec model
    w2vmodel = Word2Vec.load('word2vec_model')

    w2v_weights = w2vmodel.wv.syn0

    #prepare data for training
    vocab_size, embedding_size = w2v_weights.shape

    return w2vmodel, w2v_weights

def word_to_ix(word,w2vmodel):
    return w2vmodel.wv.vocab[word].index

def ix_to_word(ix,w2vmodel):
    return w2vmodel.wv.index2word[ix]
    
{% endhighlight %}
   
I already prepared the input data into a list of lists, with each sublist containing up to 6 words each. Because the model expects 6 words as input, the data must be padded if the line is less than 6 words long. The following code pads this data with the word2vec index for my catch-all ____UNSEEN____ variable. This will allow the model to ignore words that weren’t in the training index or the word paddings.

{% highlight python %}

def create_training_data(w2vmodel):
    #import lyrics
    lyrics_train=pickle.load(open('lines_train_'+str(max_seq_length)+'.p','rb'))
    lyrics_test=pickle.load(open('lines_test_'+str(max_seq_length)+'.p','rb'))
    #createtraining Data
    X_train=[]
    y_train=[]
    for line in lyrics_train:
        X_train.append([word_to_ix(word,w2vmodel) for word in line[:-1] if word!=''])
        y_train.append(word_to_ix(line[-1],w2vmodel))

    #create testing data
    X_test=[]
    y_test=[]
    for line in lyrics_test:
        X_test.append([word_to_ix(word,w2vmodel) for word in line[:-1] if word!=''])
        y_test.append(word_to_ix(line[-1],w2vmodel))

    #pad training and testing X data with the unseen word2vec (hopefully the model will learn this is useless)
    X_train=sequence.pad_sequences(X_train, maxlen=max_seq_length, value=word_to_ix('_UNSEEN_',w2vmodel))
    X_test=sequence.pad_sequences(X_test, maxlen=max_seq_length, value=word_to_ix('_UNSEEN_',w2vmodel))

    return X_train, y_train, X_test, y_test
    
{% endhighlight %}

Creating the keras LSTM model:

{% highlight python %}

def lstm_model(num_layers, dropout, layer_size, w2v_weights, max_seq_length):
    vocab_size, embedding_size = w2v_weights.shape
    ## create model
    optimizer=optimizers.Adam()
    model=Sequential()
    model.add(Embedding(vocab_size, embedding_size, input_length=max_seq_length,weights=[w2v_weights],trainable=False))
    for layer in range(num_layers-1):
        model.add(LSTM(layer_size, return_sequences=True))
        model.add(Dropout(dropout))
    model.add(LSTM(layer_size))
    model.add(Dropout(dropout))
    model.add(Dense(vocab_size, activation = 'softmax'))
    model.compile(loss="sparse_categorical_crossentropy", optimizer=optimizer, metrics=['accuracy'])
    return model
    
{% endhighlight %}

I used a GPU instance on AWS to train the model...
temp=.1
Seed: a georgia peach
how that fall get to it yeah get it
im on some top shit shit
what is you hoes
i aint tryna fuck with me cause i got the super water

If you’d like to view the full code, you can check it out on my github page here <<insert link>>. You can also try generating your own lyrics by using my Heroku app located [here](trap-generator.zeager.xyz)
enough. 


