---
layout: post
title: From Python to C/C++ and to GPU, a Pytorch walk-through
---

From Python to C/C++ and to GPU: a Pytorch walk-through
===

Based on `github.com/pytorch/pytorch` version `v0.2.0`

**Pytorch**: a fast prototype deep learning framework on Python
  - dynamic
  - auto gradient computing
  
Here we take a basic insight in how pytorch implements the dynamic graph and its' auto gradient computing based on a simple but complete example.

A simple snippet for Pytorch:
```python
import torch
from torch.autograd import Variable

a = Variable(torch.FloatTensor([2]), requires_grad=True) # Parameters
b = Variable(torch.FloatTensor([3])) # Data
loss = torch.mm(a, b).sum()

loss.backward()
```
This snippet includes the whole pipeline of Pytorch's **auto gradient** and **dynamic graph** features.

I'm going to walk-through the snippet line by line.

Python
---

1. `import torch`
- Load extension modules: `numpy`, `NVTX`(nvidia toolbox), `many functions written in C`
- import interface functions defined in Python (this may override C defined function)
- Define basic utilities: `is_tensor()`, `load/store`
- Define `Storage` and `Tensor` classes: `FloatTensor`, `DoubleTensor`
- Import most common subpackages
>related file:
> - top-level module initialization: `torch/__init__.py`

2. `from torch.autograd import Variable`

3. `a = Variable(torch.FloatTensor([2]))`
- Python list `[2]` 
- `FloatStorage` of only element {2}
- `FloatTensor` of one dimension, size is `(1,)`, stride=1, offset=1
- `Variable`: with its' data being the previous tensor, holds some properties about the gradient requirement (`requires_grad=True`).


>How is `Variable` implemented in `Pytorch`?
>It mixed in a pure python class which subclass on a C-based `Variable`.
>
>related files: 
> - python class interface: `torch/autograd/variable.py` 
> - C base class: `torch/csrc/autograd/variable.h(cpp)`
> - detailed doc: `torch/autograd/README.md`

4. `b = Variable(torch.FloatTensor([2]))`
The same as above.

5. ` loss = torch.mm(a, b).sum()`
- `torch.mm(a, b)` and `a.mm(b)`: there are many operations in Pytorch which is used in two alternative forms, and the operators can be both `Variable` and `Tensor`.
- `torch.mm(a, b)` will be dispatched to the corresponding static method of class `Variable`. e.g.
  > `torch.mm(a, b)` is equal to `Variable.mm(a, b)` or `Tensor.mm(a, b)` depending on the type of `a`. It's implemented by a **dispatcher** in the Pytorch's top-level module definition.`torch/csrc/Module.h(cpp)`, it calls the function `a._torch.mm` of instance `a`, raise errors if the function does not exist.
  > Variable._torch is a container class where all the static methods for Variable exist. The member methods are dynamically added to _torch at **import** time. (TODO: removed to C at newest master Jan-26-2018)
  ```python
    for method in dir(Variable):
        # This will also wrap some methods that normally aren't part of the
        # funcitonal interface, but we don't care, as they won't ever be used
        if method.startswith('_') or method.endswith('_'):
            continue
        if hasattr(Variable._torch, method):
            continue
        as_static = staticmethod(getattr(Variable, method))
        setattr(Variable._torch, method, as_static)

  ```

6. `loss.backward()`
- `Variable` type has an attribute named `_grad_fn`, which is a pointer to the creator of this variable, following the creator chains, chain rules are naturally applied. Thus by implementing corresponding `backward` methods for each  functions, the auto gradient can be achieved.

C
---
1. `Variable`

A `Variable` is a wrapper of `Tensor`, it stores extra informations. Computation performed on `Variable` is stored for future backpropagation. `torch/autograd/variable.py, ./_functions/*.py`

Variable subclasses a base class `torch._C._VariableBase`, which is defined in `torch/csrc/autograd/python_variable.cpp(h)` and `./variable.cpp(h)`.
There are 2 critical C types here respectively `THPVariable` and `Variable`. `THPVariable` is simply a python wrapper of C typed `Variable`, and the `THPVariable` type is encapsuled into a python class named `torch._C._VariableBase`.

The reason to wrap the `cdata` is to access the variable conveniently via C codes.

> THPVariable wrapper:
```clike
struct THPVariable {
    PyObject_HEAD
    // Payload
    std::shared_ptr<torch::autograd::Variable> cdata;
    // Tensor this wraps (corresponds to Python attr 'data').
    // It assumed that a THPVariable is *uniquely* identified by the
    // tensor it wraps.
    // Invariant: v->data == v->cdata->data
    PyObject* data;
    // Hooks to be run on backwards pass (corresponds to Python attr
    // '_backwards_hooks', set by 'register_hook')
    PyObject* backward_hooks;
};
```
> Variable extra attributes
```clike

  std::unique_ptr<thpp::Tensor> data;
  std::shared_ptr<Function> grad_fn;
  std::shared_ptr<Variable> grad;
  std::unique_ptr<VariableVersion> version_counter;
  std::vector<std::shared_ptr<FunctionPreHook>> hooks;
  std::weak_ptr<Function> grad_accumulator;
  std::mutex grad_accumulator_lock;
  bool requires_grad;
  bool is_volatile;
  // The "output number" of this variable; e.g., if this variable
  // was the second output of a function, then output_nr == 1.
  // We use this to make sure we can setup the backwards trace
  // correctly when this variable is passed to another function.
  int output_nr;
```

2. `Variable.backward()`

The method `backward` calls function `backward` in `torch/autograd/__init__.py`, (implicitly passing *self* as first argument).
After some book-keeping operations, it comes to the C part which `Pytorch` calls `ImperativeEngine` (In `torch/csrc/autograd/python_engine.cpp(h)`. 
This engine transverse the whole computation graph and compute the gradients w.r.t. the original caller Variable.


>The **engine** was moved from `python` to `cpp` at version *0.2.0* in favor of performance. It's a trivial task to operating `python` objects in `cpp` codes, so I prefer to read the python-engine at version *0.1.1* for simplicity. [see discussions](https://discuss.pytorch.org/t/how-to-understand-pytorchs-source-code/7600/2)

## The logic behind `autograd.Variable.backward`, `Function` and `Engine`

| ![The forward and backward graph built in Pytorch]({{ site.baseurl }}/images/pytorch-autograd.png) |
|:--:|
|*The forward & backward graph built in Pytorch* |
1. computation graph for reverse mode automatic gradient
The [*reverse mode*](https://justindomke.wordpress.com/2009/03/24/a-simple-explanation-of-reverse-mode-automatic-differentiation/) automatic gradient computing is perfect for back-propagation. The process starts from the final output and computes the partial derivatives w.r.t. every input elements. Such algorithm requires the data structure to be able to transverse the whole graph starting from output variable, thus a directed edge from output to input is a natural choice (a graph with edge from input to output is stated explicitly at forward step of you `nn` structure, while the graph with reverse edge is built at forward time).

2. basic components in `pytorch`
The basic components of the computation graph in `pytorch` are `Variable` (edge) and `Function` (node). The dependencies between two `Functions` (nodes) are introduced by the `Variable` (edge). The autograd related data structures of both `Variable` and `Function` will be introduced below. (version 0.1.1, slightly different on newest release especially naming conventions)
> Variable:
> - `creator` (changed to `grad_fn` in version 0.2.0): a reference to the producer of this `Variable`, which is also responsible for computing the gradients of output w.s.t. each input `Variable`

> Function:
> - needs_input_grad: a tuple indicates whether the input `requires_grad`, this properties can be utilized to further avoid useless gradient computing.
> - requires_grad: if all the inputs do not need gradients. It's also of performance consideration.
> - previous_functions: a list of tuple (input_var.creator, id(input_var)), the `id` field is used in `.creator` for position lookup.
> - output_ids: a map from variable id to the position of output variable.

| ![Function object in Pytorch]({{ site.baseurl }}/images/pytorch-autograd-function.png) |
|:--:|
| *Function object in Pytorch* |

3. Build the reverse graph at forward time
```python
class Function(object):

    def __init__(self):
        self.previous_functions = None
        self.output_ids = None
        self.needs_input_grad = None
        self.backward_hooks = OrderedDict()

    def __call__(self, *input):
        return self._do_forward(*input)

    def _do_forward(self, *input):
        unpacked_input = tuple(arg.data for arg in input)
        raw_output = self.forward(*unpacked_input)
        if not isinstance(raw_output, tuple):
            raw_output = (raw_output,)
        self.needs_input_grad = tuple(arg.creator.requires_grad for arg in input)
        self.requires_grad = any(self.needs_input_grad)
        output = tuple(Variable(tensor, self) for tensor in raw_output)

        self.previous_functions = [(arg.creator, id(arg)) for arg in input]
        self.output_ids = {id(var): i for i, var in enumerate(output)}
        return output
```
 - `Function` does not hold any `Variable`, instead, `Tensor` are stored for future gradient computing.
 - a `Variable` is unpacked to the underlying `Tensor` at `Function` level. The following operations will invoke the `Tensor` version ones.
   > e.g. `Variable.mm(a, b)` will invoke `Tensor.mm(a.data, b.data)` at forward time.
 - As `Variable` are all unpacked into `Tensor`, the history information will be lost if not explicit stored. So we store the creator of each input `Variable` into `self.previous_functions` at forward time.
 - For `Function` which has multiple outputs, the order information is unknown at backward time, because user may permute the output of a function just for fun. Even if the engine is able to get the creator of a `Variable`, it can't assign the gradient to the proper output of the creator. `self.output_ids` maps the id of output into the position of the variable in creator's outputs.
 
 3. backward of `Function` and the `engine`
 
The backward process is quite straight for `Function`, it simply computes the gradient of input `Variable` given the gradient of output `Variable` (w.s.t. starting `Variable` that calls `.backward()`). 
```python
    class Function(object):
    # ...
    def _do_backward(self, grad_output):
        grad_input = self.backward(grad_output)
        # ... some trivial post-processing including `hook` and pack results
        return grad_input
    def backward(self, grad_output):
        raise NotImplementedError
```

The `backward engine` does some dirty work behind a simple `Function` API, including dispatching the gradient to proper `creator` and ensuring the gradients are completely accumulated before applying chain rule to the next `Function`.

```python
class ExecutionEngine(object):

    def _compute_dependencies(self, function):
        """tranverse the computation graph to get the dependencies
        
        BFS tranverse the function starting from final output. The
        dependencies is a collection of counters.
        """
        # compute the dependencies
        return dependencies

    def _free_backward_dependency(self, dependencies, prev_fn, fn, arg_id):
        """Update the dependencies after backward one function
        
        Return:
            output_idx: the position of the arg in the outputs of prev_fn
        """
        # Update dependencies and return the position
        return output_idx


    def _is_ready_for_backward(self, dependencies, function):
        """Check if the node function is ready
        
        The ready status is determined by the in-degree of the node function
        a.k.a the dependencies[function][output] are all 0s.
        """
        for deps in dependencies[function]:
            if len(deps) > 0:
                return False
        return True

    def run_backward(self, variable, grad):
        """The core part of backward engine
        
        It calls the backward method of Functions and dispatches the gradients
        to the correct previous functions. The method is returned until all
        functions are `backward`ed successfully
        """
                                
        # set up the starting point, the grad is 1 without explicitly 
        # setting when calling `Variable.backward()`
        ready = [(variable.creator, (grad,))] # Functions ready for BP
        not_ready = {} # Functions whose gradients are not accumulated properly

        dependencies = self._compute_dependencies(variable.creator)

        while len(ready) > 0:
            fn, grad = ready.pop()
            # TODO: double-buffering
            grad_input = fn._do_backward(*grad)
                                    
            # Update the dependencies of all the input Variables of function fn
            # arg_id is used for position looking-up.
            for (prev_fn, arg_id), d_prev_fn in zip(fn.previous_functions, grad_input):
                                        
                # skipping useless gradients computing
                if not prev_fn.requires_grad:
                    assert d_prev_fn is None
                    continue
                output_nr = self._free_backward_dependency(dependencies, prev_fn, fn, arg_id)
                is_ready = self._is_ready_for_backward(dependencies, prev_fn)

                # the following codes are a little bit messy as
                # the two branches partially share a same underlying logic
                # , accumluating the current gradient to existing one.
                                            
                # if the `perv_fn` is ready for backward, then move
                # it from `not_ready` to `ready`
                if is_ready:
                    if prev_fn in not_ready:
                        prev_grad = not_ready[prev_fn]
                        if not prev_grad[output_nr]:
                            prev_grad[output_nr] = d_prev_fn
                        else:
                            prev_grad[output_nr].add_(d_prev_fn)
                        del not_ready[prev_fn]
                    else:
                        # The `prev_fn` is ready when the first seen,
                        # there must be only one output in `prev_fn`
                        assert output_nr == 0
                        prev_grad = (d_prev_fn,)
                    ready.append((prev_fn, prev_grad))
                else:
                    if prev_fn in not_ready:
                        prev_grad = not_ready[prev_fn]
                    else:
                        prev_grad = [None for _ in prev_fn.output_ids]

                    if not prev_grad[output_nr]:
                        prev_grad[output_nr] = d_prev_fn
                    else:
                        prev_grad[output_nr].add_(d_prev_fn)

                    not_ready[prev_fn] = prev_grad
```

The auxiliary methods are listed below in detail:
```python
class ExecutionEngine(object):
    def __init__(self):
        pass

    def _compute_dependencies(self, function):
        """tranverse the computation graph to get the dependencies
        
        BFS tranverse the function starting from final output. The
        dependencies is a collection of counters.
        """
        dependencies = {}
        seen = {function}
        queue = [function]
        while len(queue) > 0:
            fn = queue.pop()
            for prev_fn, arg_id in fn.previous_functions:
                if prev_fn not in dependencies:
                    dependencies[prev_fn] = [Counter() for _ in prev_fn.output_ids]
                output_idx = prev_fn.output_ids[arg_id]
                    
                # I think there's no need to store the counter for each current function,
                # a simple counter for each prev_fn should be enough.
                dependencies[prev_fn][output_idx][fn] += 1
                if prev_fn not in seen:
                    queue.append(prev_fn)
                    seen.add(prev_fn)
        return dependencies

    def _free_backward_dependency(self, dependencies, prev_fn, fn, arg_id):
        """Update the dependencies after backward one function
        
        Return:
            output_idx: the position of the arg in the outputs of prev_fn
        """
        deps = dependencies[prev_fn]
        output_idx = prev_fn.output_ids[arg_id]
        output_deps = deps[output_idx]
        output_deps[fn] -= 1
        if output_deps[fn] == 0:
            del output_deps[fn]
        return output_idx


    def _is_ready_for_backward(self, dependencies, function):
        """Check if the node function is ready
        
        The ready status is determined by the in-degree of the node function
        a.k.a the dependencies[function][output] are all 0s.
        """
        for deps in dependencies[function]:
            if len(deps) > 0:
                return False
        return True
```
