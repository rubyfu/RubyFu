# Web Proxy


```ruby
require 'webrick'
require 'webrick/httpproxy'

handler = proc do |req, res|
  puts "[*] Request"
  puts req.inspect
  puts "[*] Response"
  puts res.inspect
end

proxy = WEBrick::HTTPProxyServer.new Port: 8000, ProxyContentHandler: handler
trap 'INT'  do proxy.shutdown end
trap 'TERM' do proxy.shutdown end

proxy.start
```

