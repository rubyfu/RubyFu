# SMTP Enumeration

Interacting with SMTP is easy and since the protocol is straight forward.

```ruby
#!/usr/bin/evn ruby
# KING SABRI | @KINGSABRI
#
require 'socket'

users =
    %w{
        root rubyfu www apache2 bin daemon sshd
        gdm  nobody ftp operator postgres mysqld
      }
found = []

@s = TCPSocket.new('192.168.0.19', 25)
@banner = @s.recv(1024).chomp
users.each do |user|
  @s.send "VRFY #{user} \n\r", 0
  resp = @s.recv(1024).chomp
  found << user if resp.split[2] == user
end
@s.close

puts "[*] Result:-"
puts "[+] Banner: " + @banner
puts "[+] Found users: \n#{found.join("\n")}"
```
Results

```
[*] Result:-
[+] Banner: 220 VulnApps.localdomain ESMTP Postfix
[+] Found users: 
root
rubyfu
www
bin
daemon
sshd
gdm
nobody
ftp
operator
postgres
```


**Your turn**, there are other commands that can be used such as `EXPN`, `RCPT`. Enhance the above script to include all these commands to avoid restricted commands that might you face. Tweet your code and outputs to **@Rubyfu** 




