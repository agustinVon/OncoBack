const {Router}= require('express');
const router = Router();

const {createUser,loginUser,authenticateToken,displayUsers,test} = require('../controllers/index.controller.users')
const {registerSymptom,getSymptoms,registerDaily,getRegisters} = require('../controllers/index.controller.symptomsReg')
const {createMedic,authenticateAdmin}= require('../controllers/index.controller.medic')

router.post('/users',createUser)
router.get('/users/:id',authenticateToken,loginUser)
router.get('/test',test)
router.get('/users',authenticateAdmin,displayUsers)

router.post('/symptoms',registerSymptom)
router.get('/symptoms',authenticateAdmin,getSymptoms)
router.post('/register',registerDaily)
router.get('/register',authenticateAdmin,getRegisters)

router.post('/medics',createMedic)

module.exports=router;