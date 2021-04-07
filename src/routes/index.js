const {Router}= require('express');
const router = Router();

const {createUser} = require('../controllers/index.controller.users')

router.post('/users',createUser)

module.exports=router;