# Module 0x1 | Basic Ruby KungFu

Ruby has awesome abilities and tricks for dealing with all strings and arrays scenarios. In this chapter we'll present most known tricks we may need in our hacking life.


## Terminal 

### Terminal size 
Here are many ways to get terminal size from ruby


```ruby
require 'io/console'
rows, columns = $stdin.winsize

print "-" * (columns/2) + "\n" + ("|" + " " * (columns/2 -2) + "|\n")* (rows / 2) + "-" * (columns/2) + "\n"
```

- Get terminal size in Environment like IRB or Pry
