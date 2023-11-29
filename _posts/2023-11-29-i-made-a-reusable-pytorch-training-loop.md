---
title: I Made a Reusable Training Loop for PyTorch
layout: post
---

_TL;DR_: You can take a look at [my github repo](https://github.com/beekill95/torch-training-loop)
or try it yourself `pip install torch-training-loop`.

# Motivations

Recently, I've been doing a lot of DL models using PyTorch.
Transitioning from Tensorflow to Pytorch was a breeze;
most of the time, I find implementing a DL model in Pytorch is
similar to what I would do in Tensorflow and Keras.
However, as I've been familiar with Keras's ease-of-use and out-of-the-box utilities,
having to write a training loop logic in PyTorch is a pain in the neck for me.

Moreover, as I implement more models using PyTorch,
rewriting the training logic for each model is repetitive, tedious and error-prone.
Furthermore, including additional logic like early stopping, metrics logging, etc.
adds another layers of complexity and repetitiveness.

Thus, I want to implement a logic that offers simplicity, reusability,
and extensibility for training different DL models in PyTorch.
In addition, since this might benefit other PyTorch users,
it should be tested thorough and packaged/redistributed as a PyPI package.

# Implementation

Since I've used Tensorflow and Keras extensively, I'd made some design decisions
that took inspirations from Keras API: having an abstract base class `TrainingLoop`
implements training loop logic and leaves the forward/back-propagation logic to subclasses,
the `TrainingLoop` class handles callbacks and early stopping logic.
At first, this design was enough for what I wanted; and thus,
I decided to release a version `0.0.1` that was able to train DL models
with similar API to Keras, early stopping, metrics logging, progress displaying, etc.

However, it was challenging to add a different training logic dealing with distributed models.
Even though the new logic is not completely different from the original one,
there are a couple of major additions that warrant an entirely new training logic:

* Handling callbacks on the main process only;
* Broadcasting stop training signal from the main process to other processes;
* Collecting metrics from other processes to the main process;
* Displaying the training/validation progress along with metrics on the main process.

Nonetheless, the forward/back-propagation logic remains unchanged between single-process
and distributed settings. Therefore, I decided to refactor the `TrainingLoop` abstract
base class into a concrete class containing the training logic only and a separate
`TrainingStep` interface for forward/back-propagation logic. Similarly, in the distributed
training setting, there are a `DistributedTrainingLoop` class for distributed training logic
and a `DistributedTrainingStep` for distributed forward/back-propagation logic.
Finally, there is a `SimpleTrainingStep` class implements both interfaces with a shared logic
for training multi-inputs multi-outputs models.

The first time using `pytest` for unit testing was easy enough,
in spite of some hiccups with mock objects and patching.
With that said, I did have some hard times dealing with distributed tests,
specifically some tests would take forever to run on GitHub runners
while they run just fine on my machine. So I did some digging and found out that:

* Instead of binding to a specific/random port, I should find a free port to bind to.
It can be done by using `socket` module and binding to `localhost:0`,
the OS will then pick an available port;
* I should retry failed tests multiple times. It can be done using Pytest's plugin called
`pytest-rerunfailures`;
* I should limit the test suite run time and retry if there is any failures
(using `nick-fields/retry` action);

With these changes, unfortunately, the distributed tests still fail on GitHub runners.
Therefore, I looked a bit further into PyTorch's source code, specifically the part dealing
with waiting for other processes to join the main process:

```python
# https://github.com/pytorch/pytorch/blob/ce00c8fb456f057b4ad9916344a78bbd77e645a7/torch/multiprocessing/spawn.py#L175
def start_processes(
    fn, args=(), nprocs=1, join=True, daemon=False, start_method="spawn"
):
    mp = multiprocessing.get_context(start_method)
    error_queues = []
    processes = []
    for i in range(nprocs):
        error_queue = mp.SimpleQueue()
        process = mp.Process(
            target=_wrap,
            args=(fn, i, args, error_queue),
            daemon=daemon,
        )
        process.start()
        error_queues.append(error_queue)
        processes.append(process)

    context = ProcessContext(processes, error_queues)
    if not join:
        return context

    # Loop on join until it returns True or raises an exception.
    while not context.join():
        pass
```

With the flag `join = True`, the function waits forever for the process context to join.
I suspected that in the GitHub's runners setting, the while loop competes for resource
and prevents other processes from completing, and thus causes the timeout.
Therefore, instead of relying on PyTorch's implementation, I chose to write
[my own logic](https://github.com/beekill95/torch-training-loop/blob/cecbc2d45bca2e0b31f93bc9a5dc5d967463be55/tests/training_loops/distributed_training_loop_gloo_test.py#L32)
to wait for processes with time limit and delay options:

```python
number_waits = 30
processes_wait_time = 0.1 # seconds
wait_delay = 0.1 # seconds

# Total wait time.
wait_time = (processes_wait_time + wait_delay) * number_waits

context = mp.spawn(..., join=False)

for _ in range(number_waits):
    if context.join(processes_wait_time):
        return
    else:
        time.sleep(wait_delay)

# After we waited but processes din't join, terminate all processes.
for process in context.processes:
    if process.is_alive():
        process.terminate()

    process.join()

# Fail the test case due to timeout.
pytest.fail('Multiprocessing test didn\'t finish within '
            f'{wait_time} seconds.')
```

It works and I haven't seen any failed distributed tests since then.
This makes me feel confident and releases version `0.1.0`.

# Future Plan

Overall, I'm satisfied with the current state of the package.
In the future, I might want to add more functionalities relevant to my needs,
and they might need a major refactor.
Anyhow, I'm quite happy about it.

You can find the library at [my repo](https://github.com/beekill95/torch-training-loop)
and on [PyPI](https://pypi.org/project/torch-training-loop/).
Any contributions and bug fixes are welcome.
