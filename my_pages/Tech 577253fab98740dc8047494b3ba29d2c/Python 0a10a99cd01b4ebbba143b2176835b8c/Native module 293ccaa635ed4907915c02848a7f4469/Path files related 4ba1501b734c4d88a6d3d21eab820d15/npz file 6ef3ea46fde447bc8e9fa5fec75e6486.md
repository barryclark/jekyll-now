# npz file

```python
import os
import numpy as np

file_path = "./xxxx.npz"

# Check existence
if not os.path.exists(file_path):
    raise ValueError("File {} doesn't exist.".format(file_path))

## allow_pickle=True is needed, for accessing the elements
with  np.load(file_path, allow_pickle=True) as data:
    print("Keys in npz file: ", data.files)
    x = data["x"]
    y = data["y"]
```