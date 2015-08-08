# Nmap

```
gem install ruby-nmap ronin-scanners
```
As far as you understand how to use nmap and how basicly it works, you'll find this lib is easy to use. You can do most of nmap functionalties


### Basic Scan
Ruby-nmap gem is a Ruby interface to nmap, the exploration tool and security / port scanner.

* Provides a Ruby interface for running nmap.
* Provides a Parser for enumerating nmap XML scan files.

let's see how it dose work.

```ruby
require 'nmap'
scan = Nmap::Program.scan(:targets => '192.168.0.15', :verbose => true)
```
### SYN Scan

```ruby
require 'nmap/program'

Nmap::Program.scan do |nmap|
  nmap.syn_scan = true
  nmap.service_scan = true
  nmap.os_fingerprint = true
  nmap.xml = 'scan.xml'
  nmap.verbose = true

  nmap.ports = [20,21,22,23,25,80,110,443,512,522,8080,1080,4444,3389]
  nmap.targets = '192.168.1.*'
end
```
each option like `nmap.syn_scan` or `nmap.xml` is considered as a *Task*. [Documentation](http://www.rubydoc.info/gems/ruby-nmap/frames "Official doc") shows the list of [scan tasks/options](http://www.rubydoc.info/gems/ruby-nmap/Nmap/Task) that are supported by the lib.


### Comprehensive scan
#### **`TO BE COMPLETED`**

```ruby
require 'nmap/program'

Nmap::Program.scan do |nmap|

  # Target
  nmap.targets = '192.168.0.1'

  # Verbosity and Debugging
  nmap.verbose = true
  nmap.show_reason = true

  # Port Scanning Techniques:
  nmap.syn_scan = true          # You can use nmap.all like -A in nmap

  # Service/Version Detection:
  nmap.service_scan = true
  nmap.os_fingerprint = true
  nmap.version_all = true

  # Script scanning
  nmap.script = "all"

  nmap.all_ports                # nmap.ports = (0..65535).to_a

  # Firewall/IDS Evasion and Spoofing:
  nmap.decoys = ["google.com","yahoo.com","hotmail.com","facebook.com"]
  nmap.spoof_mac = "00:11:22:33:44:55"
  # Timing and Performance
  nmap.min_parallelism = 30
  nmap.max_parallelism = 130

  # Scan outputs
  nmap.output_all = 'rubyfu_scan'

end
```




https://github.com/ronin-ruby/ronin-scanners
















