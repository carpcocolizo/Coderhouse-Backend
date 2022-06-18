const express = require('express')
const app = express()
const rutas = require('./routes/index')
const path = require('path')
const puerto = 8080


app.set('view engine', 'ejs')
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
