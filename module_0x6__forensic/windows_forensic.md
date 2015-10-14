# Windows Forensic

## Windows Registry

### Enumeration

```ruby
require 'win32/registry'

# List keys
Win32::Registry::HKEY_LOCAL_MACHINE.open('SOFTWARE\Clients').keys
```