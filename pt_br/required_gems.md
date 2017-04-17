# Gems

Eu gostaria de listar todas a gems externas que podem ser usadas nesse livro. Essa lista será atualizada sempre que aparecer uma nova.

Observe que você não precisa instalar todas elas, ao menos que que precise delas.

## Gems Principais
* Pry - Uma alternativa ao IRB e console de desenvolvimento em tempo de execução.
* pry-doc - Pry Doc é um plugin. Amplia a documentação e suporte.
* pry-byebug - Combina 'pry' com 'byebug'. Adiciona os comandos 'step(passo)', 'next(passo)', 'finish(termine)', 'continue' e 'break(pare)' para controlar a execução. 

  ```
  gem install pry
  gem install pry-doc
  gem install pry-byebug
  ```

  Para rodar o pry com a melhor aparência

  ```bash
  pry --simple-prompt
  ```

> **Nota:** A maior parte dos nossos exemplos vão ser executados no **pry**  então, considere ele como parte do nosso ambiente. De outra forma \(quando você ver `#!usr/bin/env ruby)` significa que é um arquivo de script para executar.

## Módulos gems

Pela demanda de ter todas as gems requeridas em apenas um gem, nós criamos [hacker-gems](https://rubygems.org/gems/hacker-gems) que instala todas as gems acima de uma só vez.

```
gem install hacker-gems
```

You might need to install some packages before to avoid any error of missing libraries(REVISAR ESSA PARTE)
Você precisa instalar alguns pacotes antes, para não ver mensagens de erros e bibliotecas que faltam.

```
sudo apt-get install build-essential libreadline-dev libssl-dev libpq5 libpq-dev libreadline5 libsqlite3-dev libpcap-dev git-core autoconf postgresql pgadmin3 curl zlib1g-dev libxml2-dev libxslt1-dev vncviewer libyaml-dev curl nmap
```

#### Módulo 0x1 \| Ruby Kung Fu Básico

* colorize - Extende a classe string ou adiciona uma string colorida com metódos para deixa-las coloridas, plano de fundo(background).

#### Módulo 0x2 \| Kung Fu para Sistema

* Um script para automatizar pesquisas ao virustotal.com.
* uirusu - A tool and REST library for interacting with Virustotal.org.
* clipboard - Deixa acessar o clipboard em Linux, MacOS, Windows e Cygwin.

**Gems extras**

Gems úteis para construir aplicações de linha de comando.

* tty-prompt - Um prompt de comando bonito, poderoso e interativo.
* Thor - Cria app com uma suíte de comandos simples e fácil, assim como os geradores de Rails
* GLI - Cria suítes de comandos limpos sem precisão de muitos códigos.
* Slop - Cria aplicações de linha de comando simples com syntax parecida com a do trollop.
* Highline - Manuseia entrada e saída de usúarios via uma "Q&A" API , incluído tipos de conversões e validações.
* Escort - Uma biblíoteca que que constrói aplicativos de linha de comando em ruby muito fácil, você vai se sentir como um ninja enquanto passa por esse módulo.
* commander - Uma solução completa para executaveis de linha de comando em Ruby.

#### Módulo 0x3 \| Kung Fu para Redes

* geoip - Procura por localização de endereços IP, retorna país, cidade, ISP e localização.
* net-ping - Um interface de ping. Inclúi TCP, HTTP, LDAP, ICMP, UDP, WMI \(para Windows\).
* ruby-nmap - Uma interface em ruby para o Nmap, a ferramenta de exploração e scanner de porta / segurança.
* ronin-scanners - Uma biblíoteca para  Ronin que que prover  várias interfaces para scanners.
* net-dns - Uma biblíoteca pura de DNS, com uma interface limpa e extensível API.
* snmp - Uma implementação Ruby para o SNMP \(Simple Network Management Protocol\).
* net-ssh - A pure-Ruby implementation of the SSH2 client protocol. Uma implementação pura de cliente do protocolo SSH2.
* net-scp - Uma implementação pura para cliente SCP do protocolo SCP.
* ftpd - Uma biblíoteca de servidores FTP puro em Ruby. Suporta TLS, IPV6, modos ativos e passivos.
* packetfu - A mid-level packet manipulation library for Ruby.
* packetgen - Biblíoteca Ruby para gerar e capturar pacotes de rede facilmente.

#### Módulo 0x4 \| Kung Fu para WEB

* net-http-digest\_auth - An implementation of RFC 2617 - Digest Access Authentication.
* ruby-ntlm - NTLM implementation for Ruby.
* activerecord - Databases on Rails. Build a persistent domain model by mapping database tables to Ruby.
* tiny\_tds - TinyTDS - A modern, simple and fast FreeTDS library for Ruby using DB-Library.
* activerecord-sqlserver-adapter.
* activerecord-oracle\_enhanced-adapter.
* buby - a mashup of JRuby with the popular commercial web security testing tool Burp Suite from PortSwigger.
* wasabi - A simple WSDL parser.
* savon - Heavy metal SOAP client.
* httpclient - gives something like the functionality of libwww-perl \(LWP\) in Ruby.
* nokogiri -   HTML, XML, SAX, and Reader parser.
* twitter - Uma interface Ruby  para a API do Twitter.
* selenium-webdriver - Ferramenta para escrever testes de sites. Ela também imita o comportamento de um usuário real.
* watir-webdriver - WebDriver-backed Watir.
* coffee-script - Ruby CoffeeScript é uma ponte para compiladores JS.
* opal - Biblíoteca de tempo de execução  para JavaScript.

**Extra gems**  
Gems úteis para web

* Mechanize - Biblíoteca  para automatizar interação web.
* HTTP.rb - Fast, Elegant HTTP client for ruby. Cliente HTTP rápido e elegante para ruby.
* RestClient - Uma classe e executável para intereção com serviços WEB RESTful.
* httparty - Faz com que o  HTTP se torne divertido!
* websocket - Biblíoteca universal para manuseiar protocolos websocket.

#### Módulo 0x5 \| Kung Fu para Exploitação

* metasm - Ferramenta para  assembler, disassembler, linker, e debugger.

#### Módulo 0x6 \| Forensic Kung Fu

* metasm - Ferramenta  assembler, disassembler, linker, e debugger.



