# Parsing HTML, XML, JSON

Generally speaking the best and easiest way for parsing HTML and XML is using **Nokogiri** library

- To install Nokogiri
```
gem install nokogiri
```

## HTML

Here we'll use nokogiri to list our contents list from `http://rubyfu.net/content/`

### Using CSS selectors
```ruby
require 'nokogiri'
require 'open-uri'

page = Nokogiri::HTML(open("http://rubyfu.net/content/"))
page.css(".book .book-summary ul.summary li a, .book .book-summary ul.summary li span").each { |css| puts css.text.strip.squeeze.gsub("\n", '')}
```

Returns 
```
RubyFu
Module 0x0 | Introduction
0.1.  Contribution
0.2.  Beginers
0.3.  Required Gems
1.  Module 0x1 | Basic Ruby KungFu
1.1.  String
1.1.1.  Conversion
1.1.2.  Extraction
1.2.  Aray
2.  Module 0x2 | System KungFu
2.1.  Comand Execution
2.2.  File manipulation
2.2.1.  Parsing HTML, XML, JSON
2.3.  Cryptography
2.4.  Remote Shel
2.4.1.  Ncat.rb
2.5.  Virustotal
3.  Module 0x3 | Network KungFu
3.1.  Ruby Socket
3.2.  FTP
3.3.  SSH
3.4.  Email
3.4.1.  SMTP Enumeration
3.5.  Network Scaning
.
.
..snippet..
```

## XML
There are 2 ways we'd like to show her, the standard library `rexml` and `nokogiri` external library 

We've the following XML file
```xml
<?xml version="1.0"?>
<catalog>
   <book id="bk101">
      <author>Gambardella, Matthew</author>
      <title>XML Developer's Guide</title>
      <genre>Computer</genre>
      <price>44.95</price>
      <publish_date>2000-10-01</publish_date>
      <description>An in-depth look at creating applications 
      with XML.</description>
   </book>
   <book id="bk102">
      <author>Ralls, Kim</author>
      <title>Midnight Rain</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2000-12-16</publish_date>
      <description>A former architect battles corporate zombies, 
      an evil sorceress, and her own childhood to become queen 
      of the world.</description>
   </book>
   <book id="bk103">
      <author>Corets, Eva</author>
      <title>Maeve Ascendant</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2000-11-17</publish_date>
      <description>After the collapse of a nanotechnology 
      society in England, the young survivors lay the 
      foundation for a new society.</description>
   </book>
   <book id="bk104">
      <author>Corets, Eva</author>
      <title>Oberon's Legacy</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2001-03-10</publish_date>
      <description>In post-apocalypse England, the mysterious 
      agent known only as Oberon helps to create a new life 
      for the inhabitants of London. Sequel to Maeve 
      Ascendant.</description>
   </book>
</catalog>
```


### REXML


### Nokogiri


## JSON
