# Parsing Log Files


## Apache Log File
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

I was looking for a simple regex for apache logs. I found one [here](http://stackoverflow.com/questions/4846394/how-to-efficiently-parse-large-text-files-in-ruby) with small tweak.

```ruby
apache_regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - (.{0})- \[([^\]]+?)\] "(GET|POST|PUT|DELETE) ([^\s]+?) (HTTP\/1\.1)" (\d+) (\d+) "-" "(.*)"/
```

So I came up with this small method which parses and converts apache "access.log" file to an array contains list of hashes with our needed information.

```ruby
#!/usr/bin/evn ruby
# KING SABRI | @KINGSABRI


apache_logs = File.readlines "/var/log/apache2/access.log"

def parse(apache_logs) 

  apache_regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - (.{0})- \[([^\]]+?)\] "(GET|POST|PUT|DELETE) ([^\s]+?) (HTTP\/1\.1)" (\d+) (\d+) ([^\s]+?) "(.*)"/
  
  result_parse = []
  apache_logs.each do |log|
    parser = log.scan(apache_regex)[0]
    
    # If can't parse the log line for any reason.
    if log.scan(apache_regex)[0].nil?
      puts "Can't parse: #{log}\n\n"
      next
    end
    
    parse = 
        {
          :ip         => parser[0],
          :user       => parser[1],
          :time       => parser[2],
          :method     => parser[3],
          :uri_path   => parser[4],
          :protocol   => parser[5],
          :code       => parser[6],
          :res_size   => parser[7],
          :referer    => parser[8],
          :user_agent => parser[9]
        }
    result_parse << parse
  end
  
  return result_parse
end 

require 'pp'
pp parse(apache_logs)
```

Returns 
```
[{:ip=>"127.0.0.1",
  :user=>"",
  :time=>"12/Dec/2015:20:09:05 +0300",
  :method=>"GET",
  :uri_path=>"/",
  :protocol=>"HTTP/1.1",
  :code=>"200",
  :res_size=>"3525",
  :referer=>"\"-\"",
  :user_agent=>
   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36"},
 {:ip=>"127.0.0.1",
  :user=>"",
  :time=>"12/Dec/2015:20:09:05 +0300",
  :method=>"GET",
  :uri_path=>"/icons/ubuntu-logo.png",
  :protocol=>"HTTP/1.1",
  :code=>"200",                                                                                                                                                          
  :res_size=>"3689",                                                                                                                                                     
  :referer=>"\"http://localhost/\"",                                                                                                                                     
  :user_agent=>                                                                                                                                                          
   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36"},                                                          
 {:ip=>"127.0.0.1",                                                                                                                                                      
  :user=>"",                                                                                                                                                             
  :time=>"12/Dec/2015:20:09:05 +0300",                                                                                                                                   
  :method=>"GET",                                                                                                                                                        
  :uri_path=>"/favicon.ico",                                                                                                                                             
  :protocol=>"HTTP/1.1",                                                                                                                                                 
  :code=>"404",                                                                                                                                                          
  :res_size=>"500",                                                                                                                                                      
  :referer=>"\"http://localhost/\"",                                                                                                                                     
  :user_agent=>                                                                                                                                                          
   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36"}]
```

Note: The apache LogFormat is configured as `LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-agent}i\"" combined` which is the default configurations.

- %h is the remote host (ie the client IP)
- %l is the identity of the user determined by identd (not usually used since not reliable)
- %u is the user name determined by HTTP authentication
- %t is the time the request was received.
- %r is the request line from the client. ("GET / HTTP/1.0")
- %>s is the status code sent from the server to the client (200, 404 etc.)
- %b is the size of the response to the client (in bytes)
- Referer is the page that linked to this URL.
- User-agent is the browser identification string.


## IIS Log File

```
iis_regex = /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) ([^\s]++?) (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) (\d{2}) (GET|POST|PUT|DELETE) ([^\s]++?) - (\d+) (\d+) (\d+) (\d+) ([^\s]++?) (.*)/
```


