# Ruby Socket

## Ruby Socket Class Hierarchy 

```
IO                              # The basis for all input and output in Ruby
└── BasicSocket                 # Abstract base class for all socket classes
    ├── IPSocket                # Super class for protocols using the Internet Protocol (AF_INET)
    │   ├── TCPSocket           # Class for Transmission Control Protocol (TCP) sockets
    │   │   ├── SOCKSSocket     # Helper class for building TCP socket servers applications
    │   │   └── TCPServer       # Helper class for building TCP socket servers
    │   └── UDPSocket           # Class for User Datagram Protocol (UDP) sockets
    ├── Socket                  # Base socket class that mimics that BSD Sockets API
    └── UNIXSocket              # Class providing IPC using the UNIX domain protocol (AF_UNIX)
        └── UNIXServer          # Helper class for building UNIX domain protocol socket servers
```

## TCP Socket

### TCP Server

Here we'll represent an absolute TCP server. This server will access connect from one client and send a message to it once connected then close the client and server connection 
```ruby
require 'socket'

server = TCPServer.new('0.0.0.0', 9911) # Server, binds/listens all interfaces on port 9911
client = server.accept                  # Wait for client to connect
rhost  = client.peeraddr.last           # peeraddr, returns remote [address_family, port, hostname, numeric_address(ip)]
client.puts "Hi TCP Client! #{rhost}"   # Send a message to the client once it connect
client.gets.chomp                       # Read incomming message from client
client.close                            # Close the client's connection
server.close                            # Close the TCP Server
```

### TCP Client 

```ruby
require 'socket'

client = TCPSocket.new('127.0.0.1', 9911)   # Client, connects to server on port 9911
rhost  = client.peeraddr.last               # Get the remote server's IP address 
client.gets.chomp
client.puts "Hi, TCP Server #{rhost}"
client.close
```

There are some alternatives for `puts` and `gets` methods.You can see the difference and its classes using method method in Pry interpreter console

```ruby
>> s = TCPSocket.new('0.0.0.0', 9911)
=> #<TCPSocket:fd 11>
>> s.method :puts
=> #<Method: TCPSocket(IO)#puts>
>> s.method :write
=> #<Method: TCPSocket(IO)#write>
>> s.method :send
=> #<Method: TCPSocket(BasicSocket)#send>
```

```ruby
>> s = TCPSocket.new('0.0.0.0', 9911)
=> #<TCPSocket:fd 11>
>> s.method :gets
=> #<Method: TCPSocket(IO)#gets>
>> s.method :read
=> #<Method: TCPSocket(IO)#read>
>> s.method :recv
=> #<Method: TCPSocket(BasicSocket)#recv>
```


## UDP Socket

### UDP Server
```ruby
require 'socket'

server = UDPSocket.new
server.bind('0.0.0.0', 9911)
mesg, addr = server.recvfrom(1024)

```

### UDP Clinet
```ruby
require 'socket'
client = = UDPSocket.new
client.puts "Hi UDP Server!"
```





## GServer



<br><br><br>
---