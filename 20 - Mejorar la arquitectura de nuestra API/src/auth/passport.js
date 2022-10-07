import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import LocalPass from "passport-local";
import UserClass from "../classes/user.class.mongo.js";
const LocalStrategy = LocalPass.Strategy;

const UserLocal = UserClass.getInstance(User)

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const existingUser = await UserLocal.findById(username);

      if (existingUser) {
        return done(null, null);
      }

      const newUser = {
        username,
        password: hashPassword(password),
      };

      const createdUser = await UserLocal.insert(newUser);

      done(null, createdUser);
    } catch (err) {
      console.log("Error registrando usuario", err);
      done("Error en registro", null);
    }
  }
);

const loginStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await UserLocal.findById(username);

    if (!user || !isValidPassword(password, user.password)) {
      return done(null, null);
    }

    done(null, user);
  } catch (err) {
    console.log("Error login", err);
    done("Error login", null);
  }
});

export { registerStrategy, loginStrategy };
