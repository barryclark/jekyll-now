---
layout: post
title: Providing Secure File Storage through Azure API Management
subtitle: Shared Access Signatures with Azure Storage
category: dev
tags: [howto, security, cloud, api]
author: Martin Danielsson
author_email: martin.danielsson@haufe-lexware.com
header-img: "images/new/Exportiert_54.jpg"
---

Continuing our API journey, we're currently designing an API for one of our most valuable assets: Our content, such as law texts and commentaries. Let's call this project the "Content Hub". The API will eventually consist of different sub-APIs: content search, retrieval and ingestion ("upload"). This blog post will shed some light on how we will support bulk ingestion (uploading) of documents into our content hub using Azure out of the box technology: [Azure Storage SAS - Shared Access Signatures](https://azure.microsoft.com/en-us/documentation/articles/storage-dotnet-shared-access-signature-part-1/).

### Problem description

In order to create new content, our API needs a means to upload content into the Content Hub, both single documents and bulk ZIP files, which for example correspond to updated products (blocks of content). Ingesting single documents via an API is less a problem (and not covered in this blog post), but supporting large size ZIP files (up to 2 GB and even larger) is a different story, for various reasons:

* Large http transfers need to be supported by all layers of the web application stack (chunked transfer), which potentially introduces additional complexity
* Transferring large files is a rather difficult problem we do not want to solve on our own (again)
* Most SaaS API gateways (such as [Azure API Management](https://azure.microsoft.com/en-us/services/api-management/)) have traffic limits and/or traffic costs on their API gateways

### First approach: Setting up an sftp server

Our first architectural solution approach was to set up an (s)ftp server for use with the bulk ingestion API. From a high level perspective, this looks like a valid solution: We make use of existing technology which is known to work well. When detailing the solution, we found a series of caveats which made us look a little further:

* Providing secure access to the sftp server requires dynamic creation of users; this would also - to make the API developer experience smooth - have to be integrated into the API provisioning process (via an API portal)
* Likewise: After a document upload has succeeded, we would want to revoke the API client's rights on the sftp server to avoid misuse/abuse
* Setting up an (s)ftp server requires an additional VM, which introduces operations efforts, e.g. for OS patching and monitoring.
* The sftp server has to provide reasonable storage space for multiple ZIP ingest processes, and this storage would have to be provided up front and paid for subsequently.

### Second approach: Enter Azure Storage

Knowing we will most probably host our content hub on the [Microsoft Azure](https://azure.microsoft.com) cloud, looks immediately went to services offered via Azure, and in our case we we took a closer look at [Azure Storage](https://azure.microsoft.com/en-us/services/storage/). The immediate benefits of having such a storage as a SaaS offering are striking:

* You only pay for the storage you actually use, and the cost is rather low
* Storage capacity is unlimited for most use cases (where you don't actually need multiple TB of storage), and for our use case (document ingest) more than sufficient
* Storage capacity is does not need to be defined up front, but adapts automatically as you upload more files ("blobs") into the storage
* Azure Storage has a large variety of SDKs for use with it, all leveraging a standard REST API (which you can also use fairly simple)

Remains the question of securing the access to the storage, which was one of the main reasons why an ftp server seemed like a less than optimal idea.

### Accessing Azure Storage

Accessing an Azure Storage usually involves passing a storage identifier and an access key (the application secret), which in turn grants full access to the storage. Having an API client have access to these secrets is obviously a security risk, and as such not advisable. Similarly to the ftp server approach, it would in principle be possible to create multiple users/roles which have limited access to the storage, but this is also an additional administrational effort, and/or an extra implementation effort to make it automatic.

#### Azure Storage Shared Access Signatures

Luckily, Azure already provides a means of anonymous and restricted access to storages using a technique which is know e.g. from JWT tokens: Signed access tokens with a limited time span, a.k.a. "Shared Access Signatures" ("SAS"). These SAS tokens actually match our requirements:

* Using a SAS, you can limit access to the storage to either a "container" (similar to a folder/directory) or a specific "blob" (similar to a file)
* The SAS only has a limited validity which you can define freely, e.g. from "now" to "now plus 30 minutes"; after the validity of the token has expired, the storage can no longer be accessed
* Using an Azure Storage SDK, creating SAS URLs is extremely simple. Tokens are created without Storage API interaction, simply by *signing* the URL with the application secret key. This in turn can be validated by Azure Storage (which obviously also has the secret key).

We leverage the SAS feature to explicitly grant **write** access to one single blob (file) on the storage for which we define the file name. The access is granted for 60 minutes (one hour), which is enough to transfer large scale files. Our Content API exposes an end point which returns an URL containing the SAS token which can immediately be used to do a `PUT` to the storage.

{:.center}
![Azure Storage SAS - Diagram]({{ site.url }}/images/azure-storage-sas-1.png){:style="margin:auto"}

The upload to the storage can either be done using any http library (using a `PUT`), or using an Azure Storage SDK ([available for multiple languages](https://github.com/Azure?utf8=%E2%9C%93&query=storage), it's on github), which in turn enables features like parallel uploading or block uploading (for more robust uploading).

#### How does this look in code?

The best part of all this is that it's not only simple in theory to use the Storage API, it's actually simple in practice, too. When I tried to do this, I chose [node.js](https://nodejs.org) to implement a service which issues SAS tokens. Azure Storage has an `npm` package for that: `azure-storage`, which can be installed just like any other `npm` package using `npm install azure-storage [--save]`.

To get things up and running fast, I created a simple [Express](https://expressjs.com) application and replaced a couple of lines. The actual code for issuing a token is just the following:

```javascript
app.post('/bulk/token', function(req, res) {
	   var blobService = azure.createBlobService();
	   var startDate = new Date();
	   var expiryDate = new Date(startDate);
	   expiryDate.setMinutes(startDate.getMinutes() + 100);
	   startDate.setMinutes(startDate.getMinutes() - 10);

	   var filename = uuidGen.v4() + ".zip";

       var container = 'bulkingest';
       if (process.env.AZURE_STORAGE_SAS_CONTAINER)
       {
         container = process.env.AZURE_STORAGE_SAS_CONTAINER;
       }

	   var sharedAccessPolicy = {
	     AccessPolicy: {
	       Permissions: azure.BlobUtilities.SharedAccessPermissions.READ +
	         azure.BlobUtilities.SharedAccessPermissions.WRITE,
	       Start: startDate,
	       Expiry: expiryDate
	     },
	   };

	   var token = blobService.generateSharedAccessSignature(container, filename, sharedAccessPolicy);
	   var sasUrl = blobService.getUrl(container, filename, token);

	   res.jsonp({   storageUrl: sasUrl, 
			 filename: filename,
			 headers: [ { header: "x-ms-blob-type", value: "BlockBlob" } ], 
			 method: "PUT" });
});
``` 

So, what does this do?

* Creates a Blob Service (from the `azure-storage` package), using defined credentials
* Defines Start and End dates for the token validity (here, from 10 minutes ago, until in 100 minutes from now)
* Defines the container for which the token is to be created
* Creates a GUID as the file name for which to grant write access to
* Defines a shared access policy which combines permissions with start and end dates
* Generates a shared access signature (this is serverless, in the SDK) and assembles this into a URL
* Returns a JSON structure containing information on how to access the storage (hypermedia-like)

For more information on how to actually try this out, see the link to a github sample below.

### Can I haz the codez?

My sample project can be found on github:

[https://github.com/DonMartin76/azure-storage-sas](https://github.com/DonMartin76/azure-storage-sas)

Have fun!
