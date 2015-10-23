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
we can't stopping being jealous of Metasploit console(msfconsole) where we take a rest from command line switches. Fortunately, here is the main idea of tab completion console in ruby

- Readline 

**console-basic.rb**

```ruby
#!/usr/bin/evn ruby
# KING SABRI | @KINGSABRI
# 
require 'readline'

# Prevent Ctrl+C for exiting
trap('INT', 'SIG_IGN')

# List of commands
CMDS = [ 'help', 'rubyfu', 'ls', 'pwd', 'exit' ].sort


completion = proc { |line| CMDS.grep( /^#{Regexp.escape( line )}/ ) }

# Console Settings
Readline.completion_proc = completion		# Set completion process
Readline.completion_append_character = ' '	# Make sure to add a space after completion

while line = Readline.readline('-> ', true)
  puts line unless line.nil? or line.squeeze.empty?
  break if line =~ /^quit.*/i or line =~ /^exit.*/i
end
```
Now run it and try the tab completion!

Well, The man idea in known the tab completion is make to do things easier not just pressing tab. Here a simple thought

**console-basic.rb**

```
```





