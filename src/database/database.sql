CREATE TABLE users(
    name varchar(255),
    password varchar(255),
    gender int,
    email varchar(255),
    birth varchar(255),
    medic varchar(255),
    place varchar(255),
    etnia varchar(255),
    id int PRIMARY KEY,
    smoke boolean,
    time int,
    qnt int,
    dbt boolean,
    med varchar(255),
    gip boolean,
    epoc boolean,
    acv boolean,
    inf boolean,
    avatar int
    status int,
    tipoCancer varchar(255),
)

CREATE TABLE symptoms(
    date varchar(255),
    grade int,
    id int,
    symptom varchar(255)
)

CREATE TABLE medics(
    id int PRIMARY KEY,
    name varchar(255),
    email varchar(255),
    password varchar(255)
);

SELECT * FROM users
WHERE id = 1

/*
{
	"name": "von",
	"password":"123",
	"gender":1,
	"email":"@",
	"birth":"20/6/01",
	"medic":"pepe",
	"place": "Austral",
	"etnia":"aaa",
	"id": 747,
	"smoke":true,
	"time": 2,
	"qnt": 3,
	"dbt": false,
	"med": null,
	"gip": false,
	"epoc": false,
	"acv": false,
	"inf": false,
	"avatar": 1
}


{
	"id": 11,
	"name":"Miguel",
	"email": "@Miguel",
	"password":"123"
}

medic "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWlndWVsIiwiaWQiOjEyMzQsImlhdCI6MTYxODQyMTI0OH0.ZRij2igfdadlJjGxydl-iTkmr6dFso6ekjD2Ju1gbG4"
*/