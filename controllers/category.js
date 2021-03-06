const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function(req, res){
    try{
        const categories = await Category.find({user: req.user.id});
        setTimeout(()=>{
            res.status(200).json(categories);
        }, 1000)
    }catch(e){
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res){
    try{
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    }catch(e){
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res){
    //console.log(req.user)
    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : '' //If file is uploaded add path to this file
    })
    try{
        await category.save();
        res.status(201).json(category);
    }catch(e){
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res){
    const updated = {
        name: req.body.name ///upadtee name
    }
    if(req.file){
        updated.imageSrc = req.file.path //Check if there is file, if true update its path
    }

    try{
        const category = await Category.findOneAndUpdate({
            _id: req.params.id},
            {$set: updated},
            {new: true}
            )
        res.status(200).json(category);

    }catch(e){
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res){
    try{
        await Category.remove({_id: req.params.id});
        await Position.remove({category: req.params.id});

        res.status(200).json({
            message: 'This category has been removed'
        })
    }catch(e){
        errorHandler(res, e)
    }
}
