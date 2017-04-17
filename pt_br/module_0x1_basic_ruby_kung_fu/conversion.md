# Conversão

Conversão de string e/ou encoding é uma parte importante de exploração e firewall bypass

## Convertendo String/binário para Hexadecimal

Se nenhum prefixo é necessário, basta fazer o seguinte. 

```ruby
"Rubyfu".unpack("H*")    #=> ["527562796675"]
```

De outra forma, Veja as formas abaixo

for a single character Para apenas um caractere

```ruby
'\x%02x' % "A".ord    #=> "\\x41"
```

**Nota:** Os símbolos `*""` são iguais a `.join`

```ruby
"ABCD".unpack('H*')[0].scan(/../).map {|h| '\x'+h }.join    #=> "\\x41\\x42\\x43\\x44"
```

ou

```ruby
"ABCD".unpack('C*').map { |c| '\x%02x' % c }.join    #=> "\\x41\\x42\\x43\\x44"
```

ou

```ruby
"ABCD".split("").map {|h| '\x'+h.unpack('H*')[0] }*""    #=> "\\x41\\x42\\x43\\x44"
```

ou

```ruby
"ABCD".split("").map {|c|'\x' + c.ord.to_s(16)}.join    #=> "\\x41\\x42\\x43\\x44"
```

ou

```ruby
"ABCD".split("").map {|c|'\x' + c.ord.to_s(16)}*""    #=> "\\x41\\x42\\x43\\x44"
```

ou

```ruby
"ABCD".chars.map {|c| '\x' + c.ord.to_s(16)}*""    #=> "\\x41\\x42\\x43\\x44"
```

ou

```ruby
"ABCD".each_byte.map {|b| b.to_s(16)}.join    #=> "41424344"
```

ou

```ruby
"ABCD".each_char.map {|c| '\x'+(c.unpack('H*')[0])}.join    #=> "\\x41\\x42\\x43\\x44"
```

ou

```ruby
"ABCD".chars.map {|c| '\x%x' % c.ord}.join    #=> "\\x41\\x42\\x43\\x44"
```

## Convertendo Hexadecimal para String/Binário

```ruby
["41424344"].pack('H*')    #=> ABCD
```

ou

```ruby
"41424344".scan(/../).map { |x| x.hex.chr }.join    #=> ABCD
```

Para sockets

```ruby
"41424344".scan(/../).map(&:hex).pack("C*")    #=> ABCD
```
Em caso de binário que estão fora do range `.chr`. Por exemplo: você pode precisar converter endereços IP's para hex e enviar isso atráves de socket. Apenas converter ele para hex não vai funcionar para você.

```ruby
>> ip = "192.168.100.10"
=> "192.168.100.10"
>> ip.split(".").map {|c| '\x%02x' % c.to_i}.join 
=> "\\xc0\\xa8\\x64\\x0a"
```
Como pode ver, Ruby lê e retorna `"\\xc0\\xa8\\x64\\x0a"` qual não é igual à `"\xc0\xa8\x64\x0a"`. Tente colocar esse valor \(Entre aspas duplas\)
`"\xc0\xa8\x64\x0a"` no seu interpretador IRB diretamente e você notará que o retorno é `"\xC0\xA8d\n"` no qual pode ser passado via socket não o `"\\xc0\\xa8\\x64\\x0a"`. A causa principal é que ruby escapa as barras invertidas \(`\`\).


Para resolver esse problema, use pack para converter inteiros para unsigned(Não assinados ou somente números pósitivos) de 8-bit \(unsigned char\)

```ruby
ip.split(".").map(&:to_i).pack("C*")    #=> "\xC0\xA8d\n"
```

**Nota sobre HEX:** Algumas vezes você irá se deparar com caracteres não imprimíveis, especialmente quando lidar com binários crus. Nesse caso, acrescente **\(**`# -*- coding: binário -*-`**\)** no início de seu arquivo para reparar interpretações erradas.

## Convertendo Hex\(Endereço de retorno\) para o formato Little_Endian

O formato Little-Endian  é simplesmente inverter a string, exemplo: "Rubyfy" para "ufybuR" que pode ser feito chamando o metódo `reverse` da classe `String`

```ruby
"Rubyfu".reverse
```

Na Exploração, não é tão simples quanto parece, já que estamos lidando com valores hexadecimais que podem não representar caracteres imprimíveis.


Então, assuma que nós temos o endereço de retorno `0x77d6b141` que nós devemos converter para o formato Little-Endian para permitir que o CPU leia corretamente.

De maneira geral, essa é realmente uma tarefa trivial já que é simplemente converter `0x77d6b141` para `\x41\xb1\xd6\x77`, desde que seja apenas essa tarefa, mas, esse não seja o caso de você ter uma cadeia de ROP que tem que estar dentro do seu exploit. para fazer isso de forma simples `pack` como um array.

```ruby
[0x77d6b141].pack('V')
```

Acontece de que em algumas horas você obtenha erros por causa de strings Unicode. Para resolver esse problema, apenas force o encoding de UTF-8. Mas, na maioria das vezes você não verá esse tipo de erro.

```ruby
[0x77d6b141].pack('V').force_encoding("UTF-8")
```

Se você tem uma cadeia de ROP então não é elegante aplicar isso todas as vezes, então você pode usar a primeira maneira e acrescentar **\(**`# -*- coding: binary -*-`**\)** no topo do seu exploit.

## Convertendo para escapes Uicode

**Escapes de Hexadecimal unicode**

```ruby
"Rubyfu".each_char.map {|c| '\u' + c.ord.to_s(16).rjust(4, '0')}.join
```

Ou usar o unpack

```ruby
"Rubyfu".unpack('U*').map{ |i| '\u' + i.to_s(16).rjust(4, '0') }.join
```

de uma maneira menor

```ruby
"Rubyfu".unpack('U*').map{ |i| "\\u00%x" % i }.join
```

**Escapes de Octal unicode**

Para escapes octal é exatamente do mesmo modo execeto que convertemos a string para octal ao invés de hexadecimal

```ruby
"Rubyfu".each_char.map {|c| '\u' + c.ord.to_s(8).rjust(4, '0')}.join
```

**Escape sequências em string de aspas duplas**

```ruby
"\u{52 75 62 79 66 75}"
```

## En/Decode base-64 String

Nós vamos mostrar isso de vários jeitos

**Encode string**

```ruby
["RubyFu"].pack('m0')
```

ou

```ruby
require 'base64'
Base64.encode64 "RubyFu"
```

**Decode**

```ruby
"UnVieUZ1".unpack('m0')
```

ou

```ruby
 Base64.decode64 "UnVieUZ1"
```

> **Dica:**  
> O metódo de unpack nas string é incrivelmente útil para converter dados que lemos como strings para suas formas orifinais. Para ler mais, veja a referência da classe String em www.ruby-doc.org/core/classes/String.html.

## En/Decode URL String

URL encoding/decoding é algo que a maioria das pessoas já conhecem. De ponto de vista dos hackers, nós precisamos de muito disso para a maioria das vulnerabilidades em client-side(do lado cliente)

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

O código acima irá encodar qualquer não URL padrão de string \(ex. `<>"{}`\) de qualquer modo se você quiser encodar toda a string use `URI.encode_www_form_component`

```ruby
puts URI.encode_www_form_component 'http://vulnerable.site/search.aspx?txt="><script>alert(/Rubyfu/.source)</script>'
```

## HTML En/Decode

**Encoding HTML**

```ruby
require 'cgi'
CGI.escapeHTML('"><script>alert("Rubyfu!")</script>')
```

Retorna

```
&quot;&gt;&lt;script&gt;alert(&quot;Rubyfu!&quot;)&lt;/script&gt;
```

**Decoding HTML**

```ruby
require 'cgi'
CGI.unescapeHTML("&quot;&gt;&lt;script&gt;alert(&quot;Rubyfu!&quot;)&lt;/script&gt;")
```

Retorna

```
"><script>alert("Rubyfu!")</script>
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

Retorna

```ruby
"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<samlp:AuthnRequest xmlns:samlp=\"urn:oasis:names:tc:SAML:2.0:protocol\" ID=\"agdobjcfikneommfjamdclenjcpcjmgdgbmpgjmo\" Version=\"2.0\" IssueInstant=\"2007-04-26T13:51:56Z\" ProtocolBinding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST\" ProviderName=\"google.com\" AssertionConsumerServiceURL=\"https://www.google.com/a/solweb.no/acs\" IsPassive=\"true\"><saml:Issuer xmlns:saml=\"urn:oasis:names:tc:SAML:2.0:assertion\">google.com</saml:Issuer><samlp:NameIDPolicy AllowCreate=\"true\" Format=\"urn:oasis:names:tc:SAML:2.0:nameid-format:unspecified\" /></samlp:AuthnRequest>\r\n"
```

[Source](http://stackoverflow.com/questions/3253298/base64-decode64-in-ruby-returning-strange-results)  
\[More about SAML\]\[3\]

---

\[3\]: [http://dev.gettinderbox.com/2013/12/16/introduction-to-saml/](http://dev.gettinderbox.com/2013/12/16/introduction-to-saml/)

