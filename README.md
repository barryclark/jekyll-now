# Personal blog

Built using the [Mediumish theme](https://github.com/wowthemesnet/mediumish-theme-jekyll). 

## Prerequisites

Only need to do these steps once.

1. **Homebrew** (if not already installed)  
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
1. **rbenv**  
`brew install rbenv ruby-build`
1. **Update profile**
`echo 'eval "$(rbenv init -)"' >> ~/.bash_profile`  
`source ~/.bash_profile`
1. **Ruby 2.5.7**  
`rbenv install 3.0.2`  
`rbenv global 3.0.2`
1. **Bundler**  
`gem install bundler`

### Local preview and development

1. Clone on your local machine
1. `bundle install`
1. `bundle exec jekyll serve`
