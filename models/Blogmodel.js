const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    blogpic: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogusers',
    },
    time: {
        type: Date,
        default: Date.now,
    }
})

const blogModel = mongoose.model('blogs', blogSchema);

const commentsSchema = mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'blogs',
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'blogusers',
        required:true,
    },
    comment:{
        type: String,
        required: true,
    },
    time:{
        type: Date,
        default: Date.now
    },

});

const commentModel = mongoose.model('blogcomments', commentsSchema);

module.exports = {
    blogModel,
    commentModel
};