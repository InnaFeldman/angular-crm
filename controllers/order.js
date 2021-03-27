const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');


//(GET) http://localhost:5000/api/order?offset=2&limit=5

module.exports.getAll = async function(req, res){
    const query = {
        user: req.user.id
    };

    //Start Date
    if(req.query.start){
        query.date = {
            //Greater or equal
            $gte: req.query.start
        }
    }

    //End Date
    if(req.query.end){
        //if theris no start date
        if(!query.date){
            query.date = {}
        }

        //$lte = less or equal
        query.date['$lte'] = req.query.end;
    }

    //If we want to get specific order number
    if(req.query.order){
        query.order = +req.query.order //'+' = Convert it into a Number
    }
    
    try{
        const orders = await Order
        .find(query)
        .sort({date: -1})
        .skip(+req.query.offset) /// '+' = convert string into Number
        .limit(+req.query.limit);
        //sort({date: -1}) -> DESC sort
        //await category.save();
        res.status(201).json(orders);
    }catch(e){
        errorHandler(res, e)
    }
}


module.exports.create = async function(req, res){
    try{
        const lastOrder = await Order.findOne({
            user: req.user.id
        }).sort({date: -1}) //For adding unique order numberwe need to find the last order

        const maxOrder = lastOrder ? lastOrder.order : 0; 

        const order = new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1 //Creating a new order add unique order number
        })
        await category.save();
        res.status(201).json(order);

    }catch {
        errorHandler(res, e)
    }
}