const express = require('express');
const router = express.Router();
const contactusController = require('../controllers/contactus');


router.get('/contactus',contactusController.contactus);

router.post('/success',contactusController.success);

module.exports=router;