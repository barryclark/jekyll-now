# PowerShell vs Python for Azure Scripting

## Introduction

Choosing a scripting language for Azure primarily involves two options: PowerShell and Python. This article compares their advantages and disadvantages across different use cases.

## GitHub CoPilot

Python ranks as the second most popular language on GitHub with a 22.5% growth rate as of 2022. PowerShell, not in the top 10, performs less effectively with GitHub CoPilot. Python's CoPilot integration offers faster development time, whereas PowerShell users often resort to manual documentation and debugging methods.

## Debugging

Both PowerShell and Python offer debuggers through VS Code. Debugging asynchronous jobs in PowerShell is cumbersome, requiring job state inspection after completion. Python, by contrast, raises exceptions directly, reducing bug identification and resolution time.

## Some Unexpected Buggy Behaviors

PowerShell's foot gun behaviors include but are not limited to:
- Array Unrolling: when an Array contains one element, it will automatically be converted to the element itself. This can cause unexpected behavior when passing an Array to a function.
- Variable Scoping: variables are scoped to the nearest enclosing scope. This can cause unexpected behavior when using functions.
```powershell
$x = 10
function foo {
    $x = 20
}
foo
$x # 10
```

Python's foot gun behaviors include but are not limited to:
- Mutable Default Arguments: default arguments are evaluated once when the function is defined, not when it is called. This can cause unexpected behavior when using mutable default arguments.
```python
def foo(x=[]):
    x.append(1)
    return x

foo() # [1]
foo() # [1, 1]
```
- Tuple Defintion: tuples are defined by the comma, not the parentheses. This can cause unexpected behavior when defining a tuple with one element.
```python
x = (1) # int
x = (1,) # tuple
```

In my experience, the Powershell behaviors were more painful to debug, and more likely to occur. In general, Python is a more robust language, and less likely to cause unexpected behavior.

## Scenarios

### Scenario 1: Small Scripts Using Azure CLI

#### PowerShell
```powershell
az login
```
Obviously, calling the Azure CLI from powershell is trivial. How close can we get to that level of ease in Python?

#### Python
```python
import os
os.system(["az login"])
```
OK that's a start, but not the best. I found this [stackoverflow post](https://stackoverflow.com/a/55960725) where a better solution is proposed. The resulting code looks like this:
```python
from azure.cli.core import get_default_cli

def az_cli (args_str):
    args = args_str.split()
    cli = get_default_cli()
    cli.invoke(args)
    if cli.result.result:
        return cli.result.result
    elif cli.result.error:
        raise cli.result.error
    return True
```

```python
from azhelper import az_cli

response = az_cli("az login")
print(f"{response}")
```
Which is much nicer by leveraging the Azure CLI python package. You don't get the same ease of use as Powershell, but when you need to run CLI commands, you can do it in Python.

### Scenario 2: Leveraging Azure SDK

#### PowerShell
```powershell
Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force
Connect-AzAccount
```

#### Python
```python
pip install azure-storage-blob
from azure.storage.blob import BlobServiceClient
blob_service_client = BlobServiceClient.from_connection_string("connection_string")
```

#### Winner: Python
In my view, when its been determined that the SDK is needed for a script, I'm immediately reaching for Python. That's due to my bias toward it, but its good to know that you can use the SDK in Powershell as well.

### Scenario 3: Complex Scripts (>100 Lines)

#### Multiprocessing

##### PowerShell
PowerShell uses `Start-Job`, which is native but less performant and harder to debug.

##### Python
Python's `concurrent.futures` makes debugging more straightforward.

#### Winner: Python
For complex scripts involving multiple developers, Python is more robust and readable. Its larger ecosystem and GitHub CoPilot integration offer added advantages.

## Conclusion: Context Matters
Python seems to be able to do everything PowerShell can do in Azure, except you get to write Python instead of having to write Powershell.

### New Developer
For those new to both languages, Python is recommended due to its versatility and broader ecosystem, including better CoPilot support.

### PowerShell Developer
Experienced PowerShell users may find it quicker for simple Azure CLI scripts. For complex tasks, however, Python offers greater advantages, including a more robust library ecosystem and better debugging.

### Python Developer
If you're already proficient in Python, continue using it for most Azure scripting scenarios, except for simple Azure CLI scripts where PowerShell may be more efficient.

