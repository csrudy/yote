const pg = require('pg');
const uuid = require('uuid');
const uri = 'postgresql://test:yeet@localhost/yote';

const { Client } = require('pg')
const client = new Client({
    connectionString: uri,
});

const controller = {};

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
                console.log(rows[0])
                db.end();
                res.json(rows[0])
            })

        })

    })
}

controller.trade = function (req, res, next) {
    const { type, coin, quantity, user_id} = req.body;
    console.log(req.body)
    pg.connect(uri, (err, db) => {
        if (err) {
            throw new Error();
        };
        db.query(`INSERT into trades (type, coin, quantity, user_id)
     values ($1, $2, $3, $4) returning id, type, coin, quantity, user_id`, [type, coin, quantity, user_id], (err, results) => {
                console.log('added trade to db-->', results.rows[0])
                if (err) {
                    throw err;
                }
                db.end()
                res.json({status: 200});
                
            })
    })

}

controller.wallet = function (req, res, next) {
    const userId = req.query.userid
    if (!userId) {
        res.status(403).end()
    }
    const result = {
        trades: [],
        totals: {},
    };
    pg.connect(uri, (err, db) => {
        if (err) {
            throw new Error();
        };
        db.query(`SELECT * from trades where user_id = $1;`, [userId], (err, tradeResults) => {
            if (err) {
                throw err;
            }
            result.trades = tradeResults.rows;
            db.query(`select coin, sum(quantity) from trades where user_id = $1 group by coin;`, [userId], (err, totalsResults) => {
                if (err) {
                    throw err;
                }
                result.totals = totalsResults.rows.reduce((obj, total) => {
                    obj[total.coin] = total.sum
                    return obj;
                }, {});
                db.end();
                res.json(result);
            });
        })
    })
}

module.exports = controller;