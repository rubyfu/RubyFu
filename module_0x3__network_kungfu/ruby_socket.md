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
    ├── Socket                  # Base socket class that mimics that BSD Sockets API. It provides more operating system specific functionality
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

You can put timeout/time interval for current connection in-case the server's response get delayed and socket still open.

```ruby
timeval = [3, 0].pack("l_2")        # Time interval 3 seconds 
client.setsockopt Socket::SOL_SOCKET, Socket::SO_RCVTIMEO, timeval      # Set socket revceiving time interval 
client.setsockopt Socket::SOL_SOCKET, Socket::SO_SNDTIMEO, timeval      # Set socket sending time interval 
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

server = UDPSocket.new                                  # Start UDP socket
server.bind('0.0.0.0', 9911)                            # Bind all interfaces to port 9911
mesg, addr = server.recvfrom(1024)                      # Recive 1024 bytes of the message and the sender IP
server puts "Hi, UDP Client #{addr}", addr[3], addr[1]  # Send a message to the client 
server.recv(1024)                                       # Recive 1024 bytes of the message 
```

### UDP Client
```ruby
require 'socket'
client = UDPSocket.new
client.connect('localhost', 9911)       # Connect to server on port 991
client.puts "Hi, UDP Server!", 0        # Send message 
server.recv(1024)                       # Recive 1024 bytes of the server message
```

There alternative for sending and receiving too, figure it out, [RubyDoc](http://ruby-doc.org/stdlib-2.0.0/libdoc/socket/rdoc/UDPSocket.html).




## GServer
GServer standard library implements a generic server, featuring thread pool management, simple logging, and multi-server management. Any kind of application-level server can be implemented using this class:
- It accepts multiple simultaneous connections from clients
- Several services (i.e. one service per TCP port)
    - can be run simultaneously, 
    - can be stopped at any time through the class method `GServer.stop(port)`
- All the threading issues are handled
- All events are optionally logged


- Very basic GServer

```ruby
require 'gserver'

class HelloServer < GServer                 # Inherit GServer class
  def serve(io)
    io.puts("What's your name?")
    line = io.gets.chomp
    io.puts "Hi, #{line}!"
    self.stop if io.gets =~ /shutdown/      # Stop the server if you get shutdown string
  end
end

server = HelloServer.new(1234, '0.0.0.0')   # Start the server on port 1234
server.audit = true     # Enable logging
server.start            # Start the service 
server.join
```












<br><br><br>
---