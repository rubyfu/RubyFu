# Command Execution

Some things to think about when choosing between these ways are:
1. Do you just want stdout or do you need stderr as well? or even separated out?
2. How big is your output? Do you want to hold the entire result in memory?
3. Do you want to read some of your output while the subprocess is still running?
4. Do you need result codes?
5. Do you need a ruby object that represents the process and lets you kill it on demand?


The following ways are applicable on all operating systems. 


### Kernel#` (backticks)
```ruby
>> `date`
=> "Sun Sep 27 00:38:54 AST 2015\n"
```

### Kernel#exec
```ruby
>> exec('date')
Sun Sep 27 00:39:22 AST 2015
KING@Archer ( ~ )-> 
```

### Kernel#system
```ruby
>> system 'date'
Sun Sep 27 00:38:01 AST 2015
=> true
```


### IO#popen
```ruby
>> IO.popen("date") { |f| puts f.gets }
Sun Sep 27 00:40:06 AST 2015
=> nil
```


### Open3#popen3
```ruby
require 'open3'
stdin, stdout, stderr = Open3.popen3('dc') 
=> [#<IO:fd 14>, #<IO:fd 16>, #<IO:fd 18>, #<Process::Waiter:0x00000002f68bd0 sleep>]
>> stdin.puts(5)
=> nil
>> stdin.puts(10)
=> nil
>> stdin.puts("+")
=> nil
>> stdin.puts("p")
=> nil
>> stdout.gets
=> "15\n"
```


### Process#spawn
Kernel.spawn executes the given command in a subshell. It returns immediately with the process id.
```ruby
pid = Process.spawn("date")
Sun Sep 27 00:50:44 AST 2015
=> 12242
```

### %x[], %x{}, %x$''$ 

```ruby



```

### Rake#sh
```ruby
require 'rake'
sh 'date'
```



### Extra
```ruby



```

#### $?
```ruby



```




















<br><br><br>
---
- [Ruby | Execute system commands](http://king-sabri.net/?p=2553)
- [5 ways to run commands from Ruby](http://mentalized.net/journal/2010/03/08/5-ways-to-run-commands-from-ruby/)
- [6 ways to run Shell commands in Ruby](http://tech.natemurray.com/2007/03/ruby-shell-commands.html)
- [How to choose the correct way](http://stackoverflow.com/a/4413/967283) 