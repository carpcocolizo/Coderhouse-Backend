const express = require('express')
const app = express()
const { Server: IOServer } = require('socket.io')
const path = require('path')
const puerto = 8080
const expressServer = app.listen(puerto, () => {
    console.log(`El servidor se inicio en el puerto ${puerto}`)
})
const io = new IOServer(expressServer)
const { Contenedor }  = require("./clases")
const productos = []

const listaDeMensajes = new Contenedor("messages.txt")

app.use(express.static(path.join(__dirname, '../public')))


app.use((error, req, res, next) => {
    res.status(error.httpStatusCode(400)).send(error)
})

io.on('connection', async socket => {
    console.log(`Se conecto un usuario: ${socket.id}`)
    socket.emit("server:productos", productos)
    socket.emit("server:message", await listaDeMensajes.getAll())
    socket.on("client:product", async product => {
        productos.push(product)
        io.emit("server:productos", productos)
    })
    socket.on("client:message", async messageInfo => {
        await listaDeMensajes.save(messageInfo.email, messageInfo.date, messageInfo.message)
        io.emit("server:message", await listaDeMensajes.getAll())
    })
})
