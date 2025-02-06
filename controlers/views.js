const { blogModel, commentModel } = require('../models/Blogmodel');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploads = multer({ storage: storage });

async function index(req, res) {
    const blogs = await blogModel.find({});
    return res.render('index', {'blogs': blogs });
};

async function createBlog(req, res) {
    if (req.method==='POST') {
        data = req.body;
        console.log(data.title, data.description, req.file.filename);
        await blogModel.create({title:data.title, description:data.description, blogpic:req.file.filename});
    }
    return res.render('createblog');
}

async function blogDetail(req, res) {
    const blogid = req.params.id;
    const blog = await blogModel.findOne({_id:blogid});
    if (req.method==='POST'){
        await commentModel.create({
            blog:blog._id,
            owner:req.user._id,
            comment:req.body.comment,
        });
    };
    return res.render('blogdetail', {blog:blog});
};

module.exports = {
    index,
    createBlog,
    uploads,
    blogDetail,
}