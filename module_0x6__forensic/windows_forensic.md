# Windows Forensic

## Windows Registry

### Enumeration


```ruby
require 'win32/registry'


# List keys
keyname = 'SOFTWARE\Clients'
access  = Win32::Registry::KEY_ALL_ACCESS
Win32::Registry::HKEY_LOCAL_MACHINE.open(keyname,  access).keys

# 
keyname= 'SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Signatures\Unmanaged' 
access = Win32::Registry::KEY_ALL_ACCESS
Win32::Registry::HKEY_LOCAL_MACHINE.open(ketname, access).keys

```

Note: `KEY_ALL_ACCESS` enables you to write and deleted. The default access is KEY_READ if you specify nothing.