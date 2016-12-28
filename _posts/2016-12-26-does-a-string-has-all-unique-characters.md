---
layout: post
title: 1. Implement an algorithm to determine if a string has all unique characters
date: 2016-12-26
---

## Tests

```markdown
hasAllUniaqueChar("");
hasAllUniaqueChar("aba");
hasAllUniaqueChar("agrb");
```

### Solution

```markdown
import java.util.HashSet;
import java.lang.System;

public class Solution1 {

	public boolean hasAllUniqueChar(String s)
	{
		if (s == "")
			return false;
		HashSet<Character> set = new HashSet<Character>();
		for (int i = 0; i < s.length(); i++) {
		  if (set.contains(s.charAt(i)))
		    return false;
		  else
		    set.add(s.charAt(i));
		}
		return true;
	}

	public static void main(String... args) {
		Solution1 s1 = new Solution1();
		System.out.println(s1.hasAllUniqueChar(""));
		System.out.println(s1.hasAllUniqueChar("aba"));
		System.out.println(s1.hasAllUniqueChar("agrb"));
	}

}

```

### Conclusion
something could go here

