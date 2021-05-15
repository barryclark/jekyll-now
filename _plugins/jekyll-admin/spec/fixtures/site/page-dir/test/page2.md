---
foo: bar
author:
  name: John Doe
  location: New York
labels:
  - issue
  - bug
  - next
complex_data:
  simple_key: value
  object_key:
    simple_subkey: value
    object_subkey:
      simple_subkey: value
      object_subkey:
        simple_subkey: value
      list_subkey:
        - value_1
        - value_2
        - value_3
        - value_4
    list_subkey:
      - value_1
      - value_2
      - value_3
      - value_4
    nested_list_key:
      - key_1: value_1a
        key_2: value_2a
        image: foo.png
        date: "May 14 2017 09:00:00"
      - key_1: value_1b
        key_2: value_2b
        image: bar.png
        date: "May 14 2017 10:30:00"
    matrix_key:
      - ['foo', 'bar']
      - ['lorem', 'ipsum']
  list_key:
    - key_1: value_1a
      key_2: value_2a
      image: foo.png
      date: "May 14 2017 09:00:00"
    - key_1: value_1b
      key_2: value_2b
      image: bar.png
      date: "May 14 2017 10:30:00"
---

# Test Page 2
