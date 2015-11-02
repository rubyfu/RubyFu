# Array

## Pattern

#### Pattern create

Assume the pattern length = 500, You can change it to any value. By default this will create 20280 probabilities max.
```ruby
pattern_create = ('Aa0'..'Zz9').to_a.join.each_char.first(500).join
```
In case you need longer pattern(ex. 30000) you can do the following
```ruby
pattern_create = ('Aa0'..'Zz9').to_a.join
pattern_create = pattern_create  * (30000 / 20280.to_f).ceil
```

#### Pattern offset

I'll assume the pattern was equal or less than “20280” and we are looking for “9Ak0” pattern characters. The pattern_create should be initialized from above
```ruby
pattern_offset = pattern_create.enum_for(:scan , '9Ak0').map {Regexp.last_match.begin(0)}
```
Note: This does not consider the little endian format, for that there is extra code should be written. For more info, please take a look on the following [code][1].


#### Generate all hexdecimal values from `\x00` to `\xff`

```ruby
puts (0..255).map {|b| ('\x%X' % b)}
```
> **Notes:**

> - To change value presentation from `\xea` to `0xea`, change `\x%x` to `0x%x`
> - To Make all letters capital (`\xea` to `\xEA`) , change `\x%x` to `\x%X`

#### Generate all Printable Characters 

```ruby
(32..126).map {|c| c.chr}
```
short and unclean

```ruby
(32..126).map &:chr
```

<br><br><br>
---
[1]: https://github.com/KINGSABRI/BufferOverflow-Kit/blob/master/lib/pattern.rb