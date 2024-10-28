import mongoose from 'mongoose';
import Continent from './continents.js';

const countryModel = new mongoose.Schema({
    name: { type: String },
    continent: { type: mongoose.Schema.Types.ObjectId, ref: Continent },
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],

}, { strictPopulate: false })

const Country = mongoose.model('Country', countryModel);
export default Country;