# Module 0x3 | Network KungFu


## IP Address Operation
In network programming, we always perform some operations on IP addresses. Following are some examples.

- Calculating network prefix of an IP address from IP address and subnet mask.
- Calculating the host part of an IP address from IP address and subnet mask.
- Calculating the number of hosts in a subnet.
- Check whether an IP address belongs to a subnet or not.
- Converting subnet mask from dot-decimal notation to integer.

Ruby provides class(IPAddr) for basic operations on IP address that can be used to perform all operations mentioned above.

```ruby
require 'ipaddr'
ip = IPAddr.new("192.34.56.54/24")
```


### Calculating network prefix of an IP address from IP address and subnet mask.
A simple mask method call will give us the network prefix part of IP address. It is simply a bitwise mask of IP address with subnet mask.


```ruby
require 'ipaddr'
ip = IPAddr.new(ARGV[0])
network_prefix = ip.mask(ARGV[1])
puts network_prefix
```

```
ruby ip_example.rb 192.168.5.130 24
# Returns 
192.168.5.0
```

### Calculating the host part of an IP address from IP address and subnet mask.

calculating the host part is not as trivial as the network part of the IP address. We first calculate the complement of subnet mask.

Subnet(24) : 11111111.11111111.11111111.00000000

neg_subnet(24) : 00000000.00000000.00000000.11111111

we used negation(~) and mask method to calculate complement of subnet mask then simply performed a bitwise AND between the IP and complement of subnet


```ruby
require 'ipaddr'
ip = IPAddr.new(ARGV[0])
neg_subnet = ~(IPAddr.new("255.255.255.255").mask(ARGV[1]))
host = ip & neg_subnet
puts host
```
Run it
```
ruby ip_example.rb 192.168.5.130 24
# Returns 
0.0.0.130
```

### Calculating the number of hosts in a subnet.

We used to_range method to create a range of all the ips then count method to count the ips in range. We reduced the number by two to exclude the gateway and broadcast IP address.


```ruby
require 'ipaddr'
ip=IPAddr.new("0.0.0.0/#{ARGV[0]}")
puts ip.to_range.count-2
```
Run it
```
ruby ip_example.rb 24
254
```

### Check weather an IP address belong to a subnet or not.

`===` is an alias of include? which returns true if ip address belongs to the range otherwise it returns false.


```ruby
require 'ipaddr'
net=IPAddr.new("#{ARG[0]}/#{ARGV[1]}")
puts net === ARGV[2]
```
Run it
```
ruby ip_example.rb 192.168.5.128 24 192.168.5.93
true
```

```
ruby ip_example.rb 192.168.5.128 24 192.168.6.93
false
```

### Converting subnet mask from dot-decimal notation to integer.

We treated subnet mask as ip address and converted it into an integer by using `to_i` then used `to_s(2)` to convert the integer into binary form. Once we had the binary we counted the number of occurrence of digit 1 with `count("1")`.


```ruby
require 'ipaddr'
subnet_mask = IPAddr.new(ARGV[0])
puts subnet_mask.to_i.to_s(2).count("1").to_s
```

Run it
```
ruby ip_example.rb 255.255.255.0
24
```


### Converting IP to another formats

#### IP Decimal to Dotted notation

```ruby
require 'ipaddr'
IPAddr.new(3232236159, Socket::AF_INET).to_s
```
or

```ruby
[3232236159].pack('N').unpack('C4').join('.')
```

#### IP Dotted notation to Decimal

```ruby
require 'ipaddr'
IPAddr.new('192.168.2.127').to_i
```


This part has been pretty quoted from [IP address Operations in Ruby][1] topic


## IP Geolocation
you may need to know more information about IP location due attack investigation or any other reason. 

### Geoip
The special thing about geoip lib is that it's an API for offline database you download from [www.maxmind.com](http://www.maxmind.com). There are few free databases from maxmind whoever you can have a subscription database version though. 

- Download one of the free GeoLite country, city or ASN databases
    - [GeoLiteCountry](geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz)
    - [GeoLiteCity](geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz)
    - [GeoIPASNum](geolite.maxmind.com/download/geoip/database/asnum/GeoIPASNum.dat.gz)


- Install geoip gem
```
gem install geoip
```

- Usage

```ruby
#!/usr/bin/env ruby

ip = ARGV[0]
geoip = GeoIP.new('GeoLiteCity.dat')
geoinfo = geoip.country(ip).to_hash

puts "IP address:\t"   + geoinfo[:ip]
puts "Country:\t"      + geoinfo[:country_name]
puts "Country code:\t" + geoinfo[:country_code2]
puts "City name:\t"    + geoinfo[:city_name]
puts "Latitude:\t"     + geoinfo[:latitude]
puts "Longitude:\t"    + geoinfo[:longitude]
puts "Time zone:\t"    + geoinfo[:timezone]
```

```
-> ruby ip2location.rb 108.168.255.243

IP address:     108.168.255.243
Country:        United States
Country code:   US
City name:      Dallas
Latitude:       32.9299
Longitude:      -96.8353
Time zone:      America/Chicago
```



<br><br><br>
---
[1]: http://www.brownfort.com/2014/09/ip-operations-ruby/

- [RubyDoc | IPAddr](http://ruby-doc.org/stdlib-1.9.3/libdoc/ipaddr/rdoc/IPAddr.html)