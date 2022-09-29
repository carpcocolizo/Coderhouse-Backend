const isAdmin = true

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
}

function checkAdmin(req, res, next) {
    if (isAdmin) {
        return next()
    } else {
        res.json({ error : -1, descripcion: `ruta ${req.path} método ${req.method} no autorizada`})
    }
}

export { checkAuthentication, checkAdmin }