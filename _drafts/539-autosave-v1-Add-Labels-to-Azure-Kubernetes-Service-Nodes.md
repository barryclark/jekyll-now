---
id: 551
title: 'Add Labels to Azure Kubernetes Service Nodes'
date: '2022-06-25T19:35:59+00:00'
author: Ryan
excerpt: 'In this post, we''ll take a look at adding new node labels to an existing node pool in AKS.'
layout: revision
guid: 'https://geekyryan.com/?p=551'
permalink: '/?p=551'
---

In this post, we’ll take a look at adding new node labels to an existing node pool in AKS. Node labels are used to group nodes with similar characteristics together. These labels can then be used by the scheduler to determine where a pod will run.

We will add labels to the existing node pool imperatively using the AzureCLI and declaratively using Terraform. Though, this can also be done using Powershell and ARM templates.

**Imperatively:**

Adding node labels imperatively in a traditional (non-turnkey) Kubernetes cluster is done via Kubectl. You would apply labels to each node individually because bare-metal Kubernetes does not support the concept of node pools. However, turnkey solutions such as AKS and GKE do support node pools. Therefore, we need to apply the label to all nodes within a node pool. With AKS, this can be done via the Azure CLI using the `--labels` switch:

```
<pre class="wp-block-code">```
az aks nodepool update \
    --resource-group myResourceGroup \
    --cluster-name myAKSCluster \
    --name labelnp \
    --labels nodePool=frontend operatingSystem=linux \
    --no-wait
```
```

You can then verify the labels exist using:

```
<pre class="wp-block-code">```
kubectl get nodes --show-labels | grep -e "costcenter=6000" -e "dept=ACCT"
```
```

- - - - - -

**Declaratively:**

This post assumes you already have an AKS cluster that is managed via Terraform. If not, you can use this code to deploy a new cluster and associated resources:

<http://terraform-quickstart-templates/201-aks-with-node-pools at master · rnemeth90/terraform-quickstart-templates (github.com)>

Managing node labels with Terraform is simply a matter of adding the `node_labels` directive to the `azurerm_kubernetes_cluster_node_pool` block inside your Terraform manifest for AKS.

<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper"><span class="coblocks-gist__container" style="pointer-events: none"><script src="https://gist.github.com/rnemeth90/80044f79ef31afded5c45a49ef8258fb.js">

</script>[View this gist on GitHub](https://gist.github.com/rnemeth90/80044f79ef31afded5c45a49ef8258fb)</span></div></figure>`node_labels` supports a map (dictionary) of strings.

After adding the block, run a `terraform plan` to view the changes, followed by a `terraform apply` if the changes look good.