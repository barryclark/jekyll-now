---
layout: post
title: Writing a variadic currying function using dependent types
---

![equation](https://latex.codecogs.com/png.latex?({\color{Blue}&space;X_1&space;\times&space;\ldots&space;\times&space;X_n}&space;\rightarrow&space;{\color{Green}&space;Y})&space;\rightarrow&space;{\color{Orange}&space;X_1&space;\rightarrow&space;\ldots&space;\rightarrow&space;X_n&space;\rightarrow&space;Y}.)

![equation](https://latex.codecogs.com/png.latex?({\color{Red}&space;X_0}&space;\times&space;{\color{Blue}&space;X_1&space;\times&space;\ldots&space;\times&space;X_n}&space;\rightarrow&space;{\color{Green}&space;Y})&space;\rightarrow&space;{\color{Red}&space;X_0}&space;\rightarrow&space;{\color{Orange}&space;X_1&space;\rightarrow&space;\ldots&space;\rightarrow&space;X_n&space;\rightarrow&space;Y}.)

![equation](https://latex.codecogs.com/png.latex?({\color{Blue}&space;P}&space;\rightarrow&space;{\color{Green}&space;Q})&space;\rightarrow&space;{\color{Orange}&space;R}.)

![equation](https://latex.codecogs.com/png.latex?({\color{Red}&space;S}&space;\times&space;{\color{Blue}&space;P}&space;\rightarrow&space;{\color{Green}&space;Q})&space;\rightarrow&space;{\color{Red}&space;S}&space;\rightarrow&space;{\color{Orange}&space;R}.)

![equation](https://latex.codecogs.com/png.latex?(({\color{Blue}&space;P}&space;\rightarrow&space;{\color{Green}&space;Q})&space;\rightarrow&space;{\color{Orange}&space;R})&space;\rightarrow&space;({\color{Red}&space;S}&space;\times&space;{\color{Blue}&space;P}&space;\rightarrow&space;{\color{Green}&space;Q})&space;\rightarrow&space;{\color{Red}&space;S}&space;\rightarrow&space;{\color{Orange}&space;R}.)
