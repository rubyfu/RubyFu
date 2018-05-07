# Module 0x6 \| Forensic Kung Fu

## Firefox Investigation

You can find Firefox profile databases in

* Linux 

  ```text
  /home/$USER/.mozilla/firefox/[PROFILE]
  ```

* Windows 

  ```text
  C:\Users\%USERNAME%\[PROFILE]
  ```

In above directories, there are many SQLite database files, so let's to import these databases and see what we get

```ruby
require 'sqlite3'

# Browser history 
db = SQLite3::Database.new "places.sqlite"

# List all tables 
db.execute  "SELECT * FROM sqlite_master where type='table'"

# List all visited URLs (History)
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

* Linux

  ```text
  /home/$USER/.config/google-chrome/Default
  ```

* Windows 

  ```text
  C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default\
  ```

```ruby
require 'sqlite3'

# List all Cookies
db = SQLite3::Database.new "Cookies"
db.execute  "SELECT host_key, path, name, value FROM cookies"
```

More about [Chrome forensic](http://www.forensicswiki.org/wiki/Google_Chrome)

