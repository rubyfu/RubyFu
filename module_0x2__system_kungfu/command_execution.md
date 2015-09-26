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



```

### Kernel#exec
```ruby



```

### Kernel#system
```ruby



```


### IO#popen
```ruby



```


### Open3#popen3
```ruby



```


### Open4#popen4
```ruby



```


### Rake#sh
```ruby



```


### %x[], %x{}, %x$''$ 

```ruby



```



### Extra
```ruby



```

#### $?-
```ruby



```



### 



















<br><br><br>
---
- [Ruby | Execute system commands](http://king-sabri.net/?p=2553)
- [5 ways to run commands from Ruby](http://mentalized.net/journal/2010/03/08/5-ways-to-run-commands-from-ruby/)
- [6 ways to run Shell commands in Ruby](http://tech.natemurray.com/2007/03/ruby-shell-commands.html)
- [Considerations](http://stackoverflow.com/a/4413/967283) 