# Interacting with APIs

APIs have a variety of structures to interact with their peers.  


```ruby
require 'http'

json_res = JSON.parse Net::HTTP.get URI.parse "http://api.stackexchange.com/2.2/questions?site=stackoverflow"
```


