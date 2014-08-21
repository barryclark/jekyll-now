---
layout: post
category : pocket-guides
tagline: "Symfony Pocket Guides"
tags : [symfony]
---
{% include JB/setup %}

In this [Pocket Guide]()
we will imagine that we have to integrate a contact form into one of our websites using Symfony2.

#### Form Requirements

+ **Form Fields.**
    Last Name, First Name, E-Mail, Phone, Street, City, Country, Postal Code
    and a Privacy Policy Checkbox.

+ **Phone Field**. All fields will be required except from the phone.

+ **Privacy Policy Checkbox.**
    It must also be checked before submitting the form.

After the customer clicks on "Submit" the following process begins:

+ It will check if the city and country match. In this case I will be using
[Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/?hl=en)
for this purpose.

+ If the previous check returns _true_,
an e-mail will be sent to the email address to verify the contact details.
This technique is known as [Confirmed opt-in (COI)](http://en.wikipedia.org/wiki/Opt-in_email).

+ If the customer verified his contact details, this will be reflected in the database.

+ Only the data from the customers who confirmed his details via email,
should be downloaded via a URL (password protected) as a CSV file.

- - -