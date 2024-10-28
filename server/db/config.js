import mongoose from 'mongoose';

async function connectDB(){
    try{
        mongoose.set('strictQuery', false);
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
    }catch(err){
        console.log("An error has occcured while connecting to the database: ", err);
    }
    
}

export default connectDB;