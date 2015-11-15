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
<collection shelf="New Arrivals">
<movie title="Enemy Behind">
   <type>War, Thriller</type>
   <format>DVD</format>
   <year>2003</year>
   <rating>PG</rating>
   <stars>10</stars>
   <description>Talk about a US-Japan war</description>
</movie>
<movie title="Transformers">
   <type>Anime, Science Fiction</type>
   <format>DVD</format>
   <year>1989</year>
   <rating>R</rating>
   <stars>8</stars>
   <description>A schientific fiction</description>
</movie>
   <movie title="Trigun">
   <type>Anime, Action</type>
   <format>DVD</format>
   <episodes>4</episodes>
   <rating>PG</rating>
   <stars>10</stars>
   <description>Vash the Stampede!</description>
</movie>
<movie title="Ishtar">
   <type>Comedy</type>
   <format>VHS</format>
   <rating>PG</rating>
   <stars>2</stars>
   <description>Viewable boredom</description>
</movie>
</collection>
```

### REXML

```ruby
require 'rexml/document'


```

### Nokogiri
```ruby
require 'nokogiri'


```


## JSON
