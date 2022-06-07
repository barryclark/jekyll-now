# Weight & Bias & Activation & Activation Function

## Weight

- Each Neuron has some connection to others
- These connections = weight
- Type = double , e.g. 2.2, -1.2, 0.4

---

## Activation

- Each Neuron has some activation
- Between 0 ≤ a ≤ 1

---

## Activation Function

- Example
    - Sigmoid
    - ReLu
    - Tanh
- A function that map the value x to a value y, where 0 ≤ y ≤ 1
i.e. output y is the activation
- Todo:
    - [https://mlfromscratch.com/activation-functions-explained/#/](https://mlfromscratch.com/activation-functions-explained/#/)

---

## Bias

- just a value adding/subtracting after weight x activation
- I.e. `activation function` af(wa + wa + wa +… + wa + b) = next neuron activation

---

## Combining everything

- 2 input node → neuron A in next layer
- Let a = `activation`, w = `connection(Weight) to neuron A`
- input node 1: a = 0.3, w = 1.1
- Input node 2: a = 1.0, w = 2.6
- The value in neuron A = 0.3 x 1.1 + 1.0 x 2.6 = 2.93
- Activation Function(af) then is wrapped to this new value 2.93
- I.e. af x 2.93 = a value between 0 to 1