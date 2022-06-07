default:
	echo "hi"

start: replace_link
	bundle exec jekyll serve

# To fix the encoded links in md
replace_link:
	node ./notion2md/search_replace.js

