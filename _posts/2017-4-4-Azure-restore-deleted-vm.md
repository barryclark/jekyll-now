---
layout: post
title: "Azure: Restore a deleted VM"
image: /images/azure/azure-microsoft.png
---

Have been using AWS and DO for the past few years, I have some struggles when moving to Azure. For one thing, even with the new portal, Azure's UI is still clustering and quite hard to navigate around, let alone using any short cut.

And so naturally I've made mistake, deleted a wrong VM and it disappeared in a few seconds. Only then I've realized how stupid that was! On DO, it was supremely easy to just restore a VM or even AWS given that you have the backup set up or made snapshot prior to that. Azure ? I've got to search all over the place. Most results show how to do it with PowerShell, but I am on Mac.

Finally, really glad that I've found this [repo](https://github.com/Azure/azure-quickstart-templates/), which contains a list of Azure pre-made templates. Also as it turned out, Azure keeps the OS disk of the VM separately in the storage account. So we can still create another VM with it.

So here is how to restore a deleted VM:

**1. Find the correct disk image that stored your VM image, copy the VHD Uri**

  - Check on all your storage account to find the correct disk image for your VM. This could be a bit tricky if you have a lot of VMs since the name may not be descriptive the first time you created.
  ![](/images/2017/03/storage-acc.png)
  ![](/images/2017/03/storage-acc-2.png)
  - Find the correct vhd by looking at the name and modified time. Then copy the VHD url for later use
  ![](/images/2017/03/storage-acc-3.png)
  ![](/images/2017/03/storage-acc-4.png)

**2. Next use the template to create VM from the VHD image.**   
Depend on whether you want to create a new VNET or not, you can choose between [this template](https://github.com/Azure/azure-quickstart-templates/tree/master/201-vm-specialized-vhd-existing-vnet) and [this other template](https://github.com/Azure/azure-quickstart-templates/tree/master/201-vm-specialized-vhd).  
Just click **Deploy to Azure** while already signed in to Azure and it will create a form for you to fill in and create the VM such as follow

![](/images/azure/Microsoft-Azure-Deploy.png)

Fill in the Vhd Uri obtained above and the rest of the necessary fields. Now, if you create a VM directly from a official image, that's it, you have your VM back. 

But in my case I was using a third party image from Bitnami and there goes another error. It was along the line of:
{% highlight ruby %}
The resource operation completed with terminal provisioning state 'Failed'
Message: "Creating a virtual machine from Marketplace image requires Plan information in the request. OS disk name is abcd-osdisk"
{% endhighlight %}

How to proceed from here ? It's a bit more trickier... The plan information is still hard to retrieve. So we trace back through log to get it. `

**3. Add plan information to template**
Go back to your resource group and click on the "Deployment" portion

![](/images/azure/Deployment--Microsoft-Azure.png)

This leads to a list of previous deployments within the same resource group. Select the one that've created your original VM. Then click **View Template**

![](/images/azure/Deployment-Template-Azure-1.png)

It will proceed to allow to edit a JSON file with the plan information that we need to include in our new template from step 2. The plan info looks some thing like this: 
{% highlight javascript %}
"resources": [
        {
            "type": "Microsoft.Compute/virtualMachines",
            "name": "[parameters('virtualMachineName')]",
            "apiVersion": "2016-04-30-preview",
            "location": "[parameters('location')]",
            "plan": {
                "name": "9-5",
                "publisher": "bitnami",
                "product": "postgresql"
            },
            ... 
        }
]
{% endhighlight %}

Copy the plan information portion and put it in our template in Step 2 like this (take note that the type where you should insert should be "virtualMachines":

![](/images/azure/Edit-template.png)
![](/images/azure/Edit-template---Microsoft-Azure-1.png)

Once done, press save and continue with the template to redeploy your deleted VM.

Quite some works just to restore a VM. But i am grateful that at least the vhd is not gone together with the VM itself.)

