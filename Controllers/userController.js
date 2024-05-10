
const users = require("../models/userModel")
const booking =require('../models/bookingSchema')

const jwt = require('jsonwebtoken');
exports.signUp = async (req, res) => {
    const { userName, email, password } = req.body;

    try {

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(400).json("User already exisits.");
        } else {
            const newUser = new users({
                userName, email, password
            });

            await newUser.save();
            return res.status(200).json(newUser );
        }
    } catch (err) {
        return res.status(500).json(`Create API failed: ${err}`);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existUser = await users.findOne({ email, password });

        if (existUser) {
            const token = jwt.sign({ _id: existUser._id, role: existUser.role }, "supersecretkey123");
           

            return res.status(200).json({
                user: existUser,
                token
            });

        } else {
            return res.status(404).json("Incorrect email and password");
        }
    } catch (err) {
        return res.status(500).json(`Login API failed: ${err}`);
    }
};


exports.addBooking = async (req, res) => {
    const { seatNum } = req.body;
    const { id } = req.params;
   
    const userId = req.payload;
   const movieId= id
    // console.log(userId);
    try {
        // Check if the user has already booked the same movie
        const existingBookings = await booking.find({ userId });
       
        if (existingBookings.length > 0) {
            const moviesBooked = existingBookings.map(booking => booking.movieId);
            // console.log(moviesBooked.includes (movieId));
            // console.log(moviesBooked);
            if (moviesBooked.includes(movieId)) {
                return res.status(400).json({ msg: "Booking the same movie again is not possible." });
            }
        }

        // Create a new booking
        const newBooking = new booking({ userId, movieId, seatNum });
        await newBooking.save();

        return res.status(200).json({ msg: "Booked Successfully", data: newBooking });
    }
    catch (err) {
        console.error('Error adding booking:', err);
        return res.status(500).json({ msg: "Failed to add booking. Please try again later." });
    }
}

    
  

