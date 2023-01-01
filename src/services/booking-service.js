const axios = require('axios');

const  {BookingRepository}  = require('../repository')
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig')

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;

            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);

            const flightData = response.data.data;

            const priceOfTheFlight = flightData.price;

            if(data.noOfSeats>flightData.totalSeats){
                console.log("Not enough seats");
                throw error;
            }

            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = {...data,totalCost};

            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestURL,{totalSeats : flightData.totalSeats-booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id, {status : "Booked"});
            
            return finalBooking;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = BookingService