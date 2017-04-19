# Extração
Extração de string é uma das principais tarefas que todos programadores precisam realizar. Às vezes, torna-se mais difícil pois não obtemos um apresentação de string fácil para extrair dados/informações úteis. Aqui algumas.

## Extraindo strings de Rede


### Extraindo Endereço MAC de strings
Nós precisamos extrair todos os endereços MAC'S de uma string arbitrária.

```ruby
mac = "ads fs:ad fa:fs:fe: Wind00-0C-29-38-1D-61ows 1100:50:7F:E6:96:20dsfsad fas fa1 3c:77:e6:68:66:e9 f2"
```

**Usando Expressão Regular**

A expressão regular deve suportar formatos de endereços mac tanto de Windows quanto de Linux.

Vamos procurar nosso mac
```ruby
mac_regex = /(?:[0-9A-F][0-9A-F][:\-]){5}[0-9A-F][0-9A-F]/i
mac.scan mac_regex
```
Retorna
```
["00-0C-29-38-1D-61", "00:50:7F:E6:96:20", "3c:77:e6:68:66:e9"]
```

### Extraindo endereço IPv4 de strings
Precisamos extrair todos os endereços IPv4 de uma string arbitrária.

```ruby
ip = "ads fs:ad fa:fs:fe: Wind10.0.4.5ows 11192.168.0.15dsfsad fas fa1 20.555.1.700 f2"
```

```
ipv4_regex = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/
```
Vamos achar nossos IP's

```ruby
ip.scan ipv4_regex

```
Retorna
```
[["10", "0", "4", "5"], ["192", "168", "0", "15"]]
```

### Extraindo endereços IPv6 de strings
```ruby
 ipv6_regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
```
 - [Fonte](https://github.com/rapid7/rex-socket/blob/master/lib/rex/socket.rb)
 - Veja também
 - https://gist.github.com/cpetschnig/294476
 - http://snipplr.com/view/43003/regex--match-ipv6-address/

## Extraindo Strings web
### Extraindo URL's de arquivos
Assuma que temos a seguinte string

```ruby
string = "text here http://foo1.example.org/bla1 and http://foo2.example.org/bla2 and here mailto:test@example.com and here also."
```


**Usando Expressões Regulares**
```ruby
string.scan(/https?:\/\/[\S]+/)
```

**Usando o módulo 'standard URI'**

Isso retorna um array de URL's

```ruby
require 'uri'
URI.extract(string, ["http" , "https"])
```

### Extraindo URLs de págins web
Usando macetes

```ruby
require 'net/http'
URI.extract(Net::HTTP.get(URI.parse("http://rubyfu.net")), ["http", "https"])
```
ou usando expressão regular
```ruby
require 'net/http'
Net::HTTP.get(URI.parse("http://rubyfu.net")).scan(/https?:\/\/[\S]+/)
```

### Extraindo Endereços de Email de páginas web

```ruby
email_regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i
```

```ruby
require 'net/http'
Net::HTTP.get(URI.parse("http://isemail.info/_system/is_email/test/?all")).scan(email_regex).uniq
```


### Extraindo Strings de tags HTML

Assuma que temos o seguinte conteúdo HTML, e precisamos pegar apenas as strings, eliminando todas as tags HTML.

```ruby

string = "<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is another <strong>contents</strong>.</p>

</body>
</html>"


puts string.gsub(/<.*?>/,'').strip

```

Retorna
```
Page Title



This is a Heading
This is another contents.
```

### Parsing colon separated data from a file
Durante o pentest, você pode precisar analisar textos com formatos comuns como o seguinte
```
description : AAAA
info : BBBB
info : CCCC
info : DDDD
solution : EEEE
solution : FFFF
reference : GGGG
reference : HHHH
see_also : IIII
see_also : JJJJ
```

A ideia principal é remover chaves _repetidas e passa-las para uma chave com um array de valores.

```ruby
#!/usr/bin/env ruby
#
# KING SABRI | @KINGSABRI
# Usage:
#   ruby noawk.rb file.txt
#

file = File.read(ARGV[0]).split("\n")
def parser(file)
  hash = {} # Datastore
  splitter = file.map { |line| line.split(':', 2) }
  splitter.each do |k, v|
    k.strip! # removendo espaços em brancos
    v.strip! # removendo espalos em brancos

    if hash[k]      # Se essa chave existe
      hash[k] << v  # Adicione eses valor para o array de chaves
    else            # se não
      hash[k] = [v] # Crie uma nova chave e adicione um array contendo esse valor
    end
  end

  hash # retorna o hash
end

parser(file).each {|k, v| puts "#{k}:\t#{v.join(', ')}"}
```

Para os amantes de uma linha.
```
ruby -e 'h={};File.read("text.txt").split("\n").map{|l|l.split(":", 2)}.map{|k, v|k.strip!;v.strip!; h[k] ? h[k] << v : h[k] = [v]};h.each {|k, v| puts "#{k}:\t#{v.join(", ")}"}'
```



