const pg = require('pg');
const uri = 'postgresql://test:yeet@localhost/yote';


const controller = {};

controller.find = function (req, res, next) {
    pg.connect(uri, (err, db) => {
        if (err) {
            throw new Error();
        };
        db.query('SELECT * from users;', (err, results) => {
            if (err) {
                throw err
            }
           res.locals.data = results.rows
           next();
        })
    })
}

controller.createUser = function (req, res, next) {
    pg.connect(uri, (err, db) => {
        if (err) {
            throw new Error();
        };
        const username = req.body.username;
        console.log(username);
        db.query(`INSERT into users (username) values  ('${username}');`, (err) => {
            if (err) {
               console.log(err)
            }
            db.query(`SELECT _id from users where username = '${username}';`, (err, results) => {
                if (err) {
                    console.log(err)
                }
                res.locals.userId = results.rows[0]._id
                console.log('id of user just added to db', res.locals.userId)
             next();
            })
        })
        
    })
}

controller.buy = function () { }


module.exports = controller;