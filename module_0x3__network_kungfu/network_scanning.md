# Network Scanning

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

## Port Scanner 

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
      rescue Timeout::Error
	puts "[!] #{host} | Port #{port} timeout"
	nextcp 
      end
    }.join
  end
end

scan host 

```
Run it
```bash 
scan host 

```






<br><br><br>
---
