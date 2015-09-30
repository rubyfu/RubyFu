# Databases



## Active Record
- To install ActiveRecord 
```
gem install activerecord 
```

### MySQL database
- To install MySQL adapter
```
gem install mysql 
```

Login to mysql console and create database *rubyfu_db* and table *attackers*

```
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
```
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




Now, let's to connect to *rubyfu_db* database 
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
- Using the ActiveRecord library, available as the activerecord gem.
- Using the ActiveRecord adapter namely *mysql*
- Establishing a connection to the database *rubyfu_db*
- Creating a class called *Attackers* following the conventions mentioned above (attacker)

```ruby
Attackers.create(:name => 'Anonymous',    :ip => "192.168.0.7")  
Attackers.create(:name => 'LulzSec',      :ip => "192.168.0.14")  
Attackers.create(:name => 'Lizard Squad', :ip => "192.168.0.253")  
```
You will observe that ActiveRecord examines the database tables themselves to find out which columns are available. This is how we were able to use accessor methods for participant.name without explicitly defining them: we defined them in the database, and ActiveRecord picked them up.

You can find the item 
- by id
```
Attackers.find(1)
```
- by name
```
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


If you want to delete an item from the database, you can use the destroy (Deletes the record in the database) method of ActiveRecord::Base:


```ruby
Attackers.find(2).destroy  
```

So to write a complete script, 
```ruby
#!/usr/bin/env ruby
#
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

- Prerequisites

in order to make ruby-oci8 works you've to do some extra steps: 
- Download links for [Linux](http://www.oracle.com/technetwork/topics/linuxx86-64soft-092277.html) | [Windows](http://www.oracle.com/technetwork/topics/winsoft-085727.html) | [Mac](http://www.oracle.com/technetwork/topics/intel-macsoft-096467.html) 
 - instantclient-basic-[OS].[Arch]-[VERSION].zip
 - instantclient-sqlplus-[OS].[Arch]-[VERSION].zip
 - instantclient-sdk-[OS].[Arch]-[VERSION].zip


- Unzip downloaded files 

```
unzip -qq instantclient-basic-linux.x64-12.1.0.2.0.zip
unzip -qq instantclient-sdk-linux.x64-12.1.0.2.0.zip
unzip -qq instantclient-sqlplus-linux.x64-12.1.0.2.0.zip
```

- Create system directories
as root / sudo 
```
mkdir -p oracle/{network,product/instantclient_64/12.1.0.2.0/{bin,lib,jdbc/lib,rdbms/jlib,sqlplus/admin/}}
```
The file structure should be 
```
/usr/local/oracle/
├── admin
│   └── network
└── product
    └── instantclient_64
        └── 12.1.0.2.0
            ├── bin
            ├── jdbc
            │   └── lib
            ├── lib
            ├── rdbms
            │   └── jlib
            └── sqlplus
                └── admin
```

- Move files 

```
cd instantclient_12_1
mv ojdbc* /usr/local/oracle/product/instantclient_64/*/jdbc/lib/
mv x*.jar /usr/local/oracle/product/instantclient_64/*/rdbms/jlib/

# rename glogin.sql to login.sql
mv glogin.sql /usr/local/oracle/product/instantclient_64/*/sqlplus/admin/

mv sdk /usr/local/oracle/product/instantclient_64/*/lib/
mv *README /usr/local/oracle/product/instantclient_64/*/
mv * /usr/local/oracle/product/instantclient_64/*/bin/
```

- Setup environment 

Append oracle environment variables in to `~/.bashrc` Then add the following:

```
# Oracle Environment
export ORACLE_BASE=/usr/local/oracle
export ORACLE_HOME=$ORACLE_BASE/product/instantclient_64/11.2.0.3.0
export PATH=$ORACLE_HOME/bin:$PATH
export DYLD_LIBRARY_PATH=$ORACLE_HOME/lib:$DYLD_LIBRARY_PATH
export TNS_ADMIN=$ORACLE_BASE/admin/network
export SQLPATH=$ORACLE_HOME/sqlplus/admin
```
Then run:
```
source ~/.bashrc
```

- To install Oracle adapter
```
gem install activerecord-oracle_enhanced-adapter
```






### MSSQL database


- To install MSSQL adapter

```
gem install tiny_tds activerecord-sqlserver-adapter
```





