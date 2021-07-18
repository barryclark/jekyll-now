---
layout: post
title: What makes a great test?
---

Ideally tests would be fast, reliable, easy to own, easy to maintain, etc. Let's make a list that we can use when creating, improving, or evaluating our tests.

| Name          | Definition                                                            | Notes                                          |
|---------------|-----------------------------------------------------------------------|------------------------------------------------|
| Fast          | At least 1000 test cases per second per CPU core.                     | No network, no disk, no sleeping.              |
| Reliable      | Multiple runs, with no changes, always give the same results.         | No network, no race conditions, no system prerequisites. |
| Independent   | Can run any 2 tests at the same time with no interference             | Order independent, leaves system unchanged. |
| Diagnosable   | When a test fails, it is immediately obvious why.                     | Tests are well-named and specific. Assertions are rich and informative. |
| Readable      | A human familiar with the domain (even non-programmers) can read the test name and test body and understand why this test case matters. | Code under test must use in-domain names and expose the right level of detail. |
| Organized     | If I wonder "is there a test for the for this requirement?" I can easily find the corresponding test case (or see that it does not exist). | May break the 1 test :: 1 class relationship |
| Does not impede refactoring | Does not depend on implementation details. Changing code in ways that doesn't affect visible behavior is not made harder by the need to update tests. | No mocks (except for TDA.) |
| Only runs what it's trying to test | No test helpers. No mocks. No setup that's not about this test case. | |
| 1 defect == 1 test failure | If I introduce a single defect, only a single test should fail | No n-tier architecture, no "core/common" code that is unowned or owned by a platform team. |
| Relevant | A passing test indicates that something of business value is correct and present in the system. A failing test tells us that something of business value is missing or broken. | |
| Easy to write | The test framework and tooling and language and norms all make it easy to create a new test without a lot of rigamarole. |

(You may notice a lot of overlap with "FIRST-ness".)


