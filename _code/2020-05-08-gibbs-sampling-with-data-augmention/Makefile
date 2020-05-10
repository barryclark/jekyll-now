JUPYTEXT=jupytext
NBCONVERT=jupyter nbconvert

MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR := $(notdir $(patsubst %/,%,$(dir $(MKFILE_PATH))))

nb: $(CURRENT_DIR).ipynb
md: $(CURRENT_DIR).md

%.md: %.ipynb
	$(NBCONVERT) --to markdown $<

%.ipynb: %.py
	$(JUPYTEXT) --to notebook --execute $<

clean:
	rm -r *.ipynb *.md *_files/

