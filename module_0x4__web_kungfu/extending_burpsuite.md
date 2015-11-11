# Extending BurpSuite

## Setting up the Ruby environment for Burp Extensions 

1. Download a stable version of JRuby from [JRuby Downloads](http://jruby.org/download)
2. Select the jar for Linux (JRuby x.x.x Complete .jar) or Executable for Windows.
3. Import the environment from **BrupSuite** >> **Extender** >> **Options** >> **Ruby Environment**.

![](webfu__burp_setenv1.png)

- http://human.versus.computer/buby/
- http://human.versus.computer/buby/rdoc/index.html
- https://github.com/null--/what-the-waf/blob/master/what-the-waf.rb
- https://www.pentestgeek.com/web-applications/burp-suite-tutorial-web-application-penetration-testing-part-2/
- http://blog.opensecurityresearch.com/2014/03/extending-burp.html
- http://www.gotohack.org/2011/05/cktricky-appsec-buby-script-basics-part.html
- https://portswigger.net/burp/extender/

Import the Burpsuite Extender Core API `IBurpExtender`

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
![](webfu__burp-ext1.png)

Check Alert tab
![](webfu__burp-ext2.png)

## Buby
Buby is a mashup of JRuby with the popular commercial web security testing tool Burp Suite from PortSwigger. Burp is driven from and tied to JRuby with a Java extension using the BurpExtender API. This extension aims to add Ruby scriptability to Burp Suite with an interface comparable to the Burp's pure Java extension interface.







<br><br><br>
---
