# Databases




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


```
mysql -u root -p

mysql> create database rubyfu_db;
mysql> grant all on rubyfu_db.* to 'root'@'localhost';
mysql> create table attackers (
    ->   id int not null auto_increment,
    ->   name varchar(100) not null, 
    ->   ip text not null,  
    ->   primary key (id)  
    -> );
mysql> exit
```