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


