# Required Gems

I'd like to list all external gems that might be used in this book. This list will be updated once new gem required.

Note that you don't need to install it all unless you need it.

## Main Gems

* Pry - An IRB alternative and runtime developer console.
* pry-doc - Pry Doc is a Pry REPL plugin. Extending documentation support for the REPL by improving the `show-doc & show-source commands.`
* pry-byebug - Combine 'pry' with 'byebug'. Adds 'step', 'next', 'finish', 'continue' and 'break' commands to control execution.

  ```
  gem install pry
  gem install pry-doc
  gem install pry-byebug
  ```

  To run pry with best appearance
  ```bash
  pry --simple-prompt
  ```


> **Note:** Most of our example will be executed on **pry** so please consider it as main part of our environment. Otherwise (when you see `#!/usr/bin/env ruby) then it means a file script to execute.`

## Modules gems

Due the demanding of warpping all required gems in a one gem, we've created [hacker-gems](https://rubygems.org/gems/hacker-gems) which installs all below gems at one time.

```
gem install hacker-gems
```

You might need to install some packages before to avoid any error of missing libraries 

```
sudo apt-get install build-essential libreadline-dev libssl-dev libpq5 libpq-dev libreadline5 libsqlite3-dev libpcap-dev git-core autoconf postgresql pgadmin3 curl zlib1g-dev libxml2-dev libxslt1-dev vncviewer libyaml-dev curl zlib1g-dev nmap
```

#### Module 0x1 | Basic Ruby Kung Fu

* colorize - Extends String class or add a ColorizedString with methods to set text color, backgroun.

#### Module 0x2 | System Kung Fu

* virustotal - A script for automating virustotal.com queries
* uirusu - A tool and REST library for interacting with Virustotal.org

**Extra gems**

Useful gems to build command line applications

* tty-prompt - A beautiful and powerful interactive command line prompt.
* Thor - Create a command-suite app simply and easily, as well as Rails generators.
* GLI - Create awesome, polished command suites without a lot of code.
* Slop - Create simple command-line apps with a syntax similar to trollop.
* Highline - handle user input and output via a “Q&A” style API, including type conversions and validation.
* Escort - A library that makes building command-line apps in ruby so easy, you’ll feel like an expert is guiding you through it.
* commander - The complete solution for Ruby command-line executables.
* clipboard - Lets you access the clipboard on Linux, MacOS, Windows and Cygwin.

#### Module 0x3 | Network Kung Fu

* geoip - searches a GeoIP database host or IP address, returns the country, city, ISP and location.
* net-ping - A ping interface. Includes TCP, HTTP, LDAP, ICMP, UDP, WMI (for Windows).
* ruby-nmap - A Ruby interface to Nmap, the exploration tool and security / port scanner.
* ronin-scanners - A library for Ronin that provides Ruby interfaces to various third-party security scanners.
* net-dns - A pure Ruby DNS library, with a clean OO interface and an extensible API.
* snmp - A Ruby implementation of SNMP (the Simple Network Management Protocol).
* net-ssh - A pure-Ruby implementation of the SSH2 client protocol.
* net-scp - A pure Ruby implementation of the SCP client protocol
* ftpd - A pure Ruby FTP server library. It supports implicit and explicit TLS, IPV6, passive and active mode.
* packetfu - A mid-level packet manipulation library for Ruby.

#### Module 0x4 | Web Kung Fu

* net-http-digest\_auth - An implementation of RFC 2617 - Digest Access Authentication.
* ruby-ntlm - NTLM implementation for Ruby
* activerecord - Databases on Rails. Build a persistent domain model by mapping database tables to Ruby
* tiny\_tds - TinyTDS - A modern, simple and fast FreeTDS library for Ruby using DB-Library.
* activerecord-sqlserver-adapter
* activerecord-oracle\_enhanced-adapter
* buby - a mashup of JRuby with the popular commercial web security testing tool Burp Suite from PortSwigger.
* wasabi - A simple WSDL parser.
* savon - Heavy metal SOAP client.
* httpclient - gives something like the functionality of libwww-perl \(LWP\) in Ruby
* nokogiri -  An HTML, XML, SAX, and Reader parser.
* twitter - A Ruby interface to the Twitter API.
* selenium-webdriver - A tool for writing automated tests of websites. It aims to mimic the behaviour of a real user
* watir-webdriver - WebDriver-backed Watir.
* coffee-script - Ruby CoffeeScript is a bridge to the JS CoffeeScript compiler.
* opal - Ruby runtime and core library for JavaScript.

**Extra gems**  
Useful gem to deal with web

* Mechanize - a ruby library that makes automated web interaction easy.
* HTTP.rb - Fast, Elegant HTTP client for ruby
* RestClient - A class and executable for interacting with RESTful web services.
* httparty - Makes http fun! Also, makes consuming restful web services dead easy.
* websocket - Universal Ruby library to handle WebSocket protocol.

#### Module 0x5 | Exploitation Kung Fu

* metasm - A cross-architecture assembler, disassembler, linker, and debugger.

#### Module 0x6 | Forensic Kung Fu

* metasm - A cross-architecture assembler, disassembler, linker, and debugger.



