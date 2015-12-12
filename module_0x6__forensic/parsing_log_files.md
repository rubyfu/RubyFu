# Parsing Log files


## Apache log file
Let's first list the important information we may need fro apache logs 

- [x] IP address
- [x] Time stamp 
- [x] HTTP method 
- [x] URI path
- [x] Response code
- [x] User agent 


http://stackoverflow.com/questions/4846394/how-to-efficiently-parse-large-text-files-in-ruby
To read a log file, I prefer to read it as lines 

```ruby
apache_logs = File.readlines "/var/log/apache2/access.log"
```

```ruby
apache_regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - (.{0})- \[([^\]]+?)\] "(GET|POST|PUT|DELETE) ([^\s]+?) (HTTP\/1\.1)" (\d+) (\d+) "-" "(.*)"/
```