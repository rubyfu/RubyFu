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
[Source: Ruby | Convert ASCII to HEX][1]


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

**Note about hex:** Sometimes you might face a none pritable characters especially due dealing with binary raw. In this case, append **(**`# -*- coding: binary -*-`**)** at top of your file to fix any interpretation issue.



## Convert Hex(Return address) to Little-Endian format
Little-Endian format is simply reversing the string such as reversing/backwarding "Rubyfu" to "ufybuR" which can be done by calling `reverse` method of `String` class
```ruby
"Rubyfu".reverse
```
In exploitation, this is not as simple as that since we're dealing with hex values that may not represent printable characters.

So assume we have `0x77d6b141` return address which we've to convert it to Little-Endian format to allow CPU to read it correctly. 

Generally speaking, it's really a travial task to convert `0x77d6b141` to `\x41\xb1\xd6\x77` since it's one time process but this is not the case of you have ROP chain that has to be staged in your exploit. To do so simply `packe` it as array

```ruby
[0x77d6b141].pack('V')
```

It happens that sometime you get an error because because of none unicode string issue. To solve this issue, just force encoding to UTF-8 but most of the time you will not face this issue

```ruby
[0x77d6b141].pack('V').force_encoding("UTF-8")
```

If you have ROP chain then it's not decent to apply this each time so you can use the first way and append **(**`# -*- coding: binary -*-`**)** at top of your exploit file.


## En/Decode base-64 String
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
> **TIP: **
>The string unpack method is incredibly useful for converting data we read as strings back to their original form. To read more, visit the String class reference at www.ruby-doc.org/core/classes/String.html.


## En/Decode URL String
URL encoding/decoding is something known to most people. From hacker's point of view, we need it a lot in client-side vulnerability the most. 

**Encoding string**
```ruby
require 'uri'
puts URI.encode 'http://vulnerable.site/search.aspx?txt="><script>alert(/Rubyfu/.source)</script>'
```
**Decoding string**
```ruby
require 'uri'
puts URI.decode "http://vulnerable.site/search.aspx?txt=%22%3E%3Cscript%3Ealert(/Rubyfu/.source)%3C/script%3E"
```
You can encode/decode and none URL string, of-course.

The above way will encode any non URL standard strings only(ex. `<>"{}`) however if you want to encode the full string use `URI.encode_www_form_component`

```ruby
puts URI.encode_www_form_component 'http://vulnerable.site/search.aspx?txt="><script>alert(/Rubyfu/.source)</script>'
```






<br><br><br>
---
[1]: http://king-sabri.net/?p=2613
