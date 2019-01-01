---
layout: default
permalink: /CodeBreaker-2018-Task-5/
title: NSA Codebreaker 2018, Task 5
---

Task 5 asks us to determine what IPs on 10.130.0.0/16 have been compromised, based on the victim ids we found in task 4. 

The TOTP that each contract originally used to for authentication needs to be found, otherwise there are 2^16 IP addresses and  10^6 TOTPs to check, 65,536,000,000 combinations. Below is the general flow when a victim is compromised, further details can be found [here](https://armerj.github.io/CodeBreaker-2018-Contract/).  

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/contract/contract_deployment.png)

Fortunately, we can take advantage of the way the Registry contract communicates with the off chain oracle. When a Ransom contract registers the Registry contract will emit an AuthEvent, step 5, for the off chain oracle to validate the provided arguments. Events emitted by a contract can be searched, allowing us to recover the TOTPs. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_5/event_code.png)

The Registry contract serves multiple Escrow contracts, so the blocks to check for events need to be limited. This can be done by looking at the last AuthCallbackEvent emitted by the Escrow Contract and only searching upto that block. 

{% highlight python %}
authCallback_filter = escrow.eventFilter('AuthCallbackEvent', {'fromBlock' : 0, 'toBlock' : 'latest'})
authCallback_events = authCallback_filter.get_all_entries()
authCallback_events[12]
{% endhighlight %}

Now we can get all AuthEvents for block 0 to 13000. 

![_config.yml]({{ site.baseurl }}/images/Codebreaker_2018/Task_5/ransom_otps.png)

Below is the code to check if an IP has been compromised. 
{% highlight python %}
otps = [215101, 365630, 70188, 62999, 13101, 812754, 837966, 637429, 920579, 565044]
vic_ids = [41104295052609710489876817339063368457051087978980658748165354102064406814475,
85629548258931642040262789841388823594590514300256475050520076724017815239842,
85402434306967368280708230822436388255729734661462584185721502343804030776925,
26615690620047910991327666667239101076388306435959605547421378163809938016038,
60030338604094415523578801712964751579814468946521464111107514354867282420626,
100980753440320141426878792700624109308848623856071265721050825517438061175704,
104607482492088112680173790322227256975342218568426393686663212133594158786985,
104336064021278470541441057366217699426662508496455502584992762213775276832181,
86509661284163094682397919393400916732946583273857404776043368719438749718339,
16249527366241831958886497263954973976870926424731971619365143396340146388438]

def get_ip(num):
    t = num % 16777216
    ip = str(int(num / 16777216)) + '.'
    ip += str(int(t / 65536)) + '.'
    t = t % 65536
    ip += str(int(t / 256)) + '.'
    t = t % 256
    ip += str(t)
    return ip

startip = (10 * 16777216) + (130 * 65536)
endip = (10 * 16777216) + (131 * 65536)
key = base64.b32decode('7P57CDMIUWYV5BMHT3C7HIGJOYRLDVZT')
vic_ids_hex = []
for id in vic_ids:
    vic_ids_hex.append(hex(id)[2:])
for ip in range(startip, endip):
    for otp in otps:
        hmac = HMAC.new(key, digestmod=SHA256)
        mes = ip.to_bytes(4, 'big') + "{:06}".format(otp).encode('latin1')
        hmac.update(mes)
        temp_id = hmac.hexdigest()
        if temp_id in vic_ids_hex:
            print(temp_id)
            print(ip)
            print(get_ip(ip))
            print('----------------')
{% endhighlight %}

