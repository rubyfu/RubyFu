# Pure Ruby Netcat


## Simple Ncat.rb
I found [this][1] simple ncat so I did some enhancements on it and add some comments in it as well. 


```ruby
#!/usr/bin/ruby
require 'optparse'
require 'ostruct'
require 'socket'

class String
  def red; colorize(self, "\e[1m\e[31m"); end
  def green; colorize(self, "\e[1m\e[32m"); end
  def cyan; colorize(self, "\e[1;36m"); end
  def bold; colorize(self, "\e[1m"); end
  def colorize(text, color_code)  "#{color_code}#{text}\e[0m" end
end


class NetCat

  #
  # Parsing options
  #
  def parse_opts(args)
    @options = OpenStruct.new
    opts = OptionParser.new do |opts|
        opts.banner = "Usage: #{__FILE__}.rb [options]"
        opts.on('-c', '--connect',
            "Connect to a remote host") do
            @options.connection_type = :connect
        end
        opts.on('-l', '--listen',
            "Listen for a remote host to connect to this host") do
            @options.connection_type = :listen
        end
        opts.on('-r', '--remote-host HOSTNAME', String,
            "Specify the host to connect to") do |hostname|
            @options.hostname = hostname || '127.0.0.1'
        end
        opts.on('-p', '--port PORT', Integer,
            "Specify the TCP port") do |port|
            @options.port = port
        end
        opts.on('-v', '--verbose') do
            @options.verbose = :verbose
        end
        opts.on_tail('-h', '--help', "Show this message") do
            puts opts
            exit
        end
    end

    begin
        opts.parse!(args)
    rescue OptionParser::ParseError => err
      puts err.message
      puts opts
      exit
    end
    if @options.connection_type == nil
      puts "[!] ".red + "No Connection Type specified"
      puts opts
      exit
    end
    if @options.port == nil
      puts "[!] ".red + "No Port specified to #{@options.connection_type.to_s.capitalize}"
      puts opts
      exit
    end
    if @options.connection_type == :connect && @options.hostname == nil
      puts "[!] ".red + "Connection type connect requires a hostname"
      puts opts
      exit
    end
  end

  #
  # Socket Management
  #
  def connect_socket
    begin
      if @options.connection_type == :connect
        # Client
        puts "[+] ".green + "Connecting to " + "#{@options.hostname}".bold + " on port " + "#{@options.port}".bold if @options.verbose == :verbose
        @socket = TCPSocket.open(@options.hostname, @options.port)
      else
        # Server
        puts "[+] ".green + "Listing on port " + "#{@options.port}".bold if @options.verbose == :verbose
        server = TCPServer.new(@options.port)
        server.listen(1)
        @socket = server.accept
        print "-> ".cyan
      end
    rescue Exception => e
      puts "[!] ".red + "Error [1]: " + "#{e}"
      exit
    end

  end

  #
  # Data Transfer Management
  #
  def forward_data
    while true
      if IO.select([],[],[@socket, STDIN],0)
        socket.close
      end

      # Send command if done from receiving upto 2-billions bytes
      begin
        while (data = @socket.recv_nonblock(2000000000)) != ""
          STDOUT.write(data)
          print "-> ".cyan
        end
        exit
      rescue Errno::EAGAIN
        # http://stackoverflow.com/questions/20604130/how-to-use-rubys-write-nonblock-read-nonblock-with-servers-clients
      end

      begin
        while (data = STDIN.read_nonblock(2000000000)) != ""
          @socket.write(data)
        end
        exit
      rescue Errno::EAGAIN
        # http://stackoverflow.com/questions/20604130/how-to-use-rubys-write-nonblock-read-nonblock-with-servers-clients
      rescue EOFError
        exit
      end

      # Get all remote system socket(STDIN, STDOUT, STDERR) To my STDIN
      IO.select([@socket, STDIN], [@socket, STDIN], [@socket, STDIN])
    end

  end

  #
  # Run Ncat
  #
  def run(args)
    parse_opts(args)
    connect_socket
    forward_data
  end
end
ncat = NetCat.new
ncat.run(ARGV)
```






## Another Implementation of Ncat.rb 
Again from [Hood3dRob1n][2] a standalone [RubyCat][3] which supports password protection for bind shell.



<br><br><br>
---
[1]: http://4thmouse.com/index.php/2008/02/20/netcat-clone-in-three-languages-part-i-ruby/
[2]: https://github.com/Hood3dRob1n/
[3]: https://github.com/Hood3dRob1n/RubyCat