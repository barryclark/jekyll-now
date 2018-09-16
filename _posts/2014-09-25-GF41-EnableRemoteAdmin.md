---
layout: post
title: Spotlight on GF 4.1 - Enable Remote Admin
excerpt: For obvious security reasons, when you install GF the remote admin capabilities are also disabled...
---

When you unzip GlassFish 4.1, the Administration user has no password set. This was introduced quite some time ago to simplify the developer experience. For obvious security reasons, the remote admin capabilities are also disabled. So the default Admin user is _'admin'_ and its password is empty.

To enable remote Admin, you should first define a password for the admin user and then enable remote admin. The trick is that the change-admin-password command is asking the admin password, in that case you should leave it empty.



`./asadmin change-admin-password`


`Enter admin user name [default: admin]>` [leave it empty to use the default value]


`Enter the admin password>` [make sure to leave this field empty]


`Enter the new admin password>` myS3cur3Passw0rd!


`Enter the new admin password again>` myS3cur3Passw0rd!`


`Command change-admin-password execute`

You can now enable the securre-admin.

`./asadmin enable-secure-admin`


`Enter admin password for user "admin">` [fill in the new password you have set]


`You must restart all running servers for the change in secure admin to take effect. Command enable-secure-admin executed successfully.`



And just restart the domain and you are all set!


`./asadmin restart-domain domain1`



The 'empty admin password' is mentionned in the initial page of the first chapter of the [Administration Guide](https://glassfish.java.net/docs/4.0/administration-guide.pdf).

*Originaly posted on [The Aquarium](https://blogs.oracle.com/theaquarium/spotlight-on-glassfish-41%3a-11-enable-remote-admin) blog.*
