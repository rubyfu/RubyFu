# Ruby Socket

## Ruby Socket Class Hierarchy 


```
IO                              # The basis for all input and output in Ruby
└── BasicSocket                 # Abstract base class for all socket classes
    ├── IPSocket                # Base class for protocols using the Internet Protocol (AF_INET)
    │   ├── TCPSocket           # Class for Transmission Control Protocol (TCP) sockets
    │   │   ├── SOCKSSocket     # Helper class for building TCP socket servers applications
    │   │   └── TCPServer       # Helper class for building TCP socket servers
    │   └── UDPSocket           # Class for User Datagram Protocol (UDP) sockets
    ├── Socket                  # Base socket class that mimics that BSD Sockets API
    └── UNIXSocket              # Class providing IPC using the UNIX domain protocol (AF_UNIX)
        └── UNIXServer          # Helper class for building UNIX domain protocol socket servers
```










## GServer



<br><br><br>
---