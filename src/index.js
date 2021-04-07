const {urlencoded} =require('express')
const express = require('express')
const app = express();

//middlewares
app.use(express.json());
app.use(urlencoded({extended: false}))

//routes
app.use(require('./routes/index'));

app.listen(5000)
console.log('Server on port 5000')