SRC = $(wildcard lib/*/*.js)
HTML = $(wildcard lib/*/*.html)
TEMPLATES = $(HTML:.html=.js)
LESS = $(wildcard lib/*/*.less)
CSS = $(LESS:.less=.css)

build: components $(SRC) $(TEMPLATES) $(CSS)
	@component build --verbose --out . --name assets

components: component.json
	@component install

%.js: %.html
	@component convert $<

%.css: %.less
	@lessc $< $@

clean:
	rm -fr build components $(TEMPLATES)

.PHONY: clean
