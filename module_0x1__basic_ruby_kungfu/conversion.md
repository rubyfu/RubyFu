# Conversion


## Convert Hex to String
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
puts "ABCD".chars.map {|c| '\x' + c.ord.to_s(16)}*""
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

## Convert String to Hex
```ruby
["41424344"].pack('H*')
```
return
```
ABCD
```

## Convert Binary file to Hex

```ruby
file     = File.open("File_name" , 'rb')
file2hex = file.read.each_byte.map { |b| "%02x" % b }    # b.to_s(16).rjust(2, '0')

hex = ""
file2hex.map do |byte|
	hex << '\x' + byte
end

puts hex
```

<br><br><br>
---
[^1]: Source: [Ruby| Convert ASCII to HEX](http://king-sabri.net/?p=2613).
