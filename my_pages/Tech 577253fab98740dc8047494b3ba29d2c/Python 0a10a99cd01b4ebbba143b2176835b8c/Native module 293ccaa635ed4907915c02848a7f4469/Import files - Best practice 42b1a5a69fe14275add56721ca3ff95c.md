# Import files - Best practice

> It is unbelievably annoying to do `import` in a python script.
> 

## Resource

- [https://peps.python.org/pep-0328/#rationale-for-relative-imports](https://peps.python.org/pep-0328/#rationale-for-relative-imports)
- [https://stackoverflow.com/questions/4209641/absolute-vs-explicit-relative-import-of-python-module](https://stackoverflow.com/questions/4209641/absolute-vs-explicit-relative-import-of-python-module)
- [https://stackoverflow.com/questions/16981921/relative-imports-in-python-3](https://stackoverflow.com/questions/16981921/relative-imports-in-python-3)

## Conclusion

Use absolute import if possible, unless the path is too long.

HOWEVER, there is 2 concepts:

- Allow renaming/restructure folders without renaming ALL imports in subfolders files.
- A module inside a package has to easily import itself without relative imports.

> WARNING ! Cannot run `[xxx.py](http://xxx.py)` directly if it contains relative import
> 

```python
package/
    __init__.py
    subpackage1/
        __init__.py
        moduleX.py
        moduleY.py
    subpackage2/
        __init__.py
        moduleZ.py
    moduleA.py
```

- Let’s say now in `moduleX.py`

```python
# moduleX.py
from .moduleY import spam
from .moduleY import spam as ham
from . import moduleY
from ..subpackage1 import moduleY
from ..subpackage2.moduleZ import eggs
from ..moduleA import foo
from ...package import bar
from ...sys import path
```