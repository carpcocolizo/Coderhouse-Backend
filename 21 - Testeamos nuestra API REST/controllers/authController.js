import { logger } from "../src/utils/logger.js";

const redirectMain = async (req, res) => {
  try {
    res.status(200).json({"User logged in:": req.user})
    //res.redirect("/index.html");
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

const renderLogin = async (req, res) => {
  try {
    res.status(500).json({failed:"Authentication failed: invalid credentials"})
    //res.render("login.hbs");
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

const renderRegister = async (req, res) => {
  try {
    res.render("register.hbs");
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

const failLogin = async (req, res) => {
  try {
    res.status(500).json({failed:"Authentication failed: invalid credentials"})
    //res.render("faillogin.hbs");
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

const failSingup = async (req, res) => {
  try {
    res.render("failregister.hbs");
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

const logout = async (req, res) => {
  try {
    const nombre = req.user.firstname;
    req.logout((err) => {
      if (err) {
        return logger.log("warn", err);
      }
      res.render("logout.hbs", { nombre });
    });
  } catch (error) {
    logger.log("error", "Hubo un error:" + error);
    res.sendStatus(500);
  }
};

export {
  redirectMain,
  renderLogin,
  renderRegister,
  failLogin,
  failSingup,
  logout,
};
