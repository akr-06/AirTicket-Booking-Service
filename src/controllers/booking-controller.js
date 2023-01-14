const {BookingService} = require('../services');


const {createChannel, publishMessage} = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig')
const bookingService = new BookingService();


class BookingController {
    constructor(){  
    }

    async sendMessageToQueue(req,res){
        const channel = await createChannel();
        const data = {message : "Success"};

        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data) );
        return res.status(200).json({
            message : 'Successfully published the event'
        })

    }

    async create(req,res) {
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
}

module.exports = BookingController;