# Conversion

## Convert String to Hex

If no prefix is needed, you just do the following 

```ruby
"Rubyfu".unpack("H*")
```

Otherwise, see the below ways 

for a single character
```ruby
'\x%02x' % "A".ord
```
**Note:** the symbols ```*""``` are equal of ```.join```

```ruby
"ABCD".unpack('H*')[0].scan(/.{2}/).map {|h| '\x'+h }.join
```
or
```ruby
"ABCD".unpack('C*').map { |c| '\x%02x' % c }.join
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

**Note about hex:** Sometimes you might face a none printable characters especially due dealing with binary raw. In this case, append **(**`# -*- coding: binary -*-`**)** at top of your file to fix any interpretation issue.



## Convert Hex(Return address) to Little-Endian format
Little-Endian format is simply reversing the string such as reversing/backwarding "Rubyfu" to "ufybuR" which can be done by calling `reverse` method of `String` class
```ruby
"Rubyfu".reverse
```
In exploitation, this is not as simple as that since we're dealing with hex values that may not represent printable characters.

So assume we have `0x77d6b141` return address which we've to convert it to Little-Endian format to allow CPU to read it correctly. 

Generally speaking, it's really a trivial task to convert `0x77d6b141` to `\x41\xb1\xd6\x77` since it's one time process but this is not the case of you have ROP chain that has to be staged in your exploit. To do so simply `pack` it as array

```ruby
[0x77d6b141].pack('V')
```

It happens that sometime you get an error because of none Unicode string issue. To solve this issue, just force encoding to UTF-8 but most of the time you will not face this issue

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

## HTML En/Decode

**Encoding HTML**
```ruby
require 'cgi'
CGI.escapeHTML('"><script>alert("Rubyfu!")</script>')
```
Returns 
```
&quot;&gt;&lt;script&gt;alert(&quot;Rubyfu!&quot;)&lt;/script&gt;
```

**Decoding HTML**
```ruby
require 'cgi'
CGI.unescapeHTML("&quot;&gt;&lt;script&gt;alert(&quot;Rubyfu!&quot;)&lt;/script&gt;")
```
Returns 
```
"><script>alert("Rubyfu!")</script>
```

## En/Decode Unicode Escape

```ruby
"Rubyfu".each_char.map {|c| '\u' + c.ord.to_s(16).rjust(4, '0')}.join
```
Or using unpack 
```ruby
"Rubyfu".unpack('U*').map{ |i| '\u' + i.to_s(16).rjust(4, '0') }.join
```


## En/Decode SAML String


**Decoding SAML**

```ruby
# SAML Request 
saml = "fZJNT%2BMwEIbvSPwHy%2Fd8tMvHympSdUGISuwS0cCBm%2BtMUwfbk%2FU4zfLvSVMq2Euv45n3fd7xzOb%2FrGE78KTRZXwSp5yBU1hpV2f8ubyLfvJ5fn42I2lNKxZd2Lon%2BNsBBTZMOhLjQ8Y77wRK0iSctEAiKLFa%2FH4Q0zgVrceACg1ny9uMy7rCdaM2%2Bs0BWrtppK2UAdeoVjW2ruq1bevGImcvR6zpHmtJ1MHSUZAuDKU0vY7Si2h6VU5%2BiMuJuLx65az4dPql3SHBKaz1oYnEfVkWUfG4KkeBna7A%2Fxm6M14j1gZihZazBRH4MODcoKPOgl%2BB32kFz08PGd%2BG0JJIkr7v46%2BhRCaEpod17DCRivYZCkmkd4N28B3wfNyrGKP5bws9DS6PKDz%2FMpsl36Tyz%2F%2Fax1jeFmi0emcLY7C%2F8SDD0Z7dobcynHbbV3QVbcZW0TlqQemNhoqzJD%2B4%2Fn8Yw7l8AA%3D%3D"

require 'cgi'
require 'base64'
require 'zlib'

inflated = Base64::decode64(CGI.unescape(saml))
# You don't need below code if it's not deflated/compressed
zlib = Zlib::Inflate.new(-Zlib::MAX_WBITS)
zlib.inflate(inflated)

```
Returns
```ruby
"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<samlp:AuthnRequest xmlns:samlp=\"urn:oasis:names:tc:SAML:2.0:protocol\" ID=\"agdobjcfikneommfjamdclenjcpcjmgdgbmpgjmo\" Version=\"2.0\" IssueInstant=\"2007-04-26T13:51:56Z\" ProtocolBinding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST\" ProviderName=\"google.com\" AssertionConsumerServiceURL=\"https://www.google.com/a/solweb.no/acs\" IsPassive=\"true\"><saml:Issuer xmlns:saml=\"urn:oasis:names:tc:SAML:2.0:assertion\">google.com</saml:Issuer><samlp:NameIDPolicy AllowCreate=\"true\" Format=\"urn:oasis:names:tc:SAML:2.0:nameid-format:unspecified\" /></samlp:AuthnRequest>\r\n"
```
[Source][2]

[More about SAML][3]

<br><br><br>
---
[1]: http://king-sabri.net/?p=2613
[2]: http://stackoverflow.com/questions/3253298/base64-decode64-in-ruby-returning-strange-results
[3]: http://dev.gettinderbox.com/2013/12/16/introduction-to-saml/