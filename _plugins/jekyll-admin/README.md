[![Gem Version](https://img.shields.io/gem/v/jekyll-admin.svg)](https://rubygems.org/gems/jekyll-admin)
[![Build Status](https://travis-ci.org/jekyll/jekyll-admin.svg?branch=master)](https://travis-ci.org/jekyll/jekyll-admin)
[![Build status](https://ci.appveyor.com/api/projects/status/u6u9tn7rk5tln33s/branch/master?svg=true)](https://ci.appveyor.com/project/jekyll/jekyll-admin)
[![Coverage Status](https://coveralls.io/repos/github/jekyll/jekyll-admin/badge.svg?branch=master)](https://coveralls.io/github/jekyll/jekyll-admin?branch=master)
[![NPM Dependencies](https://david-dm.org/jekyll/jekyll-admin.svg)](https://david-dm.org/jekyll/jekyll-admin)
[![Financial Contributors on Open Collective](https://opencollective.com/jekyll-admin/all/badge.svg?label=financial+contributors)](https://opencollective.com/jekyll-admin)

A Jekyll plugin that provides users with a traditional CMS-style graphical interface to author content and administer Jekyll sites. The project is divided into two parts. A Ruby-based HTTP API that handles Jekyll and filesystem operations, and a JavaScript-based front end, built on that API.

![screenshot of Jekyll Admin](/screenshot.png)

## Installation

Refer to the [installing plugins](https://jekyllrb.com/docs/plugins/installation/) section of Jekyll's documentation and install the `jekyll-admin` plugin as you would any other plugin. Here's the short version:

1.  Add the following to your site's Gemfile:

    ```ruby
    gem 'jekyll-admin', group: :jekyll_plugins
    ```

2.  Run `bundle install`

## Usage

1.  Start Jekyll as you would normally (`bundle exec jekyll serve`)
2.  Navigate to `http://localhost:4000/admin` to access the administrative interface

## Options

Jekyll Admin related options can be specified in `_config.yml` under a key called `jekyll_admin`.

```yaml
jekyll_admin:
  hidden_links:
    - posts
    - pages
    - staticfiles
    - datafiles
    - configuration
  homepage: "pages"
```

### Customizing collection label in Sidebar

The plugin allows you to customize the name of a collection that is displayed in the sidebar by defining it in the collection's
metadata in the config file. For example, if your source's *posts* are actually *news-items* on the deployed site, then it can
be distracting to see the label `Posts` in the admin's sidebar. This situation can be resolved with the following configuration:

```yaml
collections:
  posts:
    output: true
    sidebar_label: News
```

## Contributing

Interested in contributing to Jekyll Admin? We’d love your help. Jekyll Admin is an open source project, built one contribution at a time by users like you. See [the contributing instructions](.github/CONTRIBUTING.md), and [the development docs](https://jekyll.github.io/jekyll-admin/development/) for more information.

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](.github/CONTRIBUTING.md)].
<a href="https://github.com/jekyll/jekyll-admin/graphs/contributors"><img src="https://opencollective.com/jekyll-admin/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/jekyll-admin/contribute)]

#### Individuals

<a href="https://opencollective.com/jekyll-admin"><img src="https://opencollective.com/jekyll-admin/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/jekyll-admin/contribute)]

<a href="https://opencollective.com/jekyll-admin/organization/0/website"><img src="https://opencollective.com/jekyll-admin/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/jekyll-admin/organization/1/website"><img src="https://opencollective.com/jekyll-admin/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/jekyll-admin/organization/2/website"><img src="https://opencollective.com/jekyll-admin/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/jekyll-admin/organization/3/website"><img src="https://opencollective.com/jekyll-admin/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/jekyll-admin/organization/4/website"><img src="https://opencollective.com/jekyll-admin/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/jekyll-admin/organization/5/website"><img src="https://opencollective.com/jekyll-admin/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/jekyll-admin/organization/6/website"><img src="https://opencollective.com/jekyll-admin/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/jekyll-admin/organization/7/website"><img src="https://opencollective.com/jekyll-admin/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/jekyll-admin/organization/8/website"><img src="https://opencollective.com/jekyll-admin/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/jekyll-admin/organization/9/website"><img src="https://opencollective.com/jekyll-admin/organization/9/avatar.svg"></a>

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
