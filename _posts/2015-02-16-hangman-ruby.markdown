---
layout: post
title: "Hangman Ruby"
date: February 16, 2015
tagline: "Playing around"
tags : [ruby, learning]
---

![Hangman Ruby](http://miriamtocino.github.io/images/posts/hangman-ruby.svg)

Some weeks ago I attended my first [Coding Kata Meetup](http://www.meetup.com/RailsGirls-NL/events/197906212/) organised by [RailsGirlsNL](https://twitter.com/RailsGirls_NL) in Utrecht. We had a great evening, so yo should definitely join [next time](http://www.meetup.com/RailsGirls-NL/events/197905672/)!

The topic of the night was to go through the implementation of the game **Hangman**. I have been learning some Ruby since then and didn't want to miss the opportunity to build the game on my own and share the results with you. There it goes... **Ruby Hangman**!

#### Class Hangman

First I created a class **Hangman**, containing the _state_ of the game and the different operations to be done while playing:

{% highlight ruby %}
# hangman.rb

class Hangman
  # Total number of turns stored in a constant variable
  TOTAL_TURNS = 10
  # Allow the following instance variables to be read
  attr_reader :word,
              :current_word_state,
              :guessed_letters,
              :turns_left

  def initialize(word)
    @word = word
    @current_word_state = []
    @guessed_letters = []
    @turns_left = TOTAL_TURNS
  end

  # Generates the word in dashes at the beginning of the game
  def initialize_word_state(word)
    word.length.times { @current_word_state << "_ " }
    @current_word_state.join("")
  end

  # Finding the letter to be guessed in each turn
  def guess_letter(input_letter, word)
    letter_index = 0
    letter_indexes_found = []
    word_as_array = word.chars

    word_as_array.each do |letter|
      if input_letter == letter
        letter_indexes_found << letter_index
        guessed_letters << letter
        @current_word_state[letter_index] = input_letter.upcase + " "
      end
      letter_index += 1
    end

    if letter_indexes_found.length > 0
      puts "The letter you chose was FOUND."
    else
      puts "The letter you chose was NOT FOUND."
      @turns_left -= 1
    end

    @current_word_state.join("")
  end

  # Checking if the player won for an specific current state of the word
  def you_won?(current_word_state)
    !current_word_state.include?("_ ")
  end

  # Checking if there are no more turns left
  def game_over?
    @turns_left == 0
  end
end
{% endhighlight %}

#### Main Game Loop

In another file I created the main loop of the game (don't forget to include the class **Hangman** at the beginning of this file to make it work ☺)

{% highlight ruby %}
# main.rb

# Allows the word to be typed as hidden
require 'io/console'
# Don't forget to include your class Hangman
require './hangman.rb'

# This is the entry point, where MAGIC happens!
puts "Welcome to Hangman Ruby!"
puts "Hello player 1! Write down the word to be guessed!"
puts ("*" * 40)

word = STDIN.noecho(&:gets).chomp
puts "Get's ready, player 2. The chosen word has #{word.length} letters."

# Now we create an instance of the Hangman object with the word that player 1 typed
hangman = Hangman.new(word)
puts hangman.initialize_word_state(word)

# This variable will control the while loop
game_is_finished = false

# The main loop of the game starts here!
while !game_is_finished
    puts "You have #{hangman.turns_left} turns left. Write down a letter:"
    puts ("*" * 40)

    input_letter = gets.chomp
    current_word_state = hangman.guess_letter(input_letter, word)
    puts current_word_state

    # Pre-cache the result of methods used more than once
    # (value won't change in-between)
    game_over = hangman.game_over?
    you_won = hangman.you_won?(current_word_state)

    # Checking if the game is finished after this turn
    game_is_finished = (you_won || game_over)
    # Let's kindly notify the user if the game is finished
    puts ("*" * 40) + "\nYou won!" if you_won
    puts ("*" * 40) + "\nGame Over!\nThe word was: #{word.upcase}" if game_over
end
{% endhighlight %}

The only thing you need to do now to start playing is going to your terminal under the folder where you saved these files and run:

{% highlight bash %}
$ ruby main.rb
{% endhighlight %}
