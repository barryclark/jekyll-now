---
layout: page
title: Upgrade
description: >
  This chapter shows how to upgrade Hydejack to a newer version. The method depends on how you've installed Hydejack.
hide_description: true
sitemap: false
---

This chapter shows how to upgrade Hydejack to a newer version. The method depends on how you've installed Hydejack.

0. this unordered seed list will be replaced by toc as unordered list
{:toc}

Before upgrading to v7+, make sure you've read the [CHANGELOG](../CHANGELOG.md){:.heading.flip-title},
especially the part about the [license change](../CHANGELOG.md#license-change)!
{:.note}

## Free version
Upgrading the free version of the theme is as easy as running

```bash
bundle update jekyll-theme-hydejack
```

## PRO Version

In v9, the structure of Hydejack PRO sites has changed. If you're looking to upgrade from v8 or earlier, 
check out [Installation for existing sites](./install.md#existing-sites) instead.
{:.note}

Buyers of the PRO version will find the files necessary for an upgrade in the `#jekyll-theme-hydejack` folder of the downloaded zip archive.
To upgrade, simply overwrite the existing theme folder in the root directory of your site with the new one, then run

```bash
bundle update jekyll-theme-hydejack
```

If you've modified any of Hydejack's files in `#jekyll-theme-hydejack`, your changes will most likely be overwritten
and you have to apply them again. Make sure you've made a backup before overwriting any files.
{:.note}

## GitHub Pages
When building on GitHub Pages, upgrading Hydejack is as simple as setting the `remote_theme` key in `_config.yml` to the desired version.

```yml
remote_theme: hydecorp/hydejack@v9.1.6
```

To use the latest version on the `v9` branch on each build, you can use  `hydecorp/hydejack@v9`.


Continue with [Config](config.md){:.heading.flip-title}
{:.read-more}
