---
layout: post
title: LeetCode 题解3：Longest Substring Without Repeating Characters
---


> Given a string, find the length of the longest substring without repeating characters. For example, the longest substring without repeating letters for "abcabcbb" is "abc", which the length is 3. For "bbbbb" the longest substring is "b", with the length of 1.


## 题解

设定两个变量:low和high，能够指定最长无重复字母子字符串的范围。另外设定一个HashMap（键为Char，值为该Char对应的下标）。
high不断向前走，每一步判断high对应的字母是否出现在HashMap中
1. 出现过，折high对应的字母在HashMap中的值为char_index,则先将HashMap中值在low和char_index之间的数据全部删除，low变为char_index的下一个。同时向HashMap中加入high
2. 没出现，则向HashMap中加数据，同时更新最大值.

Java代码如下: 

	public int lengthOfLongestSubstring(String s) {
        
        int max_length = 0;
		
		int low = 0;
		int high = 0;
		
		HashMap<Character, Integer> map = new HashMap<Character, Integer>();
		
		while ( high != s.length() ) {
			
			Integer char_index = map.get( s.charAt(high) );
			
			if (char_index == null) {
				map.put(s.charAt(high), high);
				
				if (high - low + 1 > max_length)
					max_length = high - low + 1;
			}
			
			else {
				for (int i = low; i < char_index; i++)
					map.remove( s.charAt(i) );
				
				low = char_index + 1;
				map.put(s.charAt(high), high);
			}
			
			high++;
		}
		
		return max_length;
    }
