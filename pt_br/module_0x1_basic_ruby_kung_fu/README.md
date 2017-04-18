# Módulo 0x1 \| Kung Fu Básico de Ruby

Ruby tem habilidades maravilosa para lidar com todos os cenários de strings e arrays. Nesse cápitulo nós vamos apresentar os macetes mais conhecidos que podemos precisasr em nossa vida cheia de hacking.

## Terminal

### Tamanho do Terminal

Aqui tem muitas maneiras de pegar o tamanho do terminar em ruby

* Pela biblíoteca padrão de IO/console

```ruby
require 'io/console'
rows, columns = $stdin.winsize
# Try this now
print "-" * (columns/2) + "\n" + ("|" + " " * (columns/2 -2) + "|\n")* (rows / 2) + "-" * (columns/2) + "\n"
```

* Pela biblíoteca padrão readline

```ruby
require 'readline'
Readline.get_screen_size
```

* Pegando o tamanho do terminal em ambientes como IRB ou Pry

```ruby
[ENV['LINES'].to_i, ENV['COLUMNS'].to_i]
```

* Pelo comando tput

```ruby
[`tput cols`.to_i , `tput lines`.to_i]
```

## Consoles que completam com tabs

Nós não podemos parar de ser ciúmentos com o console do Metasploit \(msfconsole\) onde nós não precisamos ter que digitar todos o parametros da linha de comando, aqui está a ideia principal do complemento por tab nos consoles ruby.

* Readline 

O módulo Readline prover uma intereface para GNU Readline. Esse módulo define um número de metódos que facilitam o complemento e acessa as entradas que já foram feira no interpretador do ruby.

**console-basic1.rb**

```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
# 
require 'readline'

# Evita Ctrl+C para saída
trap('INT', 'SIG_IGN')

# Lista de commandos
CMDS = [ 'help', 'rubyfu', 'ls', 'pwd', 'exit' ].sort


completion = proc { |line| CMDS.grep( /^#{Regexp.escape( line )}/ ) }

# Configurações do console
Readline.completion_proc = completion        # seta o processo de complementar
Readline.completion_append_character = ' '   # Adiciona um espaço após complementar

while line = Readline.readline('-> ', true)
  puts line unless line.nil? or line.squeeze.empty?
  break if line =~ /^quit.*/i or line =~ /^exit.*/i
end
```

Agora rode isso e tente complementar com tab!

Bem, a ideia principal do complemento com tab é tornar mais fácil a nossa vida apenas apertando tab. Aqui está um exemplo simples

**console-basic2.rb**

```ruby
require 'readline'

# Prevent Ctrl+C for exiting
trap('INT', 'SIG_IGN')

# Lista de comandos
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

As coisas podem ser muitos melhores, como no _msfconsole_, também?

---

* [Ruby Readline Documentation and Tutorial](http://bogojoker.com/readline/)


