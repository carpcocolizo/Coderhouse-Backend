const fs = require("fs")

class Contenedor {

    constructor(fileName) {
        this.fileName = fileName
    }

    static productos = []
    
    save = async (nombre, descripcion, codigo, foto, precio, stock) => {
        try {
            let checkFile = await fs.promises.readFile(`./${this.fileName}`, "utf-8")
            const allProducts = []
            allProducts.push(JSON.parse(checkFile))
            let idNumber = allProducts.flat()
            let nuevoProducto = {
                id: idNumber.length + 1,
                timestamp: Date.now(),
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            }
            allProducts.push(nuevoProducto)
            let aGuardar = allProducts.flat()
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(aGuardar))
            return nuevoProducto.id
        } catch(error) {
            let idNumber = Contenedor.productos.flat()
            let nuevoProducto = {
                id: idNumber.length + 1,
                timestamp: Date.now(),
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            }
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(nuevoProducto))
            return nuevoProducto.id + ` Salio en catch porque: ${error}`
        }
    }
    
    change = async (id, nombre, descripcion, codigo, foto, precio, stock) => {
        try{
            let checkFile = await fs.promises.readFile(`./${this.fileName}`, "utf-8")
            const allProducts = []
            allProducts.push(JSON.parse(checkFile))
            let flatProducts = allProducts.flat() 
            flatProducts[id - 1] = {
                id,
                timestamp: Date.now(),
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            }
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(flatProducts))
            return flatProducts[id -1]
        } catch(error) {
            console.log(`Posiblemente ID no valida, para mas informacion: ${error}`)
        }
    }

    getById = async (id) => {
        try{
            let productos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, "utf-8"))
            let elemento = []
            const productosPurga = productos.filter(element => {
                return element !== null;
              });
            productosPurga.forEach( element => {
                if (element.id == id) {
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

module.exports = { Contenedor } 