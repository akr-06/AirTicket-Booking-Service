const {BookingService} = require('../services');

const bookingService = new BookingService();

const create = async (req,res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(201).json({
            message : "Successfully created the booking",
            sucess : true,
            data : response,
            err : {}
        })
    } catch (error) {
        console.log("Error in create Booking controller");
        throw error;
    }
}

module.exports = {
    create,

}