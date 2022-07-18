---
id: 63
title: 'Replicate an Azure VM Image Between Regions'
date: '2020-11-03T20:15:00+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=63'
permalink: '/?p=63'
categories:
    - Uncategorized
tags:
    - azure
---

Let’s say you have a VM in Azure North Central. You created this VM from a custom image that you maintain in an Azure image repository. Now, what if you wanted to create that same VM in Azure South Central, and use the same reference image? A standard image repository is limited to the region that it exists in. The answer here is to create a Shared Image Library, add the image to it, and then configure the image to replicate to other Azure regions.

This article assumes you already have an image.

First, create a Shared Image Gallery in Azure. Browse to the Azure portal ([https://portal.azure.com](https://portal.azure.com/)), and (from the home page) click “create a resource”.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-12.png)](https://lh3.googleusercontent.com/-LQbh5w9zFN0/X6G5qBxrC1I/AAAAAAAAx5I/QH95DqgHJzUgkC5YhWqmQ_pOXmCygVHwQCLcBGAsYHQ/image.png)

Search for “Shared Image Gallery” and then click “Create”.

Configure a subscription, resource group, and then name the Shared Image Gallery and configure what region you want it to live in. You will want to create it in the same region as your standard image repository.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-13.png)](https://lh3.googleusercontent.com/-61hBPxzwPzI/X6G5w_C7-iI/AAAAAAAAx5M/GVHvFpgE2WQwupil-OSd7nZ2nJEZRI0MgCLcBGAsYHQ/image.png)

If you want to assign some tags to this new resource, continue to the next page. Otherwise, click “Review + Create”.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-14.png)](https://lh3.googleusercontent.com/-OCPyDsSbRYo/X6G52usmBSI/AAAAAAAAx5Q/nZJuX9YZzNsWU4aJwGNkZ5kulaXb5mcGgCLcBGAsYHQ/image.png)

On the final page, if the validation is successful, click “Create”.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-15.png)](https://lh3.googleusercontent.com/-gCwUW-ntoKA/X6G56AAogVI/AAAAAAAAx5Y/wcUUn2_P68MNl5wCWIqQTYGRqEvJMJm6QCLcBGAsYHQ/image.png)

It should take less than a minute to create the shared image gallery. Once its created, click “Go to resource”.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-16.png)](https://lh3.googleusercontent.com/-mZQpi2f85MQ/X6G5-7FGFUI/AAAAAAAAx5c/vPOG47n736gp87Z2rftfjvL9OcGolOGxACLcBGAsYHQ/image.png)

In the shared image gallery blade, click “Add new image definition”.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-17.png)](https://lh3.googleusercontent.com/-qSWGjKuUMp4/X6G6CZsRAXI/AAAAAAAAx5g/-LYCx4Qmf98k2mbjM9CC-8mKVA-zp-8rACLcBGAsYHQ/image.png)

On the next page, select the region where your existing image repository lives, give the image definition a name, and then fill out the rest of the information as needed. The publisher will typically be the name of your company/organization. The offer will typically be set to the name of the overall application, being that servers typically host one piece of an application (example: database servers vs. application servers). The SKU will typically be set to the name of the component within the application (for example, a web server or database server).

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-18.png)](https://lh3.googleusercontent.com/-4ZaK5D-Y0FE/X6G6G3n8KsI/AAAAAAAAx5k/jd18bOcFQ1kP62-0zE1Vuhwx6WpRnEyGwCLcBGAsYHQ/image.png)

Next, configure an image version. This should use the typical semantic format used in software development (major version, minor version, patch level). I will typically substitute the patch level with the date the image was captured. Probably not a best practice, but something that has served me well in the past.

Next, select the source image. This will be the image that you are copying from your standard image repository. You can also configure an end of life date for the image version here if you wish. In the “Target Regions” section at the bottom, select the region where you plan to create the new VM. Also select the target storage account type.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-19.png)](https://lh3.googleusercontent.com/-6F59gxbQ7ws/X6G6PI4qVeI/AAAAAAAAx5w/x2SCNG8PawMUZRQS6q55kAvgsOfD8bnPACLcBGAsYHQ/image.png)

You can configure some publishing options and tags on the following pages. Though, it is not required. Click “Review + create”. <span style="mso-spacerun: yes;"> </span><span style="mso-spacerun: yes;"> </span>After the validation passes, click “Create”.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-20.png)](https://lh3.googleusercontent.com/-CyzD7E88UVU/X6G6TQGRu6I/AAAAAAAAx54/2yHQrYIFUp8P8JyWMuEbsfFL47UW8Il0ACLcBGAsYHQ/image.png)

This process will take a few minutes to complete. Once its finished, click on “go to resource”. You now have an image that is available to be deployed in the north central region or the south central region.