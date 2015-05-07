---
layout: post
title: Credit Card Number Validation in VBA
date: '2012-08-23T10:48:00.001-04:00'
author: Daniel Smith
tags: 
modified_time: '2012-08-23T10:48:33.648-04:00'
blogger_id: tag:blogger.com,1999:blog-358950712929443967.post-1204031623052952471
blogger_orig_url: http://www.getabetterpic.com/2012/08/credit-card-number-validation-in-vba.html
---

In my last post, I mentioned that I created a way to validate that a credit card number was valid. I use valid here in the sense that it conforms to actual numbers issued by the credit card companies. It does not actually check to see if the card has been issued to someone. The majority of this was adapted from [here](http://adywicaksono.wordpress.com/2008/02/17/how-to-validate-credit-card-number/) where Ady Wicaksono explains in detail how it works, and a javascript implementation of it. The below code was my adaptation of that logic to VBA to validate a card number entered into an Excel dialog box.

```
Function isValidCard(inCC)  
   Dim intStartDb As Integer  
   Dim intStartNon As Integer  
     
   ' remove any non-numeric characters, such as dashes  
     
   If Mid(inCC, 1, 1) Like "[0-2,7-8]" Then GoTo ValidCardFalse  
     
   For i = 1 To Len(inCC)  
     If Mid(inCC, i, 1) Like "[0-9]" Then inCCClean = inCCClean &amp; Mid(inCC, i, 1)  
   Next  
     
   If Len(inCCClean) &lt; 11 Then  
     GoTo ValidCardFalse  
   End If  
     
   intDouble = 0  
     
   If CInt(Len(inCCClean) / 2) = Len(inCCClean) / 2 Then  
     intStartDb = 1  
     intStartNon = 2  
   Else  
     intStartDb = 2  
     intStartNon = 1  
   End If  
     
   i = 0  
   For i = intStartDb To Len(inCCClean) Step 2  
     intCheck = CInt(Mid(inCCClean, i, 1)) * 2  
     If intCheck &gt; 9 Then intCheck = intCheck - 9  
     intDouble = intDouble + intCheck  
   Next  
     
   i = 0  
   intNonDoub = 0  
   For i = intStartNon To Len(inCCClean) Step 2  
     intNonDoub = intNonDoub + CInt(Mid(inCCClean, i, 1))  
   Next  
     
   intAddCheck = intDouble + intNonDoub  
     
   If (intAddCheck / 10) = CInt(intAddCheck / 10) Then  
     isValidCard = inCCClean  
   Else  
     GoTo ValidCardFalse  
   End If  
     
 If isValidCard &lt;&gt; "" Then GoTo ValidCardTrue  
     
 ValidCardFalse:  
 isValidCard = ""  
 Exit Function  
   
 ValidCardTrue:  
 Exit Function  
     
 End Function  
```