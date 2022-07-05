const fs = require("fs")

class ContenedorCarrito {

    constructor(fileName) {
        this.fileName = fileName
    }

    static productos = []
    
    create = async () => {
        try {
            let checkFile = await fs.promises.readFile(`./${this.fileName}`, "utf-8")
            const allCarritos = []
            allCarritos.push(JSON.parse(checkFile))
            let idNumber = allCarritos.flat()
            let nuevoCarrito = {
                id: idNumber.length + 1,
                timestamp: Date.now(),
                productos: []
            }
            allCarritos.push(nuevoCarrito)
            let aGuardar = allCarritos.flat()
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(aGuardar))
            return "Creado carrito con ID: " + nuevoCarrito.id
        } catch(error) {
            const allCarritos = []
            let idNumber = allCarritos.flat()
            let nuevoProducto = {
                id: idNumber.length + 1,
                timestamp: Date.now(),
                productos: []
            }
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(nuevoProducto))
            return nuevoProducto.id + ` Salio en catch porque: ${error}`
        }
    }
    
    addProduct = async (id, producto) => {
        try{
            let checkFile = await fs.promises.readFile(`./${this.fileName}`, "utf-8")
            const allCarritos = []
            allCarritos.push(JSON.parse(checkFile))
            let flatCarros = allCarritos.flat() 
            let carrito = flatCarros[id - 1]
            carrito.productos.push(producto)
            flatCarros[id - 1] = carrito
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(flatCarros.flat()))
            return flatCarros[id -1]
        } catch(error) {
            console.log(`Posiblemente ID no valida, para mas informacion: ${error}`)
        }
    }

    getById = async (id) => {
        try{
            let carrito = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, "utf-8"))
            let elemento = []
            const carritoPurga = carrito.filter(element => {
                return element !== null;
              });
            carritoPurga.forEach( element => {
                if (element.id == id) {
                    elemento.push(element)
                }
            })
            if (!elemento.length) {
                return { error: "Carrito no encontrado"}
            }
            return elemento[0].productos.flat()
        } catch(error) {
        console.log(`Posiblemente ID no valida, para mas informacion: ${error}`)
        }
    }

    deleteById = async (id) => {
        try {
            let carritos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, "utf-8"))
            carritos[id - 1] = null
            let nuevaLista = carritos
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(nuevaLista))
        } catch(error) {
            console.log(`Hubo un error: ${error}`)
        }
    }
    // HACER ESTO:
    deleteFromCarrito = async (idcarrito, idproducto) => {
        try {
            let carritos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, "utf-8"))
            let allProducts = carritos[idcarrito - 1].productos.flat()
            let carritoPurga = allProducts.filter(element => {
                return element.id !== idproducto;
            });
            allProducts = carritoPurga
            carritos[idcarrito - 1].productos = carritoPurga
            let nuevaLista = carritos
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(nuevaLista))
            return nuevaLista
        } catch(error) {
            console.log(`Hubo un error: ${error}`)
        }
    }
}

module.exports = { ContenedorCarrito } 