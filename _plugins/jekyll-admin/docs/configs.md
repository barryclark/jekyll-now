---
title: Configuration Options
permalink: /configs/
--- 

Jekyll Admin related options can be specified in `_config.yml`
under a key called `jekyll_admin`.

### Config Options

#### `hidden_links`

For hiding unwanted links on the sidebar. 

The following keys under `hidden_links` can be used in order to hide default links:

```yaml
jekyll_admin:
  hidden_links:
    - posts
    - pages
    - staticfiles
    - datafiles
    - configuration
```

#### `homepage`

Web page set as the default or start-up page for Jekyll Admin.

Valid values for `homepage`: `pages` (default), `posts`, `<collection_name>`,
`datafiles`, `staticfiles` ,`drafts` and `configuration`

```yaml
jekyll_admin:
  homepage: "posts"
```
