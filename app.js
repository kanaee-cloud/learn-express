const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
var connection = require('./database');

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    connection.query('SELECT * FROM siswa', function(err, rows){
        if(err){
            res.render('index',{
                data:''
            });
        }else{
            res.render('index', {
                data:rows
            });
        }

    })
})

app.get('/insert', (req, res) => {
    res.render('form', {
        nis: '', 
        nama: '', 
        kelas: '', 
        form: '/simpan',
        tombol: 'Simpan' 
    })
})

app.post('/simpan', (req, res) =>{
    const { nis, nama, kelas } = req.body;
    const sql = `INSERT INTO siswa (nis, nama, kelas) VALUES (?, ?, ?)`;
    connection.query(sql, [nis, nama, kelas], (err, result) => {
        if(err){ 
            console.error('gagal memasukkan data', err);
        }else{
            console.log('data berhasil dimasukkan');
            res.redirect('/');
        }
    })
})

app.get('/edit/:nis', (req, res) => {
    const nis = req.params.nis;
    connection.query(`SELECT * FROM siswa WHERE nis = '${nis}'`, function (err, data){
        if(err){
            res.render('/')
        }else{
            const nis = data[0].nis;
            const nama = data[0].nama;
            const kelas = data[0].kelas;

            res.render('form', {
                nis: nis,
                nama: nama,
                kelas: kelas,
                form: '/ubah',
                tombol: 'ubah'
            })
        }
    })
})

app.post('/ubah', (req, res) => {
    const nis = req.body.nis;
    const nama = req.body.nama;
    const kelas = req.body.kelas;
    const data = {
        nis: nis,
        nama: nama,
        kelas: kelas
    }
    connection.query(`UPDATE siswa SET nama = '${nama}', kelas = '${kelas}' WHERE nis = '${nis}'`,data, function (err, data){
        if(err){
            res.render('form', {

            })
        } else{
            res.redirect('/');
        }
    })
})

app.post('/hapus/:nis', (req, res) => {
    const sql = "DELETE FROM siswa WHERE nis = ?"
    connection.query(sql, req.params.nis, (err, result) => {
        res.redirect('/')
    })
})

app.listen(port, () => {
    console.log(`serius kamu? ${port}`)
})