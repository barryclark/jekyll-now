#!/bin/bash

# settings
HOSTNAME=$(hostname -s)
DOMAIN="aws-blog.io"

# get external ip-address
ip_address=$(dig -4 @resolver1.opendns.com -t a myip.opendns.com +short)

# update dns-entry
cli53 rrcreate $DOMAIN $HOSTNAME A $ip_address --ttl 120 --replace
