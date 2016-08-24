# Extraction
String extraction is one of the main tasks that all programmers need. Sometimes it's getting even harder because we don't get an easy string presentation to extract useful data/information. Here some,

## Extracting Network Strings


### Extracting MAC address from string
We need to extract all MAC address from an arbitrary string
```ruby
mac = "ads fs:ad fa:fs:fe: Wind00-0C-29-38-1D-61ows 1100:50:7F:E6:96:20dsfsad fas fa1 3c:77:e6:68:66:e9 f2"
```

**Using Regular Expressions**

The regular expression should supports windows and Linux mac address formats.

lets to find our mac
```ruby
mac_regex = /(?:[0-9A-F][0-9A-F][:\-]){5}[0-9A-F][0-9A-F]/i
mac.scan mac_regex
```
Returns
```
["00-0C-29-38-1D-61", "00:50:7F:E6:96:20", "3c:77:e6:68:66:e9"]
```

### Extracting IPv4 address from string
We need to extract all IPv4 address from an arbitrary string

```ruby
ip = "ads fs:ad fa:fs:fe: Wind10.0.4.5ows 11192.168.0.15dsfsad fas fa1 20.555.1.700 f2"
```

```
ipv4_regex = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/
```
Let's to find our IPs

```ruby
ip.scan ipv4_regex

```
Returns
```
[["10", "0", "4", "5"], ["192", "168", "0", "15"]]
```

### Extracting IPv6 address from string
https://gist.github.com/cpetschnig/294476

http://snipplr.com/view/43003/regex--match-ipv6-address/

## Extracting Web Strings
### Extracting URLs from file
Assume we have the following string

```ruby
string = "text here http://foo1.example.org/bla1 and http://foo2.example.org/bla2 and here mailto:test@example.com and here also."
```
<br>
**Using Regular Expressions**
```ruby
string.scan(/https?:\/\/[\S]+/)
```

**Using standard URI module**
This returns an array of URLs
```ruby
require 'uri'
URI.extract(string, ["http" , "https"])
```

### Extracting URLs from web page
Using above tricks

```ruby
require 'net/http'
URI.extract(Net::HTTP.get(URI.parse("http://rubyfu.net")), ["http", "https"])
```
or using a regular expression
```ruby
require 'net/http'
Net::HTTP.get(URI.parse("http://rubyfu.net")).scan(/https?:\/\/[\S]+/)
```

### Extracting Email Addresses from Web Page
```ruby
require 'net/http'
Net::HTTP.get(URI.parse("http://pastebin.com/khAmnhsZ")).scan(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i).uniq
```


### Extracting Strings from HTML tags 

Assume we have the following HTML contents and we need to get strings only and eliminate all HTML tags.


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

Returns
```
Page Title



This is a Heading
This is another contents.
```

### Parsing comma seperated data from a file
During pentest, you may need to parse a text that has a very common format as follows

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

The main idea is to remove repeated keys and assing it to one key with an array of values.

```ruby
#!/usr/bin/env ruby
#
# KING SABRI | @KINGSABRI
# Usage:
#   ruby noawk.rb file.txt
#

file = File.read(ARGV[0]).split("\n")
def parser(file) hash = {} # Datastore
 splitter = file.map { |line| line.split(':', 2) }
  splitter.each do |k, v|
   k.strip! # remove leading and trailing whitespaces
   v.strip! # remove leading and trailing whitespaces

    if hash[k]      # if this key exists
      hash[k] << v  # add this value to the key's array
    else            # if not
      hash[k] = [v] # create the new key and add an array contains this value
    end
  end 
 
  hash # return the hash
end

parser(file).each {|k, v| puts "#{k}:\t#{v.join(', ')}"}


```

For one liner lover
```
ruby -e 'h={};File.read("text.txt").split("\n").map{|l|l.split(":", 2)}.map{|k, v|k.strip!;v.strip!; h[k] ? h[k] << v : h[k] = [v]};h.each {|k, v| puts "#{k}:\t#{v.join(", ")}"}'
```



