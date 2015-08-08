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
file2hex = file.read.each_byte.map { |b| '\x%x' % b }.join    # b.to_s(16).rjust(2, '0')

puts file2hex
```

```
ruby hex-simple.rb ../assembly/hellolinux
```

Or in one command line

```bash
ruby -e "puts  File.open('hellolinux').read.each_byte.map { |b| '\x%x' % b }.join"
```



return
```
\x7f\x45\x4c\x46\x1\x1\x1\x0\x0\x0\x0\x0\x0\x0\x0\x0\x2\x0\x3\x0\x1\x0\x0\x0\x80\x80\x4\x8\x34\x0\x0\x0\xcc\x0\x0\x0\x0\x0\x0\x0\x34\x0\x20\x0\x2\x0\x28\x0\x4\x0\x3\x0\x1\x0\x0\x0\x0\x0\x0\x0\x0\x80\x4\x8\x0\x80\x4\x8\xa2\x0\x0\x0\xa2\x0\x0\x0\x5\x0\x0\x0\x0\x10\x0\x0\x1\x0\x0\x0\xa4\x0\x0\x0\xa4\x90\x4\x8\xa4\x90\x4\x8\xe\x0\x0\x0\xe\x0\x0\x0\x6\x0\x0\x0\x0\x10\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\xb8\x4\x0\x0\x0\xbb\x1\x0\x0\x0\xb9\xa4\x90\x4\x8\xba\xd\x0\x0\x0\xcd\x80\xb8\x1\x0\x0\x0\xbb\x0\x0\x0\x0\xcd\x80\x0\x0\x48\x65\x6c\x6c\x6f\x2c\x20\x57\x6f\x72\x6c\x64\x21\xa\x0\x2e\x73\x68\x73\x74\x72\x74\x61\x62\x0\x2e\x74\x65\x78\x74\x0\x2e\x64\x61\x74\x61\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\xb\x0\x0\x0\x1\x0\x0\x0\x6\x0\x0\x0\x80\x80\x4\x8\x80\x0\x0\x0\x22\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x10\x0\x0\x0\x0\x0\x0\x0\x11\x0\x0\x0\x1\x0\x0\x0\x3\x0\x0\x0\xa4\x90\x4\x8\xa4\x0\x0\x0\xe\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x4\x0\x0\x0\x0\x0\x0\x0\x1\x0\x0\x0\x3\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\xb2\x0\x0\x0\x17\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x0\x1\x0\x0\x0\x0\x0\x0\x0
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



















