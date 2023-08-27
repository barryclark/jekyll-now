---
layout: post
title: Configure RBAC in Envoyproxy with whitelist Ip Address
---

pada tutorial ini bagaimana caranya membuat RBAC di envoy dengan whitelist IP Address yang ditentukan. 
rbac ini berada pada HTTP-HTTP Filters. dengan menambahkan envoy.filters.http.rbac dengan typed config ```type.googleapis.com/envoy.extensions.filters.http.rbac.v3.RBAC```


filter RBAC ini berada di posisi paling atas dibawah HTTP Router. 


```bash
                    name: envoy.filters.http.rbac
                    typed_config:
                      "@type": type.googleapis.com/envoy.extensions.filters.http.rbac.v3.RBAC
                      matcher:
                        matcher_tree:
                          input:
                            name: ip
                            typed_config:
                              "@type": type.googleapis.com/envoy.extensions.matching.common_inputs.network.v3.SourceIPInput
                          custom_match:
                            name: ip-matcher
                            typed_config:
                              "@type": type.googleapis.com/xds.type.matcher.v3.IPMatcher
                              range_matchers:
                                - ranges:
                                  - address_prefix: 10.0.0.0
                                    prefix_len: 32
                                  on_match:
                                    action:
                                      name: envoy.filters.http.rbac.action
                                      typed_config:
                                        "@type": type.googleapis.com/envoy.config.rbac.v3.Action
                                        name: internal
                                        action: ALLOW
                        on_no_match:
                          action:
                            name: action
                            typed_config:
                              "@type": type.googleapis.com/envoy.config.rbac.v3.Action
                              name: allow-request
                              action: DENY
```

 config filter RBAC ini bersifat global artinya listener yang ditentukan pasti akan terfilter. filtr ini bisa juga menambahkan lebih dari 1 blok IP Address.

##### _Disclaimer_
_Opinions expressed are solely my own and do not express the views or opinions of my employer._
