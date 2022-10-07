import { Router } from "express";
import passport from "passport";
import { loginStrategy, registerStrategy } from "../src/auth/passport.js";
import User from "../src/models/user.model.js";
import { checkAuthentication } from "../src/utils/aux.functions.js";
import {
  failLogin,
  failSingup,
  logout,
  redirectMain,
  renderLogin,
  renderMain,
  renderRegister,
} from "../controllers/auth.controller.js";

const router = Router();


passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

router.get("/", checkAuthentication, redirectMain);

router.get("/login", renderLogin);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  redirectMain
);

router.get("/register", renderRegister);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failsignup" }),
  renderLogin
);

router.get("/faillogin", failLogin);
router.get("/failsignup", failSingup);

router.get("/index", checkAuthentication, renderMain)

router.get("/logout", checkAuthentication, logout);

export default router;
