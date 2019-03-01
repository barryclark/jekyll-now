---
layout: post
title:  "Azure AD: Groups memberships in SAML 2.0 assertions to SAP Analytics Cloud"
comments: True
categories: 
- Azure AD
- SAP
---

Someoe asked how to add group membership to the SAML 2.0 assertion from Azure AD to an application such as SAP Analytics Cloud. This would allow seemless single sign-on to SAP Analytics Cloud (SAC). This post documents the steps to sending group membership in the SAML 2.0 tokens from Azure AD to SAP Analytics Cloud (SAC).

## Background:
![Alt Text](/assets/images/2019-02-25-Group-in-SAML-to-SAP/diagram1.png)

You can pass group membership either as Application Roles or  Security Group from Azure AD. Either gets translated into permissions during SAC's authorization. See [here](https://docs.microsoft.com/en-us/azure/architecture/multitenant-identity/app-roles) to learn the Pros and Cons of Application Roles and Security Groups.

I chose to send group membership as Application Roles because I need to filter groups. In this case, Groups were sourced from an on-prem AD. Security Groups cannot yet be filtered. Security Groups [are restricted](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-claims-mapping#table-2-saml-restricted-claim-set). Instead it is much simpler and cleaner to use App Roles. Each user is already assigned to one or more Security Groups (sourced from on-prem). Each Security Group gets assigned to an App Role (in setp 4 below). When a user logs in to SAC, Azure AD will emit all the App Roles that the user is indirectly assigned to via Security Groups. Neat! This  capability requires Azure AD Premium. You can learn about this capability [here](https://techcommunity.microsoft.com/t5/Azure-Active-Directory-Identity/Azure-Active-Directory-now-with-Group-Claims-and-Application/ba-p/243862)

Note: If groups are to be synched from an on-prem AD, AD Connect should be version 1.1.649.0 & above.

I do not have access to SAC. I'm going to use a [WS-Federation client application](https://github.com/Azure-Samples/active-directory-dotnet-webapp-wsfederation) to mimick the SAC client interaction with Azure AD. See optional step 6 for how to setup and configure SAC client application. 

## Here are the steps:
1. Create the application in Azure AD
2. Configure the SAP Analytics Cloud Application in Azure AD
3. Create Roles for the Application in Azure AD
4. Assign Security Groups & App Roles to the Application
5. Customize the claims issued in the SAML tokens
6. Optional: Configure a sample client for testing
7. Test and verify


## 1. Create the application in Azure AD
The application object in Azure AD is a representation of SAP Analytics Cloud. This object is going to control authentication and issue SAML tokens. Azure AD provides a few options to register the application: 
- Register via Portal > Enterprise Apps > Non-Gallery Application
- Register via Portal > Enterprise Apps > Gallery Application
- Register via Portal > App Registrations

I choose the first option - Non-Gallery App because its easier to learn when you can completely customize the SAML token when compared to [SAP's Gallery Application](https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/sapboc-tutorial). Also, you can use the portal to customize the SAML tokens for [(Non-Gallery) Enterprise Apps](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-saml-claims-customization) compared to [App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-claims-mapping) Apps. 


Here is how to register the SAP Analytics Cloud in Azure AD:

![Alt Text](/assets/images/2019-02-25-Group-in-SAML-to-SAP/1.gif)

Go to: Portal > Azure Active Directory > Enterprise Applications > New application

Select Non-Gallery Application from the top right

Give it a name (say SAP Analytics Cloud) and click Add

Now you have created a Service Principal and an Application Object. The Service Principal is accessible through: Portal > Enterprise Application. The Application Object is accessible through: Portal > App Regisration. Be sure to not use the Application Object created under Portal > App Registration(Preview) because SAML 2.0 and WS-Federation protocols are not yet supported under the V2.0 endpoint (will be available soon). See here to [learn](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-how-applications-are-added) more. 

## 2. Configure the SAP Analytics Cloud Application in Azure AD
Now that you have an application object to represent SAP Analytics Cloud in Azure AD, lets configure it:

1. Set the Logout URL
2. Assign users to the application
3. Provide the Application permissions to the Azure AD

### 2.1 Set the logout URL
 Set the client application's logout URL at: Portal > App Registration > Settings > Logout URL

You would set it to your SAC instance's logout URL. This demo, sets it to https://localhost:44320 in support of optional step 6

![Alt Text](/assets/images/2019-02-25-Group-in-SAML-to-SAP/2.gif)

### 2.2 Assign users to the application
An administrator can control which users or groups have access to the aplication. For this demo, I set User Assignment Required to No. 

Go to: Portal > Enterprise Applications > Properties >User Assignment required set to No.

![Alt Text](/assets/images/2019-02-25-Group-in-SAML-to-SAP/3.gif)


### 2.3 Provide the Application permissions to the Azure AD
Azure AD supports two kinds of permissions:
- Delegated permissions: Used by apps that have a signed-in user present
- Application permissions: Used by apps that run without a signed-in user present

We will configure an administrator consented delegate permision to the SAC app.

Go to: Portal > App Registration > Settings > Required permissions. 

Click Add.

Select "Windows Azure Active Directory"

Provide Delegated Permission to the App for "Sign in and read user profile"

![Alt Text](/assets/images/2019-02-25-Group-in-SAML-to-SAP/4.gif)


## 3. Create Roles for the Application in Azure AD
In this step, we define the application roles in Azure AD for the SAC application. 

Azure AD provides two ways to create roles:
- Update the [manifest](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-add-app-roles-in-azure-ad-apps)
- Use [graph API](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-enterprise-app-role-management)

Chose the manifest approach because its easier to explain on the portal.

Lets create a sample SurveryCreator and SurveyAdministrator roles for this application:

```json
"appRoles": [
  {
    "allowedMemberTypes": [
      "User",
      "Application"
    ],
    "description": "Dummy App Role1",
    "displayName": "AppRole1",
    "id": "1b4f816e-5eaf-48b9-8613-7923830595ad",
    "isEnabled": true,
    "value": "AppRole1"
  },
  {
    "allowedMemberTypes": [
      "User",
      "Application"
    ],
    "description": "Dummy App RoleN",
    "displayName": "AppRoleN",
    "id": "c20e145e-5459-4a6c-a074-b942bbd4cfe1",
    "isEnabled": true,
    "value": "AppRoleN"
  }
]
```

Notice that the "allowedMemberTypes" targets Applications and Users. 

To define the role, go to: Portal > App Registrations 

Select All Apps from the drop down and pick the app you registered earlier

Click Manifest and update the manifest with the App roles you want to create:

![Alt Text](/assets/images/2019-02-25-Group-in-SAML-to-SAP/5.gif)

Also read the documentation on [how to create App Roles]() 

## 4. Assign Security Groups & App Roles to the Application
This is where we assign on-prem sourced Security Groups to the App Roles created for the Application. It allows us to filter and send only required Security Group names as App roles to SAC. 

In this demo, I have two pre-exisitng Security Groups: SecurityGroup1 and SecurityGroup2 that are sourced from on-prem.We are going to assign these SecurityGroups to the Application and give them an App Role.

Go to: Portal > Enterprise Application 
Select the application Object
Under Users and Groups, assign security groups to application roles
Set the Roles for those assignments to be App Roles. Note, there is a 1:1 mapping between Security Groups and Application Roles


![Alt Text](/assets/images/2019-02-25-Group-in-SAML-to-SAP/6.gif)



## 5. Customize the claim name issued in the SAML tokens

SAP Analytic Cloud client looks for the name at the end of the url formatted claim name, not the whole url  – so set the claim name to to a friendly name. This example sets it to Name=“MyAppRoles”.

This changes the claim name in the SAML assertion from:
```xml
    <Attribute Name="http://schemas.microsoft.com/ws/2008/06/identity/claims/role">
        <AttributeValue>AppRole1</AttributeValue>
        <AttributeValue>AppRoleN</AttributeValue>
    </Attribute>
```

to:
```xml
    <Attribute Name="MyAppRoles">
        <AttributeValue>AppRole1</AttributeValue>
        <AttributeValue>AppRoleN</AttributeValue>
    </Attribute>
```

![Alt Text](/assets/images/2019-02-25-Group-in-SAML-to-SAP/7.gif)


You can read more about it in the Azure documentation [here](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-saml-claims-customization#editing-the-nameidentifier-claim)


## 6. Optionally Configure a sample client for testing
Steps:
1. Get the App ID URI from Azure AD
2. Clone the sample repo
3. Configure the sample application

### 6.1 Get the application's App ID URI
The App ID URI is a uniquely identifier to the application in  Azure AD.

Fetch the App ID URI from: Portal > App Registration > Settings > Properties > App ID URI


![Alt Text](/assets/images/2019-02-25-Group-in-SAML-to-SAP/2.gif)


### 6.2 Clone the repo
Clone the [WS-Federation client application](https://github.com/Azure-Samples/active-directory-dotnet-webapp-wsfederation) repo. 

### 6.3 Configure web.config
In the application's web.config, set the following in Web.config:
- ida:Wtrealm key to the App ID URI. The App ID URI is auto created in Setp 1 when you register the application in Azure AD. The App ID URI is a URI that uniquely identifies the application in Azure AD.Find the App ID URI under: Portal > App Registration > Settings > Properties > App ID URI and set it to the ida:Wtrealm key in web.config
- ida:AADInstance key is set to

### 6.3 Configure 

Note that once you solve the connection problem, the next one will be that sign in will fail because the token signature can’t be verified.   That is because Enterprise App config creates an App specific signing key, but the App is picking up AAD’s global cert from the tenant metadata.
To solve that look for this line in startup.auth.cs and add the ?appid=<your appid> to the federationmetadata URL.  That will enable it to find the app specific signing cert. 

        private static string metadata = string.Format("{0}/{1}/federationmetadata/2007-06/federationmetadata.xml?appid=0ad2586e-3f2c-47e7-a498-40b970820cd5", aadInstance, tenant);

## 7. Test and verify!
Use a tool like [SAML-tracer browser pluggin](https://chrome.google.com/webstore/detail/saml-tracer/mpdajninpobndbfcldcmbpnnbhibjmch?hl=en) to incept and verify that the SAML assertions are getting correctly generated.

If you need to debug, [here](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-v1-debug-saml-sso-issues) is some great help


![Alt Text](/assets/images/2019-02-25-Group-in-SAML-to-SAP/9.png)
