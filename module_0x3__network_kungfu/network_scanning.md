# Network Scanning

Ruby Socket Class Hierarchy 
```
IO
└── BasicSocket
    ├── IPSocket
    │   ├── TCPSocket
    │   │   ├── SOCKSSocket
    │   │   └── TCPServer
    │   └── UDPSocket
    ├── Socket
    └── UNIXSocket
        └── UNIXServer
```


```
IO
└── BasicSocket                 # Abstract base class for all socket classes
    ├── IPSocket                # Base class for protocols using the Internet Protocol (AF_INET)
    │   ├── TCPSocket           # Class for Transmission Control Protocol (TCP) sockets
    │   │   ├── SOCKSSocket     # 
    │   │   └── TCPServer       # Helper class for building TCP socket servers
    │   └── UDPSocket           # Class for User Datagram Protocol (UDP) sockets
    ├── Socket                  # 
    └── UNIXSocket              # Class providing IPC using the UNIX domain protocol (AF_UNIX)
        └── UNIXServer          # Helper class for building UNIX domain protocol socket servers
```




|    Class    	|  Description |
|:-----------:	|:-------------:	|
| BasicSocket 	|  left-aligned 	|
| IPSocket    	|    centered   	|
| TCPSocket   	| right-aligned 	|
| SOCKSSocket 	|               	|
| TCPServer   	|               	|
| UDPSocket   	|               	|
| Socket      	|               	|
| UNIXSocket  	|               	|
| UNIXServer  	|               	|
|             	|               	|
|             	|               	|


## Network ping sweeping
required gem
```
gem install net-ping
```


```ruby
#!/usr/bin/evn ruby
# KING SABRI | @KINGSABRI
require 'net/ping'

@icmp = Net::Ping::ICMP.new(ARGV[0])
rtary = []
pingfails = 0
repeat = 5
puts 'starting to ping'
(1..repeat).each do

    if @icmp.ping
        rtary << @icmp.duration
        puts "host replied in #{@icmp.duration}"
    else
        pingfails += 1
        puts "timeout"
    end
end
avg = rtary.inject(0) {|sum, i| sum + i}/(repeat - pingfails)
puts "Average round-trip is #{avg}\n"
puts "#{pingfails} packets were droped"
```




<br><br><br>
---
