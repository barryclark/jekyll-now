# Base Ruby layer
FROM ruby:2.3.0

# Set the working directory to /app
RUN mkdir /app
WORKDIR /app

# Install all needed gems
RUN gem install bundler sshkit rake
RUN gem install jekyll jekyll-sitemap pygments.rb redcarpet

# Copy the current directory contents into the container at /app
ADD . /app

# Start server
CMD ["jekyll","serve", "--host", "0.0.0.0"]
