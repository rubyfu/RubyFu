# Ruby 2 JavaScript



## CoffeeScript
[CoffeeScript][1] is a programming language that transcompiles to JavaScript. It adds syntactic sugar inspired by Ruby, Python and Haskell in an effort to enhance JavaScript's brevity and readability.


### Quick CoffeeScript Review

Here a quick how to if CoffeeScript in general

- Install CoffeScript lib
```
npm install -g coffee-script
```

- For live conversion
```
coffee --watch --compile script.coffee
```

### Ruby CoffeScript gem
**Ruby** CoffeeScript gem is a bridge to the official CoffeeScript compiler.

- Install CoffeeScript gem
```
gem install coffee-script
```

- Convert CoffeeScript file to JavaScript

```ruby
#!/usr/bin/env ruby
require 'coffee-script'
if ARGF
  file = File.open("#{ARGV[0]}.js", 'a')
  file.write CoffeeScript.compile(ARGF.read)
end
```

Run it
```
ruby coffee2js.rb exploit.coffee
```




## Opal
Opal is a Ruby to JavaScript source-to-source compiler. It also has an implementation of the Ruby corelib.

- Install Opal gem
```
gem install opal opal-jquery
```





<br><br><br>
---
[1]: http://coffeescript.org
[5]: http://js2.coffee/