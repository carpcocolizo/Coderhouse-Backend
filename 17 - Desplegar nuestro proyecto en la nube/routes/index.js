import { Router } from "express"
const router = Router()
import getProductosTest from "../controllers/productTestController.js"

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
}

router.get('/api/productos-test',checkAuthentication, getProductosTest)

router.get("/index",checkAuthentication, async (req,res) => {
    var user = req.user;
    res.render("main.hbs", { nombre: user.username })
})

router.get("/logout",async (req,res) => {
    const nombre = req.user.username
    req.logout(err => {
        if(err) {
            return console.log(err)
        }
        res.render("logout.hbs", { nombre })
    })
})
        
export default router
