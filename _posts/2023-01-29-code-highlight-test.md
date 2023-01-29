---
layout: post
title: code highlight test
---

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


def download_version_information():
    """List avaialbe XCode versions."""
    url = "https://xcodereleases.com/data.json"
    response = requests.get(url, timeout=30)
    return response.json()


def list_released_versions():
    """List the available versions."""
    data = download_version_information()

    for key in data:
        if (
            key["date"]["year"] >= (datetime.today().year - 1)
            and "release" in key["version"]["release"]
        ):
            print(f"{key['version'].get('number')} ({key['version'].get('build')})")


def list_beta_versions():
    """List the available versions."""
    data = download_version_information()

    for key in data:

        if (
            key["date"]["year"] >= (datetime.today().year - 1)
            and "beta" in key["version"]["release"]
        ):
            print(
                f"{key['version'].get('number')} ({key['version'].get('build')}) (beta {key['version']['release'].get('beta')})"
            )


def get_installed_xcode_version():
    """Return installed xcode version."""
    # xcodebuild -version
    # Xcode 14.2
    # Build version 14C18
    pass


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
