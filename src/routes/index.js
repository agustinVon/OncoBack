const {Router}= require('express');
const router = Router();

const {createUser,loginUser,authenticateToken,displayUsers,authenticateAdmin,test} = require('../controllers/index.controller.users')
const {registerSymptom} = require('../controllers/index.controller.symptoms')
const {createMedic}= require('../controllers/index.controller.medic')

router.post('/users',createUser)
router.get('/users/:id',authenticateToken,loginUser)
router.get('/test',test)
router.get('/users',authenticateAdmin,displayUsers)

router.post('/symptoms',registerSymptom)

router.post('/medics',createMedic)

module.exports=router;