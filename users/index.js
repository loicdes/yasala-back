const db = require('../db/index')
const ObjectId = require('mongodb').ObjectId;

exports.createUser = async (req, res, next) => {
    try {
        let queryResult = await db.insertOne('yasala', 'users', req.body);
        if (queryResult.insertedCount === 1) {
            res.json(true);
        } else {
            res.status(500).json('Insertion error');
        }
    } catch (e) { 
        console.log('Erreur in createUser ' + e.message);
        return next(e);
    }
};

exports.getByLoginPassword = async (req, res, next) => {
    try {
        const params = {
            tel: req.params.tel,
            password: req.params.password
        };
        const queryResult = await db.get('receipes', 'receipes', params);
        res.json(queryResult);
    } catch (e) { 
        console.log('Erreur in getByLoginPassword ' + e.message);
        return next(e);
    }
};