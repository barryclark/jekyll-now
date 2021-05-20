---
title: Architecture
permalink: /architecture/
description: >-
  Jekyll Admin exists in two parts, a Ruby back end and a Javascript front end. The two halves communicate via ashared API.
---

## How Jekyll Admin hooks into Jekyll

Jekyll Admin piggybacks on Jekyll's built-in Webrick server. We monkey patch the `jekyll serve` command to hook in two Sinatra
servers, one to serve the static front end that lives in `lib/jekyll-admin/public/dist` via `/admin`, and one to serve the Ruby
API via `/_api`. Once the Sinatra servers are mounted, they work just like any other Jekyll server (and we rely on third-party
plugins like `sinatra-json` and `sinatra-cross_origin`).

## How Jekyll Admin formats Jekyll objects for the API

Whenever possible, we want to stay as close to the `to_liquid.to_json` representation of Jekyll's internal object structure as
possible, so that we're (A) using data structure that developers are used to, and (B) so that we can benefit from upstream
improvements. To do this, we have the `JekyllAdmin::APIable` module, which gets included in native Jekyll objects like Pages and
Documents to add a `to_api` method which we can call to generate hashes for use in the API.
