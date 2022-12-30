const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
   const conn = await mongoose.connect("mongodb://localhost:27017/inventory", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true,
    // useFindAndModify: false
   });

   console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;