---
id: 469
title: "Error: UPGRADE FAILED: cannot patch &#8220;release&#8221; with kind Ingress: Internal error occurred: failed calling webhook &#8220;validate.nginx.ingress.kubernetes.io&#8221; \_context deadline exceeded"
date: '2022-02-11T00:52:44+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=469'
permalink: '/?p=469'
categories:
    - Uncategorized
---

This will be a quick post on resolving the error:

```
<pre class="wp-block-code">```
Error: UPGRADE FAILED: cannot patch "<helm release name>" with kind Ingress: Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": Post "https://nginx-ingress-controller-admission.nginx-ingress.svc:443/networking/v1beta1/ingresses?timeout=10s": context deadline exceeded
```
```

We noticed this happening often when creating new ingress controllers via helm. Then nginx-ingress helm chart installs a validating webhook controller with a timeout value configured.

<figure class="wp-block-image size-full is-style-default">![](https://geekyryan.com/wp-content/uploads/2022/02/image-6.png)</figure>To resolve this error, simply increase the timeout on the validating webhook configuration. The value can be 1 – 30.

<https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#timeouts>

<figure class="wp-block-image size-full is-style-default">![](https://geekyryan.com/wp-content/uploads/2022/02/image-5.png)</figure>If 30 seconds is not enough, you can set the ‘failurePolicy’ in the manifest to ‘ignore’.

More info can be found here:

<https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#failure-policy>