

Of the many, many, _many_ [bad things about passwords][1], you know what the worst is? Password rules.

Let this pledge be duly noted on the permanent record of the Internet. I don't know if there's an afterlife, but I'll be finding out soon enough, and I plan to go out _mad as hell_.

> If we don't solve the password problem for users in my lifetime I am gonna haunt you from beyond the grave as a ghost [https://imgur.com/bmk7iMD][2]

The world is absolutely awash in terrible password rules:

But I don't need to tell you this. The more likely you are to use a truly random password generation tool, like us über-geeks are supposed to, the more likely you have suffered mightily – and daily – under this regime.

Have you seen the classic XKCD [about passwords][4]?

![To anyone who understands information theory and security and is in an infuriating argument with someone who does not \(possibly involving mixed case\), I sincerely apologize.][5]

We [can certainly debate][6] whether "correct horse battery staple" is a viable password strategy or not, but the argument here is mostly that _length matters_.

![That's What She Said][7]

No, seriously, it does. I'll go so far as to say [your password is too damn short][8]. These days, given the state of cloud computing and GPU password hash cracking, any password of 8 characters or less is perilously close to _no password at all_.

So then perhaps we have one rule, that **passwords must not be short**. A long password is much more likely to be secure than a short one … right?

What about this four character password?

What about this eight character password?

Or this (hypothetical, but all too real) seven character password?

> [@codinghorror][9] I'm sorry but your password must contain 1 char each from: Arabic, Chinese, Thai, Korean, Klingon, Wingdings and an emoji

You may also be surprised, if you paste the above four Unicode emojis into your favorite login dialog (go ahead – try it), to discover that it … _isn't_ in fact four characters.

![][11]

Oh dear.
    
    
    "💩".length === 2
    

Our old pal Unicode [strikes again][12].

As it turns out, even the simple rule that "your password must be of reasonable length" … ain't necessarily so. Particularly if we stop thinking like [Ugly ASCII Americans][13].

And what of those nice, long passwords? Are they _always_ secure?
    
    
    aaaaaaaaaaaaaaaaaaa
    0123456789012345689
    passwordpassword
    usernamepassword
    

Of course not, because _have you met any users lately?_

![I changed all my passwords to "incorrect"][14]

They consistently ruin every piece of software I've ever written. Yes, yes, I know you, Mr. or Ms. über-geek, know _all_ about the concept of entropy. But expressing your love of entropy as terrible, idiosyncratic password rules …

* must contain uppercase
* must contain lowercase
* must contain a number
* must contain a special character

… is a spectacular failure of imagination in a world of Unicode and Emoji.

As we built [Discourse][15], I discovered that [the login dialog was a remarkably complex piece of software][16], despite its surface simplicity. The primary password rule we used was also the simplest one: **length**. Since I wrote that, we've already increased our minimum password default length from 8 to 10 characters. And if you happen to be an admin or moderator, we decided the minimum has to be even more, **15** characters.

I also advocated **checking passwords against the 100,000 most common passwords**. If you look at [10 million passwords from data breaches in 2016][17], you'll find the top 25 most used passwords are:

| ----- |
|  `123456`  
`123456789`  
`qwerty`  
`12345678`  
`111111`  
`1234567890`  
`1234567`  
`password`  
`123123`  
`987654321`  
`qwertyuiop`  
`mynoob`  
 |  `123321`  
`666666`  
`18atcskd2w`  
`7777777`  
`1q2w3e4r`  
`654321`  
`555555`  
`3rjs1la7qe`  
`google`  
`1q2w3e4r5t`  
`123qwe`  
`zxcvbnm`  
`1q2w3e`  
 | 

Even this data betrays some ASCII-centrism. The numbers are the same in any culture I suppose, but I find it hard to believe the average Chinese person will ever choose the passwords "password", "quertyuiop", or "mynoob". So this list _has_ to be customizable, localizable.

(One interesting idea is to search for common shorter password matches inside longer passwords, but I think this would cause too many false positives.)

If you examine the data, this also turns into an argument in favor of password length. Note that only 5 of the top 25 passwords are 10 characters, so if we require 10 character passwords, we've already reduced our exposure to the most common passwords by 80%. I saw this originally when I [gathered millions and millions of leaked passwords for Discourse research][18], then filtered the list down to just those passwords reflecting our new minimum requirement of 10 characters or more.

![][19]

It suddenly became a _tiny_ list. (If you've done similar common password research, please do share your results in the comments.)

I'd like to offer the following common sense advice to my fellow developers:

#### 1\. Password rules are bullshit

* They don't work.
* They heavily penalize your ideal audience, people that use real random password generators. Hey guess what, that password randomly _didn't_ have a number or symbol in it. I just double checked my math textbook, and yep, it's possible. I'm pretty sure.
* They frustrate average users, who then become uncooperative and use "creative" workarounds that make their passwords _less_ secure.
* They are often wrong, in the sense that the rules chosen are grossly incomplete and/or insane, per the many shaming links I've shared above.
* Seriously, for the _love of God_, stop with this arbitrary password rule nonsense already. If you won't take my word for it, read [this 2016 NIST password rules recommendation][20]. It's right there, "no composition rules". However, I do see one error, it should have said "no _bullshit_ composition rules".

#### 2\. Enforce a minimum _Unicode_ password length

One rule is at least easy to remember, understand, and enforce. This is the proverbial one rule to bring them all, and in the darkness bind them.

![][21]

* It's simple. Users can count. Most of them, anyway.
* It works. The data _shows us_ it works; just download any common password list of your choice and group by password length.
* The math doesn't lie. All other things being equal, a longer password _will_ be more random – and thus more secure – than a short password.
* Accept that even this one rule isn't inviolate. A minimum password length of 6 on a Chinese site _might_ be perfectly reasonable. A 20 character password _can_ be ridiculously insecure.
* If you don't allow (almost) every single unicode character in the password input field, you are probably doing it wrong.
* It's a bit of an implementation detail, but make sure _maximum_ password length is reasonable as well.

#### 3\. Check for common passwords

As I've already noted, the definition of "common" depends on your audience, and language, but it is a terrible disservice to users when you let them choose passwords that exist in the list of 10k, 100k, or million most common known passwords from data breaches. There's _no question_ that a hacker will submit these common passwords in a hack attempt – and it's shocking how far you can get, even with aggressive password attempt rate limiting, using [just the 1,000 most common passwords][22].

* 1.6% have a password from the top 10 passwords
* 4.4% have a password from the top 100 passwords
* 9.7% have a password from the top 500 passwords
* 13.2% have a password from the top 1,000 passwords
* 30% have a password from the top 10,000 passwords

Lucky you, there are millions and millions of real breached password lists out there to sift through. It is sort of fun to do data forensics, because these aren't hypothetical synthetic Jack the Ripper password rules some bored programmer dreamed up, these are _real_ passwords used by _real_ users.

Do the research. Collect the data. Protect your users from themselves.

#### 4\. Check for basic entropy

No need to get fancy here; pick the measure of entropy that satisfies you deep in the truthiness of your gut. But remember you have to be able to _explain_ it to users when they fail the check, too.

![entropy visualized][23]

I had a bit of a sad when I realized that we were perfectly fine with users selecting a 10 character password that was literally "aaaaaaaaaa". In my opinion, the simplest way to do this is to ensure that there are at least (x) unique characters out of (y) total characters. And that's what we do as of the current beta version of Discourse. But I'd love your ideas in the comments, too. The simpler and clearer the better!

#### 5\. Check for special case passwords

I'm embarrassed to admit that when building the Discourse login, [as I discussed in The God Login][16], we missed two common cases that you really _have_ to block:

* password equal to username
* password equal to email address

🤦 If you are using Discourse versions earlier than 1.4, I'm so sorry and _please upgrade immediately_.

Similarly, you might also want to block other special cases like

* password equal to URL or domain of website
* password equal to app name

In short, try to think outside the password input box, like a user would.

> 🔔 **Clarification**
> 
> A few people have interpreted this post as "all the _other_ password rules are bullshit, except these four I will now list." That's not what I'm trying to say here.
> 
> The idea is to focus on the one understandable, simple, practical, works-in-real-life-in-every-situation rule: **length**. Users can enter (almost) anything, in proper Unicode, _provided it's long enough_. That's the **one rule to bind them all** that we need to teach users: length!
> 
> Items #3 through #5 are more like genie-special-exception checks, a [you can't wish for infinite wishes][24] kind of thing. It doesn't need to be discussed up front because it _should_ be really rare. Yes, you must stop users from having comically bad passwords that equal their username, or `aaaaaaaaaaa` or `0123456789`, but only as post-entry checks, not as rules that need to be explained in advance.
> 
> So TL;DR: one rule. Length. Enter whatever you want, just make sure it's long enough to be a reasonable password.

[1]: https://blog.codinghorror.com/the-dirty-truth-about-web-passwords/
[2]: https://imgur.com/bmk7iMD
[3]: https://twitter.com/codinghorror/status/631238409269309440
[4]: https://xkcd.com/936/
[5]: https://blog.codinghorror.com/content/images/2017/03/password_strength.png
[6]: https://security.stackexchange.com/questions/6095/xkcd-936-short-complex-password-or-long-dictionary-passphrase
[7]: https://blog.codinghorror.com/content/images/2017/03/twss.jpg
[8]: https://blog.codinghorror.com/your-password-is-too-damn-short/
[9]: https://twitter.com/codinghorror
[10]: https://twitter.com/FinleyCreative/status/705349059217784833
[11]: https://blog.codinghorror.com/content/images/2017/03/discourse-login-emoji-password.png
[12]: http://blog.jonnew.com/posts/poo-dot-length-equals-two
[13]: https://blog.codinghorror.com/the-ugly-american-programmer/
[14]: https://blog.codinghorror.com/content/images/2017/03/incorrect-password.jpg
[15]: https://discourse.org
[16]: https://blog.codinghorror.com/the-god-login/
[17]: https://blog.keepersecurity.com/2017/01/13/most-common-passwords-of-2016-research-study/
[18]: https://github.com/danielmiessler/SecLists/tree/master/Passwords
[19]: https://blog.codinghorror.com/content/images/2017/03/top-million-common-passwords-by-length.png
[20]: https://nakedsecurity.sophos.com/2016/08/18/nists-new-password-rules-what-you-need-to-know/
[21]: https://blog.codinghorror.com/content/images/2017/03/one-donut-to-bind-them-all.jpg
[22]: https://xato.net/10-000-top-passwords-6d6380716fe0
[23]: https://blog.codinghorror.com/content/images/2017/03/entropy2.png
[24]: https://www.youtube.com/watch?v=Bwic3hJ4q1A
[25]: http://careers.stackoverflow.com/products
