# Interacting with APIs

API's has variety of structure to interact with its peers.  


```ruby
require 'http'

json_res = JSON.parse Net::HTTP.get URI.parse "http://api.stackexchange.com/2.2/questions?site=stackoverflow"
```


