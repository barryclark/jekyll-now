---
published: false
---
## Installing YAMon on DD-WRT

I'd like to briefly go over the installation process of **YAMon** on **DD-WRT**. 

The router I'm using for this is a **TP-Link AC1750**, which is running **DD-WRT v3.0-r30731 std (10/06/16)**. 

**Things you will need**:
- **Router running DD-WRT**
2. **USB Drive**
3. [Installer Script for YAMon v3.3.0](http://usage-monitoring.com/current/YAMon3/install%20(3.3.0%29.zip)
4. [WinSCP](https://winscp.net/eng/download.php)
5. [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)

### Prepare USB Drive
Your USB Drive needs to be formatted as ext4. There are several ways to do this, if you aren't familiar with this process. Ideally, you're using a \*nix system and can use **GParted**. Alternatively, you can make a [GParted Live USB](http://gparted.org/download.php), or if you absolutely must use Windows, [MiniTool Partition Wizard](https://www.partitionwizard.com/download.html).

### Configure DD-WRT
Once your USB Drive is formatted as ext 4, connect it to your router. 

Login to your router and navigate to the Services tab and the USB sub-tab. 

![]({{site.baseurl}}//images/dd-wrt-1.png)


