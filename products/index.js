const db = require('../db/index')
const ObjectId = require('mongodb').ObjectId;

exports.updateOrCreateProduct = async (req, res, next) => {
    try {
        let queryResult;
        if (req.params.id) {
            delete req.body._id;
            queryResult = await db.findOneAndUpdate('yasala', 'products',
                                {"_id" : ObjectId(req.params.id)}, req.body);
        } else {
            queryResult = await db.insertOne('yasala', 'products', req.body);
        }
        if (queryResult.insertedCount === 1 || queryResult.ok) {
            res.json(true);
        } else {
            res.status(500).json('Insertion error');
        }
    } catch (e) { 
        console.log('Erreur in updateOrCreateProduct ' + e.message);
        return next(e);
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const category = req.params.category ? { categories: { $in: [req.params.category]}} : {} ;
        const queryResult = await db.get('yasala', 'products', category);
        res.json(queryResult);
    } catch (e) { 
        console.log('Erreur in getAllProducts ' + e.message);
        return next(e);
    }
};
exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id ? { _id: ObjectId(req.params.id)} : {} ;
        const queryResult = await db.findById('yasala', 'products', id);
        res.json(queryResult);
    } catch (e) { 
        console.log('Erreur in getById ' + e.message);
        return next(e);
    }
}