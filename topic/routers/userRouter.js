const router = require('express').Router()
const userCtrl= require("../controllers/userCtrl")

router.post('/login',userCtrl.login)
router.post('/register',userCtrl.register)
router.get('/logout',userCtrl.logout)
router.get('/refresh_token',userCtrl.refreshToken)

module.exports  = router