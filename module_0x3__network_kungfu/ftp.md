# FTP
Dealing with FTP is something needed in many cases, Let's see how easy is that in Ruby with AIO example.


```ruby
require 'net/ftp'

ftp = Net::FTP.new('rubyfu.net', 'admin', 'P@ssw0rd')   # Create New FTP connection
ftp.welcome                                             # The server's welcome message
ftp.system                                              # Get system information 
ftp.chdir 'go/to/another/path'                          # Change directory
file.pwd                                                # Get the currect directory
ftp.list('*')                                           # or ftp.ls, List all files and folders
ftp.mkdir 'rubyfu_backup'                               # Create dierctory
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