# FTP
Dealing with FTP is something is needed in many cases, Let's to see how easy is that in Ruby with AIO example.


```ruby
require 'net-ftp'

ftp = Net::FTP.new('example.com')                       # Create New FTP connection
ftp.welcome                                             # The server's welcome message
ftp.login                                               # Login
files = ftp.chdir('go/to/another/path')                 # 
files = ftp.list('n*')
ftp.getbinaryfile('nif.rb-0.91.gz', 'nif.gz', 1024)

```


