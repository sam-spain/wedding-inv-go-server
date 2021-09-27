const mongoose = require('mongoose');


exports.connectDb = async function connectDb() {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    // tslint:disable-next-line:no-console
    console.log(`MongoDB Connected: ${connection.connection.host}`);
}