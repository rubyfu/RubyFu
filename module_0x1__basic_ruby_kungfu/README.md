# Module 0x1 | Basic Ruby KungFu

Ruby has awesome abilities and tricks for dealing with all strings and arrays scenarios. In this chapter we'll present most known tricks we may need in our hacking life.


## Terminal 

### Terminal size 
Here are many ways to get terminal size from ruby

- By IO/console standard library

```ruby
require 'io/console'
rows, columns = $stdin.winsize
# Try this now
print "-" * (columns/2) + "\n" + ("|" + " " * (columns/2 -2) + "|\n")* (rows / 2) + "-" * (columns/2) + "\n"
```
- By readline standard library

```ruby
require 'readline'
Readline.get_screen_size
```

- Get terminal size in Environment like IRB or Pry

```ruby
[ENV['LINES'].to_i, ENV['COLUMNS'].to_i]
```

- By tput commandline 

```ruby
[`tput cols`.to_i , `tput lines`.to_i]
```

## Console with tab completion 
we can't stopping being jealous of Metasploit console(msfconsole). Fortunantely, here is the main idea of tab completion console in ruby

- Readline 

**Basic**

```ruby
```