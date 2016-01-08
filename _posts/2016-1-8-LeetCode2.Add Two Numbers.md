---
layout: post
title: LeetCode 题解1：Add Two Numbers
---


> You are given two linked lists representing two non-negative numbers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

> Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
> Output: 7 -> 0 -> 8


## 题解

首先想到把这个链表转换成String，在转换成Integer，不过脱离了原题考察链表知识的本意，也忽略了Integer的上限。直接用和链表有关的知识即可，注意细节

代码如下:

	public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        
        int carry = 0;
		ListNode tail = new ListNode(0);
		ListNode ptr = tail;
		
		while (l1 != null || l2 != null) {

			int val1 = 0;
			if (l1 != null) {
				val1 = l1.val;
				l1 = l1.next;
			}
			
			int val2 = 0;
			if (l2 != null) {
				val2 = l2.val;
				l2 = l2.next;
			}
			
			
			int temp_sum = val1 + val2 + carry;
			ptr.next = new ListNode(temp_sum % 10);
			carry = temp_sum / 10;
			ptr = ptr.next;
			
		    if(carry == 1)
                ptr.next = new ListNode(1);  
		}
		
	
		
		return tail.next;

    }

