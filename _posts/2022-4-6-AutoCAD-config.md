---
layout: post
title: AutoCAD Configuration
---

Hello geeks,

In this article, I am providing all the configuration of AutoCAD as suggested by our professors.

## Commands

The first thing we need to do is to specify our work area and create a rectangle.

> **UNITS** &rarr; set Precision = 0; Units = Millimeter

> **LIMITS** &rarr; 0, 0 &#8626; Enter; 600, 400 &#8626; Enter

> RECTANGLE &rarr; 0, 0 &#8626; Enter; 600, 400 &#8626; Enter

## Configuration

### Layer Properties Manager

We need to create layers to get different styles of lines. 

| **Layer**  | **Color** | **Linetype**  |
|---|---|---|
| Construction  | 254  | Continuous  |
| Center  | Yellow  | CENTER2  |
| Dimension  | Cyan  | Continuous  |
| Hidden  | 252  | HIDDEN2  |
| Hatch  | Magenta  | Continuous  |

### Dimension Style Manager



> **DIMSTYLE** &rarr; Modify

1. **Lines**
    1. Baseline Spacing: 1
    2. Extend beyond dim lines: 1
    3. Offset from origin: 1
2. **Symbol and Arrows**
    1. Arrow size: 3
    2. Center marks -> Mark: 1
    3. Break size: 1
    4. Jog height factor: 1  
3. **Text**
    1. Vertical: Above
    2. Offset from dim line: 1
    3. Text alignment: ISO standard
4. **Primary Units**
    1. Precision: 0

As of now, these are the settings we need to apply before starting our project in AutoCAD.
If you have anything to add here, you can email me on the address given below.

---

Posted by Ninad Naik ([ninad@tsecgeeks.in](mailto:ninad@tsecgeeks.in))
