const express = require('express')
const app = express()
const path = require('path')
const rutas = require('../routes/index.js')
const puerto = 8080



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(`${__dirname}/public`))

app.use('/api', rutas)

app.use((error, req, res, next) => {
    res.status(error.httpStatusCode(400)).send(error)
})

app.use('*', function(req, res){
    res.json({ error : -2, descripcion: `ruta ${req.path} método ${req.method} no implementada`});
});

app.listen(puerto, () => {
    console.log(`El servidor se inicio en el puerto ${puerto}`)
})
