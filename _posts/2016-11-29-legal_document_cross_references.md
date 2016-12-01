---
layout: post
title: Legal Document Cross References
author: David Nadeau
---

The first Innodata web service allows cross references to law and rule books within legal documents to be annotated. 

The machine learning engine behind the scenes is a deep neural network that has been trained on a few public collections of legal documents. 


## Authentication

Sign up on our [developer portal](https://developer.innodatalabs.com/) to get your API key.


## Overview

![API data flow](https://github.com/innodatalabs/citable-reference/blob/master/docs/citable-reference-api.png "API diagram")

### 1. Post a document

Perform a POST operation at:
> http://api.innodatalabs.com/documents/input/{file}

Where:
* {file} is the filename you want to create (e.g., my-file.htm)
* request data contains the file content (the XML or HTML content)

Here's a sample CURL call (assuming there is a local file named 'my-file.htm' in the local directory):

    curl --request POST \
      --url http://api.innodatalabs.com/documents/input/my-file.htm \
      --header 'user-key: <your_key>' \
      --header 'content-type: application/octet-stream' \
      --data-binary "@OLM_002.htm"

Alternatively, the same can be achieved by passing the file content string directly:

    curl --request POST \
      --url http://api.innodatalabs.com/documents/input/my-file.htm \
      --header 'authorization: Basic YXBpZHJpdmVyOnRoaXNpc2F2ZXJ5dmVyeXNlY3JldGtleTc3Nzc=' \
      --header 'user-key: <your_key>' \
      --data '<html><body><h1>1. Hello</h1><p>a. Ola</p></body></html>'

This call returns a JSON response with filename and number of bytes:

	{"input_filename": "my-file.htm", "bytes_accepted": 56001}
  
  
### 2- Annotate the file

Perform a GET operation at:
> http://api.innodatalabs.com/reference/{file}

Where:
* {file} is the filename saved in step 1

Here's a sample CURL call:

    curl --request GET \
      --url 'http://api.innodatalabs.com/reference/my-file.htm' \
      --header 'user-key: <your_key>' \

This call returns immediatly, but **processing can take time!**. 

This call returns the name of output file and the URL to get progress information:

	{"output_filename": "<output_file>", "progress_uri": "/reference/status/<task_id>"}
  
### 3- Get Status information

See the current progress and ETA for reference extraction completion.

Perform a GET operation at:
> http://api.innodatalabs.com/reference/status/{task_id}

Here's a sample CURL call:

    curl --request GET \
      --url 'http://api.innodatalabs.com/reference/status/xyz-123' \
      --header 'user-key: <your_key>' \

This call returns the number of steps, as well as the current step (e.g., step 10 of 12):

  {"progress": 10, "steps": 12, "completed": false}

### 4- Fetch the output file (once operation completed)

Perform a GET operation at:
> http://api.innodatalabs.com/documents/output/{output_file}

Where {output_file} is the filename you want to read (e.g., my-file.htm.reference.xml).

Here's a sample CURL call:

    curl --request GET \
      --url http://api.innodatalabs.com/documents/output/my-file.htm.reference.xml \
      --header 'user-key: <your_key>' \

This call returns the file content with the cross-reference annotations!

