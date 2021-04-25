# Shodan

## Shodanz

This section comes from [_Shodan Pentesting Guide_](https://community.turgensec.com/shodan-pentesting-guide/#Ruby_-_shodanz) on TurgenSec blog written by [noraj](https://pwn.by/noraj/).

### Installation

In a virtual ruby environment like [rbenv](https://github.com/rbenv/rbenv):

```text
$ gem install shodanz
```

Then the API key will always be initialized like that in our code:

```ruby
require 'shodanz'

api = Shodanz.client.new(key: 'YOUR_API_KEY')
```

For production projects you may prefer read the API key via the environment variable `SHODAN_API_KEY`.

### Examples

#### **Basic search**

```ruby
# Search Shodan
results = api.host_search('apache')

# Show results
puts "Results found: #{results['total']}"
results['matches'].each do |result|
  puts "IP: #{result['ip_str']}"
  puts result['data'] + "\n"
end
```

Example of output:

```text
IP: 154.218.139.58
HTTP/1.1 200 OK
Date: Tue, 28 Jan 2020 22:13:53 GMT
Server: Apache
Upgrade: h2
Connection: Upgrade, close
Last-Modified: Wed, 26 Apr 2017 08:03:47 GMT
ETag: "52e-54e0d47a39ec0"
Accept-Ranges: bytes
Content-Length: 1326
Vary: Accept-Encoding
Content-Type: text/html


IP: 132.148.235.102
HTTP/1.1 200 OK
Date: Tue, 28 Jan 2020 22:13:53 GMT
Server: Apache
Upgrade: h2,h2c
Connection: Upgrade
Last-Modified: Fri, 10 May 2019 09:10:49 GMT
ETag: "a4edb-7ab-58884f152c219"
Accept-Ranges: bytes
Content-Length: 1963
Vary: Accept-Encoding,User-Agent
Content-Type: text/html


IP: 112.126.140.94
HTTP/1.1 404 Not Found
Date: Tue, 28 Jan 2020 22:13:34 GMT
Server: Apache
X-Powered-By: PHP/5.2.17
X-UA-Compatible: IE=EmulateIE7
Transfer-Encoding: chunked
Content-Type: text/html
```

#### **Available ports of a host**

```ruby
# Lookup the host
host = api.host('1.1.1.1')

# Print general info
puts "
IP: #{host['ip_str']}
Organization: #{host['org'] || 'n/a'}
Operating System: #{host['os'] || 'n/a'}
"

# Print all banners
host['data'].each do |item|
  puts "
Port: #{item['port'] || 'n/a'}
Banner: #{item['data'] || 'n/a'}

"
end
```

Example of output:

```text
IP: 1.1.1.1
Organization: Mountain View Communications
Operating System: n/a

Port: 443
Banner: HTTP/1.1 403 Forbidden
Server: cloudflare
Date: Tue, 28 Jan 2020 18:34:35 GMT
Content-Type: text/html
Content-Length: 553
Connection: keep-alive
CF-RAY: 55c50fb4e8149d5a-AMS




Port: 80
Banner: HTTP/1.1 409 Conflict
Date: Tue, 28 Jan 2020 17:26:54 GMT
Content-Type: text/html; charset=UTF-8
Transfer-Encoding: chunked
Connection: close
Set-Cookie: __cfduid=d189a930262f96d94a707a90d853a56bd1580232414; expires=Thu, 27-Feb-20 17:26:54 GMT; path=/; domain=.www.1yhaoduo.com; HttpOnly; SameSite=Lax
Cache-Control: max-age=6
Expires: Tue, 28 Jan 2020 17:27:00 GMT
X-Frame-Options: SAMEORIGIN
Vary: Accept-Encoding
Server: cloudflare
CF-RAY: 55c4ac8fba63801a-SAN




Port: 53
Banner:
Recursion: enabled
Resolver ID: AMS
```

#### **Displaying stats**

```ruby
# The list of properties we want summary information on
FACETS = {
  'org': 3,
  'domain': 5,
  'port': 5,
  'asn': 5,
  'country': 10,
}

FACET_TITLES = {
  'org': 'Top 3 Organizations',
  'domain': 'Top 5 Domains',
  'port': 'Top 5 Ports',
  'asn': 'Top 5 Autonomous Systems',
  'country': 'Top 10 Countries',
}

# Query
query = 'apache 2.4'

# Count results
result = api.host_count(query, facets: FACETS)
puts 'Shodan Summary Information'
puts "Query: #{query}"
puts "Total Results: #{result['total']}\n"

# Print the summary info from the facets
result['facets'].each do |facet, _v|
  puts FACET_TITLES[facet]

  result['facets'][facet].each do |term|
    puts "#{term['value']}: #{term['count']}"
  end

  # Print an empty line between summary info
  puts ''
end
```

Example of output:

```text
Shodan Summary Information
Query: apache 2.4
Total Results: 63939

Liquid Web, L.L.C: 23126
Amazon.com: 7843
Hetzner Online GmbH: 1798


amazonaws.com: 10398
telecom.net.ar: 1609
your-server.de: 1232
t-ipconnect.de: 629
vultr.com: 450


80: 21131
443: 19772
8080: 3023
10000: 1672
8081: 1372


as53824: 13810
as32244: 9316
as16509: 6138
as24940: 1740
as7303: 1410


US: 30877
DE: 5781
CN: 4432
BR: 2949
AR: 1757
JP: 1472
GB: 1168
IN: 1030
FR: 720
CA: 613
```

#### **Async support with the stream API**

```ruby
require 'async'
require 'shodanz'

api = Shodanz.client.new(key: 'YOUR_API_KEY')

# Asynchronously stream banner info from shodan and check any
# IP addresses against the experimental honeypot scoring service.
api.streaming_api.banners do |banner|
  if ip = banner['ip_str']
    Async do
      score = api.rest_api.honeypot_score(ip).wait
      puts "#{ip} has a #{score * 100}% chance of being a honeypot"
    rescue Shodanz::Errors::RateLimited
      sleep rand
      retry
    rescue # any other errors
      next
    end
  end
end
```

**Warning:** Freelancer API plan or better required for using the stream API, developer or free plan won't work.

**Note:** this async example comes from the shodanz documentation.

#### **Useful methods**

```ruby
# Returns all the protocols that can be used when launching an Internet scan
api.protocols

# Returns a list of port numbers that the Shodan crawlers are looking for
api.ports

# Returns information about the Shodan account linked to this API key
api.profile

# Look up the IP address for the provided list of hostnames
api.resolve('archlinux.org', 'blackarch.org')

# Look up the hostnames that have been defined for the given list of IP addresses
api.reverse_lookup('138.201.81.199', '176.31.253.211')

# Get your current IP address as seen from the Internet
api.my_ip

# Calculates a honeypot probability score ranging from 0 (not a honeypot) to 1.0 (is a honeypot)
api.honeypot_score('1.1.1.1')

# API Plan Information
api.info
```

#### **Exploits API**

```ruby
puts client.exploit_count(port: 22, page: 1)
puts client.exploit_search('rce couchdb', type: 'remote', platform: 'linux', author: 'Metasploit')
```

You can find more examples [here](https://github.com/picatz/shodanz/tree/master/examples) or read the shodanz [API documentation](https://www.rubydoc.info/gems/shodanz).

