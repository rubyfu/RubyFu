# Ruby Socket

## Lightweight Introduction

### Ruby Socket Class Hierarchy

To know the socket hierarchy in ruby here a simple tree explains it.

```text
IO                              # The basis for all input and output in Ruby
└── BasicSocket                 # Abstract base class for all socket classes
    ├── IPSocket                # Super class for protocols using the Internet Protocol (AF_INET)
    │   ├── TCPSocket           # Class for Transmission Control Protocol (TCP) sockets
    │   │   ├── SOCKSSocket     # Helper class for building TCP socket servers applications
    │   │   └── TCPServer       # Helper class for building TCP socket servers
    │   └── UDPSocket           # Class for User Datagram Protocol (UDP) sockets
    ├── Socket                  # Base socket class that mimics that BSD Sockets API. It provides more operating system specific functionality
    └── UNIXSocket              # Class providing IPC using the UNIX domain protocol (AF_UNIX)
        └── UNIXServer          # Helper class for building UNIX domain protocol socket servers
```

I'll verbosely mention some of `Socket::Constants` here since I didn't find an obvious reference listing it except [Programming Ruby1.9 _The Pragmatic Programmers' Guide_](http://media.pragprog.com/titles/ruby3/app_socket.pdf); Otherwise you've to `ri Socket::Constants` from command line which is a good way to get the description of each constant.

### Socket Types

* SOCK\_RAW
* SOCK\_PACKET
* SOCK\_STREAM
* SOCK\_DRAM
* SOCK\_RDM
* SOCK\_SEQPACKET

### Address Families\(Socket Domains\)

* AF\_APPLETALK
* AF\_ATM
* AF\_AX25
* AF\_CCITT
* AF\_CHAOS
* AF\_CNT
* AF\_COIP
* AF\_DATAKIT
* AF\_DEC
* AF\_DLI
* AF\_E164
* AF\_ECMA
* AF\_HYLINK
* AF\_IMPLINK
* AF\_INET\(IPv4\)  
* AF\_INET6\(IPv6\)
* AF\_IPX
* AF\_ISDN
* AF\_ISO
* AF\_LAT
* AF\_LINK
* AF\_LOCAL\(UNIX\)
* AF\_MAX
* AF\_NATM
* AF\_NDRV
* AF\_NETBIOS
* AF\_NETGRAPH
* AF\_NS
* AF\_OSI
* AF\_PACKET
* AF\_PPP
* AF\_PUP
* AF\_ROUTE
* AF\_SIP
* AF\_SNA
* AF\_SYSTEM
* AF\_UNIX
* AF\_UNSPEC

### Socket Protocol

* IPPROTO\_SCTP
* IPPROTO\_TCP
* IPPROTO\_UDP

### Protocol Families

* PF\_APPLETALK
* PF\_ATM
* PF\_AX25
* PF\_CCITT
* PF\_CHAOS
* PF\_CNT
* PF\_COIP
* PF\_DATAKIT
* PF\_DEC
* PF\_DLI
* PF\_ECMA
* PF\_HYLINK
* PF\_IMPLINK
* PF\_INET
* PF\_INET6
* PF\_IPX
* PF\_ISDN
* PF\_ISO
* PF\_KEY
* PF\_LAT
* PF\_LINK
* PF\_LOCAL
* PF\_MAX
* PF\_NATM
* PF\_NDRV
* PF\_NETBIOS
* PF\_NETGRAPH
* PF\_NS
* PF\_OSI
* PF\_PACKET
* PF\_PIP
* PF\_PPP
* PF\_PUP
* PF\_ROUTE
* PF\_RTIP
* PF\_SIP
* PF\_SNA
* PF\_SYSTEM
* PF\_UNIX
* PF\_UNSPEC
* PF\_XTP

### Socket options

* SO\_ACCEPTCONN
* SO\_ACCEPTFILTER
* SO\_ALLZONES
* SO\_ATTACH\_FILTER
* SO\_BINDTODEVICE
* SO\_BINTIME
* SO\_BROADCAST
* SO\_DEBUG
* SO\_DETACH\_FILTER
* SO\_DONTROUTE
* SO\_DONTTRUNC
* SO\_ERROR
* SO\_KEEPALIVE
* SO\_LINGER
* SO\_MAC\_EXEMPT
* SO\_NKE
* SO\_NOSIGPIPE
* SO\_NO\_CHECK
* SO\_NREAD
* SO\_OOBINLINE
* SO\_PASSCRED
* SO\_PEERCRED
* SO\_PEERNAME
* SO\_PRIORITY
* SO\_RCVBUF
* SO\_RCVLOWAT
* SO\_RCVTIMEO
* SO\_RECVUCRED
* SO\_REUSEADDR
* SO\_REUSEPORT
* SO\_SECURITY\_AUTHENTICATION
* SO\_SECURITY\_ENCRYPTION\_NETWORK
* SO\_SECURITY\_ENCRYPTION\_TRANSPORT
* SO\_SNDBUF
* SO\_SNDLOWAT
* SO\_SNDTIMEO
* SO\_TIMESTAMP
* SO\_TIMESTAMPNS
* SO\_TYPE
* SO\_USELOOPBACK
* SO\_WANTMORE
* SO\_WANTOOBFLAG

## Creating Socket Template

```ruby
Socket.new(domain, socktype [, protocol])
```

**domain\(Address\/Protocol Families\):** like AF\_INET, PF\_PACKET, etc

**socktype:** like SOCK\_RAW, SOCK\_STREAM

**protocol:** by default, it's `0`m it should be a protocol defined \(we'll manipulate that later\)

## TCP Socket

**Server\/Client life cycle**

```text
            Client        Server
              |             |                  
   socket     +             +      socket
              |             |
   connect    +--------,    +      bind
              |         |   |
   write ,--> +------,  |   +      listen
         |    |      |  |   |
   read  `----+ <--, |  `-> +      accept
              |    | |      |
   close      +--, | `----> + <--, read <--,
                 | |        |    |         |
                 | `--------+----' write   ٨
                 |                         |
                 `----->------>------->----`
```

### General Socket usage

#### Get List of local IPaddreses

```ruby
require 'socket'
Socket.ip_address_list
```

#### Get Hostname

```ruby
Socket.gethostname
```

### TCP Server

Here we'll represent an absolute TCP server. This server will access connect from one client and send a message to it once connected then close the client and server connection

```ruby
require 'socket'

server = TCPServer.new('0.0.0.0', 9911) # Server, binds/listens all interfaces on port 9911
client = server.accept                  # Wait for client to connect
rhost  = client.peeraddr.last           # peeraddr, returns remote [address_family, port, hostname, numeric_address(ip)]
client.puts "Hi TCP Client! #{rhost}"   # Send a message to the client once it connect
client.gets.chomp                       # Read incoming message from client
client.close                            # Close the client's connection
server.close                            # Close the TCP Server
```

**Note:** if you want to list on unused and random port, set to port 0, ruby will find vacancy port then use it. ex.

```ruby
require 'socket'
server = TCPServer.new('0.0.0.0', 0)
server.addr[1]    # Shows the picked port
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

You can put timeout/time interval for current connection in-case the server's response get delayed and the socket is still open.

```ruby
timeval = [3, 0].pack("l_2")        # Time interval 3 seconds 
client.setsockopt Socket::SOL_SOCKET, Socket::SO_RCVTIMEO, timeval      # Set socket receiving time interval 
client.setsockopt Socket::SOL_SOCKET, Socket::SO_SNDTIMEO, timeval      # Set socket sending time interval
client.getsockopt(Socket::SOL_SOCKET, Socket::SO_RCVTIMEO).inspect      # Optional, Check if socket option has been set
client.getsockopt(Socket::SOL_SOCKET, Socket::SO_SNDTIMEO).inspect      # Optional, Check if socket option has been set
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
mesg, addr = server.recvfrom(1024)                      # Receive 1024 bytes of the message and the sender IP
server puts "Hi, UDP Client #{addr}", addr[3], addr[1]  # Send a message to the client 
server.recv(1024)                                       # Receive 1024 bytes of the message
```

### UDP Client

```ruby
require 'socket'
client = UDPSocket.new
client.connect('localhost', 9911)       # Connect to server on port 991
client.puts "Hi, UDP Server!", 0        # Send message 
server.recv(1024)                       # Receive 1024 bytes of the server message
```

There alternative for sending and receiving too, figure it out, [RubyDoc](http://ruby-doc.org/stdlib-2.0.0/libdoc/socket/rdoc/UDPSocket.html).

## GServer

GServer standard library implements a generic server, featuring thread pool management, simple logging, and multi-server management. Any kind of application-level server can be implemented using this class:

* It accepts multiple simultaneous connections from clients
* Several services \(i.e. one service per TCP port\)
  * can be run simultaneously, 
  * can be stopped at any time through the class method `GServer.stop(port)`
* All the threading issues are handled
* All events are optionally logged
* Very basic GServer

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

## Port knocking

Simple port knocker using the socket standard library.

```ruby
require 'socket'

ports = [42, 1337, 10420, 6969, 63000]

ports.each do |port|
  puts "[+] Port: #{port}"
  sleep 1
  begin
    s = TCPSocket.new '10.10.70.53', port
    s.close
  rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH
    next
  end
end
```

Ref.:

* [The Great Escape - Write-up - TryHackMe](https://blog.raw.pm/en/TryHackMe-The-Great-Escape-write-up/)

