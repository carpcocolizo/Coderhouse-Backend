const fs = require("fs")

class Contenedor {

    constructor(fileName) {
        this.fileName = fileName
    }

    static messages = []
    
    save = async (emailInput, date, messageInput) => {
        try {
            let checkFile = await fs.promises.readFile(`./${this.fileName}`, "utf-8")
            const allmessages = [] 
            allmessages.push(JSON.parse(checkFile))
            let newmessage = {
                email: emailInput,
                date: new Date(),
                message: messageInput,
            }
            allmessages.push(newmessage)
            let aGuardar = allmessages.flat()
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(aGuardar))
            return aGuardar
        } catch(error) {
            let nuevoProducto = {
                email: emailInput,
                date: new Date(),
                message: messageInput,
            }
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(nuevoProducto))
            return nuevoProducto + ` Salio en catch porque: ${error}`
        }
    }    

    getAll = async () => {
        try {
            let contenedor = []
            let allmessages = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, "utf-8"))
            contenedor.push(allmessages)
            return contenedor
        } catch(error) {
            console.log(`Hubo un error: ${error}`)
        }

    }
}

module.exports = { Contenedor }