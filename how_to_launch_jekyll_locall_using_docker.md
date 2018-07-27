## Launch `jekyll serve` using docker.

Just executing the following command at the top directory of this repository.

```
docker run -it --rm -p 4000:4000 -v $(pwd):/srv/jekyll jekyll/jekyll jekyll serve
```

Then access to `localhost:4000` on the browser.
