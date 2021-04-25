---
description: Ruby System Shell Command Execution
---

# Command Execution

Some things to think about when choosing between these ways are:  
1. Are you going to interact with none interactive shell, like `ncat` ? 2. Do you just want stdout or do you need stderr as well? Or even separated out?  
3. How big is your output? Do you want to hold the entire result in memory?  
4. Do you want to read some of your output while the subprocess is still running?  
5. Do you need result codes?  
6. Do you need a ruby object that represents the process and lets you kill it on demand?

The following ways are applicable on all operating systems.

## Kernel\#exec

```ruby
>> exec('date')
Sun Sep 27 00:39:22 AST 2015
RubyFu( ~ )->
```

## Kernel\#system

```ruby
>> system 'date'
Sun Sep 27 00:38:01 AST 2015
#=> true
```

### Dealing with `ncat` session?

Have you ever wondered about how to do deal with interactive commands like `passwd` or `ncat` sessions in Ruby? If you're familiar with Python, you've probably used `python -c 'import pty; pty.spawn("/bin/sh")'`. In Ruby it's really easy using `exec` or `system`. The main trick is to forward STDERR to STDOUT so you can see system errors.

**exec**

```ruby
ruby -e 'exec("/bin/sh 2>&1")'
```

**system**

```ruby
ruby -e 'system("/bin/sh 2>&1")'
```

## Kernel\#\` \(backticks\)

```ruby
>> `date`
#=> "Sun Sep 27 00:38:54 AST 2015\n"
```

## IO\#popen

```ruby
>> IO.popen("date") { |f| puts f.gets }
Sun Sep 27 00:40:06 AST 2015
#=> nil
```

## Open3\#popen3

```ruby
require 'open3'
stdin, stdout, stderr = Open3.popen3('dc') 
#=> [#<IO:fd 14>, #<IO:fd 16>, #<IO:fd 18>, #<Process::Waiter:0x00000002f68bd0 sleep>]
>> stdin.puts(5)
#=> nil
>> stdin.puts(10)
#=> nil
>> stdin.puts("+")
#=> nil
>> stdin.puts("p")
#=> nil
>> stdout.gets
#=> "15\n"
```

## Process\#spawn

Kernel.spawn executes the given command in a subshell. It returns immediately with the process id.

```ruby
pid = Process.spawn("date")
Sun Sep 27 00:50:44 AST 2015
#=> 12242
```

## %x"", %x\[\], %x{}, %x$''$

```ruby
>> %x"date"
#=> Sun Sep 27 00:57:20 AST 2015\n"
>> %x[date]
#=> "Sun Sep 27 00:58:00 AST 2015\n"
>> %x{date}
#=> "Sun Sep 27 00:58:06 AST 2015\n"
>> %x$'date'$
#=> "Sun Sep 27 00:58:12 AST 2015\n"
```

## Rake\#sh

```ruby
require 'rake'
>> sh 'date'
date
Sun Sep 27 00:59:05 AST 2015
#=> true
```

## Extra

To check the status of the backtick operation you can execute $?.success?

### $?

```ruby
>> `date`
=> "Sun Sep 27 01:06:42 AST 2015\n"
>> $?.success?
=> true
```

### How to choose?

A great flow chart has been made on [stackoverflow](http://stackoverflow.com/a/37329716/967283)  
![](../.gitbook/assets/cmd_exec_chart%20%281%29.png)

* [Ruby \| Execute system commands](http://king-sabri.net/?p=2553)
* [5 ways to run commands from Ruby](http://mentalized.net/journal/2010/03/08/5-ways-to-run-commands-from-ruby/)
* [6 ways to run Shell commands in Ruby](http://tech.natemurray.com/2007/03/ruby-shell-commands.html)
* [How to choose the correct way](http://stackoverflow.com/a/4413/967283)
* [Executing commands in ruby](http://blog.bigbinary.com/2012/10/18/backtick-system-exec-in-ruby.html)

