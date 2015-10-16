# Network Traffic Analysis

Pacap file  [Download pcap file](../files/packets.rb)
```
require 'packetfu'
packets = PacketFu::PcapFile.read_packets 'packets.pcap'

puts packets[452].payload       # Read pkt payload
```