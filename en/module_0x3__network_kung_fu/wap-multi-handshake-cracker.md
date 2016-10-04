# WPA multi handshake cracker

When you have a bunch of _handshakes_ from your pentesting wifi scans and want to just leave it running all night here is a small script that will get all handshakes produced by lets say [wifite](https://github.com/derv82/wifite2 "Wifite"). The code will get the SSID from the filename and use aircrack with a given dictionary.
In this image below, shows a succesfull handshake grab(I have paint over the MAC and SSID, for privacy matters)
as you can see in the image it collects the handshake inside the folder **_hs_**

![](/assets/wifite-capture.png)



```ruby
#!/usr/bin/env ruby

require 'open3'

@dictionary='wpacracker.txt'

def success(line, ssid)
  filename = 'rek2.pot'
  File.open(filename, 'a') do |file| 
    file.write("#{line} #{ssid}\n".strip) 
  end
end


def crack(file, ssid)
  cmd = "/usr/bin/aircrack-ng #{file} -q -e #{ssid} -w #{@dictionary}"
  Open3.popen3(cmd) do |stdin, stdout, stderr, wait_thr|
    while line = stdout.gets
      puts line
      success(line, ssid) if line.include? "KEY FOUND"
    end
  end
end


Dir["hs/*.cap"].each do |file|
  ssid = /(?<=\/)[^\_]*/.match(file)
  puts "ssid: #{ssid}\n".strip
  puts "will do #{file}\n".strip
  crack(file, ssid)
end
```