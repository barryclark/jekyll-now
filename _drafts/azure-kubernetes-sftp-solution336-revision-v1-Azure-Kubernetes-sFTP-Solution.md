---
id: 447
title: 'Azure Kubernetes sFTP Solution'
date: '2022-02-05T23:24:44+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=447'
permalink: '/?p=447'
---

In this post, we’ll take a look at deploying a highly available sFTP solution to Azure Kubernetes with user files stored in an Azure NFSv4 File Share. The sFTP application reads user credentials from a file named users.conf, containing secrets from an Azure Key Vault.

Here is the link to my Github account where you can download the code mentioned in this article:

<https://github.com/rnemeth90/kubernetes-sftp>

We will work through the following steps in this article:

1. Deploy the AzureFile CSI driver to the AKS cluster
2. Create a configMap that our initContainer will
3. Deploy a persistent volume claim that an Azure File share will back
4. Deploy a replicaSet consisting of our initContainer and application container
5. Deploy a service to serve traffic

First, you will need to deploy the Azure Files CSI driver to your AKS cluster. AKS uses this daemon set to dynamically provision/destroy Azure NFSv4 File Shares. The Azure Files CSI driver creates a storage account in the node pool resource group, in which it will then provision the file share.

Deploying the Azure Files CSI driver is a simple task. You will need to run this script:

```
<pre class="wp-block-code">```
curl -skSL https://raw.githubusercontent.com/kubernetes-sigs/azurefile-csi-driver/master/deploy/install-driver.sh | bash -s master --

```
```

You can use the following commands to verify that the daemon set has exists:

```
<pre class="wp-block-code">```
kubectl -n kube-system get pod -o wide --watch -l app=csi-azurefile-controller

kubectl -n kube-system get pod -o wide --watch -l app=csi-azurefile-node
```
```

<figure class="wp-block-coblocks-gallery-masonry masonry-grid has-border-radius-10 has-medium-gutter"><figure class="wp-block-image size-large masonry-brick">[![Image gallery image](https://geekyryan.com/wp-content/uploads/2022/01/image-1-1024x434.png)](https://geekyryan.com/wp-content/uploads/2022/01/image-1.png)</figure></figure>Next, you need to create a storage class by deploying this yaml file:

```
<pre class="wp-block-code">```
kubectl create -f https://raw.githubusercontent.com/kubernetes-sigs/azurefile-csi-driver/master/deploy/example/storageclass-azurefile-nfs.yaml
```
```

Read more about the AzureFiles CSI driver at the following Github link:

<https://github.com/kubernetes-sigs/azurefile-csi-driver/blob/master/docs/install-driver-on-aks.md>

- - - - - -

## Next, we will deploy a configMap:

```
<pre class="wp-block-code">```
apiVersion: v1
kind: ConfigMap
metadata:
  creationTimestamp: null
  name: testcm
data:
  init.sh: |-
    #!/bin/bash

    CONF_FILE="/etc/sftp/users.conf"
    KEYVAULT="Insert name of Key Vault"
    AZ_SPN_ID="Insert service principal Id"
    AZ_SPN_PASSWORD="Insert service principal password"
    AZ_SPN_TENANT_ID="Insert Az AAD Tenant Id"
    AZ_SUBSCRIPTION_ID="Insert Az Subscription Id"

    az login --service-principal --username "${AZ_SPN_ID}" --password "${AZ_SPN_PASSWORD}" --tenant "${AZ_SPN_TENANT_ID}"
    az account set --subscription "${AZ_SUBSCRIPTION_ID}"

    SECRETS+=($(az keyvault secret list --vault-name $KEYVAULT --query "[].id" -o tsv))

    chmod 755 /home

    if [[ -e $CONF_FILE ]]; then
        rm -rf "${CONF_FILE}"
        touch $CONF_FILE
    else
        touch $CONF_FILE
    fi

    for SECRET in "${SECRETS[@]}"; do
        SECRETNAME=$(basename $SECRET |  tr -d '\r')
        SECRETVALUE=$(az keyvault secret show --vault-name $KEYVAULT --name $SECRETNAME --query 'value' | tr -d '"' | tr -d '\r')

        echo "$SECRETNAME:$SECRETVALUE:::upload" >> $CONF_FILE
    done

    if [[ ! -s $CONF_FILE ]]; then
        echo "** ERROR: user.conf is empty" 1>&2
        exit 1
    fi
```
```

The initContainer will use this configMap to read secrets from an Azure Key Vault and then write the secrets to the users.conf file. The users.conf file contains user account information. In the Key Vault, the secret name should be the username and the secret value should be the password. This Key Vault must exist and contain the secrets prior to deploying this solution.

When I deployed this solution in my environment, I used an Azure DevOps pipeline to create/manage the Key Vault with Terraform and then deploy the secrets using an inline Powershell script. However, this is beyond the scope of this article, and I will not be covering it here. You will also need to create a Service Principal in your AAD tenant and grant it access to the Key Vault. The Service Principal needs to have at least read access to the Key Vault.

Before deploying the configMap, you need to fill in values for these variables:

```
<pre class="wp-block-code">```
    KEYVAULT="Insert name of Key Vault"
    AZ_SPN_ID="Insert service principal Id"
    AZ_SPN_PASSWORD="Insert service principal password"
    AZ_SPN_TENANT_ID="Insert Az AAD Tenant Id"
    AZ_SUBSCRIPTION_ID="Insert Az Subscription Id"
```
```

These values pertain to the service principal with read access to the Key Vault. After filling out these variables, you can deploy the configMap using kubectl.

```
<pre class="wp-block-code">```
kubectl create -f configmap.yaml
```
```

- - - - - -

## Now we need to create our persistent volume claim (PVC)

You can deploy the PVC using this yaml file:

```
<pre class="wp-block-code">```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-ftp-clientdirs
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 100Gi
  storageClassName: azurefile-csi-nfs

```
```

When creating the persistent volume claim for the deployment, you specify azurefile-csi-nfs as the StorageClass. This will create an NFSv4 share in a premium storage account. The reclaim policy of the storage class ensures that the file share is deleted when the associated Persistent Volume is deleted. Change the reclaim policy to “Retain” if you want the file shares to persist after deleting the PV. Furthermore, the storage class enables the file share to be expandable by modifying the storage request size on the PVC.

After deploying the PVC, you can verify its existence by running:

```
<pre class="wp-block-code">```
kubectl get pvc
```
```

You should see output similar to the following:

<figure class="wp-block-image size-large is-resized">![PVC](https://geekyryan.com/wp-content/uploads/2022/01/image-2-1024x83.png)<figcaption>Note that I renamed the storage class to a custom name</figcaption></figure>- - - - - -

## Now we’ll deploy the replicaSet

 The manifest for the replicaSet is by far the most complicated of all the code referenced here.

```
<pre class="wp-block-code">```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: sftp
  name: sftp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: sftp
  strategy: {}
  template:
    metadata:
      labels:
        app: sftp
  spec:
    initContainer:
      enabled: true
      name: chmodder
      image: mcr.microsoft.com/azure-cli
      command:
        - /bin/sh
        - -c
        - "/scripts/init.sh"
      volumeMounts:
        - name: init-shell-script
          mountPath: /scripts
    containers:
      - name: sftp
        image: docker.io/atmoz/sftp:alpine
        imagePullPolicy: IfNotPresent
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        livenessProbe:
          tcpSocket:
            port: 22
          initialDelaySeconds: 1
          timeoutSeconds: 5
          periodSeconds: 10
          failureThreshold: 3
        readinessProbe:
          tcpSocket:
            port: 22
          initialDelaySeconds: 1
          timeoutSeconds: 5
          periodSeconds: 10
          failureThreshold: 3
        volumeMounts:
          - name: pvc-ftp-clientdirs
            mountPath: /home
          - name: sftp
            mountPath: /etc/sftp
    dnsPolicy: ClusterFirst
    restartPolicy: Never
    volumes:
      - name: pvc-ftp-clientdirs
        persistentVolumeClaim:
          claimName: pvc-ftp-clientdirs
      - name: init-shell-script
        configMap:
          name: init-shell-script
      - name: sftp
        emptyDir: {}

```
```

You may need to change the CPU/memory requests and limits. These values worked for me, but your results may vary. You can also add/change the labels as you see fit.

## Finally, we need to deploy the service

This will handle routing traffic to our pods.

```
<pre class="wp-block-code">```
apiVersion: v1
kind: Service
metadata:
  name: sftp-service
spec:
  selector:
    app: sftp
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 22
      targetPort: 22

```
```

Users will be connected in a round-robin fashion to the pods. This manifest will create a service of type LoadBalancer. Which will in turn create a new public Azure Load Balancer in the resource group that contains your Azure Kubernetes Service cluster if one does not already exist. If you already have a public load balancer, a new frontend IP address will be added.

That’s all for now. Please feel free to contact me if you have any questions.