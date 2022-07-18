---
id: 329
title: 'Azure Policy &#8211; Allowed Locations for Resource Deployment'
date: '2022-01-14T21:59:44+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=329'
permalink: '/?p=329'
---

Azure Policy allows us to control what actions users can perform regarding creating and managing resources in Azure. We can define policies for naming standards, require that certain extensions be installed on virtual machines, audit various resources for certain configurations… the possibilities are endless.

In this article, well focus on defining what locations users can deploy resources in. To get started, login to the Azure Portal and search for “Policy”.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-4.png)](https://lh3.googleusercontent.com/-7ao7r-Xj5Kk/X7QNKSrY3AI/AAAAAAAAx-8/xIUtw-pRL20pSMxsOaGUwnk-9XHSpup9ACLcBGAsYHQ/image.png)

Click on “Definitions”. Here you will find several built-in definitions that can be applied to your resources. Definitions are a json template containing the logic for what you want to accomplish. It is worth investing some time to look through these built-in definitions.

In the “search” field, type in “location”. Then, click on the “Allowed Locations” definition.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-5.png)](https://lh3.googleusercontent.com/-5FJ3EcMnG8k/X7QNP-1-5II/AAAAAAAAx_A/TH4cr4SxgbQiNVdoRlDyB_F4ukOV5bJvwCLcBGAsYHQ/image.png)

Here you can see the json content of the definition. The “policyRule” section is the bread and butter of the definition. In this particular example, the policyRule states that if the location that the user is deploying a resource to is NOT a) in the list of allowed locations, b) global, or c) a b2c directory, then deny the deployment.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-6.png)](https://lh3.googleusercontent.com/-WKsYDX4nao4/X7QNVcSEVJI/AAAAAAAAx_E/HIbPqLSHfBIjYRRZI27X7cLjStbnXlqaQCLcBGAsYHQ/image.png)

Next, click on “Assign”.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-7.png)](https://lh3.googleusercontent.com/-Qg35QQcnGZY/X7QNarWcMbI/AAAAAAAAx_M/Et9yP9ZNyXEU1Ow8m5BwZG8RcTBaadInQCLcBGAsYHQ/image.png)

You can assign the policy to a subscription or resource group. You can also create exclusions in this same window, and enable or disable the policy.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-8.png)](https://lh3.googleusercontent.com/-16qmOT43oKo/X7QNfuX4KVI/AAAAAAAAx_Q/_0wak5v2CCA2yIrwLalJgvhCnBCCEJcOQCLcBGAsYHQ/image.png)

Click “Next”, and on the Parameters page, choose the allowed locations from the drop down menu. Then click next.

Azure Policy has the capability to remediate non-compliant resources. An example would be having a policy that requires anti-virus be installed on all servers. If Azure Policy detected a server that did NOT have anti-virus installed, it would use a managed identity to install AV software on the server. This particular policy does not need a remediation action, so we will just click “Next” here.

On the Review + Create window, review the resource and then click “Create”.

Back on the Azure Policy blade, select “Assignments”. We can now see that our new policy is assigned.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-9.png)](https://lh3.googleusercontent.com/-K8ofsNe1ALY/X7QNrf8dfkI/AAAAAAAAx_c/3R0DRk4LKWYcGP6-LJ3vgRUcUOQaZ6r3ACLcBGAsYHQ/image.png)

Back on the “Overview” page, you can track compliance for the policy. We can see here that compliance for the “Allowed Locations” policy assignment has not yet been started. This typically takes an hour or so before the compliance state is updated.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-10.png)](https://lh3.googleusercontent.com/-S-zq_cWBh7Y/X7QNvjMRUrI/AAAAAAAAx_k/CG194fTLqKIHqTNMmCyJzM4W9HJ_d6aPgCLcBGAsYHQ/image.png)

Click on the Policy to get a more detailed view of compliance, view the definition, edit the assignment, and even create exemptions.

[![](https://geekyryan.com/wp-content/uploads/2020/11/image-11.png)](https://lh3.googleusercontent.com/-9sdnYSeQZ7A/X7QNzt8EEdI/AAAAAAAAx_o/3-2_eyPVjxIFSINg8IzEhKwZzWGUgf9NQCLcBGAsYHQ/image.png)