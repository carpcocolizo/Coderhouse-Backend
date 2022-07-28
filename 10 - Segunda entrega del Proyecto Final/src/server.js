import express from "express"
import path from "path"
import rutas from "../routes/index.js"
const app = express()
const port = process.env.PORT || 8080
const __dirname = path.resolve()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', rutas)

app.use((error, req, res, next) => {
    res.status(error.httpStatusCode(400)).send(error)
})

app.use('*', function(req, res){
    res.json({ error : -2, descripcion: `ruta ${req.path} método ${req.method} no implementada`});
});

app.listen(port, () => {
    console.log(`El servidor se inicio en el puerto ${port}`)
})
