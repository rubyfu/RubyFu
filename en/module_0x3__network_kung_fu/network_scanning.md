# Network Scanning

## Network ping sweeping
required net-ping gem
```
gem install net-ping
```


```ruby
#!/usr/bin/env ruby
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
puts "#{pingfails} packets were dropped"
```

## Port Scanner
If you got what we've represented in [Ruby Socket](module_0x3__network_kung_fu/ruby_socket.md) section, then here we wrapping up and do some application depends on it.
**scanner.rb**
```ruby
#!/usr/bin/env ruby
#
# KING SABRI | @KINGSABRI
#
require 'socket'
require 'thread'
require 'timeout'

host = ARGV[0]

def scan(host)
  (0..1024).each do |port|
    Thread.new {
      begin
    	timeout(3) do					# timeout of running operation
          s = TCPSocket.new(host, port)			# Create new socket
          puts "[+] #{host} | Port #{port} open"
          s.close
    	end
      rescue Errno::ECONNREFUSED
        # puts "[!] #{host} | Port #{port} closed"
        next
      rescue Timeout::Error
    	puts "[!] #{host} | Port #{port} timeout/filtered"
    	next
      end
    }.join
  end
end

scan host

```
Run it
```bash
ruby scanner.rb 45.33.32.156    # scanme.nmap.com

[+] 45.33.32.156 | Port 22 open
[+] 45.33.32.156 | Port 80 open
[!] 45.33.32.156 | Port 81 timeout
[!] 45.33.32.156 | Port 85 timeout
[!] 45.33.32.156 | Port 119 timeout
[!] 45.33.32.156 | Port 655 timeout
[!] 45.33.32.156 | Port 959 timeout
```






<br><br><br>
---
