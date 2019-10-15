const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    created: {type : Date, default: Date.now},
    titel: String,
    content: String
})

module.exports=mongoose.model('Post', postSchema);