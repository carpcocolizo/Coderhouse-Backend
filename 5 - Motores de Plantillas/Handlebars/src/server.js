const express = require('express')
const app = express()
const rutas = require('./routes/index')
const path = require('path')
const { engine } = require('express-handlebars')
const puerto = 8080

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/main.hbs'),
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partials')
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './views'))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', rutas)

app.use((error, req, res, next) => {
    res.status(error.httpStatusCode(400)).send(error)
})

app.listen(puerto, () => {
    console.log(`El servidor se inicio en el puerto ${puerto}`)
})
