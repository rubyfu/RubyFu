# FTP
Dealing with FTP is something is needed in many cases, Let's to see how easy is that in Ruby with AIO example.


```ruby
require 'net-ftp'

ftp = Net::FTP.new('rubyfu.net', 'admin', 'P@ssw0rd')   # Create New FTP connection
ftp.welcome                                             # The server's welcome message
ftp.system                                              # Get system information 
ftp.login                                               # Login
ftp.chdir 'go/to/another/path'                          # Change directory
file.pwd                                                # Get the currect directory
files = ftp.list('*')                                   # List all files and folders
ftp.mkdir 'rubyfu_backup'                               # Create dierctory
ftp.size 'src.png'                                      # Get file size
ftp.get 'src.png', 'dst.png', 1024                      # Download file
ftp.rename 'file1.pdf', 'file2.pdf'                     # Rename file
ftp.delete 'file3.pdf'                                  # Delete file 
ftp.closed?                                             # Is the connection closed?
```


