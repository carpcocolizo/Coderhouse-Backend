const express = require ("express")
const fs = require("fs")

const app = express() 

const puerto = 8080

class Contenedor {

    constructor(fileName) {
        this.fileName = fileName
    }

    static productos = []
    
    save = async (nombreProducto, precio, thumbnail) => {
        try {
            let checkFile = await fs.promises.readFile(`./${this.fileName}`, "utf-8")
            Contenedor.productos.push(JSON.parse(checkFile))
            let idNumber = Contenedor.productos.flat()
            let nuevoProducto = {
                producto: nombreProducto,
                precio: precio,
                thumbnail: thumbnail,
                id: idNumber.length + 1 
            }
            Contenedor.productos.push(nuevoProducto)
            let aGuardar = Contenedor.productos.flat()
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(aGuardar))
            return nuevoProducto.id
        } catch(error) {
            let nuevoProducto = {
                producto: nombreProducto,
                precio: precio,
                thumbnail: thumbnail,
                id: 1
            }
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(nuevoProducto))
            return nuevoProducto.id + ` Salio en catch porque: ${error}`
        }
    }    

    getById = async (id) => {
        try{
            let productos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, "utf-8"))
            let elemento = []
            productos.forEach( element => {
                if (element.id == id) {
                    console.log(element)
                    elemento.push(element)
                }
            })
            if (!elemento.length) {
                elemento.push(null)
            }
            return elemento
        } catch(error) {
        console.log(`Posiblemente ID no valida, para mas informacion: ${error}`)
        }
    }

    getAll = async () => {
        try {
            let productos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, "utf-8"))
            return productos
        } catch(error) {
            console.log(`Hubo un error: ${error}`)
        }

    }

    deleteById = async (id) => {
        try {
            let productos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, "utf-8"))
            productos[id - 1] = null
            let nuevaLista = productos
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(nuevaLista))
        } catch(error) {
            console.log(`Hubo un error: ${error}`)
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.unlink(`./${this.fileName}`, "utf-8")
        } catch(error) {
            console.log(`No se pudo borrar porque:: ${error}`)
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

listaDeProductos = new Contenedor("productos.txt")

app.listen(puerto, () => {
    console.log(`El servidor se inicio en el puerto ${puerto}`)
})

app.get('/productos', (req, res) => {
    (async () => {
          resultado = await listaDeProductos.getAll()
          res.send(`Los productos disponibles, son: ${JSON.stringify(resultado)}`)
    })();
})

app.get('/productoRandom', (req, res) => {
    (async () => {
        productos = await listaDeProductos.getAll()
        numeroRandom = getRandomInt(1, productos.length + 1)
        resultado = await listaDeProductos.getById(numeroRandom)
        res.send(`Su producto elegido al azar es: ${JSON.stringify(resultado)}`)
  })();
})
