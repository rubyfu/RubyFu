# Databases


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

## Active Record
- To install ActiveRecord 
```
gem install activerecord 
```
- To install most known adapters 
```
mysql tiny_tds activerecord-sqlserver-adapter activerecord-oracle_enhanced-adapter
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
You will observe ActiveRecord examines the database tables themselves to find out which columns are available. This is how we were able to use accessor methods for participant.name without explicitly defining them: we defined them in the database, and ActiveRecord picked them up.

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




