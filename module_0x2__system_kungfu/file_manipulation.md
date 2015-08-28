# File manipulation

## Simple Steganography
Simple script to hide a file `file.pdf` in an image `image.png` then write it into `steg.png` image which is originally the `image.png`
Then, it recovers the `file.pdf` from `steg.png` to `hola.pdf`.

```ruby
sec_file = File.read 'file.pdf'
nor_file = File.read 'image.png'
sep = '*------------------------*'
one_file = [nor_file, sep, sec_file]

# Wirte sec_file, sep, nor_file into steg.png
File.open("steg.png", 'wb') do |stg|
  one_file.each do |f|
    stg.puts f
  end
end

# Read steg.png to be like "one_file" array
recov_file = File.read('steg.png').force_encoding("BINARY").split(sep).last
# Write sec_file to hola.pdf
File.open('hola.pdf', 'wb') {|file| file.print recov_file}
```

## Simple Binary file to Hex

```ruby
#!/usr/bin/env ruby
# Simple file to hex converter script
#
file_name = ARGV[0]

file = File.open(file_name , 'rb')
file2hex = file.read.each_byte.map { |b| '\x%02x' % b }.join    # b.to_s(16).rjust(2, '0')

puts file2hex
```

```
ruby hex-simple.rb ../assembly/hellolinux
```

Or in one command line

```bash
ruby -e "puts  File.open('hellolinux').read.each_byte.map { |b| '\x%02X' % b }.join"
```



return
```
\x7F\x45\x4C\x46\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x03\x00\x01\x00\x00\x00\x80\x80\x04\x08\x34\x00\x00\x00\xCC\x00\x00\x00\x00\x00\x00\x00\x34\x00\x20\x00\x02\x00\x28\x00\x04\x00\x03\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x80\x04\x08\x00\x80\x04\x08\xA2\x00\x00\x00\xA2\x00\x00\x00\x05\x00\x00\x00\x00\x10\x00\x00\x01\x00\x00\x00\xA4\x00\x00\x00\xA4\x90\x04\x08\xA4\x90\x04\x08\x0E\x00\x00\x00\x0E\x00\x00\x00\x06\x00\x00\x00\x00\x10\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xB8\x04\x00\x00\x00\xBB\x01\x00\x00\x00\xB9\xA4\x90\x04\x08\xBA\x0D\x00\x00\x00\xCD\x80\xB8\x01\x00\x00\x00\xBB\x00\x00\x00\x00\xCD\x80\x00\x00\x48\x65\x6C\x6C\x6F\x2C\x20\x57\x6F\x72\x6C\x64\x21\x0A\x00\x2E\x73\x68\x73\x74\x72\x74\x61\x62\x00\x2E\x74\x65\x78\x74\x00\x2E\x64\x61\x74\x61\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0B\x00\x00\x00\x01\x00\x00\x00\x06\x00\x00\x00\x80\x80\x04\x08\x80\x00\x00\x00\x22\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x10\x00\x00\x00\x00\x00\x00\x00\x11\x00\x00\x00\x01\x00\x00\x00\x03\x00\x00\x00\xA4\x90\x04\x08\xA4\x00\x00\x00\x0E\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xB2\x00\x00\x00\x17\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00
```


> Note if want to change the hex prefex from \x to anything, just change `'\x%x'` to whatever you want, or remove it!.

## Simple Hexdump

```ruby
#!/usr/bin/env ruby
#
# Source: http://c2.com/cgi/wiki?HexDumpInManyProgrammingLanguages
#
def hexdump(filename, start = 0, finish = nil, width = 16)
  ascii = ''
  counter = 0
  print '%06x  ' % start
  File.open(filename).each_byte do |c|
    if counter >= start
      print '%02x ' % c
      ascii << (c.between?(32, 126) ? c : ?.)
      if ascii.length >= width
	puts ascii
	ascii = ''
	print '%06x  ' % (counter + 1)
      end
    end
    throw :done if finish && finish <= counter
    counter += 1
  end rescue :done
  puts '   ' * (width - ascii.length) + ascii
end

if $0 == __FILE__
  if ARGV.empty?
    hexdump $0
  else
    filename = ARGV.shift
    hexdump filename, *(ARGV.map {|arg| arg.to_i })
  end
end

```

```
ruby hexdump.rb hellolinux
```

return
```
000000  7f 45 4c 46 01 01 01 00 00 00 00 00 00 00 00 00 .ELF............
000010  02 00 03 00 01 00 00 00 80 80 04 08 34 00 00 00 ............4...
000020  cc 00 00 00 00 00 00 00 34 00 20 00 02 00 28 00 ........4. ...(.
000030  04 00 03 00 01 00 00 00 00 00 00 00 00 80 04 08 ................
000040  00 80 04 08 a2 00 00 00 a2 00 00 00 05 00 00 00 ................
000050  00 10 00 00 01 00 00 00 a4 00 00 00 a4 90 04 08 ................
000060  a4 90 04 08 0e 00 00 00 0e 00 00 00 06 00 00 00 ................
000070  00 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ................
000080  b8 04 00 00 00 bb 01 00 00 00 b9 a4 90 04 08 ba ................
000090  0d 00 00 00 cd 80 b8 01 00 00 00 bb 00 00 00 00 ................
0000a0  cd 80 00 00 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 ....Hello, World
0000b0  21 0a 00 2e 73 68 73 74 72 74 61 62 00 2e 74 65 !...shstrtab..te
0000c0  78 74 00 2e 64 61 74 61 00 00 00 00 00 00 00 00 xt..data........
0000d0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ................
0000e0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ................
0000f0  00 00 00 00 0b 00 00 00 01 00 00 00 06 00 00 00 ................
000100  80 80 04 08 80 00 00 00 22 00 00 00 00 00 00 00 ........".......
000110  00 00 00 00 10 00 00 00 00 00 00 00 11 00 00 00 ................
000120  01 00 00 00 03 00 00 00 a4 90 04 08 a4 00 00 00 ................
000130  0e 00 00 00 00 00 00 00 00 00 00 00 04 00 00 00 ................
000140  00 00 00 00 01 00 00 00 03 00 00 00 00 00 00 00 ................
000150  00 00 00 00 b2 00 00 00 17 00 00 00 00 00 00 00 ................
000160  00 00 00 00 01 00 00 00 00 00 00 00             ............
```



















