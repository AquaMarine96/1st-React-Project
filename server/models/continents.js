import mongoose from 'mongoose';

const continentModel = new mongoose.Schema({
    name: { type: String, required: true },
    countries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }],
}, { strictPopulate: false })

const Continent = mongoose.model('Continent', continentModel);
export default Continent;
