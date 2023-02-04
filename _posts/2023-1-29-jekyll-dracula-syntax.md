---
layout: post
title: jekyll-dracula-syntax
---
A dark theme for syntax highlighting in your Jekyll blog.

This theme was created based on the [draculatheme](https://draculatheme.com/) color palette. The examples below use [jekyll-dracula-syntax](https://github.com/captam3rica/jekyll-dracula-syntax.

**Python**

```py
#!/usr/bin/env python3

"""A tool for downloading and installing Xcode."""

#
#   Show available versions of xcode
#
#   RESOURCES
#
#       - xcode releases api - https://xcodereleases.com/data.json
#       - ruby gem example - https://github.com/xcpretty/xcode-install/blob/master/lib/xcode/install/list.rb
#       - https://github.com/fastlane/fastlane
#


import argparse
import sys
from datetime import datetime

import requests


def prog_args():
    """Return arguments."""
    parser = argparse.ArgumentParser(
        prog="xcode_installpy",
        description="A tool for downloading and install Xcode.",
        allow_abbrev=False,
    )

    parser.add_argument(
        "--versions",
        action="store_true",
        help="Returns available XCode releases(non beta).",
        required=False,
    )

    parser.add_argument(
        "--beta-versions",
        action="store_true",
        help="Returns XCode beta versions.",
        required=False,
    )

    parser.add_argument("--version", action="version", help="Show this tools version.")

    return parser.parse_args()
    

def main():
    """Do the main function."""
    # parse the arguments
    arguments = prog_args()

    if arguments.versions:
        list_released_versions()

    if arguments.beta_versions:
        list_beta_versions()


if __name__ == "__main__":
    main()
```

**zshell**

```sh
#!/usr/bin/env zsh

delcare -a ITEMS_ARRAY

# store the contents of ls in a var
ITEMS_ARRAY=("$(ls /Users/captam3rica/Desktop)")

# loop over the contents of the var to display each item to stdout
for dir in "${ITEMS_ARRAY[@]}"; do
    echo "$dir"
done

```
