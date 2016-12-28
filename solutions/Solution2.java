import java.util.HashMap;
import java.lang.System;

public class Solution2 {

	public static boolean isPermutation(String s1, String s2) {
		if (s1.length() != s2.length())
			return false;
		HashMap<Character, Integer> map = new HashMap<Character, Integer>();
		for (int i = 0; i < s1.length(); i++) {
			if (map.containsKey(s1.charAt(i)))
				map.put(s1.charAt(i), map.get(s1.charAt(i)) + 1);
			else
				map.put(s1.charAt(i), 1);
		}

		for (int i = 0; i < s2.length(); i++) {
			if (map.containsKey(s2.charAt(i)))
				map.put(s2.charAt(i), map.get(s2.charAt(i)) - 1);
			else
				return false;
			if (map.get(s2.charAt(i)) == 0)
				map.remove(s2.charAt(i));
		}

		if (map.isEmpty())
			return true;
		return false;
	}

	public static void main(String... args) {
		System.out.println(isPermutation("icecream","remiccae"));
		System.out.println(isPermutation("iceam","remiccae"));
		System.out.println(isPermutation("icecream","remagrae"));
		System.out.println(isPermutation("i","remagrae"));
	}
}
