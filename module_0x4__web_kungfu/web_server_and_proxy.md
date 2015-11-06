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

```ruby
require 'webrick'
require 'webrick/httpproxy'

handler = proc do |req, res|
  puts "[*] Request"
  puts req.inspect
  puts "[*] Response"
  puts res.inspect
end

proxy = WEBrick::HTTPProxyServer.new Port: 8000, 
                                     ServerName: "RubyfuProxyServer", 
                                     ServerSoftware: "RubyFuProxy", 
                                     ProxyContentHandler: handler
                                     
trap 'INT'  do proxy.shutdown end
trap 'TERM' do proxy.shutdown end

proxy.start
```

http://docs.ruby-lang.org/en/2.2.0/WEBrick.html
