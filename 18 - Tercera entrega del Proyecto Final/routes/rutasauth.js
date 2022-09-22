import { Router } from "express";
import passport from "passport";
import User from "../src/models/models.js";
import multer from "multer";
import { registerStrategy, loginStrategy } from "../src/auth/passport.js";
import path from "path";
import { getUserData, submitOrder } from "../controllers/userController.js";

const router = Router();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

router.get("/", checkAuthentication, (req, res) => {
  res.redirect("/main");
});

router.get("/login", (req, res) => {
  res.render("login.hbs");
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/main", checkAuthentication, getUserData);

router.get("/submitorder", checkAuthentication, submitOrder);

router.get("/register", (req, res) => {
  res.render("register.hbs");
});

router.post(
  "/register",
  upload.single("myFile"),
  passport.authenticate("register", { failureRedirect: "/failsignup" }),
  (req, res, next) => {
    res.render("login.hbs");
  }
);

router.get("/faillogin", (req, res) => {
  res.render("faillogin.hbs");
});

router.get("/failsignup", (req, res) => {
  res.render("failregister.hbs");
});

router.get("/logout", checkAuthentication, async (req, res) => {
  const nombre = req.user.firstname;
  req.logout((err) => {
    if (err) {
      return logger.log("warn", err);
    }
    res.render("logout.hbs", { nombre });
  });
});

export default router;
