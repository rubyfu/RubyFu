# Module 0x6 | Forensic KungFu


## This Chapter is under development, if you can help, please don't hesitate to contact me or pull a request on the [official github repository](https://github.com/KINGSABRI/RubyFu)




## Firefox Investigation

You can find Firefox profile databases in 
- Linux 
```
/home/$USER/.mozilla/firefox/[PROFILE]
```
- Windows 
```
C:\Users\%USERNAME%\[PROFILE]
```

```ruby
require 'sqlite3'

# List all tables 
db.execute  "SELECT * FROM sqlite_master where type='table'"

# Browser Histroy 
db = SQLite3::Database.new "places.sqlite"
# List all vitied URLs (History)
db.execute  "SELECT url FROM moz_places"
# List all bookmarks
db.execute  "SELECT title FROM moz_bookmarks"

# List all Cookies
db = SQLite3::Database.new "cookies.sqlite"
db.execute  "SELECT baseDomain, name, host, path, value FROM moz_cookies"

# List all form history
db = SQLite3::Database.new "formhistory.sqlite"
db.execute  "SELECT fieldname, value FROM moz_formhistory"
```
More about [Firefox forensic](http://www.forensicswiki.org/wiki/Mozilla_Firefox_3_History_File_Format)

## Google Chrome Investigation

- Linux
```
/home/$USER/.config/google-chrome/Default
```
- Windows 
```
C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default\
```

```ruby
require 'sqlite3'


# List all Cookies
db = SQLite3::Database.new "Cookies"
db.execute  "SELECT host_key, path, name, value FROM cookies"
```
More about [Chrome forensic](http://www.forensicswiki.org/wiki/Google_Chrome)









<!--- 

```
gem install rbkb --source http://gemcutter.org
```

```
gem install metasm
```


# TO BE CHECKED 

https://media.blackhat.com/bh-us-12/Briefings/Scott/BH_US_12_Scott_ruby_for_pentesters_the_workshop_Slides.pdf

http://www.blackhat.com/presentations/bh-usa-09/TRACY/BHUSA09-Tracy-RubyPentesters-SLIDES.pdf

https://www.pentestgeek.com/penetration-testing/using-metasm-to-avoid-antivirus-detection-ghost-writing-asm/
-->







<br><br><br>
---
