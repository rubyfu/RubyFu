# Conversion

String conversion and/or encoding is an important part of exploitation and firewall bypasses.

## Convert String/Binary to Hex

If no prefix is needed, you just do the following

```ruby
"Rubyfu".unpack("H*")    #=> ["527562796675"]
```

Otherwise, see the below ways

For a single character

```ruby
'\x%02x' % "A".ord    #=> "\\x41"
```

{% hint style="info" %}
**Note:** the symbols `*""` are equal of `.join`
{% endhint %}

```ruby
"ABCD".unpack('H*')[0].scan(/../).map {|h| '\x'+h }.join    #=> "\\x41\\x42\\x43\\x44"
```

or

```ruby
"ABCD".unpack('C*').map { |c| '\x%02x' % c }.join    #=> "\\x41\\x42\\x43\\x44"
```

or

```ruby
"ABCD".split("").map {|h| '\x'+h.unpack('H*')[0] }*""    #=> "\\x41\\x42\\x43\\x44"
```

or

```ruby
"ABCD".split("").map {|c|'\x' + c.ord.to_s(16)}.join    #=> "\\x41\\x42\\x43\\x44"
```

or

```ruby
"ABCD".split("").map {|c|'\x' + c.ord.to_s(16)}*""    #=> "\\x41\\x42\\x43\\x44"
```

or

```ruby
"ABCD".chars.map {|c| '\x' + c.ord.to_s(16)}*""    #=> "\\x41\\x42\\x43\\x44"
```

or

```ruby
"ABCD".each_byte.map {|b| b.to_s(16)}.join    #=> "41424344"
```

or

```ruby
"ABCD".each_char.map {|c| '\x'+(c.unpack('H*')[0])}.join    #=> "\\x41\\x42\\x43\\x44"
```

or

```ruby
"ABCD".chars.map {|c| '\x%x' % c.ord}.join    #=> "\\x41\\x42\\x43\\x44"
```

or with [ctf-party][ctf-party]

```ruby
require 'ctf_party'
'ABCD'.to_hex #=> "41424344"
'ABCD'.to_hex(prefixall: '\\x') #=> "\\x41\\x42\\x43\\x44"
```

## Convert Hex to String/Binary

```ruby
["41424344"].pack('H*')    #=> ABCD
```

or

```ruby
"41424344".scan(/../).map { |x| x.hex.chr }.join    #=> ABCD
```

or for raw socket

```ruby
"41424344".scan(/../).map(&:hex).pack("C*")    #=> ABCD
```

or with [ctf-party][ctf-party]

```ruby
require 'ctf_party'
'41424344'.from_hex #=> "ABCD"
```

in-case of binary that is out of `.chr` range. For example you may need to convert an IP-address to hex raw then send it through the socket. The case of just converting it to hex would not work for you

```ruby
>> ip = "192.168.100.10"
=> "192.168.100.10"
>> ip.split(".").map {|c| '\x%02x' % c.to_i}.join 
=> "\\xc0\\xa8\\x64\\x0a"
```

As you can see, Ruby reads returns `"\\xc0\\xa8\\x64\\x0a"` which doesn't equal `"\xc0\xa8\x64\x0a"`. Try to enter this value \(with double-quotes\) `"\xc0\xa8\x64\x0a"` into your irb directly and you'll notice that the return is `"\xC0\xA8d\n"` which is what should be passed to the raw socket, not the `"\\xc0\\xa8\\x64\\x0a"`. The main cause is ruby escapes the backslash\(`\`\).

To solve this issue, use pack to convert integers to 8-bit unsigned \(unsigned char\)

```ruby
ip.split(".").map(&:to_i).pack("C*")    #=> "\xC0\xA8d\n"
```

or with [ctf-party][ctf-party]

```ruby
require 'ctf_party'
'192.168.100.10'.to_hexip #=> "c0a8640a"
'192.168.100.10'.to_hexip(prefixall: '\\x') #=> "\\xc0\\xa8\\x64\\x0a"
```

**Note about hex:** Sometimes you might face non-printable characters, especially when dealing with binary raw. In this case, append **\(**`# -*- coding: binary -*-`**\)** at the top of your file to fix any interpretation issues.

## Convert Hex \(Return address\) to Little-Endian format

Little-endian format is simply reversing the string such as reversing/backwarding "Rubyfu" to "ufybuR" which can be done by calling the `reverse` method of the `String` class

```ruby
"Rubyfu".reverse
```

In exploitation, this is not as simple as that since we're dealing with hex values that may not represent printable characters.

So assume we have `0x77d6b141` as the return address which we want to convert to Little-Endian format to allow the CPU to read it correctly.

Generally speaking, it's really a trivial task to convert `0x77d6b141` to `\x41\xb1\xd6\x77` since it's a one time process, but this is not the case if you have a ROP chain that has to be staged in your exploit. To do so simply `pack` it as an array

```ruby
[0x77d6b141].pack('V')
```

It happens that sometimes you get an error because of a non-Unicode string issue. To solve this issue, just force encoding to UTF-8, but most of the time you will not face this issue

```ruby
[0x77d6b141].pack('V').force_encoding("UTF-8")
```

If you have a ROP chain, then it's not decent to apply this each time - so you can use the first way and append **\(**`# -*- coding: binary -*-`**\)** at top of your exploit file.

## Convert to Unicode Escape

**Hexadecimal unicode escape**

```ruby
"Rubyfu".each_char.map {|c| '\u' + c.ord.to_s(16).rjust(4, '0')}.join
```

Or using unpack

```ruby
"Rubyfu".unpack('U*').map{ |i| '\u' + i.to_s(16).rjust(4, '0') }.join
```

A shorter way

```ruby
"Rubyfu".unpack('U*').map{ |i| "\\u00%x" % i }.join
```

**Octal unicode escape**

An octal escape is exactly the same, except we convert the string to octal instead of hexadecimal

```ruby
"Rubyfu".each_char.map {|c| '\u' + c.ord.to_s(8).rjust(4, '0')}.join
```

**Escape Sequences in Double-Quoted Strings**

```ruby
"\u{52 75 62 79 66 75}"
```

## En/Decode base-64 String

We'll present this in a few ways.

**Encode string**

```ruby
["RubyFu"].pack('m0')
```

or

```ruby
require 'base64'
Base64.encode64 "RubyFu"
```

or with [ctf-party][ctf-party]

```ruby
require 'ctf_party'
'RubyFu'.to_b64 #=> "UnVieUZ1"
```

**Decode**

```ruby
"UnVieUZ1".unpack('m0')
```

{% hint style="info" %}
**TIP:** The string unpack method is incredibly useful for converting data we read as strings back to their original form. To read more, visit the String class reference at www.ruby-doc.org/core/classes/String.html .
{% endhint %}

or

```ruby
require 'base64'
Base64.decode64 "UnVieUZ1"
```

or with [ctf-party][ctf-party]

```ruby
require 'ctf_party'
'UnVieUZ1'.from_b64 #=> "RubyFu"
```

## En/Decode URL String

URL encoding/decoding is well known. From a hacker's point of view, we need it often for client-side vulnerabilities.

**Encoding string**

```ruby
require 'uri'
URI('http://vulnerable.site/search.aspx?txt="><script>alert(/Rubyfu/.source)</script>').to_s #=> "http://vulnerable.site/search.aspx?txt=%22%3E%3Cscript%3Ealert(/Rubyfu/.source)%3C/script%3E"
```

or

```ruby
require 'uri'
URI::Parser.new.escape 'http://vulnerable.site/search.aspx?txt="><script>alert(/Rubyfu/.source)</script>' #=> "http://vulnerable.site/search.aspx?txt=%22%3E%3Cscript%3Ealert(/Rubyfu/.source)%3C/script%3E"
```

You can encode/decode any non-URL string, of-course.

The above way will encode any non-URL standard strings only \(ex. `<>"{}`\) however if you want to encode the full string use one of the following methods:

```ruby
require 'uri'
URI.encode_www_form_component 'http://vulnerable.site/search.aspx?txt="><script>alert(/Rubyfu/.source)</script>' #=> "http%3A%2F%2Fvulnerable.site%2Fsearch.aspx%3Ftxt%3D%22%3E%3Cscript%3Ealert%28%2FRubyfu%2F.source%29%3C%2Fscript%3E"
```

or

```ruby
require 'cgi'
CGI.escape 'http://vulnerable.site/search.aspx?txt="><script>alert(/Rubyfu/.source)</script>' #=> "http%3A%2F%2Fvulnerable.site%2Fsearch.aspx%3Ftxt%3D%22%3E%3Cscript%3Ealert%28%2FRubyfu%2F.source%29%3C%2Fscript%3E"
```

or

```ruby
require 'erb'
ERB::Util.url_encode 'http://vulnerable.site/search.aspx?txt="><script>alert(/Rubyfu/.source)</script>' #=> "http%3A%2F%2Fvulnerable.site%2Fsearch.aspx%3Ftxt%3D%22%3E%3Cscript%3Ealert%28%2FRubyfu%2F.source%29%3C%2Fscript%3E"
```

or with [ctf-party][ctf-party]

```ruby
require 'ctf_party'
'http://vulnerable.site/search.aspx?txt="><script>alert(/Rubyfu/.source)</script>'.urlencode #=> "http://vulnerable.site/search.aspx?txt=%22%3E%3Cscript%3Ealert(/Rubyfu/.source)%3C/script%3E"
'http://vulnerable.site/search.aspx?txt="><script>alert(/Rubyfu/.source)</script>'.urlencode_component #=> "http%3A%2F%2Fvulnerable.site%2Fsearch.aspx%3Ftxt%3D%22%3E%3Cscript%3Ealert%28%2FRubyfu%2F.source%29%3C%2Fscript%3E"
```

**Decoding string**

```ruby
require 'uri'
URI::Parser.new.unescape "http://vulnerable.site/search.aspx?txt=%22%3E%3Cscript%3Ealert(/Rubyfu/.source)%3C/script%3E" #=> "http://vulnerable.site/search.aspx?txt=\"><script>alert(/Rubyfu/.source)</script>"
```

or

```ruby
require 'uri'
URI.decode_www_form_component "http://vulnerable.site/search.aspx?txt=%22%3E%3Cscript%3Ealert(/Rubyfu/.source)%3C/script%3E" #=> "http://vulnerable.site/search.aspx?txt=\"><script>alert(/Rubyfu/.source)</script>"
```

or

```ruby
require 'cgi'
CGI.unescape "http://vulnerable.site/search.aspx?txt=%22%3E%3Cscript%3Ealert(/Rubyfu/.source)%3C/script%3E" #=> "http://vulnerable.site/search.aspx?txt=\"><script>alert(/Rubyfu/.source)</script>"
```

or with [ctf-party][ctf-party]

```ruby
require 'ctf_party'
"http://vulnerable.site/search.aspx?txt=%22%3E%3Cscript%3Ealert(/Rubyfu/.source)%3C/script%3E".urldecode #=> "http://vulnerable.site/search.aspx?txt=\"><script>alert(/Rubyfu/.source)</script>"
"http://vulnerable.site/search.aspx?txt=%22%3E%3Cscript%3Ealert(/Rubyfu/.source)%3C/script%3E".urldecode_component #=> "http://vulnerable.site/search.aspx?txt=\"><script>alert(/Rubyfu/.source)</script>"
```

## HTML En/Decode

**Encoding HTML**

```ruby
require 'cgi'
CGI.escapeHTML('"><script>alert("Rubyfu!")</script>') #=> "&quot;&gt;&lt;script&gt;alert(&quot;Rubyfu!&quot;)&lt;/script&gt;"
```

or with [ctf-party][ctf-party]

```ruby
require 'ctf_party'
'"><script>alert("Rubyfu!")</script>'.htmlescape # => "&quot;&gt;&lt;script&gt;alert(&quot;Rubyfu!&quot;)&lt;/script&gt;"
```

**Decoding HTML**

```ruby
require 'cgi'
CGI.unescapeHTML("&quot;&gt;&lt;script&gt;alert(&quot;Rubyfu!&quot;)&lt;/script&gt;") #=> "\"><script>alert(\"Rubyfu!\")</script>"
```

or with [ctf-party][ctf-party]

```ruby
require 'ctf_party'
"&quot;&gt;&lt;script&gt;alert(&quot;Rubyfu!&quot;)&lt;/script&gt;".htmlunescape # => "\"><script>alert(\"Rubyfu!\")</script>"
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

* [Source](http://stackoverflow.com/questions/3253298/base64-decode64-in-ruby-returning-strange-results)
* **Resources**
  * [more about SAML](http://dev.gettinderbox.com/2013/12/16/introduction-to-saml/)


[ctf-party]:https://github.com/noraj/ctf-party
