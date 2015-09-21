# Module 0x3 | Network KungFu

http://www.evilsocket.net/2015/02/12/rubertooth-a-complete-ruby-porting-of-the-ubertooth-libraries-and-utilities/#sthash.sNhWFzor.dpbs?utm_source=rubyweekly&utm_medium=email

## IP Address operation
In network programming, we always perform some operations on IP addresses. Following are some examples.

- Calculating network prefix of an IP address from IP address and subnet mask.
- Calculating the host part of an IP address from IP address and subnet mask.
- Calculating the number of hosts in a subnet.
- Check whether an IP address belongs to a subnet or not.
- Converting subnet mask from dot-decimal notation to integer.

Ruby provides a class(IPAddr) for basic operations on IP address that can be used to perform all operations mentioned above.

```ruby
require 'ipaddr'
ip = IPAddr.new("192.34.56.54/24")
````


### Calculating network prefix of an IP address from IP address and subnet mask.
A simple mask method call will give us the network prefix part of IP address. It is simply a bitwise mask of IP address with subnet mask.
```
1
2
3
4
```

```ruby
require 'ipaddr'
ip = IPAddr.new(ARGV[0])
network_prefix = ip.mask(ARGV[1])
puts network_prefix
```

Output:
```
1
2
```

```
prashantk@ubuntu:~$ ruby ip_example.rb 192.168.5.130 24
192.168.5.0
```

### Calculating the host part of an IP address from IP address and subnet mask.

calculating the host part is not as trivial as the network part of the IP address. We first calculate the complement of subnet mask.

Subnet(24) : 11111111.11111111.11111111.00000000

neg_subnet(24) : 00000000.00000000.00000000.11111111

we used negation(~) and mask method to calculate complement of subnet mask then simply performed a bitwise AND between the IP and complement of subnet
```
1
2
3
4
5
```

```ruby
require 'ipaddr'
ip = IPAddr.new(ARGV[0])
neg_subnet = ~(IPAddr.new("255.255.255.255").mask(ARGV[1]))
host = ip & neg_subnet
puts host
```

Output:
```
1
2
```

```
prashantk@ubuntu:~$ ruby ip_example.rb 192.168.5.130 24
0.0.0.130
```

### Calculating the number of hosts in a subnet.

We used to_range method to create a range of all the ips then count method to count the ips in range. We reduced the number by two to exclude the gateway and broadcast IP address.
```
1
2
3
```

```ruby
require 'ipaddr'
ip=IPAddr.new("0.0.0.0/#{ARGV[0]}")
puts ip.to_range.count-2
```

Output:
```
1
2
```

```
prashantk@ubuntu:~$ ruby ip_example.rb 24
254
```

### Check weather an IP address belong to a subnet or not.

`===` is an alias of include? which returns true if ip address belongs to the range otherwise it returns false.
```
1
2
3
```

```ruby
require 'ipaddr'
net=IPAddr.new("#{ARG[0]}/#{ARGV[1]}")
puts net === ARGV[2]
```

Output:
```
1
2
3
4
```

```
prashantk@ubuntu:~$ ruby ip_example.rb 192.168.5.128 24 192.168.5.93
true
```

```
prashantk@ubuntu:~$ ruby ip_example.rb 192.168.5.128 24 192.168.6.93
false
```

### Converting subnet mask from dot-decimal notation to integer.

We treated subnet mask as ip address and converted it into an integer by using `to_i` then used `to_s(2)` to convert the integer into binary form. Once we had the binary we counted the number of occurrence of digit 1 with `count(“1″)`.
```
1
2
3
```

```ruby
require 'ipaddr'
subnet_mask = IPAddr.new(ARGV[0])
puts subnet_mask.to_i.to_s(2).count("1").to_s
```

Output:
```
1
2
```
```
prashantk@ubuntu:~$ ruby ip_example.rb 255.255.255.0
24
```


**References**

http://ruby-doc.org/stdlib-1.9.3/libdoc/ipaddr/rdoc/IPAddr.html



This part has been pretty quoted from *IP address Operations in Ruby* [^1] topic






<br><br><br>
---
[^1]: Source: - [The original topic](http://www.brownfort.com/2014/09/ip-operations-ruby/)

