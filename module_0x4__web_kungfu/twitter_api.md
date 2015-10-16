# Twitter API

- To install twitter API
```
gem install twitter
```

## Basic Usage
```ruby
require 'twitter'
client = Twitter::REST::Client.new do |config|
        config.consumer_key        = "YOUR_CONSUMER_KEY"
        config.consumer_secret     = "YOUR_CONSUMER_SECRET"
        config.access_token        = "YOUR_ACCESS_TOKEN"
        config.access_token_secret = "YOUR_ACCESS_SECRET"
end


client.user("KINGSABRI")
client.update("w00t! #Rubyfu")      # Tweet (as the authenticated user)
client.follow("KINGSABRI")          # Follow User (as the authenticated user)
client.followers("KINGSABRI")       # Fetch followers of a user
client.followers                    # Fetch followers of current user 
client.status(649235138585366528)   # Fetch a particular Tweet by ID
```