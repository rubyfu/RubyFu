# Network Traffic Analysis

## Basic PCAP File Parsing

```ruby
require 'packetfu'
packets = PacketFu::PcapFile.read_packets 'packets.pcap'
```

Download [packets.pcap](https://github.com/rubyfu/RubyFu/blob/master/files/module06/packets.pcap) file.

### Find FTP Credentials

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

Download [ftp.pcap](https://github.com/rubyfu/RubyFu/blob/master/files/module06/ftp.pcap) file

## Capturing and building PCAP file

Sometime we don't have the time or option to install external liberaries on our environment. Let's work capture all packets on all interfaces then see how to build a [**pcap**](https://wiki.wireshark.org/Development/LibpcapFileFormat) file to write in it.

```ruby
#!/usr/bin/env ruby
#
# KING SABRI | @KINGSABRI
#
require 'socket'

class Pcap

  def initialize(pcap_file)
    @pcap_file = open(pcap_file, 'wb')
    # Pcap Global https://wiki.wireshark.org/Development/LibpcapFileFormat#Global_Header
    global_header = [
        0xa1b2c3d4,   # magic_number: used to identify pcap files
        2,            # version_major
        4,            # version_minor
        0,            # thiszone
        0,            # sigfigs
        65535,        # snaplen
        1             # network (link-layer), 1 for Ethernet
    ].pack('ISSIIII')
    @pcap_file.write global_header
  end

  def write(data)
    time_stamp  = Time.now.to_f.round(2).to_s.split('.').map(&:to_i)
    data_length = data.length
    # Pcap Record (Packet) Header: https://wiki.wireshark.org/Development/LibpcapFileFormat#Record_.28Packet.29_Header
    packet_header = [
        time_stamp[0],   # ts_sec timestamp seconds
        time_stamp[1],   # ts_usec timestamp microseconds
        data_length,     # incl_len the number of bytes of packet data actually captured
        data_length      # orig_len the length of the packet as it appeared on the network when it was captured
    ].pack('IIII')
    record = "#{packet_header}#{data}"
    @pcap_file.write(record)
  rescue
    @pcap_file.close
  end
end 

pcap   = Pcap.new(ARGV[0])
socket = Socket.new(Socket::PF_PACKET, Socket::SOCK_RAW, 0x03_00)
loop do
  raw_data = socket.recvfrom(65535)[0]
  pcap.write raw_data
end
```

&lt;!--  
[http://www.behindthefirewalls.com/2014/01/extracting-files-from-network-traffic-pcap.html](http://www.behindthefirewalls.com/2014/01/extracting-files-from-network-traffic-pcap.html)

[http://jarmoc.com/blog/2013/05/22/bsjtf-ctf-writeup-what-in-the-name-of-zeus/](http://jarmoc.com/blog/2013/05/22/bsjtf-ctf-writeup-what-in-the-name-of-zeus/)

[http://hamsa.cs.northwestern.edu/readings/password-cracking2/](http://hamsa.cs.northwestern.edu/readings/password-cracking2/)  
--&gt;

&lt;!--

# !/usr/bin/env ruby

\#

# [https://www.youtube.com/watch?v=owsr3X453Z4](https://www.youtube.com/watch?v=owsr3X453Z4)

require 'packetfu'  
require 'pp'

capture = PacketFu::Capture.new :iface =&gt; 'mon0', :promisc =&gt; true, :start =&gt; true

capture.stream.each do \|p\|

pkt = PacketFu::Packet.parse p  
  pp pkt  
end

###### \

# array 56

include PacketFu  
packets = PcapFile.file\_to\_array '/home/KING/wireless.pcap'

packets.each_with\_index do \|packet , ref\|  
  puts "_" _ 75  
  puts "Reference:  \#{ref}"  
  puts "\_" \_ 75

pkt = Packet.parse\(packet\)  
  puts pkt.dissect  
  sleep 2

end

###### \

packets = PcapFile.read\_packets '/home/KING/wireless.pcap'  
packet = packets\[56\]  
pkt = Packet.parse\(packet\)  
puts pkt.inspect\_hex

=begin  
1876  
1551  
1550  
1339  
1324  
459  
458  
=end  
---&gt;

