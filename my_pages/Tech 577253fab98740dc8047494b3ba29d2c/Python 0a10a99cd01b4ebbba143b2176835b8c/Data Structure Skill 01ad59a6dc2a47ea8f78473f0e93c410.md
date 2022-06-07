# Data Structure Skill

# Type checking

Simple way:

```python
# But it would not pass for ndarray...etc
isinstance(some_list, list)
```

Or use [pandas helper](https://pandas.pydata.org/docs/reference/api/pandas.api.types.is_list_like.html): 

> Danger! List-like can include some unexpected type. Avoid to use pandas helper
> 

```python
is_list_like([1, 2, 3])
is_dict_like({1: 2})
```

# Set

Merge list into a set

```python
results_list = [[1,2,3], [1,2,4]]
results_union = set().union(*results_list)
```

---

# Dict of List

Declare a dict of list for adding value easily

```python
from collections import defaultdict
from typing import Dict, List

# so, element is init with a list
dict_list: Dict[str, List[str]] = defaultdict(list)

# Then you can do like this without error
dict_list["not_existing_key"].append(1000)
#  {'not_existing_key': [1000]}
```

Convert Dict of List → List of Dict (not same length)

```python
import numpy as np
import itertools

DL = {
    "10_ele": np.ones(10),
    "5_ele": np.ones(5),
    "2_ele": np.ones(2),
}
# {'10_ele': array([1., 1., 1., 1., 1., 1., 1., 1., 1., 1.]),
# '5_ele': array([1., 1., 1., 1., 1.]),
# '2_ele': array([1., 1.])}

v = [dict(zip(DL,t)) for t in itertools.zip_longest(*DL.values(), fillvalue="")]
"""output
[{'10_ele': 1.0, '5_ele': 1.0, '2_ele': 1.0},
 {'10_ele': 1.0, '5_ele': 1.0, '2_ele': 1.0},
 {'10_ele': 1.0, '5_ele': 1.0, '2_ele': ''},
 {'10_ele': 1.0, '5_ele': 1.0, '2_ele': ''},
 {'10_ele': 1.0, '5_ele': 1.0, '2_ele': ''},
 {'10_ele': 1.0, '5_ele': '', '2_ele': ''},
 {'10_ele': 1.0, '5_ele': '', '2_ele': ''},
 {'10_ele': 1.0, '5_ele': '', '2_ele': ''},
 {'10_ele': 1.0, '5_ele': '', '2_ele': ''},
 {'10_ele': 1.0, '5_ele': '', '2_ele': ''}]
"""
```

Find the largest len of nested list

```python

DL_len = max([len(v) for v in DL.values()])
```