# Network Traffic Analysis


```
require 'packetfu'
packets = PacketFu::PcapFile.read_packets 'packets.pcap'

puts packets[452].payload       # Read pkt payload
```