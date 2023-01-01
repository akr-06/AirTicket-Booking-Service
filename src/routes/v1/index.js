const express = require('express');
const router = express.Router();

const {BookingController} = require('../../controllers/index');


router.route('/bookings').post(BookingController.create);






module.exports = router;

