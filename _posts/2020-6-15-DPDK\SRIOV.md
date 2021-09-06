---
layout: post
title: SR-IOV\DPDK
---

<sr-rd-desc data-reactid=".0.2">SR-IOV（Single Root I/O Virtualization）是一个将 PCIe 共享给虚拟机的标准，通过为虚拟机提供独立的内存空间、中断、DMA 流，来绕过 VMM 实现数据访问。</sr-rd-desc>

<sr-rd-content dangerouslysetinnerhtml="[object Object]" data-reactid=".0.3"><div tabindex="-1" role="main">
                        <div>

<div>
    <div>

                                <section>

                                <a href="#sr-iov"><i></i></a>
<p>SR-IOV（Single Root I/O Virtualization）是一个将 PCIe 共享给虚拟机的标准，通过为虚拟机提供独立的内存空间、中断、DMA 流，来绕过 VMM 实现数据访问。SR-IOV 基于两种 PCIe functions：</p>
<ul>
<li>PF (Physical Function)： 包含完整的 PCIe 功能，包括 SR-IOV 的扩张能力，该功能用于 SR-IOV 的配置和管理。</li>
<li>VF (Virtual Function)： 包含轻量级的 PCIe 功能。每一个 VF 有它自己独享的 PCI 配置区域，并且可能与其他 VF 共享着同一个物理资源</li>
</ul>
<p></p><div class="sr-rd-content-center"><img class="" src="https://feisky.gitbooks.io/sdn/images/14765271520676.png"></div><p></p>
<h2 id="sr-toc-0"><a name="sr-iov要求" href="#sr-iov要求"><i aria-hidden="true"></i></a>SR-IOV 要求</h2>
<ul>
<li>CPU 必须支持 IOMMU（比如英特尔的 VT-d 或者 AMD 的 AMD-Vi，Power8 处理器默认支持 IOMMU）</li>
<li>固件 Firmware 必须支持 IOMMU</li>
<li>CPU 根桥必须支持 ACS 或者 ACS 等价特性</li>
<li>PCIe 设备必须支持 ACS 或者 ACS 等价特性</li>
<li>建议根桥和 PCIe 设备中间的所有 PCIe 交换设备都支持 ACS，如果某个 PCIe 交换设备不支持 ACS，其后的所有 PCIe 设备只能共享某个 IOMMU 组，所以只能分配给 1 台虚机。</li>
</ul>
<h2 id="sr-toc-1"><a name="sr-iov-vs-pci-path-through" href="#sr-iov-vs-pci-path-through"><i aria-hidden="true"></i></a>SR-IOV vs PCI path-through</h2>
<p></p><div class="sr-rd-content-center"><img class="" src="https://feisky.gitbooks.io/sdn/images/14765293085020.jpg"></div><p></p>
<p></p><div class="sr-rd-content-center"><img class="" src="https://feisky.gitbooks.io/sdn/images/14765293165898.jpg"></div><p></p>
<p></p><div class="sr-rd-content-center"><img class="" src="https://feisky.gitbooks.io/sdn/images/14765293462966.jpg"></div><p></p>
<h2 id="sr-toc-2"><a name="sr-iov-vs-dpdk" href="#sr-iov-vs-dpdk"><i aria-hidden="true"></i></a>SR-IOV vs DPDK</h2>
<p></p><div class="sr-rd-content-center"><img class="" src="https://feisky.gitbooks.io/sdn/images/1-2.png"></div><p></p>
<p></p><div class="sr-rd-content-center"><img class="" src="https://feisky.gitbooks.io/sdn/images/2-2.png"></div><p></p>
<p></p><div class="sr-rd-content-center"><img class="" src="https://feisky.gitbooks.io/sdn/images/3-2.png"></div><p></p>
<h2 id="sr-toc-3"><a name="sr-iov使用示例" href="#sr-iov使用示例"><i aria-hidden="true"></i></a>SR-IOV 使用示例</h2>
<p>开启 VF：</p>
<pre>modprobe -r igb
<msreadoutspan class="msreadout-line-highlight msreadout-inactive-highlight">modprobe</msreadoutspan><msreadoutspan class="msreadout-line-highlight msreadout-inactive-highlight"> igb max_<msreadoutspan class="msreadout-word-highlight">vfs</msreadoutspan>=7
</msreadoutspan>echo "options igb max_vfs=7" &gt;&gt;/etc/modprobe.d/igb.conf

</pre>
<p>查找 Virtual Function： </p>
<pre>0b:00.0 Ethernet controller: Intel Corporation 82576 Gigabit Network Connection (rev 01)
0b:00.1 Ethernet controller: Intel Corporation 82576 Gigabit Network Connection(rev 01)
0b:10.0 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:10.1 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:10.2 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:10.3 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:10.4 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:10.5 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:10.6 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:10.7 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:11.0 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:11.1 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:11.2 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:11.3 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:11.4 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)
0b:11.5 Ethernet controller: Intel Corporation 82576 Virtual Function (rev 01)

pci_0000_0b_00_0
pci_0000_0b_00_1
pci_0000_0b_10_0
pci_0000_0b_10_1
pci_0000_0b_10_2
pci_0000_0b_10_3
pci_0000_0b_10_4
pci_0000_0b_10_5
pci_0000_0b_10_6
pci_0000_0b_11_7
pci_0000_0b_11_1
pci_0000_0b_11_2
pci_0000_0b_11_3
pci_0000_0b_11_4
pci_0000_0b_11_5

</pre>
<pre>$ virsh nodedev-dumpxml pci_0000_0b_00_0
&lt;device&gt;
   &lt;name&gt;pci_0000_0b_00_0&lt;/name&gt;
   &lt;parent&gt;pci_0000_00_01_0&lt;/parent&gt;
   &lt;driver&gt;
      &lt;name&gt;igb&lt;/name&gt;
   &lt;/driver&gt;
   &lt;capability type='pci'&gt;
      &lt;domain&gt;0&lt;/domain&gt;
      &lt;bus&gt;11&lt;/bus&gt;
      &lt;slot&gt;0&lt;/slot&gt;
      &lt;function&gt;0&lt;/function&gt;
      &lt;product id='0x10c9'&gt;82576 Gigabit Network Connection&lt;/product&gt;
      &lt;vendor id='0x8086'&gt;Intel Corporation&lt;/vendor&gt;
   &lt;/capability&gt;
&lt;/device&gt;

</pre>
<p><strong>通过 libvirt 绑定到虚拟机</strong></p>
<pre>$ cat &gt;/tmp/interface.xml &lt;&lt;EOF
&lt;interface type='hostdev' managed='yes'&gt;
     &lt;source&gt;
       &lt;address type='pci' domain='0' bus='11' slot='16' function='0'/&gt;
     &lt;/source&gt;
&lt;/interface&gt;
EOF
$ virsh attach-device MyGuest /tmp/interface. xml --live --config

</pre>
<p>当然也可以给网卡配置 MAC 地址和 VLAN：</p>
<pre>&lt;interface type='hostdev' managed='yes'&gt;
     &lt;source&gt;
       &lt;address type='pci' domain='0' bus='11' slot='16' function='0'/&gt;
     &lt;/source&gt;
     &lt;mac address='52:54:00:6d:90:02'&gt;
     &lt;vlan&gt;
        &lt;tag id='42'/&gt;
     &lt;/vlan&gt;
     &lt;virtualport type='802.1Qbh'&gt;
       &lt;parameters profileid='finance'/&gt;
     &lt;/virtualport&gt;
   &lt;/interface&gt;

</pre>
<p><strong>通过 Qemu 绑定到虚拟机</strong></p>
<pre>/usr/bin/qemu-kvm -name vdisk -enable-kvm -m 512 -smp 2 \
-hda /mnt/nfs/vdisk.img \
-monitor stdio \
-vnc 0.0.0.0:0 \
-device pci-assign,host=0b:00.0

</pre><h2 id="sr-toc-4"><a name="优缺点" href="#优缺点"><i aria-hidden="true"></i></a>优缺点</h2>
<p>Pros:</p>
<ul>
<li>More Scalable than Direct Assign</li>
<li>Security through IOMMU and function isolation</li>
<li>Control Plane separation through PF/VF notion</li>
<li>High packet rate, Low CPU, Low latency thanks to Direct Pass through</li>
</ul>
<p>Cons:</p>
<ul>
<li>Rigid: Composability issues</li>
<li>Control plane is pass through, puts pressure on Hardware resources</li>
<li>Parts of the PCIe config space are direct map from Hardware</li>
<li>Limited scalability (16 bit)</li>
<li>SR-IOV NIC forces switching features into the HW</li>
<li>All the Switching Features in the Hardware or nothing</li>
</ul>
<h2 id="sr-toc-5"><a name="参考文档" href="#参考文档"><i aria-hidden="true"></i></a>参考文档</h2>
<ul>
<li><a href="http://www.intel.com/content/www/us/en/embedded/products/networking/xl710-sr-iov-config-guide-gbe-linux-brief.html" target="_blank">Intel SR-IOV Configuration Guide</a></li>
<li><a href="https://wiki.openstack.org/wiki/SR-IOV-Passthrough-For-Networking" target="_blank">OpenStack SR-IOV Passthrough for Networking</a></li>
<li><a href="https://access.redhat.com/documentation/zh-CN/Red_Hat_Enterprise_Linux_OpenStack_Platform/7/html/Networking_Guide/sec-sr-iov.html" target="_blank">Redhat OpenStack SR-IOV Configure</a></li>
<li><a href="http://www.slideshare.net/nyechiel/sdn-fundamentals-for-nfv-open-stack-and-containers-red-hat-summit-20161" target="_blank">SDN Fundamentails for NFV, Openstack and Containers</a></li>
<li><a href="http://www.cnblogs.com/sammyliu/p/4548194.html" target="_blank">I/O 设备直接分配和 SRIOV</a></li>
<li><a href="http://wiki.libvirt.org/page/Networking#PCI_Passthrough_of_host_network_devices" target="_blank">Libvirt PCI passthrough of host network devices</a></li>
<li><a href="http://netdevconf.org/2.1/session.html?jain" target="_blank">Story of Network Virtualization and its future in Software and Hardware</a></li></ul></section></div></div></div></div></sr-rd-content>
