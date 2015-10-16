# Interacting with APIs

```ruby
require 'http'

json_res = JSON.parse Net::HTTP.get URI.parse "http://api.stackexchange.com/2.2/questions?site=stackoverflow"
```


