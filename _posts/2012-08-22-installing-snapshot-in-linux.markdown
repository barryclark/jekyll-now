---
layout: post
title: Installing Snapshot in Linux
date: '2012-08-22 16:00:00'
---

---
## Update
**_Alert_:** This works well until Sp11, Sp12+ uses JRE 1.7 as a requirement.

---
In this tutorial, we will be installing the Snapshot Client Tool downloaded from Behind The Blackboard and installing it your LINUX machine. 
Once you have it set up,  this tool can be use  against your server. So follow the following steps and hopefully you will be having it working and maybe you can automate different things using cron.

### Pre requisites:
1. Have your Blackboard license, the file is called: blackboard-license.xml
2. Have Java 1.6 installed in your system.
3. Have the Blackboard Snapshot Client installer in your destination server with the correct version.

### Installation
Snapshot client tool: (name: *bb-client-linux-<version>.jar*)

1. If you don't have it, request it from Support
2. Download it to your machine
3. Upload it to your server
4. Verify that you have Java 1.6 installed in your server

		[root@localhost ~]# java -version
		java version "1.6.0_32"
		Java(TM) SE Runtime Environment (build 1.6.0_32-b05)
		Java HotSpot(TM) 64-Bit Server VM (build 20.7-b02, mixed mode)
5. Run the installer
`[root@localhost ~]# java -jar bb-client-linux-9.1.82223.0.jar`

**The installer will start prompting you with information as follows**

1. Installer will start prompting

		Blackboard Client 9.1.82223.0
		Page 1/3 ==== WelcomeEach prompt will attempt to provide a response in brackets.
		To accept the default, just click ENTER. To change the response,
		type the correct information at the prompt.
		ENTER to continue.

2. [action]Click Enter
3. 

		Page 2/3 ==== Blackboard destination
        
		Specify in which directory to install the Blackboard Client.
		Blackboard destination directory [/usr/local/blackboard] :

4. My suggestion is that you leave it in that folder, so type enter (without entering anything), and it should work correctly
5. **IMPORTANT -- DO NOT UPGRADE**, *DO A FRESH INSTALL, if you have another version follow the below steps.*
	* If you have another version of the tool already installed I would suggest you do the following:
    
    		[root@localhost root]# mv /usr/local/blackboard /usr/local/blackboard_9.0
(you can change 9.0 with any version that you have, this way you have olds backed up)
6. Now you will be prompted for the type of installation
7. 

		==== Installation
        The installer is performing the requested action.
        [1] Full installation
        Choose one of the available options.
8. [action] enter the number 1
9. [action] hit enter
10. 

    	Page 4/10 ==== Terms and Conditions
    	Read the following license agreement carefully.
    	BLACKBOARD� SOFTWARE LICENSE AGREEMENT
11. `ENTER` to continue or `s` to skip to the end of the license text.
12. [action] enter the letter 's'
13. [action] hit enter
14. 

		[Y] I accept the terms of the license agreement.
		[N] I do not accept the terms of the license agreement.
		Enter [Y] to accept or [N] to deny and quit.Y
15. [action] hit Y and enter.
16. Now you will be prompted for your license file (remember that you needed).
17. 

	Page 5/10 ==== License file
	Enter the location of your Blackboard license file.
	If you have not yet received a license file, contact your
	Blackboard Account Manager.
	License file :
18. Put the path where you stored the license file, in my case is root, so it will be something like:
19. [action] enter the location and license file: '/root/blackboard-license.xml'
20. If you have Java installed correctly this should be the same as always
21. 

		Page 6/10 ==== Java location
		Specify the location of your Java SDK. Java 1.6 or higher is required.
		Java location [/usr/java/jdk1.6.0_32] :
22. In my case this is the correct location, so left it blank.
23. if this is not your case, specify the correct location.
24. 

		Page 7/10 ==== Database settings
		Specify the host and domain name of the database server.
		Also, specify a server instance name if there are multiple instances or leave
		it blank to accept the default.

		Specify NONE or an empty value for the database hostname to skip database checks if you
		intend to use SOAP as the communication protocol for the Blackboard Client.

		Specify NONE or an empty value for the database identifier if multi tenancy is not enabled
		and your Blackboard server is using the &quot;bbadmin&quot; schema instead of a separate identifier.

		Database hostname [localhost]     :
25. [action] since we are connecting via SOAP, we will do "NONE"
26. [action] type "NONE" (without the quotation marks)
27. From now on you will get some Warnings, you can read and later ignore.
28. 

		[WARNING] You have not specified a database hostname; please ensure Snapshot is configured to use SOAP instead.
		Please continue to ignore these warnings or abort otherwise.
29. `Database instance name:`
30. [action] type "NONE" (without the quotation marks)
31. `Database port [1521]:`
32. [action] type "NONE" (without the quotation marks)
33. `Blackboard database user password :`
34. [action] type "NONE" (without the quotation marks)
35. `Database identifier [BBLEARN]:`
36. [action] type "NONE" (without the quotation marks)
37. 
	
    [WARNING] You have not specified a database hostname; please ensure Snapshot is configured to use SOAP instead.
	Please continue to ignore these warnings or abort otherwise.
	Page 8/9 ==== Summary
38. 

		The installer is ready to perform the requested action.

		Upon proceeding, a new Blackboard Client will be installed.
		ENTER to continue.
39. [action] hit Enter
40. 

		Page 9/9 ==== Installation
		The installer is performing the requested action.
41. 

		Installing the Blackboard Client to /usr/local/blackboard
		Do not close the window until the process is complete.
		Validating: ####################################################
		[WARNING] You have not specified a database hostname; please ensure Snapshot is configured to use SOAP instead.
		Please continue to ignore these warnings or abort otherwise.
		Extracting from "payload": ##################################################

		The Blackboard Client was successfully installed.

		Page 10/10 ==== Results
		Results
		The Blackboard Client was successfully installed.

### Done? - eh, maybe not
1. Congratulations you have successfully installed Blackboard Snapshot client tool.
2. Now you need to change the variable to correctly run it using SOAP instead of JDBC
3. Do the following:

		[root@localhost ~]# cd /usr/local/blackboard/apps/snapshot/config/
		[root@localhost config]# vi env.sh
4. find the following line (line number 55):

		CONFIG_FILE=$BBDIR/config/service-config-snapshot-jdbc.properties
5. and change it to:

		CONFIG_FILE=$BBDIR/config/service-config-snapshot-soap.properties

## Really Done? - yes! let's  test it
1. You are all set, lets do a test run
2. go to the following folder:

		[root@localhost ~]# cd /usr/local/blackboard/apps/snapshot/bin
		[root@localhost bin]# ./dsm.sh -f LIST -V <hostname> -P <integration_pwd>
3. -- you need to have your hostname and your integration password
4. if its run correctly you should get an output like the following:
5.

		Data Source Key				Description
		---------------      		-----------  
		INTERNAL                    Internal data source used for associating records that are created for use by the Bb system.             
		SYSTEM                      System data source used for associating records that are created via web browser.                        
		REPLICATED                  Replicated data source used for root administrator                  
		LMS_INTEGRATION             LMS Integration data source used for associating records that are created during integration sync operations.

and some other information, if you have already some other Data Source Keys.


## FAQ / Troubleshooting
* **I don't have the integration password?**
You can request it to your support engineer, or you should have it from your previous snapshot runs.
* **When I ran the dsm command I got "u: user bbuser does not exist"** <br />
The user bbuser does not exist, you will need to create it. Do the following:

		[root@localhost bin]# useradd -m bbuser
Also my suggestion is that this user owns the folder and everything inside Blackboard so do the following as well.

		[root@localhost bin]# chown bbuser:root -R /usr/local/blackboard
		[root@localhost bin]# chown bbuser:root -R /usr/local/blackboard/*
* **I'm getting an error, that states more like this: **

		[root@localhost bin]# ./dsm.sh -f LIST -V <hostname> -P <password>
        
		Exception during Service Initialization
		blackboard.base.InitializationException: Error registering service: Error in bb services config: Error 		initializing connection manager:blackboard.apps.bb5.db.Bb5JdbcService
		at blackboard.platform.service.ServiceManagerImpl.doInitService(ServiceManagerImpl.java:572)
		at blackboard.platform.service.ServiceManagerImpl.initServices(ServiceManagerImpl.java:263)
		at blackboard.platform.service.ServiceManagerImpl.init(ServiceManagerImpl.java:203)
		at blackboard.platform.service.ServiceManagerImpl.init(ServiceManagerImpl.java:134)
		at blackboard.platform.BbServiceManager.init(BbServiceManager.java:119)
		at blackboard.platform.ApplicationLauncher.main(ApplicationLauncher.java:148)
		Caused by: blackboard.base.InitializationException: Error in bb services config: Error initializing 		connection manager:blackboard.apps.bb5.db.Bb5JdbcService
		at blackboard.platform.service.ServiceManagerImpl$ServiceImplWrapper.(ServiceManagerImpl.java:749)
		at blackboard.platform.service.ServiceManagerImpl.registerService(ServiceManagerImpl.java:383)
		at blackboard.platform.service.ServiceManagerImpl.doInitService(ServiceManagerImpl.java:568)
		... 5 more
		Caused by: blackboard.base.InitializationException: Error initializing connection manager
		at blackboard.db.ConnectionManager.(ConnectionManager.java:214)
		at blackboard.db.BbDatabase.(BbDatabase.java:105)
		at blackboard.db.BbDatabase.registerContext(BbDatabase.java:306)
		at blackboard.db.BbDatabase.initialize(BbDatabase.java:334)
		at blackboard.apps.bb5.db.Bb5JdbcService.initializeDatabase(Bb5JdbcService.java:69)
		at blackboard.apps.bb5.db.Bb5JdbcService.serviceInit(Bb5JdbcService.java:63)
		at blackboard.platform.service.ServiceManagerImpl$ServiceImplWrapper.doInit(ServiceManagerImpl.java:771)
		at blackboard.platform.service.ServiceManagerImpl$ServiceImplWrapper.(ServiceManagerImpl.java:745)
		... 7 more
		Caused by: java.lang.Exception: Error initializing connection pool
		at blackboard.db.ConnectionManager.initConnection(ConnectionManager.java:1830)
		at blackboard.db.ConnectionManager.(ConnectionManager.java:201)
		... 14 more
		Caused by: blackboard.base.InitializationException: IO Error: The Network Adapter could not establish the 		connection
		at blackboard.db.impl.DataSourcePoolImpl.init(DataSourcePoolImpl.java:68)
		at blackboard.db.impl.DelegatingConnectionPool.init(DelegatingConnectionPool.java:37)
		at blackboard.db.impl.DelegatingConnectionPool.init(DelegatingConnectionPool.java:37)
		at blackboard.db.ConnectionManager.initPool(ConnectionManager.java:1727)
		at blackboard.db.ConnectionManager.initConnection(ConnectionManager.java:1825)
		... 15 more
		Caused by: blackboard.db.ConnectionNotAvailableException: IO Error: The Network Adapter could not establish 		the connection
		at blackboard.db.impl.DataSourcePoolImpl.getConnection(DataSourcePoolImpl.java:91)
		at blackboard.db.impl.AbstractOracleConnectionPool.getConnection(AbstractOracleConnectionPool.java:63)
		at blackboard.db.impl.AbstractOracleConnectionPool.getConnection(AbstractOracleConnectionPool.java:30)
		at blackboard.db.impl.DataSourcePoolImpl.init(DataSourcePoolImpl.java:63)
		... 19 more
		Caused by: java.sql.SQLRecoverableException: IO Error: The Network Adapter could not establish the connection
		at oracle.jdbc.driver.T4CConnection.logon(T4CConnection.java:419)
		at oracle.jdbc.driver.PhysicalConnection.(PhysicalConnection.java:536)
		at oracle.jdbc.driver.T4CConnection.(T4CConnection.java:228)
		at oracle.jdbc.driver.T4CDriverExtension.getConnection(T4CDriverExtension.java:32)
		at oracle.jdbc.driver.OracleDriver.connect(OracleDriver.java:521)
		at oracle.jdbc.pool.OracleDataSource.getPhysicalConnection(OracleDataSource.java:280)
		at oracle.jdbc.pool.OracleDataSource.getConnection(OracleDataSource.java:207)
		at oracle.jdbc.pool.OracleConnectionPoolDataSource.getPhysicalConnection(OracleConnectionPoolDataSource.		java:139)
		at oracle.jdbc.pool.OracleConnectionPoolDataSource.getPooledConnection(OracleConnectionPoolDataSource.java:88		)
		at oracle.jdbc.pool.OracleImplicitConnectionCache.makeCacheConnection(OracleImplicitConnectionCache.java:1583		)
		at oracle.jdbc.pool.OracleImplicitConnectionCache.makeOneConnection(OracleImplicitConnectionCache.java:515)
		at oracle.jdbc.pool.OracleImplicitConnectionCache.getCacheConnection(OracleImplicitConnectionCache.java:475)
		at oracle.jdbc.pool.OracleImplicitConnectionCache.getConnection(OracleImplicitConnectionCache.java:357)
		at oracle.jdbc.pool.OracleDataSource.getConnection(OracleDataSource.java:395)
		at oracle.jdbc.pool.OracleDataSource.getConnection(OracleDataSource.java:179)
		at oracle.jdbc.pool.OracleDataSource.getConnection(OracleDataSource.java:157)
		at blackboard.db.impl.DataSourcePoolImpl.getConnection(DataSourcePoolImpl.java:85)
		... 22 more
		Caused by: oracle.net.ns.NetException: The Network Adapter could not establish the connection
		at oracle.net.nt.ConnStrategy.execute(ConnStrategy.java:375)
		at oracle.net.resolver.AddrResolution.resolveAndExecute(AddrResolution.java:422)
		at oracle.net.ns.NSProtocol.establishConnection(NSProtocol.java:678)
		at oracle.net.ns.NSProtocol.connect(NSProtocol.java:238)
		at oracle.jdbc.driver.T4CConnection.connect(T4CConnection.java:1054)
		at oracle.jdbc.driver.T4CConnection.logon(T4CConnection.java:308)
		... 38 more
		Caused by: java.net.ConnectException: Connection refused
		at java.net.PlainSocketImpl.socketConnect(Native Method)
		at java.net.PlainSocketImpl.doConnect(PlainSocketImpl.java:351)
		at java.net.PlainSocketImpl.connectToAddress(PlainSocketImpl.java:213)
		at java.net.PlainSocketImpl.connect(PlainSocketImpl.java:200)
		at java.net.SocksSocketImpl.connect(SocksSocketImpl.java:366)
		at java.net.Socket.connect(Socket.java:529)
		at oracle.net.nt.TcpNTAdapter.connect(TcpNTAdapter.java:209)
		at oracle.net.nt.ConnOption.connect(ConnOption.java:123)
		at oracle.net.nt.ConnStrategy.execute(ConnStrategy.java:353)
		... 43 more
		Error initializing Blackboard services: Error registering service: Error in bb services config: Error 		initializing connection manager:blackboard.apps.bb5.db.Bb5JdbcService
		Review log for details
		Error initializing Blackboard services: Error registering service: Error in bb services config: Error 		initializing connection manager:blackboard.apps.bb5.db.Bb5JdbcService
		blackboard.base.InitializationException: Error initializing Blackboard services: Error registering service: 		Error in bb services config: Error initializing connection manager:blackboard.apps.bb5.db.Bb5JdbcService
		at blackboard.platform.service.ServiceManagerImpl.init(ServiceManagerImpl.java:232)
		at blackboard.platform.service.ServiceManagerImpl.init(ServiceManagerImpl.java:134)
		at blackboard.platform.BbServiceManager.init(BbServiceManager.java:119)
		at blackboard.platform.ApplicationLauncher.main(ApplicationLauncher.java:148)
		Caused by: blackboard.base.InitializationException: Error registering service: Error in bb services config: 		Error initializing connection manager:blackboard.apps.bb5.db.Bb5JdbcService
		at blackboard.platform.service.ServiceManagerImpl.doInitService(ServiceManagerImpl.java:572)
		at blackboard.platform.service.ServiceManagerImpl.initServices(ServiceManagerImpl.java:263)
		at blackboard.platform.service.ServiceManagerImpl.init(ServiceManagerImpl.java:203)
		... 3 more
		Caused by: blackboard.base.InitializationException: Error in bb services config: Error initializing 		connection manager:blackboard.apps.bb5.db.Bb5JdbcService
		at blackboard.platform.service.ServiceManagerImpl$ServiceImplWrapper.(ServiceManagerImpl.java:749)
		at blackboard.platform.service.ServiceManagerImpl.registerService(ServiceManagerImpl.java:383)
		at blackboard.platform.service.ServiceManagerImpl.doInitService(ServiceManagerImpl.java:568)
		... 5 more
		Caused by: blackboard.base.InitializationException: Error initializing connection manager
		at blackboard.db.ConnectionManager.(ConnectionManager.java:214)
		at blackboard.db.BbDatabase.(BbDatabase.java:105)
		at blackboard.db.BbDatabase.registerContext(BbDatabase.java:306)
		at blackboard.db.BbDatabase.initialize(BbDatabase.java:334)
		at blackboard.apps.bb5.db.Bb5JdbcService.initializeDatabase(Bb5JdbcService.java:69)
		at blackboard.apps.bb5.db.Bb5JdbcService.serviceInit(Bb5JdbcService.java:63)
		at blackboard.platform.service.ServiceManagerImpl$ServiceImplWrapper.doInit(ServiceManagerImpl.java:771)
		at blackboard.platform.service.ServiceManagerImpl$ServiceImplWrapper.(ServiceManagerImpl.java:745)
		... 7 more
		Caused by: java.lang.Exception: Error initializing connection pool
		at blackboard.db.ConnectionManager.initConnection(ConnectionManager.java:1830)
		at blackboard.db.ConnectionManager.(ConnectionManager.java:201)
		... 14 more
		Caused by: blackboard.base.InitializationException: IO Error: The Network Adapter could not establish the 		connection
		at blackboard.db.impl.DataSourcePoolImpl.init(DataSourcePoolImpl.java:68)
		at blackboard.db.impl.DelegatingConnectionPool.init(DelegatingConnectionPool.java:37)
		at blackboard.db.impl.DelegatingConnectionPool.init(DelegatingConnectionPool.java:37)
		at blackboard.db.ConnectionManager.initPool(ConnectionManager.java:1727)
		at blackboard.db.ConnectionManager.initConnection(ConnectionManager.java:1825)
		... 15 more
		Caused by: blackboard.db.ConnectionNotAvailableException: IO Error: The Network Adapter could not establish 		the connection
		at blackboard.db.impl.DataSourcePoolImpl.getConnection(DataSourcePoolImpl.java:91)
		at blackboard.db.impl.AbstractOracleConnectionPool.getConnection(AbstractOracleConnectionPool.java:63)
		at blackboard.db.impl.AbstractOracleConnectionPool.getConnection(AbstractOracleConnectionPool.java:30)
		at blackboard.db.impl.DataSourcePoolImpl.init(DataSourcePoolImpl.java:63)
		... 19 more
		Caused by: java.sql.SQLRecoverableException: IO Error: The Network Adapter could not establish the connection
		at oracle.jdbc.driver.T4CConnection.logon(T4CConnection.java:419)
		at oracle.jdbc.driver.PhysicalConnection.(PhysicalConnection.java:536)
		at oracle.jdbc.driver.T4CConnection.(T4CConnection.java:228)
		at oracle.jdbc.driver.T4CDriverExtension.getConnection(T4CDriverExtension.java:32)
		at oracle.jdbc.driver.OracleDriver.connect(OracleDriver.java:521)
		at oracle.jdbc.pool.OracleDataSource.getPhysicalConnection(OracleDataSource.java:280)
		at oracle.jdbc.pool.OracleDataSource.getConnection(OracleDataSource.java:207)
		at oracle.jdbc.pool.OracleConnectionPoolDataSource.getPhysicalConnection(OracleConnectionPoolDataSource.		java:139)
		at oracle.jdbc.pool.OracleConnectionPoolDataSource.getPooledConnection(OracleConnectionPoolDataSource.java:88		)
		at oracle.jdbc.pool.OracleImplicitConnectionCache.makeCacheConnection(OracleImplicitConnectionCache.java:1583		)
		at oracle.jdbc.pool.OracleImplicitConnectionCache.makeOneConnection(OracleImplicitConnectionCache.java:515)
		at oracle.jdbc.pool.OracleImplicitConnectionCache.getCacheConnection(OracleImplicitConnectionCache.java:475)
		at oracle.jdbc.pool.OracleImplicitConnectionCache.getConnection(OracleImplicitConnectionCache.java:357)
		at oracle.jdbc.pool.OracleDataSource.getConnection(OracleDataSource.java:395)
		at oracle.jdbc.pool.OracleDataSource.getConnection(OracleDataSource.java:179)
		at oracle.jdbc.pool.OracleDataSource.getConnection(OracleDataSource.java:157)
		at blackboard.db.impl.DataSourcePoolImpl.getConnection(DataSourcePoolImpl.java:85)
		... 22 more
		Caused by: oracle.net.ns.NetException: The Network Adapter could not establish the connection
		at oracle.net.nt.ConnStrategy.execute(ConnStrategy.java:375)
		at oracle.net.resolver.AddrResolution.resolveAndExecute(AddrResolution.java:422)
		at oracle.net.ns.NSProtocol.establishConnection(NSProtocol.java:678)
		at oracle.net.ns.NSProtocol.connect(NSProtocol.java:238)
		at oracle.jdbc.driver.T4CConnection.connect(T4CConnection.java:1054)
		at oracle.jdbc.driver.T4CConnection.logon(T4CConnection.java:308)
		... 38 more
		Caused by: java.net.ConnectException: Connection refused
		at java.net.PlainSocketImpl.socketConnect(Native Method)
		at java.net.PlainSocketImpl.doConnect(PlainSocketImpl.java:351)
		at java.net.PlainSocketImpl.connectToAddress(PlainSocketImpl.java:213)
		at java.net.PlainSocketImpl.connect(PlainSocketImpl.java:200)
		at java.net.SocksSocketImpl.connect(SocksSocketImpl.java:366)
		at java.net.Socket.connect(Socket.java:529)
		at oracle.net.nt.TcpNTAdapter.connect(TcpNTAdapter.java:209)
		at oracle.net.nt.ConnOption.connect(ConnOption.java:123)
		at oracle.net.nt.ConnStrategy.execute(ConnStrategy.java:353)
		... 43 more


A: You forgot to set it up to SOAP, refer to number 10 in the installation guide: "10. find the following line (line number 55):"

### Additional: Installation of Java 1.6 in Fedora RedHat.
if you try to install Java 1.6 it will not be so easy, because when you do:

	[root@localhost ~]# sudo yum install java
you will be getting 1.7 which is the latest version
if you search for a different version, doing the following:

	[root@localhost ~]# yum search java
you will be getting a ton of things, so that is no good, lets try to be more specific

	[root@localhost ~]# yum search java-1
	================================================ N/S Matched: java-1 ================================================
	java-1.5.0-gcj.x86_64 : JPackage runtime compatibility layer for GCJ
	java-1.5.0-gcj-devel.x86_64 : JPackage development compatibility layer for GCJ
	java-1.5.0-gcj-javadoc.x86_64 : API documentation for libgcj
	java-1.5.0-gcj-src.x86_64 : Source files for libgcj
	java-1.7.0-openjdk.i686 : OpenJDK Runtime Environment
	java-1.7.0-openjdk.x86_64 : OpenJDK Runtime Environment
	java-1.7.0-openjdk-demo.x86_64 : OpenJDK Demos
	java-1.7.0-openjdk-devel.i686 : OpenJDK Development Environment
	java-1.7.0-openjdk-devel.x86_64 : OpenJDK Development Environment
	java-1.7.0-openjdk-javadoc.noarch : OpenJDK API Documentation
	java-1.7.0-openjdk-src.x86_64 : OpenJDK Source Bundle
		
	Name and summary matches only, use "search all" for everything.

as you can see there is no Java 1.6

	[root@localhost ~]# yum search java-1-6
	Warning: No matches found for: java-1-6
	No Matches found

If you already have installed the Java 1.5, when running the package you will be getting the following error:

	[root@localhost ~]# java -jar bb-client-linux-9.1.82223.0.jar
	Error!

	You need at least Java version 1.6 to run the installer.
	However, you appear to be running version 1.5.0.

	Please run the installer with the requisite Java version.

	Aborting...

If you try to cheat the system and install Java 1.7, mine didn't work correctly.
So first I installed them:

	[root@localhost ~]# yum install java-1.7.*
	Resolving Dependencies
    --> Running transaction check
    ---> Package java-1.7.0-openjdk.x86_64 1:1.7.0.5-2.2.1.fc17.9 will be installed
    ---> Package java-1.7.0-openjdk-demo.x86_64 1:1.7.0.5-2.2.1.fc17.9 will be installed
    ---> Package java-1.7.0-openjdk-devel.x86_64 1:1.7.0.5-2.2.1.fc17.9 will be installed
    ---> Package java-1.7.0-openjdk-javadoc.noarch 1:1.7.0.5-2.2.1.fc17.9 will be installed
    ---> Package java-1.7.0-openjdk-src.x86_64 1:1.7.0.5-2.2.1.fc17.9 will be installed
    --> Finished Dependency Resolution

Then checked if it installed correctly:

	[root@localhost ~]# java -version
	#
	# A fatal error has been detected by the Java Runtime Environment:
	#
	# SIGILL (0x4) at pc=0x00007fe1b10138cb, pid=1288, tid=140607446251264
	#
	# JRE version: 7.0_05
	# Java VM: OpenJDK 64-Bit Server VM (23.0-b21 mixed mode linux-amd64 compressed oops)
	# Problematic frame:
	# j java.util.Hashtable.()V+0
	#
	# Core dump written. Default location: /root/core or core.1288
	#
	# An error report file with more information is saved as:
	# /root/hs_err_pid1288.log
	#
	# If you would like to submit a bug report, please include
	# instructions on how to reproduce the bug and visit:
	# http://icedtea.classpath.org/bugzilla
	#
	Aborted (core dumped)

So it didn't work, and after reading the documentation, Blackboard 9.1 Sp8 still only supports Java 1.6, so went to get it.

Did the following:
1. remove all Java 1.5 and 1.7
2. Followed this tutorial: http://www.ccl.net/cca/software/SOURCES/JAVA/JSDK-1.6/ which states to do the following:

1. Download the Java 1.6 version from here: http://www.oracle.com/technetwork/java/javasebusiness/downloads/java-archive-downloads-javase6-419409.html#jdk-6u32-oth-JPR" 
2. Get the `.rpm.bin` --not any other -- for your correct architecture.
3. upload it to the server
4. install a new repo

		[root@localhost ~]# cd /etc/yum.repos.d
		[root@localhost yum.repos.d]# wget http://www.jpackage.org/jpackage17.repo

5. Check if you have the correct tools to manipulate rpm and install them

		[root@localhost yum.repos.d]# rpm -qi rpm-build
		package rpm-build is not installed
6. then do:

		[root@localhost ~]# yum install rpm-build
7. Now lets give the correct permissions to the file to execute the Java

		[root@localhost ~]# chmod 755 jdk-6u32-linux-x64-rpm.bin
8. and lets install it:

		[root@localhost ~]# ./jdk-6u32-linux-x64-rpm.bin
        Unpacking...
		Checksumming...
		Extracting...
      	UnZipSFX 5.50 of 17 February 2002, by Info-ZIP (Zip-Bugs@lists.wku.edu).
      	inflating: jdk-6u32-linux-amd64.rpm
      	inflating: sun-javadb-common-10.6.2-1.1.i386.rpm
      	inflating: sun-javadb-core-10.6.2-1.1.i386.rpm
      	inflating: sun-javadb-client-10.6.2-1.1.i386.rpm
      	inflating: sun-javadb-demo-10.6.2-1.1.i386.rpm
      	inflating: sun-javadb-docs-10.6.2-1.1.i386.rpm
      	inflating: sun-javadb-javadoc-10.6.2-1.1.i386.rpm
      	Preparing... ########################################### [100%]
      	1:jdk ########################################### [100%]
      	Unpacking JAR files...
      	rt.jar...
      	jsse.jar...
      	charsets.jar...
      	tools.jar...
      	localedata.jar...
      	plugin.jar...
      	javaws.jar...
      	deploy.jar...
      	Installing JavaDB
      	Preparing... ########################################### [100%]
      	1:sun-javadb-common ########################################### [ 17%]
      	2:sun-javadb-core ########################################### [ 33%]
      	3:sun-javadb-client ########################################### [ 50%]
      	4:sun-javadb-demo ########################################### [ 67%]
      	5:sun-javadb-docs ########################################### [ 83%]
      	6:sun-javadb-javadoc ########################################### [100%]
      
      	Java(TM) SE Development Kit 6 successfully installed.
      
      	Product Registration is FREE and includes many benefits:
      	* Notification of new versions, patches, and updates
      	* Special offers on Oracle products, services and training
      	* Access to early releases and documentation
      
      	Product and system data will be collected. If your configuration supports a browser, the JDK Product Registration form will be presented. If you do not register, none of this information will be saved. You may also register your JDK later by opening the register.html file (located in the JDK installation directory) in a browser.
      
      	For more information on what data Registration collects and how it is managed and used, see: http://java.sun.com/javase/registration/JDKRegistrationPrivacy.html

		Press Enter to continue.....
      
		Done.

9. and now you are done, lets check if its installed correctly:

		[root@localhost ~]# java -version
		java version "1.6.0_32"
		Java(TM) SE Runtime Environment (build 1.6.0_32-b05)
		Java HotSpot(TM) 64-Bit Server VM (build 20.7-b02, mixed mode)


## Bum, you are done!.
Happy snapshot..
