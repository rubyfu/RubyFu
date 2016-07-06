# FTP
Dealing with FTP is something needed in many cases, Let's see how easy is that in Ruby with AIO example.

## FTP Client 
```ruby
require 'net/ftp'

ftp = Net::FTP.new('rubyfu.net', 'admin', 'P@ssw0rd')   # Create New FTP connection
ftp.welcome                                             # The server's welcome message
ftp.system                                              # Get system information 
ftp.chdir 'go/to/another/path'                          # Change directory
file.pwd                                                # Get the correct directory
ftp.list('*')                                           # or ftp.ls, List all files and folders
ftp.mkdir 'rubyfu_backup'                               # Create directory
ftp.size 'src.png'                                      # Get file size
ftp.get 'src.png', 'dst.png', 1024                      # Download file
ftp.put 'file1.pdf', 'file1.pdf'                        # Upload file 
ftp.rename 'file1.pdf', 'file2.pdf'                     # Rename file
ftp.delete 'file3.pdf'                                  # Delete file 
ftp.quit                                                # Exit the FTP session
ftp.closed?                                             # Is the connection closed?
ftp.close                                               # Close the connection
```

Yep, it's simple as that, easy and familiar.

**TIP:** You can do it all above way using pure socket library, it's really easy. You may try to do it.

## FTP Server
- Install gem 
```
gem install ftpd
```

```ruby
#
# CVE-2016-4971 | The Evil FTPd server
# KING SABRI | @KINGSABRI
# 
require 'ftpd'

class Driver
  attr_accessor :path, :user, :pass
  def initialize(path)
    @path = path
  end
  
  def authenticate(user, password)
    true
  end
  
  def file_system(user)
    Ftpd::DiskFileSystem.new(@path)
  end
  
end

class FTPevil
  
  def initialize(path=".")
    @driver = Driver.new(File.expand_path(path))
    @server = Ftpd::FtpServer.new(@driver)
    configure_server
    print_connection_info
  end
  
  def configure_server
    @server.server_name = "Wget Exploit"
    @server.interface = "0.0.0.0"
    @server.port = 21
  end
  
  def print_connection_info
    puts "Interface: #{@server.interface}"
    puts "Port: #{@server.port}"
    puts "Directory: #{@driver.path}"
    puts "User: #{@driver.user}"
    puts "Pass: #{@driver.pass}"
    puts "PID: #{$$}"
  end
  
  def start
    @server.start
    puts "[+] FTP server started. (Press CRL+C to stop it)"
    $stdout.flush
    begin
      loop{}
    rescue Interrupt
      puts "\n[+] Closing FTP server."
    end
  end
end

if ARGV.size >= 1
  path   = ARGV[0]
else 
  puts "[!] ruby #{__FILE__} <PATH>"
  exit
end

FTPevil.new(path).start
```

Run it
```
ruby ftpd.rb .

Interface: 0.0.0.0
Port: 21
Directory: /tmp/ftp-share
User: 
Pass: 
PID: 2366
[+] FTP server started. (Press CRL+C to stop it)

```


