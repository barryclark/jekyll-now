JUPYTER=jupyter
JUPYTEXT=jupytext
NBCONVERT=jupyter nbconvert

MKFILE_PATH:=$(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR:=$(notdir $(patsubst %/,%,$(dir $(MKFILE_PATH))))

NB_FILE = $(CURRENT_DIR).ipynb
MD_FILE = $(CURRENT_DIR).md
MD_ASSETS = $(CURRENT_DIR)_files

nb: $(NB_FILE)
md: $(MD_FILE)

%.md: %.ipynb
	$(NBCONVERT) --to markdown $<

%.ipynb: %.py
	$(JUPYTEXT) --to notebook --execute $<
	$(JUPYTER) trust $@

clean:
	rm -r *.ipynb *.md *_files/

publish: md
	cp $(MD_FILE) $(POSTS_DIR)
	cp -r $(MD_ASSETS) $(IMAGES_DIR)

	# Change image paths in the published post.
	sed -r 's/(!\[.*\]\()([^\)]+\))/\1{{ site.baseUrl }}\/images\/\2/g' -i $(POSTS_DIR)/$(MD_FILE)

include ../../Makefile

