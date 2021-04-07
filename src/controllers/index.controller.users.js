require('dotenv').config();

const {Pool} = require('pg');
const jwt = require('jsonwebtoken')

const pool = new Pool({
    host:'localhost',
    user:'testUser',
    password:'747',
    database:'OncoBackDB',
    port: '5432'
})

const createUser = async (req,res) =>{
    const {name, password, gender, email, birth,medic,place,etnia,id,smoke,time,qnt,dbt,med,gip,epoc,acv,inf,avatar} = req.body
    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)',
     [name,email,password, gender, email, birth,medic,place,etnia,id,smoke,time,qnt,dbt,med,gip,epoc,acv,inf,avatar]);
    const accesToken=jwt.sign({name: name, email:email, password:password, gender:gender, birth:birth,medic:medic,place:place,etnia:etnia,id:id,smoke:smoke,time:time,qnt:qnt,dbt:dbt,med:med,gip:gip,epoc:epoc,acv:acv,inf:inf,avatar:avatar},process.env.ACCESS_TOKEN_SECRET)
    console.log(response);
    res.json({
        message: 'User Added Succesfully',
        body: {
            user: {name,id},
            token: accesToken
        }
    })
}

module.exports ={
    createUser,
}