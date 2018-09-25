When you are working as a software developer, especially at a consulting company, having multiple solution setups is not something that is unfamiliar to you. If you have been in the industry for even a small period of time you have likely installed SQL Server on your development machine to give yourself the ability to develop and test your work locally.

I would venture to guess that at some point you ended up briefly switching over to another project that may or may not need that local instance of SQL Server. However, it's installed on your machine and so there it is running in the background all the time, whether you are using it or not. If you are anything like me then you probably found this a little annoying, if not a bit wasteful. Having those resources back would be nice, right?

There are a few options to try and gain those resources back. The first being that you could uninstall it altogether. That seems the cleanliest but not all that efficient when switching back and forth between projects. The install tends to take a considerable amount of time.

The second option is to go in the Services control panel and stop and disable the services related to SQL Server that are hanging on to those resources. This option is the better of the two. It only takes a couple minutes to do and it can be reversed in just about the same amount of time. Although all the services are stopped it is still technically installed and sort of just sitting around.

While working on a project to recommend some new technologies to a client to help create solutions for a high availability system, I was introduced to containers. Long story short containers are a way to isolate an application away from the host system. Much like a VM containers run on a host, but unlike a VM do not need a separate OS installation. Containers run on top of the host operating system.

After learning about containers and how they could be created quickly and stopped and started almost instantly, I thought "I need to put my local SQL instance in a container". Here is what I did and how you can do the same.

**Install Docker**
 <a href="http://www.docker.com">www.docker.com</a>

I work on Windows so I downloaded and installed Docker for Windows

**Decide on the version of SQL Server**

There is a container for SQL Server on linux and also one for SQL Server on Windows. In my experience the Windows version is much larger and takes much longer to start up after it is all setup. My choice was with the linux version.

**Create and run a container from the image.**

Open a PowerShell windows and enter ```docker ps```. If Docker is install and running and you haven't created any other containers then this list will be empty.

Next enter this command:

```docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=+UX!kn&b7q" --name MyLinuxSQLServer -p1433:1433 -v MyDataVolume:/var/opt/mssql -d microsoft/mssql-server-linux:2017-latest```

Here is the breakdown:

+   The ```-e``` switch will add an environment variable to the container. These commands accept the EULA and set the password for the sa account. The password need to adhere to the rules for a valid SQL Server password. There is also another variable that applies to SQL Server the "MSSQL_PID" environment variable will select the edition of SQL Server to install. If this variable is not specified the default is Developer Edition.

+   The ```--name``` switch will name the container for easy access later.

+   The ```-p``` switch maps a port from the host machine to the container. The first number is the host machines port and the latter is the containers.

+   The ```-v``` switch creates a volume and mounts that volume to a folder in the container. The ```sqlvolume``` portion of the parameter is the name of the volume the value after the colon is where the volume will be mounted.

+   The ```-d``` switch is the name of the image to run in the container. This image comes from the Microsoft Docker Hub.

After executing the run command. There will be a container created with the name MyLinuxSQLServer. Listing the container with the command ```docker ps -a``` will confirm that it is created

<img class="alignnone size-full wp-image-36" src="../images/dockerpssql.png" alt="DockerPSSQl" width="1404" height="41" />

The container is not currently running. To start it just enter ```docker start MyLinuxSQLServer```.

After that is successful open SSMS and connect to localhost using sa and the sa password that was specified in the docker run command. If everything was successful you now have an empty SQL Database Server running in a container.

Go back to the PowerShell window and enter the command ```docker ps```. There should be a listing for the container.

**Commit your container to a local repository.**

One interesting thing to note with containers is that they do not automatically save state when they are stopped. So, if you login to your server and add a database and then stop and start the container you will notice that the database is no longer there. That is because docker starts that container from the exact place it was before you started making changes. If the intention is to save the changes made so that they will persist the next time the container is stopped then the container needs to be committed to a repository for later use.

Then enter ```docker commit [your local repo]/mylinuxsqlserver```. The ```[your local repo]``` part can be anything you like as long as it is lower cased.

At this point running ```docker stop [container id]``` will stop the container. Then run ```docker start MyLinuxSQLServer``` and the server will start up with the same state that existed at the last commit.

**Side note:** when executing the docker run command a volume was created. That volume will be used on successive starts of the container. Volumes are persisted on the host system and therefore survive restarts. Any data that is written to them will not be deleted when the container stops. In the context of SQL Server all databases should be created on the volume. This will ensure that the next time the container is stopped all of the data will be preserved.