const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/inotebook';

const connectToMongo = async ()=>{
    try {
       await mongoose.connect(mongoURI) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
    }
}

module.exports = connectToMongo;