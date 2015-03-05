# Extraction
String extraction is one of the main tasks that all programmers need. Sometimes it's getting harder because we didn't get an easy string presentation to extract useful data/information. Here some,

## Extracting URLs from file
Assume we have the follwoing string

string = "text here http://foo1.example.org/bla1 and http://foo2.example.org/bla2 and here mailto:test@example.com and here also."

**Using Regex**

```ruby
string.scan(/http[s]?:\/\/(.+)/i)
```

**Using standard URI module**
This will Return array of URL's
```ruby
require 'uri'
URI.extract(string, ["http" , "https"])
```

