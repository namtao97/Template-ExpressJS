const JWT = require('jsonwebtoken')
const configs = require('../configs')
const db = require('../db')

const verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token']
    if (typeof token !== undefined) {
        req.token = token
        next()
    } else {
        req.token = undefined
        next()
    }
}

const assignToken = (username, password, email) => {
    return new Promise((resolve, reject) => {
        JWT.sign({username: username, password: password, email: email}, configs.SECRET_KEY, (err, token) => {
            if (err) reject(err)
            else resolve(token)
        })
    })
}

const addToken = (token, email) => {
    return new Promise((resolve, reject) => {
        db.query('insert into `cache`(`token`,`email`) values (?, ?)', [token, email], (err, ret) => {
            if (err) reject(err)
            else resolve(ret)
        })
    })
}

const removeToken = (email) => {
    return new Promise((resolve, reject) => {
        db.query('delete from `cache` where `email` = ?', [email], (err, ret) => {
            if (err) reject(err)
            else resolve(ret)
        })
    })
}

const verify = async (token) => {
    try {
        let ret = await Promise.all([checkToken(token), verifyAccessToken(token)])
        return Promise.resolve(ret[1])
    } catch (e) {
        return Promise.reject(e)
    }
}

const checkToken = (token) => {
    return new Promise((resolve, reject) => {
        db.query('select * from `cache` where `token` = ? limit 1', [token], (err, ret) => {
            if (err) reject(err)
            else resolve(ret)
        })
    })
}

const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, configs.SECRET_KEY, (err, decoded) => {
            if (err) reject(err)
            else resolve(decoded)
        })
    })
}

module.exports = {
    verify,
    verifyToken,
    assignToken,
    removeToken,
    addToken
}