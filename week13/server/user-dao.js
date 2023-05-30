const crypto = require('crypto');

const db = require('./db');

/**
 * Query the database and check whether the username exists and the password
 * hashes to the correct value.
 * If so, return an object with full user information.
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise} a Promise that resolves to the full information about the current user, if the password matches
 * @throws the Promise rejects if any errors are encountered
 */
function getUser(username, password) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE email=?';
        db.get(sql, [username], (err, row) => {
            if (err) { // database error
                reject(err);
            } else {
                if (!row) { // non-existent user
                    reject('Invalid username or password');
                } else {
                    crypto.scrypt(password, row.salt, 32, (err, computed_hash) => {
                        if (err) { // key derivation fails
                            reject(err);
                        } else {
                            const equal = crypto.timingSafeEqual(computed_hash, Buffer.from(row.password, 'hex'));
                            if (equal) { // password ok
                                resolve(row);
                            } else { // password doesn't match
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