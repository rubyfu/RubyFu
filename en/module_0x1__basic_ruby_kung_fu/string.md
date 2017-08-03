# String

## Colorize your outputs

Since we mostly working with command-line, we need our output to be more elegant. Here main colors you may need to do so far. you can add these set.

```ruby
class String
  def red; colorize(self, "\e[1m\e[31m"); end
  def green; colorize(self, "\e[1m\e[32m"); end
  def dark_green; colorize(self, "\e[32m"); end
  def yellow; colorize(self, "\e[1m\e[33m"); end
  def blue; colorize(self, "\e[1m\e[34m"); end
  def dark_blue; colorize(self, "\e[34m"); end
  def purple; colorize(self, "\e[35m"); end
  def dark_purple; colorize(self, "\e[1;35m"); end
  def cyan; colorize(self, "\e[1;36m"); end
  def dark_cyan; colorize(self, "\e[36m"); end
  def pure; colorize(self, "\e[0m\e[28m"); end
  def bold; colorize(self, "\e[1m"); end
  def colorize(text, color_code) "#{color_code}#{text}\e[0m" end
end
```

All you need is to call the color when you `puts` it

```ruby
puts "RubyFu".red
puts "RubyFu".green
puts "RubyFu".yellow.bold
```

To under stand this codes let's to explain it

```
\033  [0;  31m
 ^     ^    ^    
 |     |    |
 |     |    |--------------------------------------- [The color number]
 |     |-------------------- [The modifier]            (ends with "m")
 |-- [Escaped character]           | 0 - normal                     
     (you can use "\e")            | 1 - bold
                                   | 2 - normal again
                                   | 3 - background color
                                   | 4 - underline
                                   | 5 - blinking
```

or you can use external gem called \[colorized\] for more fancy options

```
gem install colorize
```

then just require it in your script

```ruby
require 'colorize'
```

## Overwriting Console Output

It's awesome to have more flexibility  in your terminal and sometimes we need to do more and with our scripts.

Overwriting console outputs makes our applications elegant and less noisy for repeated outputs like counting and loading progress bars.

I've read a how-to about [bash Prompt cursor movement](http://www.tldp.org/HOWTO/Bash-Prompt-HOWTO/x361.html) and I found it it's convenient to have it in our scripts. Here what have been said so far

```
- Position the Cursor:
  \033[<L>;<C>H
     Or
  \033[<L>;<C>f
  puts the cursor at line L and column C.
- Move the cursor up N lines:
  \033[<N>A
- Move the cursor down N lines:
  \033[<N>B
- Move the cursor forward N columns:
  \033[<N>C
- Move the cursor backward N columns:
  \033[<N>D
- Clear the screen, move to (0,0):
  \033[2J
- Erase to end of line:
  \033[K
- Save cursor position:
  \033[s
- Restore cursor position:
  \033[u
```

So to test that I did the following PoC

```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
(1..3).map do |num|
  print "\rNumber: #{num}"
  sleep 0.5
  print ("\033[1B")    # Move cursor down 1 line 

  ('a'..'c').map do |char|
    print "\rCharacter: #{char}"
    print  ("\e[K")
    sleep 0.5
    print ("\033[1B")    # Move cursor down 1 lines

    ('A'..'C').map do |char1|
      print "\rCapital letters: #{char1}"
      print  ("\e[K")
      sleep 0.3
    end
    print ("\033[1A")    # Move curse up 1 line

  end

  print ("\033[1A")    # Move curse up 1 line
end

print ("\033[2B")    # Move cursor down 2 lines

puts ""
```

So far so good, but why don't we make it as ruby methods for more elegant usage? so I came up with the following

```ruby
# KING SABRI | @KINGSABRI
class String
  def mv_up(n=1)
    cursor(self, "\033[#{n}A")
  end

  def mv_down(n=1)
    cursor(self, "\033[#{n}B")
  end

  def mv_fw(n=1)
    cursor(self, "\033[#{n}C")
  end

  def mv_bw(n=1)
    cursor(self, "\033[#{n}D")
  end

  def cls_upline
    cursor(self, "\e[K")
  end

  def cls
    # cursor(self, "\033[2J")
    cursor(self, "\e[H\e[2J")
  end

  def save_position
    cursor(self, "\033[s")
  end

  def restore_position
    cursor(self, "\033[u")
  end

  def cursor(text, position)
    "\r#{position}#{text}"
  end
end
```

Then as PoC, I've used the same previous one \(after updating String class on-the-fly in the same script\)

```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
# Level 1
(1..3).map do |num|
  print "\rNumber: #{num}"
  sleep 0.7
  # Level 2
  ('a'..'c').map do |char|
      print "Characters: #{char}".mv_down
      sleep 0.5
      # Level 3
      ('A'..'C').map do |char1|
          print "Capital: #{char1}".mv_down
          sleep 0.2
          print "".mv_up
      end
      print "".mv_up
  end
  sleep 0.7
end
print "".mv_down 3
```

It's much more elegant, isn't it?, Say yes plz

Some application

### Create Progress percent

```ruby
(1..10).each do |percent|
  print "#{percent*10}% complete\r"
  sleep(0.5)
  print  ("\e[K") # Delete current line
end
puts "Done!"
```

another example

```ruby
(1..5).to_a.reverse.each do |c|
  print "\rI'll exit after #{c} second(s)"
  print "\e[K"
  sleep 1
end
```

Using our elegant way\(after updating String class on-the-fly\)

```ruby
(1..5).to_a.reverse.each do |c|
  print "I'll exit after #{c} second".cls_upline
  sleep 1
end
puts
```

---



