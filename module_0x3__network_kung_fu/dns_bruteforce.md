# DNS brute force



```ruby
require 'net/dns'

# Small list of known subdomains, so can add like  '+ ('aaa'..'zzz').to_a'
subdomains = 
    [
        "access",  "accounting", "accounts", "active", "ad", "admin", "administracion", "administrador","administrator",
        "administration", "advertising", "agent", "ap", "apple", "archives", "area", "as", "b2b", "b2c", "backup",
        "backups", "bart", "beta", "bigip", "billing", "blackboard", "blog", "blogs", "book", "books", "c2b", "c2c", "ca",
        "carro", "cart", "catalog", "catalogue", "channel", "channels", "chat", "chimera", "cisco", "citrix", "classroom",
        "conect", "connect", "controller", "conferece", "core", "corporate", "cpanel", "csg", "customers", "database", "db",
        "dbs", "demo", "demostration", "design", "desk", "desktop", "dev", "devel", "developers", "development","directory",
        "dmz", "dns", "dns1", "dns2", "dns3", "domain", "domain1", "domain2", "domain3", "domaincontroller", "download",
        "downloads", "ds", "eaccess", "e", "eng", "es", "events", "example", "examples", "exchange", "exec", "extranet",
        "feed", "feeds", "file", "files", "fileserver", "finance", "firewall", "forum", "foro", "forums", "fs", "ftp",
        "ftpd", "fw", "gallery", "game", "games", "gateway", "groups", "guide", "gw", "help", "helpdesk", "home", "hotspot",
        "hp-ux", "hpux", "ids", "im", "images", "imail", "imap", "imap1", "imap2", "imap3", "imgs", "internal", "intranet",
        "ipsec", "irc", "irc1", "irc2", "irc3", "irix", "itil", "lab", "laboratories", "labs", "lan", "ldap", "library",
        "linux", "localhost", "login", "logs", "lotus", "mail", "mail1", "mail2", "mail3", "mailgate", "main", "man",
        "manager", "maps", "marketing", "member", "members", "mercury", "messenger", "meeting", "mmc", "mngt", "mobil",
        "mobile", "mom", "money", "monitor","monitoring", "moodle","mrtg", "mssql", "mx", "mx1", "mx2", "mx3", "mysql",
        "mysql1", "mysql2", "mysql3", "nameserver", "neon", "netmail", "netmeeting", "netscaler", "netscreen", "netstats",
        "network", "news", "news", "newsfeed", "newsfeeds", "newsgroups", "newton", "noc", "notes", "novell", "ns", "null",
        "online", "open", "openbsd", "openview", "operations", "oracle", "outlook", "owa", "pan", "partner", "partners",
        "pc", "pcanywhere", "pegasus", "peoplesoft", "personal", "photo", "photos", "podcast", "podcasts", "pop", "portal",
        "postgres", "ppp", "printer", "priv", "priv8", "private", "proxy", "prtg", "public", "radius", "ras", "relay",
        "remote", "reports", "research", "restricted", "router", "rss", "sales", "sample", "samples", "sandbox", "search",
        "secure", "security", "sendmail", "server", "server1", "server2", "server3", "services", "share", "sharepoint",
        "shop", "shopping", "sms", "smtp", "smtp1", "smtp2", "smtp3", "solaris", "sql", "squirrel", "squirrelmail", "ssh",
        "staff", "stage", "staging", "stats", "storage", "sun", "support", "sus", "test", "tftp", "tmp", "transfer", "ts",
        "uddi", "unix", "upload", "uploads", "vid", "video","videos", "virtual", "vista", "vnc", "vpn", "wan", "wap", "web",
        "webadmin", "webct", "webcast", "webcasts", "webmail", "webmaster", "wiki","windows", "wingate", "wlan", "wsus",
        "ww", "www", "www1", "www2", "www3", "xml"
    ]

```







<br><br><br>
---
