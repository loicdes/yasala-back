const db = require('../db/index')

exports.createUser = async (req, res, next) => {
    try {
        const params = {
            tel: req.body.tel
        };
        let queryResult = await db.get('yasala', 'users', params);
        if (queryResult.length > 0) {
            res.status(401).json('Un compte existe déjà avec ce numéro');
        }
        delete req.body.passwordConfirmation;
        queryResult = await db.insertOne('yasala', 'users', req.body);
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
            tel: req.query.login,
            password: req.query.password
        };
        const queryResult = await db.get('yasala', 'users', params);
        if (queryResult.length === 0) {
            res.status(401).json('Aucun compte existant');
        }
        res.json(queryResult);
    } catch (e) { 
        console.log('Erreur in getByLoginPassword ' + e.message);
        return next(e);
    }
};