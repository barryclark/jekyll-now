---
layout: post
title: User not owning his folder in Blackboard
date: '2012-08-22 16:00:00'
---

So, here is the deal, if for some reason you have created a bunch of users, you will almost immediately notice that they will have their own folder in the content system, usually by following the path: /users/&lt;username&gt; but if the user gets deleted, that folder will be changed the owner to system or something else, but then if the user gets recreated again, the same folder will still be own by system, so that is not good.

so here is the use case:
1. user: <strong>userA</strong> gets created in the system
2. folder: /users/**userA** gets created in the system and own with full read permissions for **userA**
3. user: **userA** gets deleted from the system
4. folder: /user/**userA** _does not get deleted_ but gets changed the owner to **system**
5. this is to prevent that the content is lost because of a user deletion
6. user: **userA** gets recreated in the system
7. folder: /user/**userA** _does not get created because it already exists_ but it _does not_ change the owner from **system** to **userA**
8. When **userA** wants to access the system and his folder or his content, he will be getting a permissions issue and will not have access to his folder.

To correct this use case, you will need to understand the query. Also you will need to uncomment the only line that is comment.
### note: RUN IT AT YOUR OWN RISK  - we are not troubleshooting but documenting this information.

<script src="https://gist.github.com/enriquemanuel/6452127.js"></script>

Please beware, like the above note stated, we are not supporting or making any changes, nor giving you the path to solve an issue, this is for documentation purposes and you should use it at your own risk.

The query without the update statement will print out a list of users who don't own their folders. this is good to have it as knowledge and see how it works.

**This query touches a lot of moving parts** and if not tested before and **back up** (without removing the commented line) you will have something that might not be working, so its always a good idea, to back up and have some where to go as a restore point which usually databases don't give you.

_With great power comes great responsability_

This documentation with nice coding can be looked at: https://gist.github.com/enriquemanuel/6452127
