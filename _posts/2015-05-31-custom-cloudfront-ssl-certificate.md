---
layout: post
title: Custom CloudFront SSL-certificate
tags: [cloud-front]
---

The technology SSL is being used for encrypting the traffic between webserver and browser. SSL is implemented in HTTPS. [CloudFront](http://aws.amazon.com/cloudfront/){:target="_blank"} supports HTTPS out of the box, but that is limited to *.cloudfront.net-domain names, because a SSL-certificate checks its validity mainly according to the requested domain name. If you want to use a custom CNAME for your CloudFront-distribution and also have your content being served via HTTPS, a custom SSL-certificate for the specified CNAME is needed.

## Possible Concepts

### HTTP only, Custom CNAME

Depending on the content you want to serve via [CloudFront](http://aws.amazon.com/cloudfront/){:target="_blank"}, this might be a valid concept. An example could perhaps be a static website, with no confidential information like e.g. a maintenance-page, which is only displayed during a maintenance-window of some IT-infrastructure.

**Conclusion:** could be valid, mustn't contain input-data

### HTTPS only, No custom CNAME

With this alternative, you will have in your website's HTML-code a mixture of own-domain and *.cloudfront.net resources. I think this could also affect your SEO-rating of your resources, as for a crawler they are not hosted within your premises anymore.

**Conclusion:** valid concept, does feel a little bit unprofessional

### HTTPS for source webpage, Custom CNAME, HTTP for CloudFront-distribution

In a situation like this, your website's security validation e.g. as displayed by Chrome with the green overlay for the http-field in the address-bar turns into a warning. This is due to some resources of your actually encrypted webpage are non-encrypted. For me as a user, a webpage with a warning does feel strange, although it's more secure than a totally unencrypted web-session.

**Conclusion:** don't do it

### HTTPS only, Custom CNAME, Custom SSL-Certificate

Here we have the option that we want to achieve. Everything during a web-session is encrypted, for a crawler it seems like all resources are within our premises and a browser displays a valid state for the connection. After you have read this post, you will be able to set up this concept for [CloudFront](http://aws.amazon.com/cloudfront/){:target="_blank"}.

**Conclusion:** most professional option, favorite

## Obtain a SSL-certificate

You can get a commercial SSL-certificate from quite a lot of places like [GoDaddy](https://godaddy.com){:target="_blank"}, [namecheap](https://www.namecheap.com){:target="_blank"} or [SSLShopper](https://www.sslshopper.com){:target="_blank"}. For a non-commercial project you can also get your SSL-certificate for free from [StartSSL](https://startssl.com/){:target="_blank"}. For this post, I did chose [StartSSL](https://startssl.com/){:target="_blank"} as it's totally for free.

**NOTE:** only SSL-certificates of up to 2048 Bit are currently supported by [CloudFront](http://aws.amazon.com/cloudfront/){:target="_blank"}. You might be able to import a 4096 Bit SSL-certificate, but you can't later on apply it to a distribution.

1. Go to [StartSSL](https://startssl.com/){:target="_blank"} and register for an account. You can get there by clicking on 'Control Panel' and the 'Express Lane'
2. When asked for security grade, chose '2048 High Grade'
3. Click on 'Certificates Wizard' and select 'Web Server SSL/TLS Certificate'
4. Save the public key to aws-blog.io.crt
5. Save the private key to aws-blog.io.key
6. Download the intermediate and root public certificates and combine them into one package. These steps can be done with following command.

{% highlight bash %}
$ cd /tmp
$ wget https://www.startssl.com/certs/sub.class1.server.ca.pem
$ wget https://www.startssl.com/certs/ca.pem
$ cat sub.class1.server.ca.pem > startssl-chain.pem
$ cat ca.pem >> startssl-chain.pem
{% endhighlight %}

## Import SSL-certificate

Now that you have a valid SSL-certifcate and the signing-chain in one package, you can start the actual uploading process.

{% highlight bash %}
aws iam upload-server-certificate --server-certificate-name aws-blog.io --certificate-body file://aws-blog.io.crt --private-key file://aws-blog.io.key --certificate-chain file://startssl-chain.pem --path /cloudfront/aws-blog.io/
{% endhighlight %}

**NOTE:** The **--path** argument needs to start with '**/cloudfront/**'. Otherwise, you can't find or use it for a CloudFront-distribution.

## Update CloudFront-distribution

First, you need to export your current distribution config. If you're unsure how to do that, you can have a look at one of my other posts on [creating a CloudFront-distribution](/2015/create-cloudfront-distribution/). The exported distribution of e.g. this blog looks like the following JSON-file.

{% highlight bash %}
$ aws cloudfront get-distribution-config --id E11QXXXXXXXXXX --output json | jq '. | .DistributionConfig' > aws-blog.io-distribution.json
$ cat aws-blo.io-distribution.json
{
  "Comment": "",
  "CacheBehaviors": {
    "Quantity": 0
  },
  "Logging": {
    "Bucket": "",
    "Prefix": "",
    "Enabled": false,
    "IncludeCookies": false
  },
  "Origins": {
    "Items": [
      {
        "OriginPath": "",
        "CustomOriginConfig": {
          "OriginProtocolPolicy": "http-only",
          "HTTPPort": 80,
          "HTTPSPort": 443
        },
        "Id": "custom-aws-blog.io.s3-website.eu-central-1.amazonaws.com",
        "DomainName": "aws-blog.io.s3-website.eu-central-1.amazonaws.com"
      }
    ],
    "Quantity": 1
  },
  "DefaultRootObject": "index.html",
  "PriceClass": "PriceClass_All",
  "Enabled": true,
  "DefaultCacheBehavior": {
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "TargetOriginId": "custom-aws-blog.io.s3-website.eu-central-1.amazonaws.com",
    "ViewerProtocolPolicy": "allow-all",
    "ForwardedValues": {
      "Headers": {
        "Quantity": 0
      },
      "Cookies": {
        "Forward": "none"
      },
      "QueryString": false
    },
    "SmoothStreaming": false,
    "AllowedMethods": {
      "Items": [
        "GET",
        "HEAD"
      ],
      "CachedMethods": {
        "Items": [
          "GET",
          "HEAD"
        ],
        "Quantity": 2
      },
      "Quantity": 2
    },
    "MinTTL": 0
  },
  "CallerReference": "Mon May 25 21:43:53 CEST 2015",
  "ViewerCertificate": {
    "CloudFrontDefaultCertificate": true,
    "MinimumProtocolVersion": "SSLv3"
  },
  "CustomErrorResponses": {
    "Quantity": 0
  },
  "Restrictions": {
    "GeoRestriction": {
      "RestrictionType": "none",
      "Quantity": 0
    }
  },
  "Aliases": {
    "Items": [
      "aws-blog.io"
    ],
    "Quantity": 1
  }
}
{% endhighlight %}

When you have exported the distribution-config, you need to look for the ID of the previously uploaded SSL-certificate. That ID can be found with the following command for a certificate named **aws-blog.io**.

{% highlight bash %}
$ aws iam list-server-certificates --output text --query "ServerCertificateMetadataList[?ServerCertificateName=='aws-blog.io'].{IAMCertificateId: ServerCertificateId}"
ASCAJLZPIDTXXXXXXXXXX
{% endhighlight %}

Edit the exported distribution-config JSON-file and insert the statements for enabling the SSL-certificate usage, as well as the IAMCertificateID.

{% highlight bash %}
$ json -I f- aws-blog.io-distribution.json -e 'this.ViewerCertificate = {}'
json: updated "aws-blog.io-distribution.json" in-place
$ json -I -f aws-blog.io-distribution.json -e 'this.ViewerCertificate.SSLSupportMethod = "sni-only"'
json: updated "aws-blog.io-distribution.json" in-place
$ json -I -f aws-blog.io-distribution.json -e 'this.ViewerCertificate.MinimumProtocolVersion = "TLSv1"'
json: updated "aws-blog.io-distribution.json" in-place
$ json -I -f aws-blog.io-distribution.json -e 'this.ViewerCertificate.IAMCertificateId = "ASCAJLZPIDTXXXXXXXXXX"'
{% endhighlight %}

The last step in order to have a custom SSL-certificate for your CloudFront-distribution is to actually apply the changes. Therefore you need to update the distribution config, which is done by the following commands.

{% highlight bash %}
$ aws cloudfront get-distribution-config --id E11QXXXXXXXXXX --query "{ETag: ETag}"
E33RXXXXXXXXXX
$ aws cloudfront update-distribution --id E11QXXXXXXXXXX --if-match E33RXXXXXXXXXX --distribution-config file://aws-blog.io-distribution.json
{% endhighlight %}

This actions make take some minutes to get fully applied within the CloudFront-distribution. In order to check the state of all distributions, you can use the the statement below.

{% highlight bash %}
$ aws cloudfront list-distributions --query "DistributionList.Items[*].{Domain: join(', ', Aliases.Items), DistributionID: Id, Status: Status}" --output table
{% endhighlight %}
