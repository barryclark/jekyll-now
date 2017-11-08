---
layout: post
title: A Fanisation with Timing Attacks.
---

I recently attended [ScotlandPHP](https://conference.scotlandphp.co.uk/) and Booking.com Developer [Thomas Shone](https://twitter.com/thomas_shone) gave a very interesting talk regarding Security Theartre. During his talk he asked the following question.

> What is the difference between the top section, and bottom section of the code here?
```php
$password = 'letmein';
$hash = '$2y$10$O0L2alTM9M3nbHjxRKTq5eNwDfOVoSKbbUOik0XaPwZTeL2AwquOG';

// Top Section
if(crypt($password, $hash) === $hash){
	echo "Password is correct";
}

// Bottom Section
if(password_verify($password, $hash)){
	echo "Password is correct";
}
```
