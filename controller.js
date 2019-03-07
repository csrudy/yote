const pg = require('pg');
const uuid = require('uuid');
const uri = 'postgresql://test:yeet@localhost/yote';

const { Client } = require('pg')
const client = new Client({
    connectionString: uri,
});

const controller = {};

controller.find = (req, res, next) => {
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

controller.createUser = function (req, res) {
    pg.connect(uri, (err, db) => {
        if (err) {
            throw new Error();
        };
        const username = req.body.username;
        console.log(username);
        db.query(`INSERT into users (id, username) values ($1, $2);`, [uuid(), username], (err) => {
            if (err) {
                console.log(err)
            }
            db.query(`SELECT * from users where username = $1;`, [username], (err, { rows }) => {
                if (err) {
                    console.log(err)
                }
                console.log('id of user just added to db', res.locals.userId)
                res.json(rows[0])
            })

        })

    })
}

controller.trade = function (req, res, next) {
    const user_id = req.headers["userid"];
    const { type, coin, quantity } = req.body;
    pg.connect(uri, (err, db) => {
        if (err) {
            throw new Error();
        };
        db.query(`INSERT into trades (type, coin, quantity, user_id)
     values ($1, $2, $3, $4) returning id, type, coin, quantity, user_id`, [type, coin, quantity, user_id], (err, results) => {
                console.log('added trade to db-->', results.rows[0])
                res.status(201).end();
            })
    })

}

controller.wallet = function (req, res, next) {
    const userId = req.headers["userid"];
    console.log(userId)
    pg.connect(uri, (err, db) => {
        if (err) {
            throw new Error();
        };
        db.query(`SELECT * from trades where user_id = $1;`, [userId], (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results.rows[0])
            res.json(results.rows);
        })
    })
}

module.exports = controller;