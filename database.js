const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sekolah'
})

connection.connect(function(error){
    if(!error){
        console.log(error)
    }else{
        console.log('berhasil coy')
    }
})

module.exports = connection;