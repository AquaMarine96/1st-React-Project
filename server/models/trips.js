import mongoose from 'mongoose';


const tripModel = new mongoose.Schema({
    title: { type: String, required: true },
    destination: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    comments: [{ type: String, default: [] }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    posted: { type: Date, default: Date.now },
})
const Trip = mongoose.model('Trip', tripModel);
export default Trip;