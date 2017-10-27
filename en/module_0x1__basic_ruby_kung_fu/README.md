# Module 0x1 \| Basic Ruby Kung Fu

Ruby has awesome abilities and tricks for dealing with string and array scenarios. In this chapter we'll present some tricks we may need in our hacking life.

## Terminal

### Terminal size

Here are some different ways to get terminal size from ruby:

* By IO/console standard library

```ruby
require 'io/console'
rows, columns = $stdin.winsize
# Try this now
print "-" * (columns/2) + "\n" + ("|" + " " * (columns/2 -2) + "|\n")* (rows / 2) + "-" * (columns/2) + "\n"
```

* By readline standard library

```ruby
require 'readline'
Readline.get_screen_size
```

* By environment like IRB or Pry

```ruby
[ENV['LINES'].to_i, ENV['COLUMNS'].to_i]
```

* By tput command line 

```ruby
[`tput cols`.to_i , `tput lines`.to_i]
```

## Console with tab completion

We can't stop being jealous of Metasploit console \(msfconsole\), where we take a rest from command line switches. Fortunately, here is the main idea of console tab completion in ruby:

* Readline 

The Readline module provides an interface for GNU Readline. This module defines a number of methods to facilitate completion and accesses input history from the Ruby interpreter.

**console-basic1.rb**

```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
# 
require 'readline'

# Prevent Ctrl+C for exiting
trap('INT', 'SIG_IGN')

# List of commands
CMDS = [ 'help', 'rubyfu', 'ls', 'pwd', 'exit' ].sort


completion = proc { |line| CMDS.grep( /^#{Regexp.escape( line )}/ ) }

# Console Settings
Readline.completion_proc = completion        # Set completion process
Readline.completion_append_character = ' '   # Make sure to add a space after completion

while line = Readline.readline('-> ', true)
  puts line unless line.nil? or line.squeeze.empty?
  break if line =~ /^quit.*/i or line =~ /^exit.*/i
end
```

Now run it and try out the tab completion!

Well, the main idea for tab completion is to make things easier, not just "press tab". Here is a simple thought...

**console-basic2.rb**

```ruby
require 'readline'

# Prevent Ctrl+C for exiting
trap('INT', 'SIG_IGN')

# List of commands
CMDS = [ 'help', 'rubyfu', 'ls', 'exit' ].sort


completion = 
    proc do |str|
      case 
      when Readline.line_buffer =~ /help.*/i
    puts "Available commands:\n" + "#{CMDS.join("\t")}"
      when Readline.line_buffer =~ /rubyfu.*/i
    puts "Rubyfu, where Ruby goes evil!"
      when Readline.line_buffer =~ /ls.*/i
    puts `ls`
      when Readline.line_buffer =~ /exit.*/i
    puts 'Exiting..'
    exit 0
      else
    CMDS.grep( /^#{Regexp.escape(str)}/i ) unless str.nil?
      end
    end


Readline.completion_proc = completion        # Set completion process
Readline.completion_append_character = ' '   # Make sure to add a space after completion

while line = Readline.readline('-> ', true)  # Start console with character -> and make add_hist = true
  puts completion.call
  break if line =~ /^quit.*/i or line =~ /^exit.*/i
end
```

Things can go much farther, like _msfconsole_, maybe?

---

* [Ruby Readline Documentation and Tutorial](http://bogojoker.com/readline/)



