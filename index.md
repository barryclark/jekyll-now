### How to list the bridge devices in the node
```
root@worker-2:~# ip link show type bridge
4: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default
    link/ether 02:42:cf:e0:3d:e5 brd ff:ff:ff:ff:ff:ff
7: weave: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1376 qdisc noqueue state UP mode DEFAULT group default qlen 1000
    link/ether 7a:83:f5:5e:7b:30 brd ff:ff:ff:ff:ff:ff
root@worker-2:~#
```

### How to list the ports on a bridge
```
root@worker-2:~# ip link show master weave
10: vethwe-bridge@vethwe-datapath: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1376 qdisc noqueue master weave state UP mode DEFAULT group default
    link/ether 0e:00:f1:2c:00:5f brd ff:ff:ff:ff:ff:ff
13: vethweplbd8e10c@if12: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1376 qdisc noqueue master weave state UP mode DEFAULT group default
    link/ether 7a:c8:bf:39:55:e3 brd ff:ff:ff:ff:ff:ff link-netnsid 0
15: vethweplcc50bcc@if14: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1376 qdisc noqueue master weave state UP mode DEFAULT group default
    link/ether ea:1e:64:0b:7f:ca brd ff:ff:ff:ff:ff:ff link-netnsid 1
root@worker-2:~#
```

### How to list the IP of the bridge 
```
root@worker-2:~# ip address show weave
7: weave: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1376 qdisc noqueue state UP group default qlen 1000
    link/ether 7a:83:f5:5e:7b:30 brd ff:ff:ff:ff:ff:ff
    inet 10.32.0.1/12 brd 10.47.255.255 scope global weave
       valid_lft forever preferred_lft forever
    inet6 fe80::7883:f5ff:fe5e:7b30/64 scope link
       valid_lft forever preferred_lft forever
root@worker-2:~#
```

### How to list the routes defined for a device (E.g. weave bridge)
```
root@worker-2:~# ip route show dev weave
10.32.0.0/12 proto kernel scope link src 10.32.0.1
root@worker-2:~#
```
