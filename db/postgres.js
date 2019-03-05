const pg = require('pg');
const uri = 'postgres://test:yeet@localhost/yote';

module.exports = function (data) {
    pg.connect(uri, (err, db) => {
        if (err) throw new Error(err);
    })
}