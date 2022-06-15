const express = require('express')
const app = express()
const rutas = require('./routes/index')
const puerto = 8081


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(`${__dirname}/public`))


app.use('/api/productos', rutas)

app.use((error, req, res, next) => {
    res.status(error.httpStatusCode(400)).send(error)
})

app.listen(puerto, () => {
    console.log(`El servidor se inicio en el puerto ${puerto}`)
})
