---
layout: post
title: Troubleshooing ActiveMQ
date: '2014-04-30 15:27:35'
---

A few days ago one of my clients at [Blackboard](http://www.blackboard.com) was having some Snapshot problems. Since the old days, Snapshot has been a very sturdy tool which most of our clients here use to automate their SIS.

Recently we introduce an improved version of the Snapshot tool using it via the UI but I'm not going to go into very much detail about that tool, since that is not this troubleshooting excercise.

### Steps
Usually when you are troubleshooting something, you can definetely start by looking at everything but everything will not tell you what you need so, lets disect this problem the best that I can.

1. Test if there are any more snapshot processes running
`$ ps -ef | grep snapshot`
2. If you see that there is more than one process, you kill it. End of the Story.
3. Then lets try to restart the services, just to kill everything in the system
`$BBHOME/tools/admin/ServiceController.sh services.restart`
4. After it completes, find out your snapshot feed file and make a smaller, only with one record, to see if it actually processes. This can be done doing the following
5. Getting the first two lines (making one record only feed file)
`head --lines=2 bigfeedfile.txt > /tmp/smallfeedfile.txt`
6.  Lets run the feed file with this small feed file (in my case the problematic seemed to be an enrollment, so we will do that)

		$BBHOME/apps/snapshot/bin/snapshot_override.sh "-Ddata.source.key=SYSTEM" -f ENR_MANUAL -C $BBHOME/apps/snapshot/data/snapshot.properties -t /tmp/smallfeedfile.txt
7.  If this file doesn't process in less than 1 minute, you can kill the process.
8. If it ran correctly, then there is no need to continue, but in my case it actually was failing over an over again, so we look at the Stack trace to see what was going on.
9. Got the `pid` of the `snapshot process` and ran the following:

	jstack pid 
10. Which in many of the things provided us the following:
<pre class="language-bash"><code>Thread 22246: (state = BLOCKED)
			- java.lang.Object.wait(long) @bci=0 (Interpreted frame)
    		- org.apache.activemq.transport.failover.FailoverTransport.oneway(java.lang.Object) @bci=361, line=600 (Interpreted frame)
		    - org.apache.activemq.transport.TransportFilter.oneway(java.lang.Object) @bci=5, line=85 (Interpreted frame)
		    - org.apache.activemq.transport.MutexTransport.oneway(java.lang.Object) @bci=12, line=68 (Interpreted frame)
		    - org.apache.activemq.transport.ResponseCorrelator.asyncRequest(java.lang.Object, org.apache.activemq.transport.ResponseCallback) @bci=123, line=81 (Interpreted frame)
		    - org.apache.activemq.transport.ResponseCorrelator.request(java.lang.Object) @bci=3, line=86 (Interpreted frame)
		    - org.apache.activemq.ActiveMQConnection.syncSendPacket(org.apache.activemq.command.Command) @bci=20, line=1366 (Interpreted frame)
			- org.apache.activemq.ActiveMQConnection.ensureConnectionInfoSent() @bci=75, line=1481 (Interpreted frame)
			- org.apache.activemq.ActiveMQConnection.start() @bci=5, line=516 (Interpreted frame)
			- blackboard.platform.messagequeue.impl.activemq.ActiveMQConnectionPool$ActiveMQConnectionObjectFactory.activateObject(java.lang.Object) @bci=6, line=160 (Interpreted frame)
			- org.apache.commons.pool.impl.StackObjectPool.borrowObject() @bci=94, line=158 (Interpreted frame)
			- blackboard.platform.messagequeue.impl.activemq.ActiveMQConnectionPool.get() @bci=4, line=106 (Interpreted frame)
			- blackboard.platform.messagequeue.impl.activemq.ActiveMQMessageQueue$1.run() @bci=13, line=77 (Interpreted frame)
			- java.security.AccessController.doPrivileged(java.security.PrivilegedExceptionAction) @bci=0 (Interpreted frame)
			- blackboard.platform.messagequeue.impl.activemq.ActiveMQMessageQueue.sendMessage(blackboard.platform.messagequeue.MessageQueueMessage) @bci=9, line=64 (Interpreted frame)
			- blackboard.platform.batch.enroll.PostBatchEnrollMessageHandler.submit(java.util.Set, boolean) @bci=32, line=55 (Interpreted frame)
			- blackboard.admin.snapshot.persist.impl.SnapshotDbPersister.sendPostEnrollmentEvents(java.util.Set) @bci=2, line=288 (Interpreted frame)
			- blackboard.admin.snapshot.persist.impl.SnapshotDbPersister.sendPostEnrollmentEvents(java.util.List) @bci=7, line=272 (Interpreted frame)
			- blackboard.admin.persist.course.impl.EnrollmentDbPersister.save(java.util.List, java.lang.String) @bci=24, line=144 (Interpreted frame)
			- blackboard.admin.snapshot.authority.Authority.delegatePersistence(java.util.List) @bci=70, line=413 (Interpreted frame)
			- blackboard.admin.snapshot.authority.Authority.commit() @bci=54, line=742 (Interpreted frame)
			- blackboard.admin.snapshot.serialize.Parser.execute() @bci=357, line=199 (Interpreted frame)
			- blackboard.admin.snapshot.authority.Authority.execute() @bci=90, line=268 (Interpreted frame)
			- blackboard.apps.snapshot.SnapshotApplication.execute() @bci=229, line=257 (Interpreted frame)
			- blackboard.platform.ApplicationLauncher.main(java.lang.String[]) @bci=600, line=175 (Interpreted frame)</code></pre>
11. this actually tells us in the first few lines that we are blocked and ActiveMQ is trying to communicate but simply can't. So lets start with the second part.

#### ActiveMQ verification
Since we now know that the ActiveMQ is kind of working but having issues communicating we need to know where and what to look at. Since there isn't much of a manual, lets try to cover all the basis.

1. Database verification that is running. 
1.1. We run the following query 

		select pk1,node_id,last_seen,(sysdate - last_seen) * 24 * 60 * 60 as seconds_old 
        from peer_service 
        where service_id='activemq_broker';
1.2. This should return only one as activemq_broker with seconds few seconds and always going small
1.3. Second Query verification:

		select node_id,service_id,payload 
        from peer_service 
        where inactive_ind='N';
This query should return something like:

		NODE_ID                                  SERVICE_ID           PAYLOAD
		---------------------------------------- -------------------- --------------------------------------------------
		app04name.mhint:6903    ehcache_rmi          //app04name.mhint:38528
		app03name.mhint:29455   activemq_broker      nio://app03name.mhint:61616
		app03name.mhint:29455   ehcache_rmi          //app03name.mhint:60095
		app01name.mhint:24774   ehcache_rmi          //app01name.mhint:26113
		app02name.mhint:27764   ehcache_rmi          //app02name.mhint:37946
1.4. As you can see there is only one activemq_broker in the service id column.

With this we have configured that the Database has everything configured correctly.
2. Now lets check the Application Server
2.1. On the application server that is the activemq broker go in it and check if the port is correct by doing: `netstat -lnp | grep 61616` This should return correct for only that application server.
2.2. From any other application server try to connect via telnet to that application server doing: 

		 telnet apcprd-100367-57480-app15 61616
		 telnet apcprd-100367-57480-app15.mhint 61616
if You can, then there is correct communication, if not, then there is a bad routing problem. **IMPORTANT: Aha! moment**
2.3. This moment, you just realize that there is a problem communicating that it can be:
`Firewall` or `Connectivity` or `Host files`

Since we are in MH we know that there is no firewall between application servers, that the connectivity is there due to the logs that shows it, so checking the Host files, actually was the answer here.

### Solution
In my particular use case, I found that the problem was in the Host file.

		#
		# Cluster IP addresses for ActiveMQ - <YOUR NAME HERE> <DATE>
		#
		XXXX.XXXX.XXXX.XXXX app01 app01 app01name.blackboard.com
		XXXX.XXXX.XXXX.XXXX app02 app02 app02name app02name.blackboard.com
		XXXX.XXXX.XXXX.XXXX app03 app03 app03name app03name.blackboard.com

In my case I actually saw that there were inconsistencies in the IP's and in the name and machine names, so I actually edit it to look to the following:

		XXXX.XXXX.XXXX.XXXX app01 app01name.mhint app01name.blackboard.com
		XXXX.XXXX.XXXX.XXXX app02 app02name.mhint app02name.blackboard.com
		XXXX.XXXX.XXXX.XXXX app03 app03name.mhint app03name.blackboard.com
		XXXX.XXXX.XXXX.XXXX app04 app04name.mhint app04name.blackboard.com
		XXXX.XXXX.XXXX.XXXX app05 app05name.mhint app05name.blackboard.com
		XXXX.XXXX.XXXX.XXXX app06 app06name.mhint app06name.blackboard.com
        
I have removed the Ips and the machine name for security purposes but at the end, there were more application servers, different IPs and added the internal machine name that appeared in the Database. After doing this, I re ran the Snapshot and it actually completed in a few seconds.

**Problem Solved**.