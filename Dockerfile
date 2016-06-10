FROM grahamc/jekyll
RUN gem install pygments.rb
RUN gem install rouge
RUN gem install jekyll-gist
