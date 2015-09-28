# SNMP Enumeration
- Install ruby-snmp
```
gem install snmp
```

## Get Request
```ruby
require 'snmp'

# Connect to SNMP server
manager = SNMP::Manager.new(:host => '192.168.0.17')

# General info 
puts "SNMP Version: " + manager.config[:version]
puts "Community: " + manager.config[:community]
puts "Write Community: " + manager.config[:WriteCommunity]


# Get hostname, contact and location
hostname = manager.get("sysName.0").each_varbind.map {|vb| vb.value.to_s}       # manager.get("sysName.0").varbind_list[0]
contact  = manager.get("sysContact.0").each_varbind.map {|vb| vb.value.to_s}    # manager.get("sysContact.0").varbind_list[0]
location = manager.get("sysLocation.0").each_varbind.map {|vb| vb.value.to_s}   # manager.get("sysLocation.0").varbind_list[0]

# It takes an array of OIDs
response = manager.get(["sysName.0", "sysContact.0", "sysLocation.0"])
response.each_varbind do |vb|
    puts vb.value.to_s
end

```

> Note: the OID names are case sensitive 


## Set Request
```ruby
require 'snmp'
include SNMP


```