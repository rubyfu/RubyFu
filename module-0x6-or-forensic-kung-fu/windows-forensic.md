# Windows Forensic

## Windows Registry

![](<../.gitbook/assets/win-foren\_\_winreg1 (6) (1).png>)

### Enumeration

```ruby
require 'win32/registry'


# List keys
keyname = 'SOFTWARE\Clients'
access  = Win32::Registry::KEY_ALL_ACCESS
Win32::Registry::HKEY_LOCAL_MACHINE.open(keyname,  access).keys

# List all MAC address keys
keyname= 'SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Signatures\Unmanaged' 
access = Win32::Registry::KEY_ALL_ACCESS
Win32::Registry::HKEY_LOCAL_MACHINE.open(ketname, access).keys

keyname= 'SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Signatures\Unmanaged' 
access = Win32::Registry::KEY_ALL_ACCESS
Win32::Registry::HKEY_LOCAL_MACHINE.open(keyname, access) do |reg|; 
  reg.each_key{|k, v| puts k, v}
end
```

Note: `KEY_ALL_ACCESS` enables you to write and deleted. The default access is `KEY_READ` if you specify nothing.
