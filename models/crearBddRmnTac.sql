create database RMNTAC;

show databases;

use RMNTAC;
create table activitat (
	codiAct 	int primary key auto_increment,
	data 		date,
	procedencia varchar(20),
	pacient 	varchar(50),
	proces 		varchar(15),
	prova 		varchar(50),
	modalitat 	varchar(15),
	contrast	varchar(2),
	realitzador	varchar(30),
	registre	timestamp
);

create table tecnics (
	codiTec		mediumint primary key,
	nom 		varchar(30)
);

create table proves (
	codiProva	mediumint primary key auto_increment,
	prova 		varchar(30)
);

show tables;