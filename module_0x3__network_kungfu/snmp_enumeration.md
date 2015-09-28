# SNMP Enumeration

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
hostname = manager.get("sysName.0")
contact  = manager.get("sysContact.0")
location = manager.get("sysLocation.0")
```

Note: the OID names are case sensitive 