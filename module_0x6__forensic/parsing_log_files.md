# Parsing Log files


## Apache log file
Let's first list the important information we may need fro apache logs 

- [x] IP address
- [x] Time stamp 
- [x] HTTP method 
- [x] URI path
- [x] Response code
- [x] User agent 

To read a log file, I prefer to read it as lines 

```ruby
apache_logs = File.readlines "/var/log/apache2/access.log"
```

I was looking for a simple regex for apache logs. I found one [here](http://stackoverflow.com/questions/4846394/how-to-efficiently-parse-large-text-files-in-ruby).

```ruby
apache_regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - (.{0})- \[([^\]]+?)\] "(GET|POST|PUT|DELETE) ([^\s]+?) (HTTP\/1\.1)" (\d+) (\d+) "-" "(.*)"/
```

The result is 

```ruby
#!/usr/bin/evn ruby
# KING SABRI | @KINGSABRI

apache_logs = File.readlines "/var/log/apache2/access.log"


def parse(apache_logs) 
  apache_regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - (.{0})- \[([^\]]+?)\] "(GET|POST|PUT|DELETE) ([^\s]+?) (HTTP\/1\.1)" (\d+) (\d+) "-" "(.*)"/
  result_parse = []
  apache_logs.each do |log|
    parser = log.scan(apache_regex)
    parse = 
        {
          :ip         => parser[0],
          :time       => parser[1],
          :method     => parser[3],
          :uri_path   => parser[4],
          :protocol   => parser[5],
          :code       => parser[6],
          :user_agent => parser[8]
        }
    result_parse << parse
  end
  
  return result_parse
end 

require 'pp'
pp parse(apache_logs)

```