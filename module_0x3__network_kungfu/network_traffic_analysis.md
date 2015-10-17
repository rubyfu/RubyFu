# Network Traffic Analysis

Pacap file  [Download pcap file](../files/packets.rb)
```
require 'packetfu'
packets = PacketFu::PcapFile.read_packets 'packets.pcap'

puts packets[452].payload       # Read pkt payload
```


<!---
#!/usr/bin/env ruby
#
#https://www.youtube.com/watch?v=owsr3X453Z4
require 'packetfu'
require 'pp'


capture = PacketFu::Capture.new :iface => 'mon0', :promisc => true, :start => true

capture.stream.each do |p|

  pkt = PacketFu::Packet.parse p
  pp pkt
end



##########################

# array 56
include PacketFu
packets = PcapFile.file_to_array '/home/KING/wireless.pcap'

packets.each_with_index do |packet , ref|
  puts "_" * 75
  puts "Reference:  #{ref}"
  puts "_" * 75

  pkt = Packet.parse(packet)
  puts pkt.dissect
  sleep 2

end


##########################

packets = PcapFile.read_packets '/home/KING/wireless.pcap'
packet = packets[56]
pkt = Packet.parse(packet)
puts pkt.inspect_hex

=begin
1876
1551
1550
1339
1324
459
458
=end


--->