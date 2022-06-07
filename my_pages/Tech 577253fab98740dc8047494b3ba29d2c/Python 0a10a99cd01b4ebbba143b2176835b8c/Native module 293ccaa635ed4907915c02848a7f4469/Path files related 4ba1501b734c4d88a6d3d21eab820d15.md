# Path / files related

### Sub category :

[npz file](Path files related 4ba1501b734c4d88a6d3d21eab820d15/npz file 6ef3ea46fde447bc8e9fa5fec75e6486.md)

[json file](Path files related 4ba1501b734c4d88a6d3d21eab820d15/json file a3d18ba875af4ba19aaa5277ba9c78be.md)

### Path manipulation

#### join/resolve a path

```python
os.path.join("/somewhere/folder", "train.npz")
```

#### calculate size of every files in a dir (not subfolders)

```python
import os

model_path = "/somewhere"
sum(os.path.getsize(f.path) for f in os.scandir(model_path) if f.is_file())
```