const express = require('express')
// const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const {loadContact,findContact} = require('./utils/contact')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(morgan('dev'))
// app.use(expressLayouts);
app.use(express.static('public'))

app.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
});

app.get('/', (req, res) => {
    res.status(200)
    const mahasiswa = [
        {
            nama : 'Asep',
            email: 'asep@gmail.com'
        },


        {
            nama : 'Usro',
            email: 'usro@gmail.com'
        }
    ];


    res.render('index', {
        nama : 'Aldy Rialdy',
        title: 'Halaman Index',
        layout : 'layouts/main-layout',
        mahasiswa : mahasiswa
    })

})


app.get('/about', (req, res) => {
    res.status(200)
    // res.render('about')
    res.render('about',{
        layout : 'layouts/main-layout',
        title : 'Halaman About'
    })

})


app.get('/contact', (req, res) => {
    const contacts = loadContact()
    res.status(200)
    res.render('contact',{
        contacts
    })
})

app.get('/contact/:nama', (req, res) => {
    res.status(200)
    const contact = findContact(req.params.nama)
    res.render('detail',{
        layout : 'layouts/main-layout',
        title : 'Halaman Detail',
        contact
    })
    // res.sendFile('./contact.html',{root: __dirname})
})


app.get('/product/:id', (req,res) => {
    res.send('Product ID: '+req.params.id)
})


app.get('/product/:id/category/:idCat', (req,res) => {
    res.send(`Product ID: ${req.params.id} and Category ID: ${req.params.idCat}`)
});

app.get('/product', (req,res) => {
    res.send(`Label Product: ${req.query.label}`)
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
