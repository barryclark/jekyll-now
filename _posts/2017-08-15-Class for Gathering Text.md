
In [Gathering text from Project Gutenberg](https://jss367.github.io/Getting-text-from-Project-Gutenberg/) we retrieved text from Project Gutenberg and built a couple of functions along the way to help. The functions make us more efficient, but what we really need is a class for books. The will allow us to store and analyze many different texts very efficiently. Let's build that here.

Let's make a class called Book that will store the methods and variables we need. Each book will have a title, a url (from Project Gutenberg), a position where the text actually starts, and a position where the text actually ends. We'll also want to hold the raw text, the tokens, and the [parts of speech](https://jss367.github.io/Visualize-Parts-of-Speech-1/) within the class. We'll build methods within the class to determine each of these.


```python
class Book(object):
    def __init__(self, title, author, url):
        # start is the location of where the book actually begins in the text file (skips headers, publisher info, etc.)
        # Let's create an end text so we can just grab a small amount for testing
        self.title = title
        self.author = author
        self.url = url
        self.full_raw_ = None
        self.start_ = None
        self.end_ = None
        self.raw_ = None
        self.tokens_ = None
        self.pos_ = None

    def __str__(self):
        return self.title

    
    @property
    def full_raw(self):
        if self.full_raw_ is None:
            #First check if the file is stored locally
            fname = 'corpora/canon_texts/' + self.title
            if os.path.isfile(fname):
                print("{title} file already exists".format(title=self.title))
                print("Extracting text from file")
                with open(fname, 'r') as f:
                    full_raw = f.read()
            else:
                print("{title} does not already exist. Grabbing from project Gutenberg".format(title=self.title))
                response = request.urlopen(self.url)
                full_raw = response.read().decode('utf-8-sig')
                print("Now let's save it")
                with open(fname, 'w') as outfile:
                    outfile.write(full_raw)
            self.full_raw_ = full_raw
        return self.full_raw_
    
    @property
    def start(self):
        if self.start_ is None:
            start_regex = '\*\*\*\s?START OF TH(IS|E) PROJECT GUTENBERG EBOOK.*\*\*\*'
            draft_start_position = re.search(start_regex, self.full_raw)
            self.start_ = draft_start_position.end()

            if re.search(self.title.lower(), self.full_raw[draft_start_position.end():].lower()):
                title_position = re.search(self.title.lower(), self.full_raw[draft_start_position.end():].lower())
                self.start_ += title_position.end()
                # If the title is present, check for the author's name as well
                if re.search(self.author.lower(), self.full_raw[draft_start_position.end() + title_position.end():].lower()):
                    author_position = re.search(self.author.lower(), self.full_raw[draft_start_position.end() + title_position.end():].lower())
                    self.start_ += author_position.end()
        return self.start_
    
    @property
    def end(self):
        end_regex = 'end of th(is|e) project gutenberg ebook'
        end_position = re.search(end_regex, self.full_raw.lower())
        end_position.start()
    
    @property
    def raw(self):
        if self.raw_ is None:
            self.raw_ = self.full_raw[self.start:self.end]
        return self.raw_
    
    @property
    def tokens(self):
        if self.tokens_ is None:
            self.tokens_ = nltk.word_tokenize(self.raw)
        return self.tokens_


    @property
    def pos(self):
        if self.pos_ == None:
            
            # Use NLTK's built-in tagger
            tagged = nltk.pos_tag(self.tokens)

            # Note that IN can be either a preposition or a conjunction, for now we're going to list it with the prepositions
            common_noun_pos = ['NN', 'NNS']
            common_nouns = []
            verb_pos = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
            verbs=[]
            adjective_pos = ['JJ', 'JJR', 'JJS']
            adjectives = []
            pronoun_pos = ['PRP', 'PRP$', 'WP', 'WP$']
            pronouns = []
            adverb_pos = ['RB', 'RBR', 'RBS', 'WRB']
            adverbs = []
            proper_noun_pos = ['NNP', 'NNPS']
            proper_nouns = []
            conjunction_pos = ['CC']
            conjunctions = []
            preposition_pos = ['IN', 'TO']
            prepositions = []
            interjection_pos = ['UH']
            interjections = []
            modal_pos = ['MD'] # But these are also verbs, so let's make sure they show up as such
            modals = []
            tagged_other_pos = ['CD', 'DT', 'EX', 'FW', 'LS', 'PDT', 'POS', 'RP', 'SYM', 'WDT']
            tagged_others = []
            other = []

            for idx, token in enumerate(tagged):
                if token[1] in common_noun_pos:
                    common_nouns.append(token)
                elif token[1] in verb_pos:
                    verbs.append(token)
                elif token[1] in adjective_pos:
                    adjectives.append(token)
                elif token[1] in pronoun_pos:
                    pronouns.append(token)
                elif token[1] in adverb_pos:
                    adverbs.append(token)
                elif token[1] in proper_noun_pos:
                    proper_nouns.append(token)
                elif token[1] in conjunction_pos:
                    conjunctions.append(token)
                elif token[1] in preposition_pos:
                    prepositions.append(token)
                elif token[1] in interjection_pos:
                    interjections.append(token)
                elif token[1] in modal_pos:
                    modals.append(token)
                elif token[1] in tagged_other_pos:
                    tagged_others.append(token)
                else:
                    other.append(token)


            self.pos_ = [common_nouns, verbs, adjectives, pronouns, adverbs, proper_nouns, conjunctions, prepositions, interjections, modals]
        return self.pos_
        # Append modals to verbs
        # Create nouns that is both proper nouns and common nouns
```


```python

```
