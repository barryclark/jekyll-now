---
layout: post
title: "A multi-tenant cache solution with Memcache and Python"
---

Hello! This is my first technical post in the site. I wanted to write something about what I am doing and even that this solution tries to overcome a single use case, it was very useful for me.

## The use case

While developing a microservice for a Cloud-based solution, I came across the need to use a *Memcached* cluster to cache some request responses. Simply put, I discovered that I had two problems while using *flask-caching* (based in *Werkzeug* cache module) and the *Memchached* cache:

1. You can use a key prefix when you create the MemcachedCache client in your code to separate the different application caches inside the cluster. But my surprise was that this doesn't mean that you can clear your cache without affecting other applications. If you do *clear()*, the entire cache is dead. --> **Not very multi-application**
2. The only way of caching resources from different tenants inside an application is to include the tenant in the key. That's logical. But again, that doesn't mean that you are capable of removing part of your application cache. Even if your cluster is used only for your application, if one of your tenants updates its data and you need to invalidate its cache, all data stored in the cache will be lost. --> **Not very multi-tenant**

## Solution

We can overcome both of these problems with a few lines of application code. I thought of forking the *flask-caching* library to provide the solution as library code. But I think that another library for this is not worth it and if you need the use case, you can add the logic in the application side.

*Disclaimer: I will work with the multi-tenant example. You can do exactly the same for a multi-application use case. In addition, you can do both things at the same time.*

We will base ourselves in a simple concept: we will store a **namespace** value in the cache for each of our tenants.

```python
def get_namespace_value(tenant_id):
    """
    Get namespace current value.
    :param tenant_id: tenant id
    :return: namespace current value.
    """
    stored_namespace = CACHE.get("namespace:{}".format(tenant_id))
    namespace_value = int(stored_namespace) if stored_namespace is not None else 0
    CACHE.set("namespace:{}".format(tenant_id), namespace_value, timeout=TIMEOUT)
    return namespace_value
```

The first time we need to store something in the cache, we will set the namespace value to 0 and we will add this value with the key. 

```python
def set_cache(tenant_id, key, value):
    """
    Sets data to cache.
    :param tenant_id: tenant id
    :param key: key to use for caching
    :param value: value to cache
    :return:
    """
    CACHE.set("{}:{}/{}".format(
        tenant_id, get_namespace_value(tenant_id), key
    ), value, timeout=TIMEOUT)
```

Each time we need one key we will first get the *namespace* value first and add it to the query. 

```python
def get_cache(tenant_id, key):
    """
    Get data from cache
    :param key: key used for caching
    :param tenant_id: tenant id
    :return: tenant data in cache or None if empty
    """
    return CACHE.get("{}:{}/{}".format(
        tenant_id, get_namespace_value(tenant_id), key
    ))
```

And what happens if we need to invalidate the cache for the tenant? We add 1 to the namespace value.

```python
def clear_cache(tenant_id):
    """
    Clear cache in Memcache only for tenant data.
    Using a incremental namespace value avoid using .clear(),
    that flushes the complete cache.
    :param tenant_id: tenant id
    :return:
    """
    namespace_value = get_namespace_value(tenant_id)
    CACHE.set("namespace:{}".format(tenant_id), namespace_value+1, timeout=TIMEOUT)
```

## Try it yourself

### Requirements

- [Docker](https://www.docker.com/).
- Python 2/3 with the following requirements:
```
python-memcached==1.59
Werkzeug==0.15.5
```
### Steps

1. You can try this solution easily using a Docker image. You will have a Memchached server running and listening through your 11211 port.
```
sudo docker run -itd --name memcached -p 11211:11211 -e MEMCACHED_MEMUSAGE=32 rbekker87/memcached:alpine
```

2. You can use this Gist that contains the entire code and a simple demostration.

{% gist 95fdd81045b04ea141403d76e48bc158 %}

3. Run the code with ```python multi_tenant_cache.py``` and you should see:
```
Setting Lisboa cache...
Lisboa cached /info is: 2 days
Setting Barcelona cache...
Barcelona cached /info is: 3 days
Clearing Barcelona cache...
Barcelona cached /info is: None
Lisboa cached /info is: 2 days
```

*****

### References
* Memcached Docker image: [https://sysadmins.co.za/dockerizing-a-memcached-server-for-docker-on-alpine/](https://sysadmins.co.za/dockerizing-a-memcached-server-for-docker-on-alpine/)
* Werkzeug Cache: [https://werkzeug.palletsprojects.com/en/0.14.x/contrib/cache/](https://werkzeug.palletsprojects.com/en/0.14.x/contrib/cache/)
