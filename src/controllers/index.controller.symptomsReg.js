const {Pool} = require('pg');

const pool = new Pool({
    host:'localhost',
    user:'testUser',
    password:'747',
    database:'oncoBackdb',
    port: '5432'
})

const registerSymptom = async (req,res) =>{
    const {date,grade,id,symptom} = req.body
    const query= 'INSERT INTO symptoms (date,grade,id,symptom) VALUES ($1, $2, $3, $4)'
    const data = [date,grade,id,symptom]

    const idExists = (await pool.query('SELECT * FROM users WHERE id = $1',[id])).rowCount >0
    console.log(idExists)
    if(!idExists){
        res.status(400)
        
    }    
    try{
        await pool.query(query,data)
        res.status(200).send()
    }catch(error){
        res.status(400).send()
    }
}

const registerDaily = async (req,res) =>{
    const {id,date,hid,hungry,mood,run,sad,social} = req.body
    const query= 'INSERT INTO dailyRegister (id,date,hid,hungry,mood,run,sad,social) VALUES ($1, $2, $3, $4,$5,$6,$7,$8)'
    const data = [id,date,hid,hungry,mood,run,sad,social]

    const idExists = (await pool.query('SELECT * FROM users WHERE id = $1',[id])).rowCount >0
    if(!idExists){
        res.status(403)
    }   

    try{
        console.log(data)
        await pool.query(query,data)
        res.status(200).send()
    }
    catch(error){
        await pool.query('DELETE FROM dailyRegister WHERE date= $1 AND id = $2',[date,id])
        await pool.query(query,data)
        res.status(200).send()
    }
}

const getSymptoms = async (req,res) =>{
    try{
        const response = await pool.query('SELECT * FROM symptoms')
        res.status(200).json(response.rows)
    }catch(error){
        res.status(400).send()
    }
}

const getRegisters = async (req,res) =>{
    try{
        const response = await pool.query('SELECT * FROM dailyRegister')
        res.status(200).json(response.rows)
    }catch(error){
        res.status(400).send()
    }
}

module.exports ={
    registerSymptom,
    getSymptoms,
    registerDaily,
    getRegisters
}