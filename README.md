# Maid

Maid is an unassuming [Jekyll](http://jekyllrb.com) theme that places content first by tucking away navigation in a hidden drawer. It's based on [Poole](http://getpoole.com) and [Lanyon](http://lanyon.getpoole.com) built by [mdo](https://github.com/mdo).

![post_index](https://f.cloud.github.com/assets/1424573/1864487/fd8659d0-77f4-11e3-9922-3302dd2edbd6.png)

## Contents

- [Usage](#usage)
- [Options](#options)
  - [Pagination](#pagination)
  - [Sidebar menu](#sidebar-menu)
  - [Related posts](#related-posts)
- [Development](#development)
- [Author](#author)
- [License](#license)


## Usage

Maid is a theme built on top of [Poole](https://github.com/poole/poole), which provides a fully furnished Jekyll setup—just download and start the Jekyll server. See [the Poole usage guidelines](https://github.com/poole/poole#usage) for how to install and use Jekyll.


## Options

Maid includes some customizable options, typically applied via classes on the `<body>` element.

### Pagination

It's automagic.

![pagination](https://f.cloud.github.com/assets/1424573/1864488/00238352-77f5-11e3-8bc5-a61c296897eb.png)

### Sidebar menu

Create a list of nav links in the sidebar by assigning each Jekyll page the correct layout in the page's [front-matter](http://jekyllrb.com/docs/frontmatter/).

![sidebar](https://f.cloud.github.com/assets/1424573/1864486/fa56f6de-77f4-11e3-864c-07b845e6621e.png)

```
---
layout: page
title: About
---
```

**Why require a specific layout?** Jekyll will return *all* pages, including the `atom.xml`, and with an alphabetical sort order. To ensure the first link is *Home*, we exclude the `index.html` page from this list by specifying the `page` layout.

### Related posts

As close as you can get with Jekyll.

![related_posts](https://f.cloud.github.com/assets/1424573/1864489/0209a548-77f5-11e3-961a-a10f8d53cec1.png)

## Development

Maid has two branches, but only one is used for active development.

- `master` for development.  **All pull requests should be to submitted against `master`.**
- `gh-pages` for our hosted site, which includes our analytics tracking code. **Please avoid using this branch.**

To add a feature, or fix a bug, please create a feature branch and then make a pull request.


## Author

**John Otander**
- <https://github.com/johnotander>
- <https://twitter.com/4lpine>

#### Maid is based on the awesomeness of Poole and Lanyon which are designed and developed by:

**Mark Otto**
- <https://github.com/mdo>
- <https://twitter.com/mdo>


## License

Open sourced under the [MIT license](LICENSE.md).

<3
