# Parsing Log files


## Apache log file

http://stackoverflow.com/questions/4846394/how-to-efficiently-parse-large-text-files-in-ruby

```ruby
apache_regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - (.{0})- \[([^\]]+?)\] "(GET|POST|PUT|DELETE) ([^\s]+?) (HTTP\/1\.1)" (\d+) (\d+) "-" "(.*)"/
```