# Conversion


## Convert String to Hex
for a single character
```ruby
'\x'+("A".unpack('H*')[0])
```
**Note:** the symbols ```*""``` are equal of ```.join```

```ruby
"ABCD".unpack('H*')[0].scan(/.{2}/).map {|h| '\x'+h }.join
```
or
```ruby
"ABCD".unpack('C*').map { |c| '\\x%02x' % c }.join
```
or
```ruby
"ABCD".split("").map {|h| '\x'+h.unpack('H*')[0] }*""
```
or
```ruby
"ABCD".split("").map {|c|'\x' + c.ord.to_s(16)}.join
```
or
```ruby
"ABCD".split("").map {|c|'\x' + c.ord.to_s(16)}*""
```
or
```ruby
"ABCD".chars.map {|c| '\x' + c.ord.to_s(16)}*""
```
or
```ruby
"ABCD".each_char.map {|c| '\x'+(c.unpack('H*')[0])}.join
```
or
```ruby
"ABCD".chars.map {|c| '\x%x' % c.ord}.join
```
source[^1]


Returns
```
\x41\x42\x43\x44
```



## Convert Hex to String
```ruby
["41424344"].pack('H*')
```
Return
```
ABCD
```


## En/Deccode base-64 Sting
We'll present it by many ways

**Encode string**
```ruby
["RubyFu"].pack('m0')
```
or
```ruby
require 'base64'
Base64.encode64 "RubyFu"
```


**Decode**
```ruby
"UnVieUZ1".unpack('m0')
```
or
```ruby
 Base64.decode64 "UnVieUZ1"
```

<br><br><br>
---
[^1]: Source: [Ruby| Convert ASCII to HEX](http://king-sabri.net/?p=2613).
