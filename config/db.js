const mongoose = require('mongoose');

const db = async () => {
    try {
        const response = await mongoose.connect(
             process.env.MONGO_URI
        );
        console.log("Database connected........")
        console.log("!! << ... >> ... << ... >> !!");
        console.log(`MongoDB Connected: ${response.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = db;
