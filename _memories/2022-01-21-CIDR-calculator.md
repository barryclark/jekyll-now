---
layout: memory
title: CIDR Calculator (Python) 
---

This tiny Python script helps to derive netmask, netmask in binary, number of hosts, network- and host bits from a passed ip address with CIDR range. To make
the life a little easier there is an optional pretty print option. Otherwise jq or fx are nice to prettify the JSON.

Long Story short, here's the code:

```python
import argparse
import json
import re


valid_ip = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/([0-3]?[0-9])$"

def netmask(cidr, pretty_print):

	if not re.match(valid_ip, cidr):
		return json.dumps({'error': '{0} is an invalid IP address'.format(cidr)})

	net_bits = int(cidr[cidr.find('/')+1:])
	num_host_bits = 32 - net_bits
	addr_bits = list(('1'*int(net_bits)).zfill(32))
	addr_bits.reverse()
	host_bits = "".join(addr_bits)
	num_hosts = 2**num_host_bits

	mask_vals = [128, 64, 32, 16, 8, 4, 2, 1]

	full_octets = int(net_bits/8)
	netmask = '255.' * full_octets
	remaining_bits = net_bits - (full_octets*8)

	if remaining_bits > 0:
		mask = sum(mask_vals[:remaining_bits])
		netmask = netmask + str(mask) + '.'

	netmask = netmask + '0.' * abs((4-(len(netmask.split('.'))-1)))

	netmask = netmask[:-1]

	d = {'cidr': cidr,
		 'netmask': netmask,
		 'netmask_binary': host_bits,
		 'num_hosts': num_hosts,
		 'network_bits': net_bits,
		 'host_bits': num_host_bits,
	}

	return json.dumps(d, indent=4, sort_keys=True) if pretty_print else json.dumps(d)

def str2bool(v):
    if isinstance(v, bool):
        return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError('Boolean value expected.')
    
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="CIDR Calculator to derive netmask, netmask \
                                     in binary, number of hosts, network- and host bits from a passed ip address with CIDR range")
    parser.add_argument("ip", help='(string) IP-Address with CIDR range e.g. 1.2.3.4/16')
    parser.add_argument("--pretty", type=str2bool, nargs='?', const=True, default=False, help="Pretty print the output JSON")
    args = parser.parse_args()
    print(netmask(args.ip, args.pretty))
```
