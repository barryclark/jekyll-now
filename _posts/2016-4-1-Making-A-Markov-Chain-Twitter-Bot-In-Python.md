---
layout: post
title: Making a Markov Chain Twitter Bot in Python
tags:
- Math
- Statistics
- Theory
- Practical
summary: For those of you who want to spam their followers with gibberish.
---


The study of Markov Chains is an interesting topic that has many applications. Such techniques can be used to model the progression of diseases, the weather, or even board games. We are going to introduce and motivate the concept mathematically, and then build a "Markov bot" for Twitter in Python. The resulting bot is available on [GitHub](https://github.com/srome/markovbot).


## Introduction to Markov Chains

A Markov Chain is used to model events whose outcome only depend on the current state. That is to say, what the system does next only depends on where it currently is. In many ways, a Markov Chain can describe how I play most strategic games... Anyways, if our state at time $$t$$ is represented by $$X_t$$, then this is the same as writing 
\begin{equation}
P(X_t = x | \text{Where we are + where we've been}) = P(X_t = x | \text{Where we are now}). 
\end{equation}

This can of course be written more mathematically, but it gets the point across. When you have this situation, you can arrange these probabilities into a matrix. To construct such a matrix, the rows and columns will be all the possible states, and the $$state_i, state_j$$ entry is the probability of moving from state $$i$$ to state $$j$$.

Let's pretend our mood is governed by a Markov Chain each day. If we are happy, then there's a 75% change for us to be happy the next day, other wise we're sad. If we're sad, there's a 10% change we'll become happy the next day, and 90% change we'll stay the same. Putting this into a matrix we have

$$
P = \begin{bmatrix}
.75 & .25 \\
.1 & .9\\
\end{bmatrix}.
$$

If we start happy, we can represent that as the row vector $$s_0 = [1, 0]$$. If we want to know how we'll feel tomorrow, we can find the probability distribution like this:

$$
s_1 = s_0P = [1,0] \begin{bmatrix}
.75 & .25 \\
.1 & .9\\
\end{bmatrix}. = [.75, .25],
$$

so we have a 75% change to still be happy, and a 25% otherwise. After another day...

{% highlight python linenos %}
    import numpy as np
    
    s_1 = [.75,.25]
    P = np.array([[.75,.25],[.1,.9]])
    
    s_2 = np.dot(s_1, P)
    
    print(s_2)
{% endhighlight %}

    [ 0.5875  0.4125]
    

And in 100 days...

{% highlight python linenos %}
    s_100 = s_1
    for k in range(0,99):
        s_100 = np.dot(s_100, P)
    print(s_100)
{% endhighlight %}


    [ 0.28571429  0.71428571]
    

And a thousand days...

{% highlight python linenos %}
    s_1000 = s_100
    for k in range(0,900):
        s_1000 = np.dot(s_1000, P)
    print(s_1000)
{% endhighlight %}

    [ 0.28571429  0.71428571]
    

Wait, the distribution is the same? We've stumbled onto what is called a limiting distribution. For special transition matrices, these limiting distributions exist, which mean no matter what state you start at, you'll end up at the same distribution eventually. In this case, the interpretation is this person will be sad approximately 3/4 of the time.

Where does this distribution come from? It's the eigenvector of $$P^T$$ associated with the eigenvalue $$1$$ scaled to sum to 1!

{% highlight python linenos %}
    P_t = np.transpose(P)
    D, S = np.linalg.eig(P_t)
    largest_eigenvector = (S[:,1]*-1) # Make positive
    largest_eigenvector /= np.sum(largest_eigenvector) # Scale to 1
    print(largest_eigenvector) 
{% endhighlight %}

    [ 0.28571429  0.71428571]
    

Limiting distributions are related to stationary distributions. It turns out that as long as your transition matrix P satisfies a few qualities, it's largest eigenvalue will equal 1, the (left) eigenvector associated with 1 will have entries of the same sign, and all other eigenvalues will be strictly smaller than 1 in absolute value. The mathematical underpinning of this guarantee is a special case of the [Perron-Frobenius Theorem](https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem). We call this left eigenvector the stationary distribution. Of course, it's clear that for some left eigenvector $$\pi$$ associated with $$1$$, that $$\pi P = \pi$$, but how does a stationary distribution $$\pi$$ (new $$\pi$$) come about? The stationary distribution $$\pi$$ is a vector such that for an arbitrary vector $$v$$,
\begin{equation}
\lim_{n\to\infty} v P^n = \pi.
\end{equation}

Now we will look at an example of this behavior with right eigenvalues to accustom ourselves to idea of limiting distributions. Let $$M$$ be a 2-by-2 matrix which has eigenvalues $$1, \epsilon$$ with $$\epsilon<1$$ and eigenvectors $$e_1, e_2$$ which span $$\mathbb{R}^2$$. This means any vector $$x$$ in $$R^2$$ can be written $$x = c_1 e_1 + c_2 e_2$$. Another way to put it is the eigenvectors form a basis for the space. This isn't always true, but assume we have a matrix where this is true.


Then, look what happens when we start multiplying $$x$$ by our matrix $$M$$:

\begin{equation}
M x = M( c_1 e_1 + c_2 e_2) = c_1 M e_1 + c_2 M e_2 = c_1 e_1 + c_2 \epsilon e_2
\end{equation}
which follows since $$e_1$$ and $$e_2$$ are eigenvectors. Notice, we can keep doing this for the relation:
\begin{equation}
M^n x = M^n( c_1 e_1 + c_2 e_2) = c_1 M^n e_1 + c_2 M^n e_2 = c_1 (1)^n e_1 + c_2 (\epsilon)^n e_2
\end{equation}

As $$n\to \infty$$, the term $$c_2 (\epsilon)^n e_2 \to 0$$ and the other term will be the only term left. So, 
\begin{equation}
\lim_{n\to \infty} M^n x = \pi
\end{equation}
for all $$x\in \mathbb{R}^2$$. This gives us an idea of how limiting distributions can come about in the wild, but this is not the whole story!

It's interesting to note that if a transition matrix $$P$$ has a stationary distribution, it may not necessarily be a limiting distribution. However, if we have an idealized case like our matrix $$M$$ , then the stationary distribution is the limiting distribution. 


## Implicitly Building a Transition Matrix From Text

With the theory out of the way, let's talk about how you can actually build such a matrix (implicitly). We're going to use a phrase from "Smells Like Teen Spirit" from Nirvana to do an example. 

    Hello, hello, hello, how low?
    
In the case of text Markov Chain, a state is what word you're currently at and the transition matrix is determined by what comes after that word in the whole "corpus" you are using (in this case, this line of the song).
   
Think about what the transition matrix of this sentence would look like when you ignore punctuation and capitalization. If you are at the word "hello", there is 66% chance you'll end up back the word "hello" and a 34% chance you'll end up at "how". If you are at "how", you have a 100% chance to get to "low". For text, it's usually easy to actually represent this as a dictionary in Python to avoid calculating everything:

{% highlight python linenos %}
    corpus = 'hello hello hello how low'
    
    def build_transition_matrix(corpus):
        corpus = corpus.split(' ')
        transitions = {}
        for k in range(0,len(corpus)):
            word = corpus[k]
            if k != len(corpus) - 1: # Deal with last word
                next_word = corpus[k+1]
            else:
                next_word = corpus[0] # To loop back to the beginning
    
            if word not in transitions:
                transitions[word] = []
    
            transitions[word].append(next_word)
        return transitions
    
    print(build_transition_matrix(corpus))
{% endhighlight%}

    {'low': ['hello'], 'hello': ['hello', 'hello', 'how'], 'how': ['low']}
    

Now, this isn't quite a matrix, but we can use it in the same way.

## Sampling from the Chain

Let's say we want to "sample" a sentence from corpus that is typical of the underlying distribution of the corpus (via it's transition matrix). We first choose a starting state (word) and then we keep applying the transition matrix (via the dictionary) until we have our final sentence. We are really using a Markov Chain Monte Carlo technique in hopes to sample from the limiting distribution. So, if your corpus really has a limiting distribution, you would end up with realization of the chain, or a path, which samples each word from the limiting distribution, if it exists.

For this experiment we will use the full song without repeating any parts:

{% highlight python linenos %}
    corpus = '''
    Load up on guns, bring your friends
    It's fun to lose and to pretend
    She's over bored and self assured
    Oh no, I know a dirty word
    
    Hello, hello, hello, how low?
    Hello, hello, hello!
    
    With the lights out, it's less dangerous
    Here we are now, entertain us
    I feel stupid and contagious
    Here we are now, entertain us
    A muchacho
    An albino
    A mosquito
    My libido
    Yeah, hey, yay
    
    I'm worse at what I do best
    And for this gift I feel blessed
    Our little group has always been
    And always will until the end
    
    And I forget just why I taste
    Oh yeah, I guess it makes me smile
    I found it hard, it's hard to find
    Oh well, whatever, never mind
    '''
    
    def sample_sentence(corpus, sentence_length, burn_in = 1000):
        corpus = corpus
        sentence = []
    
        transitions = build_transition_matrix(corpus)
        
        # Make a sentence that is 50 words long
        # We sample the sentence after running through the chain 1000 times to hope
        # to near a stationary distribution.
        current_word = np.random.choice(corpus.split(' '), size=1)[0]
        for k in range(0, burn_in + sentence_length):
            # Sample from the lists with an equal chance for each entry
            # This chooses a word with the correct probability distribution in the transition matrix
            current_word = np.random.choice(transitions[current_word], size=1)[0] 
    
            if k >= burn_in:
                sentence.append(current_word)
            
        return ' '.join(sentence)
    
    print(sample_sentence(corpus, 50, 1000))
{% endhighlight%}

    a dirty word
    
    Hello, hello, hello, hello, hello, how low?
    Hello, hello, how low?
    Hello, hello, hello, hello, how low?
    Hello, hello, hello!
    
    With the lights out, it's hard to lose and self assured
    Oh no, I taste
    Oh yeah, I feel blessed
    Our little group has always will until the lights out, it's hard to find
    Oh well,
    

Normally, the end of these chains are fun to read in a nonsensical way. With a larger corpus, you begin to get better combinations.

{% highlight python linenos %}
    longer_sample = sample_sentence(corpus, 100, 10000)
    print(longer_sample)
{% endhighlight %}

    just why I taste
    Oh yeah, I guess it hard, it's hard to find
    Oh well, whatever, never mind
     
    Load up on guns, bring your friends
    It's fun to pretend
    She's over bored and self assured
    Oh no, I feel blessed
    Our little group has always will until the end
    
    And I guess it hard, it's less dangerous
    Here we are now, entertain us
    A muchacho
    An albino
    A mosquito
    My libido
    Yeah, hey, yay
    
    I'm worse at what I taste
    Oh yeah, I feel blessed
    Our little group has always been
    And always been
    And always will until the end
    
    And I guess it makes me smile
    I found it makes me smile
    I found it hard, it's less dangerous
    Here
    

Leaving in the new lines makes it more humorous because you get two words that "go" together in the song. We can actually expand our state space to be pairs of words rather than single words to get better results. But who's going to see our results? The answer... the world:

# Assembling the Bot

Now, we have explored how to use a Markov Chain to generate gibberish (essentially), and now we're going to unleash that gibberish on the world with an automated twitter bot. In a brief post, we piece together the components necessary to have a bot. The resulting bot is available on [GitHub](https://github.com/srome/markovbot).


To build a bot, there's really two steps:

1. Sample from a Markov Chain
2. Post to twitter

The bot will allow you to input a series of text files as a corpora and use all of them to create your tweets. Having multiple documents complicates things a little when building the transition matrix, but it's not too bad.

## The Basics of the Bot

First, I have a class called Bot. Bot not only stores the transition dictionary but it also can generate tweets and post to twitter via the TwitterAPI. This class's init gives you all of the options and creates some basic instance level variables that will get filled out later.

{% highlight python linenos %}
    class Bot:
        def __init__(self,
                     documents,
                     twitter_api,
                     max_document_length = 1000,
                     burn_in = 250,
                     tweets_per_hour = 60*60):
            self._documents = documents
            self._twitter_api = twitter_api
            self._corpus = {}
            self._logger = logging.getLogger(__name__)
            self._max_sentence_length = max_document_length
            self._burn_in = burn_in
    
            #Calculate sleep timer
            self.sleep_timer = int(60*60/tweets_per_hour)
{% endhighlight %}

The main loop of the bot is the following function. In an eternal loop, it samples a tweet, posts a tweet, and waits-- before starting all over again for all eternity.

{% highlight python linenos %}
    def run(self):
        self._load_data() # Here it loads the corpora and converts them into a transition matrix
        while True:
            try:
                tweet = self._get_tweet() # Samples
                self._twitter_api.tweet(tweet) # Posts to twitter
            except Exception as e:
                self._logger.error(e, exc_info=True)
                self._twitter_api.disconnect()
            time.sleep(self.sleep_timer) #Every 10 minutes
{% endhighlight %}


## Cleaning Up the Output

In our last post, we would sample text but did nothing to clean it up to make it more readable. There's a lot that can be done to clean it up and make it more sensical. First, you can leave in the punctuation to make it flow better on the page. Another trick for a larger corpus is to make your state two words rather than just a single word. This will make the output make more sense because the words will follow a more natural pattern. 

### Transition Matrix with Two States

In this next snippet of code, we have a corpora stored in self._documents. We follow the advice of the previous paragraph to create a transition matrix (dictionary) with two states. The code is slightly more complicated due to the special case of having one word in one corpus and one word in another, but it's not so bad.


{% highlight python linenos %}
    def _load_data(self):
        next_key = None
        for doc in self._documents:
            with open(doc, "r") as f:
                for line in f.readlines():
                    parsed, add = self._line_to_array(line)
                    if add:
                        if next_key is None:
                            a = -2
                        else:
                            a = 0
                        for k in range(0, (len(parsed) + a)):
                            if next_key is not None:
                                key = next_key
                                next_key = (next_key[1], parsed[k])
                            else:
                                key = (parsed[k], parsed[k + 1])
    
                            self._add_to_corpus(parsed, key, k, next_key) # You can imagine what this function does
                        if k == len(parsed) - 3 and next_key is None:
                            next_key = (parsed[k + 1], parsed[k + 2])
        self.last_key = next_key
{% endhighlight %}

### Generating the Text in a Nicer Way

This part is more of an art than a science. We apply a few heuristics to make the text flow better. As before we have a burn in section to get ourselves further into the state space. Then we make sure our tweet begins at the first word of a sentence and add proper capitalization.

{% highlight python linenos %}
     def _generate_text(self, size=10000):
            size += self._burn_in  #For a burn in of 250 words.
            start_word = self._grab_random_two_words()
            text = ['']*size
            cap = [False]*size
            cap[0] = True
            text[0] = start_word[0]
            text[1] = start_word[1]
    
            punc = set(st.punctuation)
    
            # Create Sample
            i = 2
            while i < size:
                if any([True if k in punc and k != ',' else False for k in text[i-1]]):
                    cap[i] = True
                key = (text[i - 2], text[i - 1])
                if key == self.last_key:
                    #Restart if last key is chosen
                    new_key = self._grab_random_two_words()
                    text[i] = new_key[0]
                    if i+1 < size:
                        text[i+1] = new_key[1]
                    key = new_key
                    i+=2
                choice = np.random.choice(self._corpus[key])
                if i < size:
                    text[i] = choice
                i += 1
    
            #Capitalize
            for k in range(0,size):
                if cap[k]:
                    text[k] = text[k].capitalize()
    
                if k == size-1:
                    if not any([True if j in punc and j != '\'' else False for j in text[k]]):
                        text[k] = text[k] + '.'
    
            # Find the first period after the burn in section
            for first_period in range(self._burn_in, size):
                if '.' in text[first_period]:
                    break
    
            return ' '.join(text[(first_period+1):]).strip()
{% endhighlight %}

## Posting to Twitter

The Twitter API is a custom class that wraps the library tweepy. It takes authentication information and allows you to login, tweet and disconnect from twitter.

{% highlight python linenos %}
    class Twitter_Api():
        def __init__(self, consumer_key, consumer_secret, access_key, access_secret):
            self._logger = logging.getLogger(__name__)
            self._consumer_key = consumer_key
            self._consumer_secret = consumer_secret
            self._access_key = access_key
            self._access_secret = access_secret
            self._authorization = None
            if consumer_key is None:
                self.tweet = lambda x : self._logger.info("Test tweet: " + x)
                self._login = lambda x : self._logger.debug("Test Login completed.")
    
        def _login(self):
            auth = tweepy.OAuthHandler(self._consumer_key, self._consumer_secret)
            auth.set_access_token(self._access_key, self._access_secret)
            self._authorization = auth
    
        def tweet(self, tweet):
            if self._authorization is None:
                self._login()
                pass
            api = tweepy.API(self._authorization)
            stat = api.update_status(tweet)
            self._logger.info("Tweeted: " + tweet)
            self._logger.info(stat)
    
        def disconnect(self):
            self._authorization = None
{% endhighlight %}

## Using the Bot

We run the bot by calling its main method. In the main method, we have to specify the corpora and the twitter authentification information.

{% highlight python linenos %}
    def main():
        # Configure Logger
        logger = logging.getLogger()
        handler = logging.StreamHandler()
        logger.addHandler(handler)
        logger.setLevel(logging.DEBUG)
    
        # Get these from twitter, read tweepy's docs
        consumer_key = None
        consumer_secret = None
        access_key = None
        access_secret = None
        
        documents = ["corpus_1.txt", "corpus_2.txt", 'corpus_3.txt'] # Specify the documents
    
        twitter_api = Twitter_Api(consumer_key, consumer_secret, access_key, access_secret)
        bot = Bot(documents, twitter_api)
    
        bot.run()
{% endhighlight %}

Then, you can sit back, pour a tasty beverage, and watch it post the tweets to the console and your Twitter.
