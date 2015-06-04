---
layout: post
title: Serve gzip-compressed files via CloudFront-S3-bucket
tags: [s3, cloud-front]
---

Downloading files from server during a web-browser session can be a time-consuming task. Therefore, you should try to keep the size of the served pages and assets as small as possible. File compression is one approach, which can help you here. Normally, you first would need to compress a file and then let a web-browser know that the files in a reponse are compressed. With a [CloudFront](http://aws.amazon.com/cloudfront/){:target="_blank"}-distribution, you don't have access to a web-sever configuration, where you could do this. For this reason, you need to set the response meta-data differently.

## Compress files

With a [CloudFront](http://aws.amazon.com/cloudfront/){:target="_blank"}-distribution, you need to compress files locally and afterwards move them to your [S3](http://aws.amazon.com/s3/){:target="_blank"}-bucket (if you are using [S3](http://aws.amazon.com/s3/){:target="_blank"} for your single point of storage for your web-files). The compression is done with [gzip](http://www.gzip.org/){:target="_blank"}, which is already installed on many linux-distributions by default. If [gzip](http://www.gzip.org/){:target="_blank"} isn't available on your development enviroment, you can easily install it.

{% highlight bash %}
$ sudo apt-get install gzip
{% endhighlight %}

For the compression of the actual files, we first try to locate any appropriate file within a folder, compress them and afterwards save them with the same file-name.

**NOTE:** Compression wit [gzip](http://www.gzip.org/){:target="_blank"} mainly makes sense for text-based files like JavaScript-files, HTML or CSS-sytlesheets. Images should be compressed differently.

{% highlight bash %}
$ SITE_FOLDER='/home/flo/aws-blog.io/_site'
$ find $SITE_FOLDER \( -iname '*.html' -o -iname '*.htm' -o -iname '*.css' -o -iname '*.js' -o -iname '*.xml' -o -iname '*.txt' \) -exec gzip -9 -n {} \; -exec mv {}.gz {} \;
{% endhighlight %}

You now have a folder with compressed text-based files, which means they need to get served with a certain response-header, so that web-browsers can display them properly.

## Adjust meta-data

Now you need to tell a web-browser that certain files are gzip-compressed. This is set in the response-header. For files stored on [S3](http://aws.amazon.com/s3/){:target="_blank"}, this is done by setting the file's metadata.

### Adjustment during upload

For this approach to get applied, just add **--content-encoding 'gzip'** as an argument to your sync-command. If you e.g. want to sync a local folder to a [S3](http://aws.amazon.com/s3/){:target="_blank"}-bucket, you need to execute following statement.

{% highlight bash %}
$ aws s3 sync /home/flo/aws-blog.io/_site s3://aws-blog.io --content-encoding 'gzip'
{% endhighlight %}

### Adjustment after upload

If your compressed files are already on [S3](http://aws.amazon.com/s3/){:target="_blank"}, you need to make a temporary copy of the concerning bucket and then again write the files back, while setting the content encoding.

{% highlight bash %}
$ mkdir /tmp/aws-blog.io-temp
$ aws s3 sync s3://aws-blog.io.temp /tmp/aws-blog.io-temp --exclude '*.*' --include '*.html' --include '*.htm' --include '*.css' --include '*.js' --include '*.xml' --include '*.txt'
$ aws s3 rm --recursive s3://aws-blog.io --exclude '*.*' --include '*.html' --include '*.htm' --include '*.css' --include '*.js' --include '*.xml' --include '*.txt'
$ aws s3 sync /tmp/aws-blog.io-temp s3://aws-blog.io --content-encoding 'gzip'
{% endhighlight %}

## Image pre-compression

For images, there's a nicer way for compression than gzip. If you're interessted in compressing images to it's maximum - either lossy or lossless - I'd suggest to have a look at [kraken](http://kraken.io){:target="_blank"}. That web-application gives you the oppurtunity to compress images either via a free web-interface or a paid API-call.
