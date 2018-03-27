---
layout: post
title: Creating a Deep Learning Trap Lyric Generator, or, How Trap Music is not as Formulaic as Music Critics Think
---
![_config.yml]({{ site.baseurl }}/images/trap_house.jpg)
*2 Chainz's Pink Trap House in Atlanta, GA*

If you’re not interested in getting into the technical details of this project and just want to play around with generating your own trap lyrics, you can use the web app I created [here](http://trap-generator.zeager.xyz).

*Warning: This post will have some foul language (just the nature of the data)*

<<generated lyrics>>
<<maybe a migos song or st>>

**Intro to the Trap Music Genre**
------

*The United Parcel Service and the people at the post office/*
*didn’t call you back because you had cloudy piss/*
*So now you back at the trap just that, trapped/*
*Go on and marinate on that for a minute*

*SpottieOttieDopaliscious - Outkast*

Trap music is a sub genre of hip hop, which emerged in the early aughts with Atlanta-based rappers like Young Jeezy and Gucci Mane and now includes rappers like Lil Yachty and Migos, describes the cycle of poverty and the ‘trap’ (a place where drugs are dealt). In addition to the subject matter of the lyrics, trap music also has common lyrical and beat characteristics throughout the genre, which has given it the reputation for being repetitive and formulaic amongst music critics and fans:

> the formula [for trap] has become almost comically predictable: Open with an ambient intro that encompasses the song’s main 
> theme, build the groove with some vocal booth ad-libs and producer drops, then open up with the beat track. Now, throw in a  
> handful of “uuhhs!”s and “whats!” and dive into your first verse. Producers seem perfectly content to allow this sound to 
> proliferate as is — but what’s keeping this repetitive formula from getting old?

*[Source](https://flypaper.soundfly.com/produce/why-does-trap-music-keep-working/)*


So I sought out to see: if trap music is *really* so easy to produce, could a computer write convincing trap lyrics?

**The Problem**
------

In this text generation problem, I am essentially trying to predict the next word given a sequence of words, although character-level models have been shown to be very effective in text generation as well.

![_config.yml]({{ site.baseurl }}/images/trap_images/1.png)

So in this case, we’d like to feed in the input sequence ‘The quick brown foxed jumped over the’ and try to predict the last word in the sentence. If we move this input sequence window to the right by one word, the input would be “quick brown fox jumped over the lazy” and then it would attempt to predict the next word in the sequence (dog, in this case).
 
![_config.yml]({{ site.baseurl }}/images/trap_images/2.png)

By moving this window of input sequences as we predict more words, the model can generate an entire text based on the data it was trained on.

**The Data**
------

The first thing you need to train such a model is a large database of sequences like the ones above to train on. There’s no common database for trap lyrics, so for this model I created a simple web scraper to scrape lyrics from AZLyrics for a selection of hand-selected trap artists. I scraped around X number of songs from X number of artists for this project. These were further broken down into five word sequences (the input sequence), with a corresponding output word, which created about 500,000 unique training examples. 

**Explaining the Model**
------

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
------

![_config.yml]({{ site.baseurl }}/images/trap_images/3.png)

Neural networks have become some of the best models for more complex problems in machine learning because of the hidden layers, which allows the model to create a more complex set of features (weights) from the input layer through a process called backpropagation. I’m not going to go into too much detail here about exactly how neural networks work, since there’s a good amount of online resources available online (try Andrew Ng’s Deep Learning Coursera specialization, for example).

The problem with the simple, feed-forward vanilla neural network shown above for text generation is that they don’t take into account features learned over different parts of the input text, which is important for something sequential like text.

**Recurrent Neural Network**
------
![_config.yml]({{ site.baseurl }}/images/trap_images/4.png)

Recurrent neural networks (RNN) try to solve the problem of learning over time that is present in a vanilla neural network. In a nutshell, the recurrent neural network takes information from the prior time steps and the current time step, where the feed-forward neural network can only take information from the current timestep. 

![_config.yml]({{ site.baseurl }}/images/trap_images/5.png)

A recurrent neural network does this by essentially stacking the hidden layers, so that the input to the activation function (A in the below graph) includes the input from the current time step *and* the previous timestep. 

This very quickly runs into the vanishing gradient problem, and because of this, the model becomes unable to learn over many time steps. Furthermore, it has no mechanism for determining whether or not the information is important.

**Long Short Term Memory Networks**
------

When you are trying to create cohesive lyrics, you need to remember things like the chorus, that may have happened several sequences before the currently predicted one. A simple RNN has no capability of knowing what is important, so it would not know that a chorus is important and would need to be remembered so that it could be repeated after a verse.

This is where a Long Short Term Memory (LSTM) network comes in to place. LSTM models are an extension of Recurrent Neural Networks that include the ability to determine what is important to remember. This is done through two additional trainable gates: *forget gates* and *input gates*.

*Forget Gates*

Forget gates allow the model to ‘forget’ the hidden state from the previous time step. Much like how you dump most of the information from you memory moments after the final exam, this forget gate essentially allows the model to learn what is important and what isn’t important to remember. 

*Input Gates*

Input gates allow the LSTM model to decide whether or not to update the current hidden state using the data from the previous state. This is a gate that prevents unnecessary information to have an impact on the output for the current time step. This is sort of analogous to hearing a professor say “this won’t be on the next exam, but it may be on the final,” and you  immediately stop using learning any of the information for the current test (which in this case would be the current time step), but you keep it in your notebook in case it’s important for the final exam (which could be any future time step).

All of these gates are trainable weights, just like the weights of the hidden layers of a neural network.

If you want to learn about RNN/LSTM networks and how they work, I can’t recommend Andrej Karpathy’s [post](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) on the effectiveness of RNN's enough.

**Code**
------

Because I wanted to use a Word2Vec embedding for the words, we have to first create a mapping from the word to the corresponding index from the word to vector model. The following functions load the word2vec mode and translate between the word2vec embedding index and the word itself.

*Word2Vec-related Functions*

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
   
I already prepared the input data into a list of lists, with each sublist containing up to 6 words each. Because the model expects 6 <<???>> words as input, the data must be padded if the line is less than 6 words long. The following code pads this data with the word2vec index for my catch-all ____UNSEEN____ variable. This will allow the model to (hopefully) learn to ignore words that weren’t in the training index or the word paddings.

*Training/Testing Data Creation and Formatting*

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

*Keras Deep Learning Model Architecture*

The code below creates the framework of the deep learning model that will be trained using our training sequences we created above. It took a lot of tuning to determine the best model in terms of the lyrics the model was outputting and validation set loss, and I eventually stopped tuning when it became prohibitively expensive on a AWS GPU instance.

In the code below, the embedding layer utilizes the word2vec embedding to convert the words into vectors as the input to the rest of the LSTM model.

The LSTM layers are, just as they sound, the LSTM layers to the model.  Too many layers became extremely difficult (and expensive on an AWS EC2 GPU instance) to train, so I ended up limiting the number of hidden layers to two. The layer size was the largest of the values I tried at 512 nodes. Although it took longer to train the larger layers, they seemed to understand more of the nuances of the trap lyrics, rather than simply outputting the most common curse words from the data. In some of my smaller layer sizes, it was pretty common to see a chorus that was just a string of curse words in a loop.The `return_sequences=True` statement just returns the sequences as input into the next layer of the model. 

The dropout layer randomly selects nodes to drop out, in order to reduce overfitting to the training set. Because the dataset proved difficult to learn for the model, dropout was limited to only .1 after various testing. 
The final layer is a softmax output layer. This outputs a probability, for each word in our vocabulary, of what our next word is.

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

*Temperature*

Temperature of a softmax output allows you to play with how confident you want the RNN to be in its output. If you reduce the temperature near 0, the model will be very confident in its output, but you also are more likely to run into infinite loops. On the otherhand, if you increase the temperature close to 1, it will be less conservative in its predictions and will likely have more interesting and diverse text at the expense of errors (e.g. in part of speech, etc.).

<<insert examples>>

{% highlight python %}
def sample(a, temp=1.0):
    try:
        a = np.log(a) / temp
        a = np.exp(a) / np.sum(np.exp(a))
        return np.argmax(np.random.multinomial(1, a, 1))
    except:
        #print('Temperature cannot be 0. Temperature set to 1.')
        return np.argmax(a)
{% endhighlight %}

*Text Generation*

Okay, now for the fun part. The actual *text generation* of this LSTM text generation model. To get a qualitative sense of how well the model would be able to output lyrics, I wanted to output the lyrics every 5th epoch while training, so I used this  `on_epoch_end` function as a callback in my keras model training step. I vary the temperature for four different outputs for each 5th epoch, just to get a sense of the variety of lyrics it will produce given various temperatures. Basically, we take a seed text, clean it, convert it to our sequence format with padding just like we do the training data, and input it into the model, predicting the next word and adding the predicted word to the input to predict the following word, and so on until we get the full predicted text. 


{% highlight python %}
def generate_text(model, w2vmodel, nb_epoch, length=75, max_seq_length=20, seed="Rain drop drop top"):
    """
    Function to output text trained by the neural network. Starts with a randomly selected capital letter.
    Input:
        model: fit keras model object
        length: int. how long the output text should be. Default is 500 characters.
        seed: the beginning of the generated lyrics. Set to be Migos' viral phrase "rain drop, drop top",
            but will eventually be user input when hosted
    Global variables:
        vocab_size: int. How long the vocab size is
        seq_length: int. Input size for model
    """
    global sample
    generated = ''
    sequences = seed
    generated += seed
    
    #clean seed
    seed=re.sub(r'<[^<]+?>', '', seed)
    #remove encoding characters like \x86
    seed=re.sub(r'[^\x00-\x7f]','',seed)
    seed=re.sub(r'\#','',seed)
    #remove punctuation
    seed=re.sub(r'[^A-Za-z0-9\s]','',seed)

    #shorten if longer than max_seq_length
    seed = seed.split(' ')[:max_seq_length]

    word_ix_list = []
    for word in seed:
        try:
            word = word_to_ix(word,w2vmodel)
        except:
            #since we're using -1 as a null word, we'll use that for words that aren't in the word2vec model
            print('Warning: {0} not contained in training vocabulary. It will be ignored when computing output.'.format(word))
            word = word_to_ix('_UNSEEN_',w2vmodel)
        word_ix_list.append(word)

    #pad word_list with the unseen word2vec if shorter than max_seq_length
    word_ix_list = [word_to_ix('_UNSEEN_',w2vmodel)] * (max_seq_length-len(word_ix_list)) + word_ix_list

    for temp in [0.2, 0.5, .75, 1.0]:
        print('temperature: ', temp)
        for word in range(length):
            #reshape wordlist
            word_ix_list = np.asarray(word_ix_list).reshape(1,max_seq_length)

            #prediction = model.predict(x=word_ix_list)
            #next_ix = np.argmax(prediction)
            prediction = model.predict(x=word_ix_list,verbose=0)[0]
            next_ix = sample(prediction, temp)
            predicted_word = ix_to_word(next_ix,w2vmodel)

            generated += (' ' + predicted_word) #add predicted word to the generated output

            #remove first word from the word list to reduce the array for the max sequence length for the model
            word_ix_list = np.append(word_ix_list,next_ix)
            word_ix_list.shape
            word_ix_list = np.delete(word_ix_list,0,0)
        print(generated)
        print('-----')
    #print(generated)
    return
    
def on_epoch_end(epoch, logs):
    """ This callback is invoked at the end of each epoch. """
    global w2vmodel
    global max_seq_length
    global word_to_ix
    global ix_to_word
    global sample
    if epoch % 5 == 0:
        generate_text(model, w2vmodel, epoch, length=75, max_seq_length=max_seq_length,
         seed="Rain drop, drop top")
    return
{% endhighlight %}



Here are the functions described above in the full model code. We create the data, load the word2vec model, create the training and test data in correct format, create the model and then train the model with varying callbacks.

{% highlight python %}
#import lyrics
lyrics_train=pickle.load(open('lines_train.p','rb'))
lyrics_test=pickle.load(open('lines_test.p','rb'))
#load word 2 vec model
w2vmodel = Word2Vec.load('word2vec_model')

w2v_weights = w2vmodel.wv.syn0

#prepare data for training
vocab_size, embedding_size = w2v_weights.shape
print('vocab size: ', vocab_size)
print('embedding size: ', embedding_size)
max_seq_length = 10

#create training Data
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

len(X_test)
len(X_train)
num_layers = 2
batch_size = 128
epochs=60
dropout=.2
layer_size = 512
model = lstm_model(num_layers, dropout, layer_size, w2v_weights, max_seq_length)

#Construct a hyperparameter string for each model architecture
model_name = 'model_dropout_' + str(dropout) + '_num_layers_'+ str(num_layers) +'_layersize_' + str(layer_size) + '_batch_size_' + str(batch_size)

print_callback=LambdaCallback(on_epoch_end=on_epoch_end)
tbCallBack = TensorBoard(log_dir='./' + model_name +'/logs', histogram_freq=0, write_graph=True, write_images=True)
checkpointer = ModelCheckpoint(filepath='./' + model_name + '/' + model_name + '_weights.h5', verbose=1, save_best_only=True)

print('##'*50)
print('Starting training for %s' % model_name)

model.fit(X_train, y_train, validation_data=[X_test,y_test], shuffle=False, batch_size=batch_size,
          epochs=60, callbacks=[print_callback, tbCallBack, checkpointer], verbose=2)


print('Done training!')
print('Run `tensorboard --logdir=%s` to see the results.' % './' + model_name)
{% endhighlight %}

**Results**
------
To train the model, I used a GPU instance on AWS to train the model, since it cut down the time to train this model tremendously (2 hours per epoch on my local machine down to 10 or so minutes). It definitely didn't come at a minimal cost though (anyone know how to dispute a $400 AWS charge?), but I think the results were (somewhat) worth it in the end.

Examples:

<<insert examples>>

If you’d like to view the full code, you can check it out on my github page [here](https://github.com/frankiezeager/trap_generator). You can also try generating your own lyrics by using my Heroku app located [here](http://trap-generator.zeager.xyz). 
