const mysql = require('mysql')

const connection = mysql.createPool({
    host: 'famtechvn.com',
    user: 'namnt',
    password: 'password',
    database: 'template-expressjs'
})

module.exports = connection