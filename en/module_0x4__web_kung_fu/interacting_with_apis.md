# Interacting with APIs

APIs have a variety of structures to interact with their peers.

**StackExchange API**

```ruby
require 'http'

json_res = JSON.parse(Net::HTTP.get(URI.parse "http://api.stackexchange.com/2.2/questions?site=stackoverflow"))
```

**IPify API**

```ruby
require 'open-uri'
require 'json'
JSON.parse(open('https://api.ipify.org?format=json').read)["ip"]
```



