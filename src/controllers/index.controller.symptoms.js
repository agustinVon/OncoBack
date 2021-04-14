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
        console.log('morimo')
        res.status(400)
        
    }    

    try{
        await pool.query(query,data)
        res.status(200).send()
    }catch(error){
        res.status(400).send()
    }
}

module.exports ={
    registerSymptom
}