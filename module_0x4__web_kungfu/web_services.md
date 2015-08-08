# Web Services

### SOAP - WSDL

```
gem install savon --version '~> 2.0'
```

```ruby
#!/usr/bin/evn ruby
#
#
require 'savonrb'

url= "http://172.16.50.141:80/iDrone/iDroneComAPI.asmx?WSDL"
client = Savon.client(wsdl: url)
```
