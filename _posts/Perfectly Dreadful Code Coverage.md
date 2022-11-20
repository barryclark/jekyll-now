---
layout: post
title: Perfect, Terrible Code Coverage with record/replay spies
---

Do you wish your code had better test coverage, but it's hard to test? Here's how to get perfect test coverage, fast, and hate it forever.

# Record/replay spies

Imagine a tool that will inject spies that record every function call with every argument and return value. 

We manually execute scenarios we care about, generating that record.

We then switch the tool from "record" to "replay and verify". The tool calls each function in the recording, passing the same arguments and asserting the same return values, faking out each outgoing call with the pre-recorded data. Such test coverage!

# Example

To clarify what I mean here's an example in Python, but this isn't a Python-specific technique; it's straightforward to apply in most dynamic languages, and can be applied in other langauges with a bit more effort.

```
def main():
	notify(message=f"Jay was awesome on {datetime.date.today()}}.")

def notify(message):
	requests.post(
		"https://api.billio.com/sms",
		json={
			"receivers": config.receivers,
			"message": message,
		}
	)
	twillio.send_sms(message)
	
if __name__ == "__main__":
	main()
```

Running this program in record mode would generate records like this:

```
[
	{
		"name": "main",
		"args": [],
		"calls": [
			{
				"name": "notify",
				"args": [
					"message": {
						"type": "str",
						"value": "Jay was awesome on 2022-02-02."
					}
				],
				"calls": [
					"name": "requests.post",
					"args": [
						"name": "receivers",
...
```

In replay-and-verify mode it would call `main` and assert that it calls `notify` with the same arguments, but instead of calling `notify` the tool short-circuits the call. Do something similar for `notify`, but instead of actually sending an SMS it short-circuits the HTTP call as well.

With this approach, you can get just about any code under test in very little time. If you can execute a scenario once, you have tests for that scenario that will work. You could have 99% test coverage in minutes. These tests would be very reliable, with no actual dependence on variable external systems. These tests also avoid the problem os of hand-coded mocks that incorrectly represent the behavior of the thing they mock - all the "fake" behaviors are real behaviors from history.

# This is a terrible idea.

These tests would make it impossible to refactor your program except for those refactorings that are wholly constrained to the body of a function. You could rename local variables. You might be able to reorder statements, as long as those statements don't involve function calls. But you couldn't rename a function, or reorder parameters, or inline a function.

This illustrates the principle that tests pin down certain aspects of our programs; we should be careful to ensure that they only pin down the aspects that are business-important, and not pin implementation details. (This is the other problem with mocks - they tend to pin down "what function did I call?" not "does the program do what stakeholders care about?").

# A related alternative

Instead of pinning every function call, pin only the functions on the perimeter - calls into and outside of the code my team owns.

Now I have good protection for refactoring, without tests getting in the way by pinning implementation details.

These tests are probably throwaway - they lack the other [Characteristics of Ideal Tests](https://jay.bazuzi.com/Characteristics-of-Ideal-Tests/) but we can use them to make refactoring safer, especially in languages that lack great refactoring tools (like Python and JavaScript).
