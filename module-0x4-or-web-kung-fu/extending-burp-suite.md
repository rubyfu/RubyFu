# Extending Burp Suite

## Setting up the Ruby environment for Burp Extensions

1. Download a stable version of JRuby from [JRuby Downloads](http://jruby.org/download)
2. Select the jar for Linux \(JRuby x.x.x Complete .jar\) or Executable for Windows.
3. Import the environment from **Burp Suite** &gt;&gt; **Extender** &gt;&gt; **Options** &gt;&gt; **Ruby Environment**.

![](../.gitbook/assets/webfu__burp_setenv1.png)

Import the Burp Suite Extender Core API `IBurpExtender`

**alert.rb**

```ruby
require 'java'
java_import 'burp.IBurpExtender'

class BurpExtender
  include IBurpExtender

  def registerExtenderCallbacks(callbacks)
    callbacks.setExtensionName("Rubyfu Alert!")
    callbacks.issueAlert("Alert: Ruby goes evil!")
  end
end
```

Load the plugin alert.rb  
![](../.gitbook/assets/webfu__burp-ext1.png)

Check Alerts tab  
![](../.gitbook/assets/webfu__burp-ext2.png)

### Burp Suite Extension in Ruby template initiative

As Rubyfu project keeps groing, we've decided to develope our vesion of make a solid place for Ruby in the information security community. We've deceided to build a repository that makes building a Burp Suite extension in Ruby is very easy and understandable. [**Repository link**](https://github.com/KINGSABRI/BurpSuite_Extension_Ruby_Template)

## Buby

Buby is a mashup of JRuby with the popular commercial web security testing tool Burp Suite from PortSwigger. Burp is driven from and tied to JRuby with a Java extension using the BurpExtender API. This extension aims to add Ruby scriptability to Burp Suite with an interface comparable to the Burp's pure Java extension interface.

**Resources**

* Burp Suite Extender API Documentations \[ [link](https://portswigger.net/burp/extender/api/) \]
* Step by step Ruby-based Burp Extension for JSON Encryption/Decryption \[ [Part 1](https://www.trustwave.com/Resources/SpiderLabs-Blog/JSON-Crypto-Helper-a-Ruby-based-Burp-Extension-for-JSON-Encryption/Decryption---Part-I/) \| [Part 2](http://blog.spiderlabs.com/2015/01/json-crypto-helper-a-ruby-based-burp-extension-for-json-encryptiondecryption-part-ii.html) \]
* Buby \[ [website](http://human.versus.computer/buby/) \| [rdoc](http://human.versus.computer/buby/rdoc/index.html) \]
* Extensions written in Ruby \[ [WhatThWAF](https://github.com/null--/what-the-waf) \]
* Burp suite Scripting with Buby \[ [Link](http://www.gotohack.org/2011/05/cktricky-appsec-buby-script-basics-part.html) \]

