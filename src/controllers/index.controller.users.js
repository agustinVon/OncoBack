require('dotenv').config();

const {Pool} = require('pg');
const jwt = require('jsonwebtoken')

const pool = new Pool({
    host:'localhost',
    user:'testUser',
    password:'747',
    database:'oncoBackdb',
    port: '5432'
})

const createUser = async (req,res) =>{
    const {name, password, gender, email, birth,medic,place,etnia,id,smoke,time,qnt,dbt,med,gip,epoc,acv,inf,avatar} = req.body
    const query = 'INSERT INTO users (name, password, gender, email, birth,medic,place,etnia,id,smoke,time,qnt,dbt,med,gip,epoc,acv,inf,avatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)'
    const data = [name, password, gender, email, birth,medic,place,etnia,id,smoke,time,qnt,dbt,med,gip,epoc,acv,inf,avatar]
    try{
        const response = await pool.query(query,data)
        const accesToken=jwt.sign({id:id},process.env.ACCESS_TOKEN_SECRET)
        console.log(response);
        res.status(201).json({
            message: 'User Added Succesfully',
            body: {
                user: {name,id},
                token: accesToken
            }
        })
    }catch(error){
        res.status(409).send()
    }
}

const loginUser = async(req,res) =>{
    const id = req.params.id
    try{
        const response = await pool.query('SELECT * FROM users WHERE id = $1',[id])
        res.status(200).json(response.rows)
    }catch(error){
        res.status(400).send()
    }
}

const displayUsers = async(req,res) =>{
    try{
        const response = await pool.query('SELECT * FROM users')
        res.status(200).json(response.rows)
    }catch(error){
        res.status(400).send()
    }
}

const test = async(req,res) =>{
    const existingId = await pool.query('SELECT * FROM users WHERE id = 88')
    console.log(existingId.rowCount>0)
    res.json({})
}

function authenticateToken(req,res,next) {
    console.log('hola')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token ==null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        req.user = user
        next()
    })
}

const authenticateAdmin = (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token ==null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, medic) =>{
        const medicId = medic.id
        const idExists = (await pool.query('SELECT * FROM medics WHERE id = $1',[medicId])).rowCount >0
        
        if(!idExists){
            return res.sendStatus(401)
        }
        else{
            next()
        }
    })
}

module.exports ={
    createUser,
    loginUser,
    displayUsers,
    authenticateToken,
    authenticateAdmin,
    test
}