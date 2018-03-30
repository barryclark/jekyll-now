---
layout: post
title: How to remove a referenced entity's field from the view in Drupal 8
---

# How To Remove a Referenced Entity's Field from the view in Drupal 8

I had an issue with removing a field from the Drupal view. The module creating the field is in alpha release and did not have the view mode fully integrated, so the admin option to remove the field from the view was unavailable.

## The Code

Here is the solution I came to:

```php
function yourtheme_preprocess_node(&$variables) {
  if($variables['node']->entity_reference_field_name_goes_here->entity):
    $entity = $variables['node']->entity_reference_field_name_goes_here->entity;
    $entity->field_to_unset->value = null;
  endif;
}
```
This code checks to see if the entity reference is there and sets the value to null, keeping it from rendering.

It is worth noting that this is not a permanent removal from the Drupal database. If you want to make it permanent you can use `$entity->save();`.

## Comments?

Have a better solution? Did I get something wrong? Did it help?

Let me know in the commments.
