# windapsearch

> Utility to enumerate users, groups and computers from a Windows domain through LDAP queries.

## Getting computer information

### Intro

The `computers` module can be used to enumerate all AD computers and the results can be saved as JSON with `--json`.

```
$ windapsearch -d <domain> -u <user> -p <password> --dc <dc_ip> --module computers --json > scans/windapsearch_computers.json
```

### Parsing results

Of course the text or JSON results can be used as is but:

1. Having the DNS hostname (`dNSHostName`) can be nice but having the IP address is important and `windapsearch` doesn't offer it because it's not a LDAP information, it has to be retrieved from the DNS server. Having the IP address can be useful to quickly understand in which VLAN the machine is.
2. The AD is often bloated with old objects like computers that doesn't exist anymore. So `windapsearch` will retrieve a lot of computers that don't have a DNS hostname or have one but that can't be resolved since the DNS entry was removed. As an auditor/pentester we mostly care about computers that are existing and reachable, old entries is noise to us.

So here is a Ruby script that can:

- displays the same output as `windapsearch` (dns hostname, cn, dn, OS infos) but with the IP address(es) on top (`full` command)
- displays only cn and ip address(es) (`cnip` command)
- displays only computers with a resolvable DNS host name

```ruby
require 'resolv'
require 'json'

data = JSON.load_file('windapsearch_computers.json')

resolver = Resolv::DNS.new(nameserver: ['<dns_1>', '<dns_2>'], search: ['<domain>'], ndots: 1)

def getips(res, name)
  if name.nil? || name.empty?
    'none'
  else
    ips = res.getaddresses(name)
    if ips.empty?
      'none'
    else
      ips.join(', ')
    end
  end
end

if ['cnip','full'].include?(ARGV[0])
  data.each do |computer|
    ips = getips(resolver, computer['dNSHostName'])
    unless ips == 'none'
      puts "cn: #{computer['cn']}"
      puts "ip(s): #{ips}"
      if ARGV[0] == 'full'
        puts "dNSHostName: #{computer['dNSHostName']}"
        puts "dn: #{computer['dn']}"
        puts "operatingSystem: #{computer['operatingSystem']}"
        puts "operatingSystemVersion: #{computer['operatingSystemVersion']}"
        puts "operatingSystemServicePack: #{computer['operatingSystemServicePack']}"
      end
      puts
    end
  end
else
  puts "[+] Usage: <cnip|full>\n\n"
  puts 'cnip: displays only cn and ip address(es)'
  puts "full: same as cnip + dns hostname, dn, OS infos\n\n"
  puts 'Note: displays only computers with a resolvable DNS hostname'
end
```

`<dns_1>` and `<dns_2>` need to be replaced with the DNS servers IP address (often the DC) and `<domain>` with the search domain.

Example of output for one computer with the `full` command:

```
cn: MACHINE1
ip(s): 10.0.0.42
dNSHostName: MACHINE1.example.org
dn: CN=MACHINE1,OU=WSUS,DC=example,DC=org
operatingSystem: Windows Server 2008 R2 Standard
operatingSystemVersion: 6.1 (7601)
operatingSystemServicePack: Service Pack 1
```

Ref.:

- [THTT - windapsearch](https://trove.raw.pm/tools/windapsearch/)
