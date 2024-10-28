import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {type: String},
    content: {type: String},
    date: {type: Date, default: Date.now()},
    image: {type: String},

})

const News = mongoose.model('News', newsSchema);


export default News;