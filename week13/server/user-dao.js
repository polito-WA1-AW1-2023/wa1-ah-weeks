// const db = require('./db');
const sqlite = require('sqlite3');

const db = new sqlite.Database('questions.sqlite', (err) => {
    if (err) throw err;
});



const crypto = require('crypto');

/**
 * Query the database and check whether the usernamen exists and the password
 * hashes to the correct value.
 * If so, return an object with full user information.
 * @param {*} username 
 * @param {*} password 
 */
function getUser(username, password) {
    const sql = 'SELECT * FROM user WHERE email=?';
    return new Promise((resolve, reject) => {
        console.log(db);
        db.get(sql, [username], (err, row) => {
            if (err) {
                reject(err);
            } else {
                console.log(row);
                if (!row) {
                    reject('Invalid username or password');
                } else {
                    crypto.scrypt(password, row.salt, 32, (err, computed_hash) => {
                        console.log(computed_hash);
                        if (err) {
                            reject(err);
                        } else {
                            const equal = crypto.timingSafeEqual(computed_hash, Buffer.from(row.password, 'hex'));
                            if (equal) {
                                resolve(row);
                            } else {
                                reject('Invalid username or password');
                            }
                        }
                    });

                }
            }
        });
    });



}

exports.getUser = getUser;