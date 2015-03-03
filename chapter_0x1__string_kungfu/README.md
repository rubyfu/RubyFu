# Chapter 0x1 | String KungFu

## Colorize your outputs
Since we mostly working with commandline, we need our output to be more egent. Here main colors you may need to do so. you cann add to add to these set.

```ruby
class String
  def red; colorize(self, "\e[31m"); end
  def green; colorize(self, "\e[32m"); end
  def yellow; colorize(self, "\e[1m\e[33m"); end
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














