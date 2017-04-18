# Array

## Pattern(Padrão)

#### Criação de Padrão

Suponha que o comprimento do padrão = 500, você pode alterá-lo para qualquer valor. Por padrão, isso criará 20280 probabilidades no máximo.
```ruby
pattern_create = ('Aa0'..'Zz9').to_a.join.each_char.first(500).join
```

Caso você precise de um padrão maior (ex. 30000), você pode fazer o seguinte:
```ruby
pattern_create = ('Aa0'..'Zz9').to_a.join
pattern_create = pattern_create  * (30000 / 20280.to_f).ceil
```

#### offset para o padrão

Irei assumir que o padrão foi igual ou menor que "20280" e nós estamos procurando pelo padrão de caracteres "9Ak0". O `pattern_create` deve ser iniciado a partir de cima

```ruby
pattern_offset = pattern_create.enum_for(:scan , '9Ak0').map {Regexp.last_match.begin(0)}
```
Nota: Isso não considera o formato Little-endian. Para mais informações, por favor dê uma olhada aqui [code][1].

#### Gerando todos os valores hexadecimais de `\x00` até `\xff`

```ruby
puts (0..255).map {|b| ('\x%02X' % b)}
```
> **Notas:**

> - Para mudar a representação de `\xea` para `0xea`, mude `\x%x` para `0x%x`.
> - Para capitalizar todas as letras (`\xea` para `\xEA`), mude `\x%x` para `\x%X`.

#### Gerando todos os caracteres imprimíveis

```ruby
(32..126).map {|c| c.chr}
```
De maneira mais curta porém menos limpa

```ruby
(32..126).map &:chr
```


---
[1]: https://github.com/KINGSABRI/BufferOverflow-Kit/blob/master/lib/pattern.rb
