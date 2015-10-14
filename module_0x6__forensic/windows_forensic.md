# Windows Forensic

## Windows Registry

### Enumeration

```ruby
require 'win32/registry'

# List keys
Win32::Registry::HKEY_LOCAL_MACHINE.open('SOFTWARE\Clients').keys

Win32::Registry::HKEY_LOCAL_MACHINE.open('SOFTWARE\Clients') do |reg|
  reg.each_key { |name, wtime| puts name }
end

```