create table mentor (mentor_id int primary key,name varchar(30),qual varchar(30),password chkpass);
create table student (student_id int primary key,mentor_id int references mentor(mentor_id),name varchar(30),email varchar(20),
branch varchar(20),rollno int,contact char(10),password chkpass);
create table rating (student_id int primary key references student(student_id),iarating float,csrating float)
create table rating (student_id int primary key references student(student_id),iarating float,csrating float);