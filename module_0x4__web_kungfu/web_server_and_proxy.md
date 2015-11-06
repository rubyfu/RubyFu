# Ruby as Web Server and Proxy


## Web Server
You can run Ruby as web server for any folder/file on any un-used port 

```ruby
ruby -run -e httpd /var/www/ -p 8000
```

or 

```ruby
require 'webrick'
server = WEBrick::HTTPServer.new :Port => 8000, :DocumentRoot => '/var/www/'
server.start
```

To make HTTPS server
```ruby
require 'webrick'
require 'webrick/https'

cert = [
  %w[CN localhost],
]

server = WEBrick::HTTPServer.new(:Port         => 8000,
                                 :SSLEnable    => true,
                                 :SSLCertName  => cert,
                                 :DocumentRoot => '/var/www/')
server.start
```


## Web Proxy

### Transparent Web Proxy
```ruby
require 'webrick'
require 'webrick/httpproxy'

handler = proc do |req, res|
  puts "[*] Request"
  puts req.inspect
  request = req.request_line.split
  puts "METHOD: "      + "#{request[0]}"
  puts "Request URL: " + "#{request[1]}"
  puts "Request path: "+ "#{req.path}"
  puts "HTTP: "        + "#{request[2]}"
  puts "Referer: "     + "#{req['Referer']}"
  puts "User-Agent: "  + "#{req['User-Agent']}"
  puts "Host: "        + "#{req['Host']}"
  puts "Cookie: "      + "#{req['Cookie']}"
  puts "Connection: "  + "#{req['Connection']}"
  puts "Accept: "      + "#{req['accept']}"
  puts "Full header: " + "#{req.header}"
  puts "Body: "        + "#{req.body}"
  puts "----------[END OF REQUEST]----------"
  puts "\n\n"

  puts "[*] Response"
  puts res.inspect
  puts "Full header: " + "#{res.header}"
  puts "Body: " + "#{res.body}"
  puts "----------[END OF RESPONSE]----------"
  puts "\n\n\n"
end

proxy = WEBrick::HTTPProxyServer.new Port: 8000, 
                                     ServerName: "RubyfuProxyServer", 
                                     ServerSoftware: "RubyFu Proxy", 
                                     ProxyContentHandler: handler

trap 'INT'  do proxy.shutdown end

proxy.start

```


### Transparent Web Proxy with Authentication 
Well, it was great to know that building a proxy server is that easy. Now we need to Force authentication to connect to the proxy server 

To enable authentication for requests in WEBrick you will need a user database and an authenticator. To start, here’s an Htpasswd database for use with a DigestAuth authenticator:

The `:Realm` is used to provide different access to different groups across several resources on a server. Typically you'll need only one realm for a server.







http://docs.ruby-lang.org/en/2.2.0/WEBrick.html
