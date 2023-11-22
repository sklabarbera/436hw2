const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema(
    {
        title: {type: String, required: false},
        description: {type: String, required: false},
        complete: {type: Boolean, required: false},
        dateCompleted: {type: String, required: false},
        author: {type: Schema.Types.ObjectId, ref: 'User'}
    }
);

module.exports = mongoose.model('Post', PostSchema);
