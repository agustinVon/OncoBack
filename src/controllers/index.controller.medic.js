require('dotenv').config();

const jwt = require('jsonwebtoken')
const {Pool} = require('pg');

const pool = new Pool({
    host:'localhost',
    user:'testUser',
    password:'747',
    database:'oncoBackdb',
    port: '5432'
})

const createMedic = async (req,res) =>{
    const {id,name,email,password} = req.body
    const query= 'INSERT INTO medics (id,name,email,password) VALUES ($1, $2, $3, $4)'
    const data = [id,name,email,password]

    try{
        await pool.query(query,data)
        
        const medicToken = jwt.sign({name:name , id:id},process.env.ACCESS_TOKEN_SECRET)

        res.status(200).json({
            message: 'Medic Added Succesfully',
            body: {
                token: medicToken
            }
        })
    }catch(err){
        res.status(409).send()
    }
}


module.exports ={
    createMedic
}