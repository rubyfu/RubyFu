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
client.puts "Welcome! #{rhost}"         # Send a message to the client once it connect
client.close                            # Close the client's connection
server.close                            # Close the TCP Server
```



### TCP Client 

```ruby
require 'socket'

```

## UDP Socket

### UDP Server
```ruby
require 'socket'

```

### UDP Clinet
```ruby
require 'socket'

```





## GServer



<br><br><br>
---