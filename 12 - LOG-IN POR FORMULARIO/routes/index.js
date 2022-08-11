import { Router } from "express"
const router = Router()
import getProductosTest from "../controllers/productTestController.js"

const validUser = async (req, res, next) => {
    if(!req.session.user) {
        return res.render("login.hbs")
    } else {
        return next()
    }
  }

router.get('/productos-test', validUser, getProductosTest)

router.get("/login", (req, res) => {
    res.render("login.hbs")  
});

router.get("/loginok", validUser,async (req,res) => {
    res.render("main.hbs", { nombre: req.session.user})
})

router.post("/loginok", async (req,res) => {
    req.session.user = req.body.firstname
    res.render("main.hbs", { nombre: req.session.user})
})

router.get("/logout", validUser,async (req,res) => {
    const nombre = req.session.user
    req.session.destroy()
    res.render("logout.hbs", { nombre})
})
        
export default router
