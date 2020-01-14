---
layout: post
title: Importing Data Into SugarCRM
permalink: /general/importing-data-into-sugarcrm
post_id: 815
categories:
- General
- Import
- SugarCRM
---

Working with SugarCRM (Pro, OnDemand) last week and discovered a wonderful thing!

SugarCRM has been designed to import record ID numbers from other systems. So long as the id numbers you're importing are less than 36 characters, and are globally unique (not just unique to the entity, i.e. contacts, notes, accounts) you're in business, you can simply import the legacy record ID into the Sugar ID field (see below on how to make it globally unique).

This is a great thing. Before knowing this, and with other systems, you need to create a custom field in each entity to store the legacy ID number, import the data into that entity, then export it with the new system's ID number. You can then match up this new ID number with other data so that the relationships get maintained. This is discovery is for me a wonderful thing, others already know this as it was designed this way, but this will save me a lot of work.

One of the tips given to me by one of the SugarCRM support people was that if the ID isn't globally unique, then simply suffix it (or prefix it) with something unique for that entity. For example, if Accounts and Contacts both have an ID of "ABCD-1234" you could suffix all the Accounts record ID's with "Acct" and the Contact record ID's with "Cont". This effectively makes them globally unique. Do the same for any ID's in other entities, for example, in the Notes table, any Contact ID's would get suffixed the same way with "Cont".

Account Records Before:
- ID, AccountName:
- ABCD-1234, Doe Exports
- ABCD-4321, Joes Toes

Contact Records Before:
- ID, ContactName
- ABCD-1234, Jane Doe
- ABCD-4321, Joey Blowy

As you can see above, the ID's are unique to the entity but not globally unique (and we do want them globally unique). By suffixing the ID's we can make them globally unique as you see below:

Account Records After:
- ID, AccountName
- ABCD-1234_Acct, Doe Exports
- ABCD-4321_Acct, Joes Toes

Contact Records After:

- ID, ContactName
- ABCD-1234_Cont, Jane Doe
- ABCD-4321_Cont, Joey Blowy

This really does make it much easier import lots of data and keep the relationships between pieces of information. For example, Notes would then look like this:

Notes after:

- ID, RelatedContact, RelatedAccount, Note
- 123_Note, ABCD-1234_Cont, ABCD-1234_Acct, "Spoke with Jane re recent purchase."
- 456_Note, ABCD-4321_Cont, ABCD-4321_Acct, "Joey rang, wants to double his order."

If only it were this easy importing into other CRM's. Let me know if you have any questions about importing data into SugarCRM.
