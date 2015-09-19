# Pure Ruby NetCat

http://4thmouse.com/index.php/2008/02/20/netcat-clone-in-three-languages-part-i-ruby/

http://kaoticcreations.blogspot.com/2013/10/rubycat-pure-ruby-netcat-alternative.html


```
#!/usr/bin/ruby
require 'optparse'
require 'ostruct'
require 'socket'
class NetTools
	def run(args)
		parse_opts(args)
		connect_socket()
		forward_data()
	end
	def parse_opts(args)
		@options = OpenStruct.new
		opts = OptionParser.new do |opts|
			opts.banner = "Usage: net_tool.irb [options]"
			opts.on("-c", "--connect", 
				"Connect to a remote host") do
				@options.connection_type = :connect
			end
			opts.on("-l", "--listen",
				"Listen for a remote host to connect to this host") do
				@options.connection_type = :listen
			end
			opts.on("-r", "--remote-host HOSTNAME", String,
				"Specify the host to connect to") do |hostname|
				@options.hostname = hostname
			end
			opts.on("-p", "--port PORT", Integer, 
				"Specify the TCP port") do |port|
				@options.port = port;
			end
			opts.on_tail("-h", "--help", "Show this message") do
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
		if (@options.connection_type == nil)
			puts "no connection type specified"
			puts opts
			exit
		end
		if (@options.port == nil)
			puts "no port specified"
			puts opts
			exit
		end
		if(@options.connection_type == :connect && @options.hostname == nil)
			puts "connection type connect requires a hostname"
			puts opts
			exit
		end
	end
	def connect_socket()
		if(@options.connection_type == :connect)
			@socket = TCPSocket.open(@options.hostname, @options.port)
		else
			server = TCPServer.new(@options.port)
			server.listen( 1)
			@socket = server.accept
		end
	end
	def forward_data()
		while(true)
			if(IO.select([],[],[@socket, STDIN],0))
				socket.close
				return
			end
			begin
				while( (data = @socket.recv_nonblock(100)) != "")
					STDOUT.write(data);
				end
				exit
			rescue Errno::EAGAIN
			end
			begin
				while( (data = STDIN.read_nonblock(100)) != "")
					@socket.write(data);
				end
				exit
			rescue Errno::EAGAIN
			rescue EOFError
				exit
			end
			IO.select([@socket, STDIN], [@socket, STDIN], [@socket, STDIN])
		end
	end
end
tools = NetTools.new
tools.run(ARGV)
```