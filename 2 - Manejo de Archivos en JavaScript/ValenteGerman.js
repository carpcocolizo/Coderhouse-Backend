const fs = require("fs")

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
            productos.forEach(element => {
                if (element.id == id) {
                    console.log(element)
                    return element
                } else {
                    return null
                }
            });
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

listaDeProductos = new Contenedor("productos.txt")

// PARA PROBAR LAS FUNCIONES: 

//listaDeProductos.save("Monitor", 45000, "https://www.lg.com/ar/images/monitores/md06248516/gallery/medium03.jpg").then(resultado => console.log(resultado))
//listaDeProductos.save("Mouse", 5000, "https://s3-sa-east-1.amazonaws.com/saasargentina/oaPmQNJPQeMZynN9AOk5/imagen").then(resultado => console.log(resultado))
//listaDeProductos.save("Teclado", 4000, "www.https://m.media-amazon.com/images/I/61DT+r681TL._AC_SY450_.jpg.com").then(resultado => console.log(resultado))
//listaDeProductos.save("Auriculares", 15000, "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/083/546/products/cat-ear-rosa1-870144229ef97690a816125523141178-640-0.jpg").then(resultado => console.log(resultado))
//listaDeProductos.getById(2).then(resultado => console.log(resultado))
//listaDeProductos.getAll().then(resultado => console.log(resultado))
//listaDeProductos.deleteById(2).then(resultado => console.log(resultado))
//listaDeProductos.deleteAll()

// Intenta probar esto, pero me da error y no encuentro la solucion:


(async () {
    try {
	    await listaDeProductos.save("Monitor", 45000, "https://www.lg.com/ar/images/monitores/md06248516/gallery/medium03.jpg").then(resultado => console.log(resultado))
        await listaDeProductos.save("Mouse", 5000, "https://s3-sa-east-1.amazonaws.com/saasargentina/oaPmQNJPQeMZynN9AOk5/imagen").then(resultado => console.log(resultado))   
        await listaDeProductos.save("Teclado", 4000, "www.https://m.media-amazon.com/images/I/61DT+r681TL._AC_SY450_.jpg.com").then(resultado => console.log(resultado))
        await listaDeProductos.save("Auriculares", 15000, "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/083/546/products/cat-ear-rosa1-870144229ef97690a816125523141178-640-0.jpg").then(resultado => console.log(resultado))
    } catch(error) {
        console.log(error)
    }
})();


