---
layout: post
title: Beware of ruby @@class_variable
---

Ruby class variables (represended with `@@variable`) may seem a good solution to store class related data, and a natural companion to some class methods. However, they may be far more "dangerous" than anticipated, and behave in unexpected ways if not used properly. Let's see one of those cases.

To exemplify, we will take care of a small shop selling fruits and vegetables. We want a class method named `categories` which will keep track of the number of types of fruits and types of vegetables in our store's stock.

To make sure the requirements remain the same, we will start our exercise with a test:

<div class="file_path">./spec/shop_spec.rb</div>

