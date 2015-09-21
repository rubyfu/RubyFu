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
mysql -uroot -p
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
```
gem install mysql activerecord
```

Now, let's to connect to *rubyfu_db* database 
```ruby
require 'active_record'  
ActiveRecord::Base.establish_connection(  
:adapter  => "mysql",
:username => "root",
:password => "toor",
:host     => "localhost",  
:database => "rubyfu_db"  
)  
  
class Attackers < ActiveRecord::Base  
end  
```
- Using the ActiveRecord library, available as the activerecord gem.
- Using the ActiveRecord adapter namely *mysql*
- Establishing a connection to the database *rubyfu_db*
- Creating a class called *RubyfuDB* following the conventions mentioned above



```ruby
Attackers.create(:name => 'Anonymous',    :ip => "192.168.0.7")  
RubyfuDB.create(:name => 'LulzSec',      :ip => "192.168.0.14")  
RubyfuDB.create(:name => 'Lizard Squad', :ip => "192.168.0.253")  
```








