# String

## Colorize your outputs
Since we mostly working with commandline, we need our output to be more egent. Here main colors you may need to do so. you cann add to add to these set.

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
  def pure; colorize(self, "\e[1m\e[35m"); end
  def bold; colorize(self, "\e[1m"); end
  def colorize(text, color_code)  "#{color_code}#{text}\e[0m" end
end
```
All you need is to call the color when you ```puts``` it
```ruby
puts "RubyFu".red
puts "RubyFu".green
puts "RubyFu".yellow.bold
```

or you can use external gem called [colorized](https://github.com/fazibear/colorize) for more fanzy options
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

I've read a how-to about [bash Prompt cursor movement](http://www.tldp.org/HOWTO/Bash-Prompt-HOWTO/x361.html) and I found it it's convenent to have it in our scripts. Here what have been said so far
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


Some application
### Create Progress percet

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










