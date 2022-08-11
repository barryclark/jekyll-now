---
layout: post
title: Secure your website access with Kubernetes Nginx Ingress Controller, OAuth2 and Azure AD
subtitle: Most of the applications do not provide authentication. You can fix that using Kubernetes, NGINX, Oauth2 and OIDC(Azure AD)
category: dev
tags: [howto, cloud, aws]
author: Cristian Pirtea
author_email: pirteac@haufe.com
header-img: "images/aws-opensearch-kibana-azure-ad/someonescomputer.jpg"
---

Protecting resources behind a Kubernetes Ingress, is often NOT an easy task. Many applications do not provide built-in authentication out-of-the-box.
Therefore, creating an awesome user experience, including a single sign on solution across all applications, can quickly become a tedious task.
In Haufe, we are using Kubernetes for a while now. One of our common practices with Kubernetes is using NGINX Ingress Controller for the main ingress controller whether we deploy it using EKS or AKS.

# How does it work
 
You need to create an app registration in your Azure Active Directory. After creation you get all the useful information required in order to deploy oauth-proxy .
Further you need to deploy two Ingress kubernetes objects for a single host.

Before passing request to your app, Ingress will check whether user is logged in or not by sending request to proxy /oauth2/auth endpoint and depending on its response it will pass request or redirect user to /oauth2/start?rd=$escaped_request_uri endpoint
[Documentation](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#external-authentication)

```
metadata:
  name: application
  annotations:
    nginx.ingress.kubernetes.io/auth-url: "https://$host/oauth2/auth"
    nginx.ingress.kubernetes.io/auth-signin: "https://$host/oauth2/start?rd=$escaped_request_uri"
```

NGINX Ingress Controller can be combined with oauth2_proxy to enable many OAuth providers like Google, AzureAD, GitHub and others. 
I am going to use [OAuth 2 Proxy](https://github.com/oauth2-proxy/oauth2-proxy) together with the [NGINX Ingress Controller](https://github.com/kubernetes/ingress-nginx) to authenticate my Azure AD account against the Kibana website.

# Prerequisites

* EKS cluster (or any other type of Kubernetes cluster)
* Global Administrator, Cloud Application Administrator or Application Administrator permissions into Azure AD in order to be able to create a new [App registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).
* [ElasticSearch cluster](https://github.com/elastic/helm-charts/tree/main/elasticsearch) and [Kibana](https://github.com/elastic/helm-charts/tree/main/kibana)
* Helm 3
* kubectl


# Register an Application
Before you start, you need to register an application in Azure AD and create a client secret for it. 
You will need this for OAuth 2 Proxy later.
Assure that you note the Application Client Id and make sure you enter a Redirect URI.
The callback URI for the OAuth 2 Proxy is the same as the base FQDN plus /oauth2/callback, 
like https://yourcompanydomain.com/oauth2/callback.

{:.center}
![]( /images/secure-your-application-with-k8s-nginx-ingress-oauth2-azuread/registration-app-callback-url.png){:style="width:110%"}


In the Further steps you will have to create a client secret and write it down also.

{:.center}
![]( /images/secure-your-application-with-k8s-nginx-ingress-oauth2-azuread/create-client-secret.png){:style="width:110%"}

# Install Oauth2 Proxy

Modify oauth2_proxy variables in file [oauth2-proxy.yaml](/resources/secure-your-application-with-k8s-nginx-ingress-oauth2-azuread/oauth2-proxy.yaml) with the values from the previous step:

OAUTH2_PROXY_CLIENT_ID with the AzureAD <Application Client ID>

OAUTH2_PROXY_CLIENT_SECRET with the AzureAD <Client Secret>

OAUTH2_PROXY_COOKIE_SECRET with value of python -c 'import os,base64; print(base64.b64encode(os.urandom(16)).decode("ascii"))'

COMPANY_TENANT_ID with the AzureAD <Tenant ID> 

After you made the changes, you can create the oauth2-proxy deployment
```
# Creates namespace
kubectl create namespace demo-oauth2

# After we modified the upper variables in oauth2-proxy.yaml file, we create the deployment
kubectl apply -f oauth2-proxy.yaml
```


# Installing the Nginx Ingress Controller

You need to install Nginx ingress-controller, in order to allow Kubernetes to understand Ingress objects.
Since I mentioned earlier that I used EKS from AWS, I need to setup NGINX Ingress Controller k8s service to use
Network Load Balancer.

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Installs NGINX Ingress Controller
helm install nginx ingress-nginx/ingress-nginx \
    --namespace demo-oauth2 \
    --set controller.service.annotations."service\.beta\.kubernetes\.io/aws-load-balancer-type"="nlb" \
    --set controller.service.annotations."service\.beta\.kubernetes\.io/aws-load-balancer-cross-zone-load-balancing-enabled"="true"
```

# Prepare ElasticSearch cluster and Kibana

In order to have a valid example, you need to have a website, where you can verify authentication. My option was a 
Kibana application, but feel free to choose what-ever fits your need.
Going further with this option, you have to install ElasticSearch and Kibana using helm charts

```
# Add the Elastic Helm charts repo
helm repo add elastic https://helm.elastic.co

# Install ElasticSearch 
helm install elasticsearch-demo-outh2 elastic/elasticsearch \
--namespace demo-oauth2 \ 
--set clusterName=demo-oauth2 \
--set replicas=1  \
--set minimumMasterNodes=1


# Install Kibana with Ingress object configured
helm install kibana-demo-outh2 elastic/kibana \
--namespace demo-oauth2 \
--set elasticsearchHosts="http://demo-oauth2-master:9200"
```

# Deploy Ingress objects

Yes, it is not a typo to this step, there are multiple Ingress objects,
both of them are pointing to the same host.
First Ingress object need to be annotated in such a way that require the user to authenticate against the second
Ingress's endpoint, and can redirect 401s to the same endpoint. The second Ingress objects handles 
authentication (oauth2-proxy)
Keep in mind to modify the variables from [kibana-ingress.yaml](/resources/secure-your-application-with-k8s-nginx-ingress-oauth2-azuread/kibana-ingress.yaml) file with your own values

```
# Deploy ingress objects
kubectl apply -f kibana-ingress.yaml
```

# Test your Setup

Once your Nginx endpoints come online, test the configuration by navigating to specific url in your web browser
Login with your credentials 

{:.center}
![]( /images/secure-your-application-with-k8s-nginx-ingress-oauth2-azuread/SSO_username.png){:style="width:110%"}
![]( /images/secure-your-application-with-k8s-nginx-ingress-oauth2-azuread/SSO_password.png){:style="width:110%"}

Access granted
![]( /images/secure-your-application-with-k8s-nginx-ingress-oauth2-azuread/welcome_kibana.png){:style="width:110%"}

# Recommendation

Of course if you would like to setup a proper environment, I recommend to install [cert-manager](https://github.com/cert-manager/cert-manager)
helm chart, in order to generate valid certificates and activate HTTPS endpoints for your FQDN.
 
