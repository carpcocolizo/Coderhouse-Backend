const productos = []

const viewForm = (req, res) =>{
    try{
        res.render('main.ejs')
    } catch (error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const getProductos = (req, res) => {
    try { 
        res.render('mostrar.ejs', { productos });
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const addProducto = (req, res) => {
    try {
        const { title, price, thumbnail } = req.body
        if(isNaN(Number(price))) {
            const error = new Error('El precio tiene que ser un numero')
            error.httpStatusCode(400)
            next(error, req, res)
        }
        let id = productos.length + 1
        productos.push({ title, price, thumbnail, id })
        res.redirect("/")
        //res.sendStatus(201)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

        
module.exports = { viewForm, getProductos, addProducto }