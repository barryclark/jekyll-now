---
layout: project
title: Baxter Mass Sorter
date: September 26, 2014
image: baxter.png
---

## Background
The Baxter Robot, from ReThink Robotics, is an excellent tool for experimentally applying robotic vision and manipulation in a forgiving environment.  Our team utilized Baxter to identify cylinders of unknown mass and sort based on apparent density.

## Description
The project consisted of two main segments: cylinder volume approximation with a kinect sensor, and manipulation with inverse kinematics.  Cylinder volume and pose approximation was executed through a cylinder model segmentation within PCL.  From there, a coordinate frame was transformed with respect to a static coordinate frame representing the pose of the kinect in the world frame.  The last stage involves sending a target transformation through an inverse kinematic server running aboard Baxter, grasping the object from above, and measuring change in the wrench across his arm.  Objects are then indexed and sorted by position and density, and appropriately sorted.