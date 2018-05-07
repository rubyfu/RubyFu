# Databases

Dealing with database is a required knowledge in web testing and here we will go though most known databases and how to deal with it in ruby.

## SQLite

* Install sqlite3 gem

  ```text
  gem install sqlite3
  ```

  You've have to have sqlite3 development libraries installed on your system

  ```text
  apt-get install libsqlite3-dev
  ```

* Basic operations

```ruby
require "sqlite3"

# Open/Create a database
db = SQLite3::Database.new "rubyfu.db"

# Create a table
rows = db.execute <<-SQL
  CREATE TABLE attackers (
   id   INTEGER PRIMARY KEY   AUTOINCREMENT,
   name TEXT    NOT NULL,
   ip   CHAR(50)
);
SQL

# Execute a few inserts
{
  'Anonymous'    => "192.168.0.7",
  'LulzSec'      => "192.168.0.14",
  'Lizard Squad' => "192.168.0.253"
}.each do |attacker, ip|
  db.execute("INSERT INTO attackers (name, ip)
              VALUES (?, ?)", [attacker, ip])
end

# Find a few rows
db.execute "SELECT id,name,ip FROM attackers"

# List all tables
db.execute  "SELECT * FROM sqlite_master where type='table'"
```

## Active Record

* Install ActiveRecord gem

  ```text
  gem install activerecord
  ```

### MySQL database

* Install MySQL adapter gem

  ```text
  gem install mysql
  ```

Login to mysql console and create database _rubyfu\_db_ and table _attackers_

```text
create database rubyfu_db;

grant all on rubyfu_db.* to 'root'@'localhost';

create table attackers (
  id int not null auto_increment,
  name varchar(100) not null,
  ip text not null,
  primary key (id)
);

exit
```

The outputs look like following

```text
mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 41
Server version: 5.5.44-0ubuntu0.14.04.1 (Ubuntu)

Copyright (c) 2000, 2015, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.


mysql> create database rubyfu_db;
Query OK, 1 row affected (0.00 sec)

mysql> grant all on rubyfu_db.* to 'root'@'localhost';
Query OK, 0 rows affected (0.00 sec)

mysql> use rubyfu_db;
Database changed
mysql> create table attackers (
    ->   id int not null auto_increment,
    ->   name varchar(100) not null,
    ->   ip text not null,
    ->   primary key (id)
    -> );
Query OK, 0 rows affected (0.01 sec)

mysql> exit
```

Now, let's to connect to _rubyfu\_db_ database

```ruby
require 'active_record'
ActiveRecord::Base.establish_connection(
:adapter  => "mysql",
:username => "root",
:password => "root",
:host     => "localhost",
:database => "rubyfu_db"
)

class Attackers < ActiveRecord::Base
end
```

* Using the ActiveRecord library, available as the activerecord gem.
* Using the ActiveRecord adapter namely _mysql_
* Establishing a connection to the database _rubyfu\_db_
* Creating a class called _Attackers_ following the conventions mentioned above \(attacker\)

```ruby
Attackers.create(:name => 'Anonymous',    :ip => "192.168.0.7")
Attackers.create(:name => 'LulzSec',      :ip => "192.168.0.14")
Attackers.create(:name => 'Lizard Squad', :ip => "192.168.0.253")
```

You will observe that ActiveRecord examines the database tables themselves to find out which columns are available. This is how we were able to use accessor methods for participant.name without explicitly defining them: we defined them in the database, and ActiveRecord picked them up.

You can find the item

* by id

  ```text
  Attackers.find(1)
  ```

* by name

  ```text
  Attackers.find_by(name: "Anonymous")
  ```

  Result

  ```ruby
  #<Attackers:0x000000010a6ad0 id: 1, name: "Anonymous", ip: "192.168.0.7">
  ```

or you can work it as object

```ruby
attacker = Attackers.find(3)
attacker.id
attacker.name
attacker.ip
```

If you want to delete an item from the database, you can use the destroy \(Deletes the record in the database\) method of ActiveRecord::Base:

```ruby
Attackers.find(2).destroy
```

So to write a complete script,

```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
# ActiveRecord with MySQL
#
require 'active_record'

# Connect to database
ActiveRecord::Base.establish_connection(
                                        :adapter  => "mysql",
                                        :username => "root",
                                        :password => "root",
                                        :host     => "localhost",
                                        :database => "rubyfu_db"
                                       )

# Create Active Record Model for the table
class Attackers < ActiveRecord::Base
end

# Create New Entries to the table
Attackers.create(:name => 'Anonymous',    :ip => "192.168.0.7")
Attackers.create(:name => 'LulzSec',      :ip => "192.168.0.14")
Attackers.create(:name => 'Lizard Squad', :ip => "192.168.0.253")

# Interact with table items
attacker = Attackers.find(3)
attacker.id
attacker.name
attacker.ip

# Delete a table Item
Attackers.find(2).destroy
```

### Oracle database

* Prerequisites

in order to make [ruby-oci8](http://www.rubydoc.info/gems/ruby-oci8/file/docs/install-full-client.md) -which is the main dependency for oracle driver- works you've to do some extra steps:

* Download links for [Linux](http://www.oracle.com/technetwork/topics/linuxx86-64soft-092277.html) \| [Windows](http://www.oracle.com/technetwork/topics/winsoft-085727.html) \| [Mac](http://www.oracle.com/technetwork/topics/intel-macsoft-096467.html)
  * instantclient-basic-\[OS\].\[Arch\]-\[VERSION\].zip
  * instantclient-sqlplus-\[OS\].\[Arch\]-\[VERSION\].zip
  * instantclient-sdk-\[OS\].\[Arch\]-\[VERSION\].zip
* Unzip downloaded files

```text
unzip -qq instantclient-basic-linux.x64-12.1.0.2.0.zip
unzip -qq instantclient-sdk-linux.x64-12.1.0.2.0.zip
unzip -qq instantclient-sqlplus-linux.x64-12.1.0.2.0.zip
```

* Create system directories

  as root / sudo

```text
mkdir -p /usr/local/oracle/{network,product/instantclient_64/12.1.0.2.0/{bin,lib,jdbc/lib,rdbms/jlib,sqlplus/admin/}}
```

The file structure should be

```text
/usr/local/oracle/
├── admin
│   └── network
└── product
    └── instantclient_64
        └── 12.1.0.2.0
            ├── bin
            ├── jdbc
            │   └── lib
            ├── lib
            ├── rdbms
            │   └── jlib
            └── sqlplus
                └── admin
```

* Move files

```text
cd instantclient_12_1

mv ojdbc* /usr/local/oracle/product/instantclient_64/12.1.0.2.0/jdbc/lib/
mv x*.jar /usr/local/oracle/product/instantclient_64/12.1.0.2.0/rdbms/jlib/
# rename glogin.sql to login.sql
mv glogin.sql /usr/local/oracle/product/instantclient_64/12.1.0.2.0/sqlplus/admin/login.sql
mv sdk /usr/local/oracle/product/instantclient_64/12.1.0.2.0/lib/
mv *README /usr/local/oracle/product/instantclient_64/12.1.0.2.0/
mv * /usr/local/oracle/product/instantclient_64/12.1.0.2.0/bin/
# Symlink of instantclient
cd /usr/local/oracle/product/instantclient_64/12.1.0.2.0/bin
ln -s libclntsh.so.12.1 libclntsh.so
ln -s ../lib/sdk sdk
cd -
```

* Setup environment

Append oracle environment variables in to `~/.bashrc` Then add the following:

```text
# Oracle Environment
export ORACLE_BASE=/usr/local/oracle
export ORACLE_HOME=$ORACLE_BASE/product/instantclient_64/12.1.0.2.0
export PATH=$ORACLE_HOME/bin:$PATH
LD_LIBRARY_PATH=$ORACLE_HOME/bin
export LD_LIBRARY_PATH
export TNS_ADMIN=$ORACLE_BASE/admin/network
export SQLPATH=$ORACLE_HOME/sqlplus/admin
```

Then run:

```text
source ~/.bashrc
```

* Install Oracle adapter gem

  ```text
  gem install ruby-oci8 activerecord-oracle_enhanced-adapter
  ```

Now let's to connect

```text
require 'active_record'

ActiveRecord::Base.establish_connection(
                      :adapter  => "oracle_enhanced",
                      :database => "192.168.0.13:1521/XE",
                      :username => "SYSDBA",
                      :password => "welcome1"
                       )

class DBAUsers < ActiveRecord::Base
end
```

### MSSQL database

* Install MSSQL adapter gem

```text
gem install tiny_tds activerecord-sqlserver-adapter
```

