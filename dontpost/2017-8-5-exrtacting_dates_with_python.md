---
layout: post
title: Extracting dates from text with Python
---


For years, we want to look for either two or four digits. The easy way to do this is \d{2,4}, but this also allows for 3 digits. One way to require exactly two or four is to require two digits and allow that either one or two times: (\d{2}){1,2}

However, I ended up going with ([18-20]?\d{2})


This algorithm assumes years with only two digits are from the 1900's.



Best way to find days: ([0-3]?\d)
Best way to find numeric months: ([0]?\d|[1][0-2])
Best way to find written month: (Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sept?(?:ember)?|Oct('
            '?:ober)?|Nov(?:ember)?|Dec(?:ember)?).?
Best way to find years: ([1-2]\d{3}|\d{2})

*Look for dates in international format?



text = ['04/30/2009', '06/20/95', '8/2/69', '1/25/2011', '9/3/2002', '4-13-82', 'Mar-02-2009', 'Jan 20, 1974', 
        'March 20, 1990', 'Dec. 21, 2001', 'May 25 2009', '01 Mar 2002', '2 April 2003', '20 Aug. 2004',
        '20 November, 1993', 'Aug 10th, 1994', 'Sept 1st, 2005', 'Feb. 22nd, 1988', 'Sept 2002', 'Sep 2002',
        'December, 1998', 'Oct. 2000', '6/2008', '12/2001', '1998', '2002']




One thing this still doesn't do is look for dates with international format. One would to do that would be to look for dates where is "month" is greater than 12 and automatically flip the month with the day. But this causes problems. Obviously, it missing ambiguous dates, such as 5/4/2016 - is that the 4th of May or the 5th of April? More concerning, however, is if you automatically flipped the day and the month, you would not get an error message that other dates may be incorrect as well. That's why it's best not ot automatically flip these dates, but instead to warn the user that some dates may be in a non-US format.