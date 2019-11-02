The Test Pyramid is a popular topic, describing a good distribution of different kinds of tests. My main complaint is that it takes the design of the code being tested as fixed. That's important because what kind of test you need for a concern will depend on how the code is designed.

I've found that as the design of code improves, the kinds of tests it requires changes, and as the design approaches the ideal the Test Pyramid no longer makes sense. Instead of aiming for distribution of types of tests, we choose tests for the kind of problem they are testing for. The main categories are:

# 1. Local problems. 

Some bugs are "we knew what we wanted the code to do, but we wrote the code wrong". For these hazards, we can use:

0. Refactor to make the defect impossible
1. Compile error
2. Static analysis
3. Acceptance Microtests ← features are here

# 2. Non-local problems

Some bugs are "we thought we should interact with some dependency this way, but it turns out we need to interact with it that way." These tests give you fast-enough assurance that the code is interacting with its dependencies correctly.

- Focused Integration Tests
- Simulators
- Record-and-Playback Tests ([an example](https://jbazuzicode.blogspot.com/2017/10/fast-tests-for-integration-points.html))

# 3. Top-level orchestration

These don't execute any code, they just 

- Pipeline approvals
- 
