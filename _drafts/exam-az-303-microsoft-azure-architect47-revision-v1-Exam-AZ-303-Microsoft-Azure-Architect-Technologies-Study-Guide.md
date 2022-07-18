---
id: 316
title: 'Exam AZ-303: Microsoft Azure Architect Technologies Study Guide'
date: '2022-01-14T21:51:35+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=316'
permalink: '/?p=316'
---

<span style="font-family: arial;">I recently passed the AZ-303 exam. Below are some of the resources I used to prepare for the exam. In addition to the links below, I also used Alan Rodrigues’ course on Udemy. </span>

<span style="font-family: arial;"><https://www.udemy.com/course/az-102-azure-administrator-certification-transition/>  
</span>

<span style="font-family: arial;">The Udemy course and Microsoft Docs are enough to pass the exam. The course has some good practice exams and labs that align well with what you’ll see on the real exam regarding difficulty. I was scoring in the high 90’s on the Udemy exams. On the real exam, my score was 923. So, I think, if you comprehend the material well, and get high scores on Udemy practice exams, you’ll do well on the real exam.</span>

<span style="font-family: arial;">Just wanted to share my experience, hopefully it helps.</span>

**<u><span style="font-size: large;">Implement and Monitor an Azure Infrastructure (50-55%)</span></u>**

<span style="font-size: medium;">**Implement cloud infrastructure monitoring**</span>

- monitor security
- [What is Azure Security Center?](https://docs.microsoft.com/en-us/azure/security-center/security-center-introduction)

- monitor performance
- configure diagnostic settings on resources
- [Create diagnostic settings to send platform logs and metrics to different destinations](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings)

- create a performance baseline for resources
- [Analyzing Resource Utilization on Azure](https://cloudacademy.com/course/analyzing-resource-utilization-azure/resource-baseline/)

- monitor for unused resources
- [Quickstart: Explore and analyze costs with cost analysis](https://docs.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis?tabs=azure-portal)

- monitor performance capacity
- [How to chart performance with Azure Monitor for VMs](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/vminsights-performance)

- visualize diagnostics data using Azure Monitor
- [Azure Monitor Workbooks](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/workbooks-overview)


- monitor health and availability
- monitor networking
- [Azure Monitor for Networks](https://docs.microsoft.com/en-us/azure/azure-monitor/insights/network-insights-overview)

- monitor service health
- [Service Health overview](https://docs.microsoft.com/en-us/azure/service-health/service-health-overview)


- monitor cost
- monitor spend
- [Quickstart: Explore and analyze costs with cost analysis](https://docs.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis?tabs=azure-portal)

- report on spend
- [View and download your Microsoft Azure invoice](https://docs.microsoft.com/en-us/azure/cost-management-billing/understand/download-azure-invoice)


- configure advanced logging
- implement and configure Azure Monitor insights, including App Insights, Networks, Containers
- [What is monitored by Azure Monitor?](https://docs.microsoft.com/en-us/azure/azure-monitor/monitor-reference)

- configure a Log Analytics workspace
- [Create a Log Analytics workspace in the Azure portal](https://docs.microsoft.com/en-us/azure/azure-monitor/learn/quick-create-workspace)


- configure logging for workloads
- initiate automated responses by using Action Groups
- [Create and manage action groups in the Azure portal](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/action-groups)


- configure and manage advanced alerts
- collect alerts and metrics across multiple subscriptions
- [Create, view, and manage metric alerts using Azure Monitor](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/alerts-metric)

- view Alerts in Azure Monitor logs
- [Create, view, and manage activity log alerts by using Azure Monitor](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/alerts-activity-log)



**<span style="font-size: medium;">Implement storage accounts</span>**

- select storage account options based on a use case
- [Create a storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal)

- configure Azure Files and blob storage
- [Create an Azure file share](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-portal)
- [Quickstart: Upload, download, and list blobs with the Azure portal](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal)

- configure network access to the storage account
- [Configure Azure Storage firewalls and virtual networks](https://docs.microsoft.com/en-us/azure/storage/common/storage-network-security)

- implement Shared Access Signatures and access policies
- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview)
- [Define a stored access policy](https://docs.microsoft.com/en-us/rest/api/storageservices/define-stored-access-policy)

- implement Azure AD authentication for storage
- [Authorize access to blobs and queues using Azure Active Directory](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad)

- manage access keys
- [Manage storage account access keys](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal)

- implement Azure storage replication
- [Configure object replication for block blobs](https://docs.microsoft.com/en-us/azure/storage/blobs/object-replication-configure?tabs=portal)

- implement Azure storage account failover
- [Disaster recovery and storage account failover](https://docs.microsoft.com/en-us/azure/storage/common/storage-disaster-recovery-guidance)


**<span style="font-size: medium;">Implement VMs for Windows and Linux</span>**

- configure High Availability
- [Manage the availability of Linux virtual machines](https://docs.microsoft.com/en-us/azure/virtual-machines/manage-availability)

- configure storage for VMs
- [Introduction to Azure managed disks](https://docs.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview)

- select virtual machine size
- [Sizes for virtual machines in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes)

- implement Azure Dedicated Hosts
- [Deploy VMs and scale sets to dedicated hosts using the portal](https://docs.microsoft.com/en-us/azure/virtual-machines/dedicated-hosts-portal)

- deploy and configure scale sets
- [Quickstart: Create a virtual machine scale set in the Azure portal](https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/quick-create-portal)

- configure Azure Disk Encryption
- [Azure Disk Encryption for Windows VMs](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/disk-encryption-overview)


<span style="font-size: medium;">**Automate deployment and configuration of resources**</span>

- save a deployment as an Azure Resource Manager template
- [Single and multi-resource export to a template in Azure portal](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/export-template-portal)

- modify Azure Resource Manager template
- [What are ARM templates?](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview)

- evaluate location of new resources
- [View activity logs to monitor actions on resources](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/view-activity-logs)

- configure a virtual disk template
- [Create a managed image of a generalized VM in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/capture-image-resource)

- deploy from a template
- [Deploy Azure virtual machines from VHD templates](https://docs.microsoft.com/en-us/learn/modules/deploy-vms-from-vhd-templates/)

- manage a template library
- [Shared Image Galleries overview](https://docs.microsoft.com/en-us/azure/virtual-machines/shared-image-galleries)

- create and execute an automation runbook
- [Getting Started With Azure Automation – Runbook Management](https://azure.microsoft.com/en-us/blog/azure-automation-runbook-management/)


**<span style="font-size: medium;">Implement virtual networking</span>**

- implement VNet to VNet connections
- [Configure a VNet-to-VNet VPN gateway connection by using the Azure portal](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-vnet-vnet-resource-manager-portal)

- implement VNet peering
- [Virtual network peering](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview)


**<span style="font-size: medium;">Implement Azure Active Directory</span>**

- add custom domains
- [Add your custom domain name using the Azure Active Directory portal](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/add-custom-domain)

- configure Azure AD Identity Protection
- [What is Identity Protection?](https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection)

- implement self-service password reset
- [Tutorial: Enable users to unlock their account or reset passwords using Azure Active Directory self-service password reset](https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr)

- implement Conditional Access including MFA
- [Conditional Access: Require MFA for all users](https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/howto-conditional-access-policy-all-users-mfa)

- configure user accounts for MFA
- [Enable per-user Azure AD Multi-Factor Authentication to secure sign-in events](https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-userstates)

- configure fraud alerts
- [Fraud alert](<Enable per-user Azure AD Multi-Factor Authentication to secure sign-in events>)

- configure bypass options
- [One-time bypass](https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-server-settings#one-time-bypass)

- configure Trusted IPs
- [Trusted IPs](https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings#trusted-ips)

- configure verification methods
- [Authentication methods](https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-sspr-howitworks#authentication-methods)

- implement and manage guest accounts
- [Quickstart: Add guest users to your directory in the Azure portal](https://docs.microsoft.com/en-us/azure/active-directory/external-identities/b2b-quickstart-add-guest-users-portal)

- manage multiple directories
- [Understand how multiple Azure Active Directory organizations interact](https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/licensing-directory-independence)


**<span style="font-size: medium;">Implement and manage hybrid identities</span>**

- install and configure Azure AD Connect
- [Getting started with Azure AD Connect using express settings](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-express)

- identity synchronization options
- [Azure AD Connect user sign-in options](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/plan-connect-user-signin)

- configure and manage password sync and password writeback
- [Tutorial: Enable Azure Active Directory self-service password reset writeback to an on-premises environment](https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr-writeback)

- configure single sign-on
- [Azure Active Directory Seamless Single Sign-On: Quickstart](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-sso-quick-start)

- use Azure AD Connect Health
- [What is Azure AD Connect Health?](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/whatis-azure-ad-connect#what-is-azure-ad-connect-health)


**<u><span style="font-size: large;">Implement Management and Security Solutions (25-30%)</span></u>**

<span style="font-size: medium;">**Manage workloads in Azure**</span>

- migrate workloads using Azure Migrate
- assess infrastructure
- select a migration method
- prepare the on-premises for migration
- recommend target infrastructure
- [Migrate Hyper-V VMs to Azure](https://docs.microsoft.com/en-us/azure/migrate/tutorial-migrate-hyper-v)

- implement Azure Backup for VMs
- [Back up an Azure VM from the VM settings](https://docs.microsoft.com/en-us/azure/backup/backup-azure-vms-first-look-arm)

- implement disaster recovery
- [Tutorial: Set up disaster recovery for Azure VMs](https://docs.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-enable-replication)

- implement Azure Update Management
- [Enable Update Management for an Azure VM](https://docs.microsoft.com/en-us/azure/automation/update-management/enable-from-vm)


**<span style="font-size: medium;">Implement load balancing and network security</span>**

- implement Azure Load Balancer
- [What is Azure Load Balancer?](https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-overview)

- implement an application gateway
- [What is Azure Application Gateway?](https://docs.microsoft.com/en-us/azure/application-gateway/overview)

- implement a Web Application Firewall
- [What is Azure Web Application Firewall?](https://docs.microsoft.com/en-us/azure/web-application-firewall/overview)

- implement Azure Firewall
- [What is Azure Firewall?](https://docs.microsoft.com/en-us/azure/firewall/overview)

- implement the Azure Front Door Service
- [Quickstart: Create a Front Door for a highly available global web application](https://docs.microsoft.com/en-us/azure/frontdoor/quickstart-create-front-door)

- implement Azure Traffic Manager
- [What is Traffic Manager?](https://docs.microsoft.com/en-us/azure/traffic-manager/traffic-manager-overview)

- implement Network Security Groups and Application Security Groups
- [Network security groups](https://docs.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview)
- [Application security groups](https://docs.microsoft.com/en-us/azure/virtual-network/application-security-groups)

- implement Bastion
- [Azure Bastion documentation](https://docs.microsoft.com/en-us/azure/bastion/)


**<span style="font-size: medium;">Implement and manage Azure governance solutions</span>**

- create and manage hierarchical structure that contains management groups
- [What are Azure management groups?](https://docs.microsoft.com/en-us/azure/governance/management-groups/overview)

- subscriptions and resource groups
- [Organize your Azure resources effectively](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources?tabs=AzureManagementGroupsAndHierarchy)

- assign RBAC roles
- [Add or remove Azure role assignments using the Azure portal](https://docs.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal)

- create a custom RBAC role
- [Azure custom roles](https://docs.microsoft.com/en-us/azure/role-based-access-control/custom-roles)

- configure access to Azure resources by assigning roles
- [Add or remove Azure role assignments using the Azure portal](https://docs.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal)

- configure management access to Azure
- [Manage access to an Azure subscription by using Azure role-based access control (RBAC)](https://docs.microsoft.com/en-us/learn/modules/manage-subscription-access-azure-rbac/)

- interpret effective permissions
- [Quickstart: Check access for a user to Azure resources](https://docs.microsoft.com/en-us/azure/role-based-access-control/check-access)

- set up and perform an access review
- [What are Azure AD access reviews?](https://docs.microsoft.com/en-us/azure/active-directory/governance/access-reviews-overview)

- implement and configure an Azure Policy
- [Quickstart: Create a policy assignment to identify non-compliant resources](https://docs.microsoft.com/en-us/azure/governance/policy/assign-policy-portal)

- implement and configure an Azure Blueprint
- [What is Azure Blueprints?](https://docs.microsoft.com/en-us/azure/governance/blueprints/overview)


**<span style="font-size: medium;">Manage security for applications</span>**

- implement and configure KeyVault
- [Configure and manage secrets in Azure Key Vault](https://docs.microsoft.com/en-us/learn/modules/configure-and-manage-azure-key-vault/)

- implement and configure Managed Identities
- [What are managed identities for Azure resources?](https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=18fbca16-2224-45f6-85b0-f7bf2b39b3f3&nonce=ef221978-b465-49a1-9226-e8a0e4d25480&prompt=none&redirect_uri=https%3A%2F%2Fdocs.microsoft.com%2F_themes%2Fdocs.theme%2Fmaster%2Fen-us%2F_themes%2Fglobal%2Fsign-in.html&response_mode=fragment&response_type=id_token&scope=openid%20profile&sso_reload=true&state=silent%3A%2F%2Fhttps%3A%2F%2Fdocs.microsoft.com&fromOrigin=https%3A%2F%2Fdocs.microsoft.com&iframe-request-id=685d3411-99a9-4f94-81e4-d9b8af575600)

- register and manage applications in Azure AD
- [Quickstart: Register an application with the Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)


**<u><span style="font-size: large;">Implement Solutions for Apps (10-15%)</span></u>**

**<span style="font-size: medium;">Implement an application infrastructure</span>**

- create and configure Azure App Service
- [Quickstart: Create an ASP.NET Core web app in Azure](https://docs.microsoft.com/en-us/azure/app-service/quickstart-dotnetcore?tabs=netcore31&pivots=platform-linux)

- create an App Service Web App for Containers
- [Deploy and run a containerized web app with Azure App Service](https://docs.microsoft.com/en-us/learn/modules/deploy-run-container-app-service/)

- create and configure an App Service plan
- [Manage an App Service plan in Azure](https://docs.microsoft.com/en-us/azure/app-service/app-service-plan-manage)

- configure an App Service
- [Configure an App Service app in the Azure portal](https://docs.microsoft.com/en-us/azure/app-service/configure-common)

- configure networking for an App Service
- [Integrate your app with an Azure virtual network](https://docs.microsoft.com/en-us/azure/app-service/web-sites-integrate-with-vnet)

- create and manage deployment slots
- [Set up staging environments in Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)

- implement Logic Apps
- [Quickstart: Create your first Logic Apps workflow – Azure portal](https://docs.microsoft.com/en-us/azure/logic-apps/quickstart-create-first-logic-app-workflow)

- implement Azure Functions
- [Create your first function in the Azure portal](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function)


**<span style="font-size: medium;">Implement container-based applications </span>**

- create a container image
- [Quickstart: Build and run a container image using Azure Container Registry Tasks](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-quickstart-task-cli)

- configure Azure Kubernetes Service
- [Quickstart: Deploy an Azure Kubernetes Service (AKS) cluster using the Azure portal](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough-portal)

- publish and automate image deployment to the Azure Container Registry
- [Deploy to Azure Container Instances from Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-using-azure-container-registry)

- publish a solution on an Azure Container Instance
- [Quickstart: Deploy a container instance in Azure using the Azure portal](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-quickstart-portal)


**<u>Implement and Manage Data Platforms (10-15%)</u>**

**<span style="font-size: medium;">Implement NoSQL databases</span>**

- configure storage account tables
- [Quickstart: Create an Azure Storage table in the Azure portal](https://docs.microsoft.com/en-us/azure/storage/tables/table-storage-quickstart-portal)

- select appropriate CosmosDB APIs
- [Choose the appropriate API for Azure Cosmos DB](https://docs.microsoft.com/en-us/learn/modules/choose-api-for-cosmos-db/)

- set up replicas in CosmosDB
- [Distribute your data globally with Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/distribute-data-globally)


**<span style="font-size: medium;">Implement Azure SQL databases</span>**

- configure Azure SQL database settings
- [Quickstart: Create an Azure SQL Database single database](https://docs.microsoft.com/en-us/azure/azure-sql/database/single-database-create-quickstart?tabs=azure-portal)

- implement Azure SQL Database managed instances
- [What is Azure SQL Managed Instance?](https://docs.microsoft.com/en-us/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview)

- configure HA for an Azure SQL database
- [High availability for Azure SQL Database and SQL Managed Instance](https://docs.microsoft.com/en-us/azure/azure-sql/database/high-availability-sla)

- publish an Azure SQL database