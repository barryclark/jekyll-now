---
published: false
---
## Installing YAMon on DD-WRT

I'd like to briefly go over the installation process of **YAMon** on **DD-WRT**. 

The router I'm using for this is a **TP-Link AC1750**, which is running **DD-WRT v3.0-r30731 std (10/06/16)**. 

This guide assumes you are configuring from a Windows system, so if you are using a \*nix system, just substitute the proper \*nix tools in place of **WinSCP** and **PuTTY**.

**Things you will need**:
- **Router running DD-WRT**
2. **USB Drive**
3. [Installer Script for YAMon v3.3.0](http://usage-monitoring.com/current/YAMon3/install%20(3.3.0%29.zip)
4. [WinSCP](https://winscp.net/eng/download.php)
5. [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) **For Windows Users**

### Prepare USB Drive
Your USB Drive needs to be formatted as ext4. There are several ways to do this, if you aren't familiar with this process. Ideally, you're using a \*nix system and can use **GParted**. Alternatively, you can make a [GParted Live USB](http://gparted.org/download.php), or if you absolutely must use Windows, [MiniTool Partition Wizard](https://www.partitionwizard.com/download.html).

### Configure DD-WRT
Once your USB Drive is formatted as ext 4, connect it to your router. 

Login to your router and navigate to the Services tab and the USB sub-tab. 

####Ensure the following services are enabled:
- **Core USB Support**
2. **USB Storage Support**
3. **Automatic Drive Mount**

![DD-WRT-1]({{site.baseurl}}//images/dd-wrt-1.png)

####Save, Apply Settings, and Reboot the router:
![DD-WRT-4]({{site.baseurl}}///images/dd-wrt-4.PNG)

####Find the UUID for the USB Drive attached to the router:
![DD-WRT-3]({{site.baseurl}}///images/dd-wrt-3.png)

####Copy the UUID for the USB Drive into the "Mount this Partition to /opt" field:
![DD-WRT-2]({{site.baseurl}}///images/dd-wrt-2.png)

####Save, Apply Settings, and Reboot the router:
![DD-WRT-4]({{site.baseurl}}///images/dd-wrt-4.PNG)

####Verify that USB Drive is Mounted to /opt
![DD-WRT-6]({{site.baseurl}}///images/dd-wrt-6.PNG)

####Navigate to Services tab and the Services sub-tab, then enable SSHd.
![DD-WRT-5]({{site.baseurl}}///images/dd-wrt-5.PNG)

###Install YAMon
Download the YAMon installer script from the link above, expand the zip file, and copy "install.sh" to a local directory. 

####Launch WinSCP and configure with the following:
- **Set the File protocol to SCP**
2. **Set Host name to your Router's Local IP Address**
3. **Set Port number to 22**
4. **Set User name to root**
5. **Set Password to your Router's login password**
![DD-WRT-7]({{site.baseurl}}///images/dd-wrt-7.PNG)

####Login and navigate to the opt folder, then copy "install.sh" to your router.

####Using the same credentials, launch PuTTY and SSH into the router.

####At the prompt run the following commands:
- **\`chmod 775 /opt/install.sh\`**
2. **\`/opt/install.sh\`**
![DD-WRT-8]({{site.baseurl}}///images/dd-wrt-8.PNG)

####Follow the on-screen instructions to configure YAMon.
For default settings press enter at every prompt. 
Once configured you can access YAMon at **http://<router_ip>/user/index.html**

