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
> **TIP**
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

The above way will encode any string *after* the URL base string if it contains a url string, however it you want to encode the full string use `URI.encode_www_form_component`








<br><br><br>
---
[1]: http://king-sabri.net/?p=2613
