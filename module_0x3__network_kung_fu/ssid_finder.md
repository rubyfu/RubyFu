# SSID Finder

It's good to know how you play with a lower level of Ruby socket and see how powerful it's. As I've experienced, it's a matter of your knowledge about the protocol you're about to play with. I've tried to achieve this mission using `Packetfu` gem, but it's not protocol aware, yet. So I fired-up my Wireshark and start inspecting the wireless beacon structure and checked how to go even deeper with Ruby socket to lower level socket not just playing with TCP and UDP sockets.

The main task was 
- Go very low level socket(Layer 2)
- Receive every single packet no matter what protocol is it
- Receive packets as raw to process it as far as I learn from wireshark 

I went through all mentioned references below and also I had a look at `/usr/include/linux/if_ether.h` which gave me an idea about `ETH_P_ALL` meaning and more. I addition, `man socket` was really helpful to me.

**Note: **The Network card interface must be set in monitoring mode, to do so (using airmon-ng)

```bash
# Run you network car on monitoring mode
airmon-ng start wls1

# Check running monitoring interfaces
airmon-ng
```

```ruby
#!/usr/bin/env ruby
require 'socket'

# Open a Soccket as (very low level), (receive as a Raw), (for every packet(ETH_P_ALL))
socket = Socket.new(Socket::PF_PACKET, Socket::SOCK_RAW, 0x03_00)

puts "\n\n"
puts "       BSSID       |       SSID        "  
puts "-------------------*-------------------"
while true
  # Capture the wire then convert it to hex then make it as an array
  packet = socket.recvfrom(2048)[0].unpack('H*').join.scan(/../)
  #
  # The Beacon Packet Pattern:
  # 1- The IEEE 802.11 Beacon frame starts with 0x08000000h, always!
  # 2- The Beacon frame value located at the 10th to 13th byte
  # 3- The number of bytes before SSID value is 62 bytes
  # 4- The 62th byte is the SSID length which is followed by the SSID string
  # 5- Transmitter(BSSID) or the AP MAC address which is located at 34 to 39 bytes 
  #
  if packet.size >= 62 && packet[9..12].join == "08000000"   # Make sure it's a Beacon frame
    ssid_length = packet[61].hex - 1                         # Get the SSID's length
    ssid  = [packet[62..(62 + ssid_length)].join].pack('H*') # Get the SSID 
    bssid = packet[34..39].join(':').upcase                  # Get THE BSSID
    
    puts " #{bssid}" + "    " + "#{ssid}"
  end
  
end
```


<br>
**References** - *very useful!*
- [raw_socket.rb](https://gist.github.com/k-sone/8036832#file-raw_sock-rb)
- [wifi_sniffer.rb](https://gist.github.com/amejiarosario/5420854)
- [packetter.rb](https://github.com/lrks/packetter/blob/master/ruby/packetter.rb)
- [Another git](https://gist.github.com/sam113101/aad031bcc50746956a29)
- [Programming Ruby1.9](http://media.pragprog.com/titles/ruby3/app_socket.pdf)
- [Rubydocs - class Socket](http://docs.ruby-lang.org/en/2.3.0/Socket.html)
- [Linux Kernel Networking – advanced topics (5)](http://www.haifux.org/lectures/217/netLec5.pdf)
- [PF_PACKET Protocol Family](http://curioushq.blogspot.com/2011/05/pfpacket-protocol-family.html)
- [Ruby Raw Socket for Windows](http://curioushq.blogspot.com/2011/05/ruby-raw-socket-for-windows.html)
