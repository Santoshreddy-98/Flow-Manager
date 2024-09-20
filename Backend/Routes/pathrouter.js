const express =require('express')
const router = express.Router();
const pathcontroller = require('../Controller/ValidatePath')

router.post('/save-path', pathcontroller.validatePath)