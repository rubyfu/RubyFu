# Network Traffic Analysis

## Basic Reading PCAP File
Pacap file  [Download pcap file](https://github.com/rubyfu/RubyFu/blob/Contributions/files/module06/packets.pcap)

```ruby
require 'packetfu'
packets = PacketFu::PcapFile.read_packets 'packets.pcap'
```



## Find FTP Credentials 

Download [ **ftp.pcap**](https://github.com/rubyfu/RubyFu/blob/Contributions/files/module06/ftp.pcap) file

```ruby
#!/usr/bin/env ruby
require 'packetfu'

pcap_file = ARGV[0]
packets = PacketFu::PcapFile.read_packets pcap_file

packets.each_with_index do |packet, i|
  if packet.tcp_dport == 21
    if packet.payload.match(/(USER|PASS)/)
      src = [packet.ip_src].pack('N').unpack('C4').join('.')
      dst = [packet.ip_dst].pack('N').unpack('C4').join('.')
      puts "#{src} => #{dst}"
      print packet.payload
    end
  end
end
```
Returns
```
192.168.2.127 => 192.168.2.128
USER ayoi
192.168.2.127 => 192.168.2.128
PASS kambingakuilang
```


<!--
http://www.behindthefirewalls.com/2014/01/extracting-files-from-network-traffic-pcap.html

http://jarmoc.com/blog/2013/05/22/bsjtf-ctf-writeup-what-in-the-name-of-zeus/

http://hamsa.cs.northwestern.edu/readings/password-cracking2/
-->

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