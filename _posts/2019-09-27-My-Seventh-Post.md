---
layout: post
title: Learning Journal for September 27th
---
### Homework: Rewrite the following data in XML and JSON


#	First Name : Tim 
#	Last Name : Rayburn 
#	Address Line 1 : 5445 Legacy Drive 
#	Address Line 2 : Suite 100 
#	City : Plano 
#	State : TX 
#	Zip : 75024  


*** XML
<Person>
<FirstName> “Tim” </FirstName>
<LastName> “Rayburn” </LastName>
<AdressLine1> “5445\s Legacy\s Drive” </AddressLine1>
<AdressLine2> “Suite\s ” 100 </AddressLine2>
<City> “Plano”</City>
<State> “TX”</State>
<Zip>75024 </Zip>
</Person>

*** JSON 
{
“FirstName” : “Tim”,
“LastName” : “Rayburn”,
“Address Line1” : “5445 Legacy Drive”,
“Address Line2” : “Suite 100”,
“City”: “Plano”,
“State”: “TX”,
“Zip”: 75024
}
