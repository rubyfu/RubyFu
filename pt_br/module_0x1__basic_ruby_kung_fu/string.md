# String

## Colorindo suas saídas
Como trabalhamos principalmente com a linha de comando, precisamos de sáidas mais elegantes. Aqui tem as principais cores que você pode precisar. Você pode adicionar esse conjunto.

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
  def colorize(text, color_code) "#{color_code}#{text}\e[0m" end
end
```
Tudo que você precisa é chamar a cor quando você usar ```puts```

```ruby
puts "RubyFu".red
puts "RubyFu".green
puts "RubyFu".yellow.bold
```
Agora vamos explicar isso melhor.

```

\033  [0;  31m
 ^     ^    ^    
 |     |    |
 |     |    |--------------------------------------- [A número da cor]
 |     |-------------------- [o Modificador]            (termina com um "m")
 |-- [Caractere escapado]          | 0 - normal                     
     (você pode usar "\e")         | 1 - negrito
                                   | 2 - normal novamente
                                   | 3 - cor de fundo
                                   | 4 - sublhinhado
                                   | 5 - piscando
```

Você també pode usar uma gem externa chamada [colorized] para formas mais extravagantes

```
gem install colorize
```
Então, apenas adicione um require em seu script

```ruby
require 'colorize'
```

## Sobrescrendo a saída do console
É incrível ter mais flexibilidade no seu terminal e às vezes precisamos fazer mais com nossos scripts.

Sobrescrever nossás saídas torna mais elegantes as nossas aplicações e menos barulhenta para saídas repetidas como barras de progresso e contas.

Eu li um 'Como fazer' sobre [movimentos do cursor do bash][2] e acho que é conveniente termos em nossos scripts.
Aqui o que foi dito até agora:

```
- Posicionando o Cursor:
  \033[<L>;<C>H
     ou
  \033[<L>;<C>f
  Coloca o curso na linha L e na coluna C.
- Move o curso sobre N linhas:
  \033[<N>A
- Move o curso abaixo de N linhas:
  \033[<N>B
- Move o curso para frente de N colunas:
  \033[<N>C
- Move o curso para trás de N colunas:
  \033[<N>D
- Limpa a tela, move para posição (0,0):
  \033[2J
- Limpa até o final da linha:
  \033[K
- Salva a posição do cursor:
  \033[s
- Restaura a posição do cursor:
  \033[u
```
Então, para testar eu fiz o seguinte PoC(Prova de Conceito)

```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
(1..3).map do |num|
  print "\rNumber: #{num}"
  sleep 0.5
  print ("\033[1B")	# Move o cursor uma 1 linha abaixo
  
  ('a'..'c').map do |char|
    print "\rCharacter: #{char}"
    print  ("\e[K")
    sleep 0.5
    print ("\033[1B")	# Move o cursor uma linha  abaixo
    
    ('A'..'C').map do |char1|
      print "\rCapital letters: #{char1}"
      print  ("\e[K")
      sleep 0.3
    end
    print ("\033[1A")	# Move o cursor uma linha acima
    
  end

  print ("\033[1A")	# Move o cursor uma linha acima
end

print ("\033[2B")	# Move cursor para duas linhas abaixo

puts ""
```
Por enquanto tudo bem, mas porque não fazemos isso como metódos ruby para ficar mais elegante? Vamos fazer o seguinte.

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
Assim como no PoC, Eu usei a mesma ideia anterior (Após atualização da classe String on-the-fly no mesmo script)

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
Agora está muito mais elegante, não é? Diga sim por favor! :)

Uma aplicação
### Crie uma barra de progresso

```ruby
(1..10).each do |percent|
  print "#{percent*10}% complete\r"
  sleep(0.5)
  print  ("\e[K") # Deleta a linha atual
end
puts "Done!"
```
Um outro exemplo

```ruby
(1..5).to_a.reverse.each do |c|
  print "\rI'll exit after #{c} second(s)"
  print "\e[K"
  sleep 1
end
```
Usando nosso meio elegante(Após atualizar a classe String on-the-fly)

```ruby
(1..5).to_a.reverse.each do |c|
  print "I'll exit after #{c} second".cls_upline
  sleep 1
end
puts 
```


---
[1]: https://github.com/fazibear/colorize
[2]: http://www.tldp.org/HOWTO/Bash-Prompt-HOWTO/x361.html




