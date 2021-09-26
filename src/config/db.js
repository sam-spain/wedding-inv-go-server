const mongoose = require('mongoose');


module.exports = async function connectDb() {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    // tslint:disable-next-line:no-console
    console.log(`MongoDB Connected: ${connection.connection.host}`);
}