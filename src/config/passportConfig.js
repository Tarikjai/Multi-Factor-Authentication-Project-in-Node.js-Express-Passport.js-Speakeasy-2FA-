import passport from "passport";
import { Strategy as LocalStrategy  } from "passport-local";
import bcrypt from  'bcrypt'
import User from  "../models/user.js"

passport.use(new LocalStrategy(async(username, password, done)=> {
      
        try {
            const user = await User.findOne({username})
            if(!user) return done(null, false , {message: "User not found"})
               
                const isMatch = await bcrypt.compare(password , user.password)
            if (isMatch) return done(null, user)
            else return done(null, false, {message: "incorrect password"})

        } catch (error) {
            return done(error)
        }
    }
  ));

  passport.serializeUser((user, done) => {
    console.log("We are inside serializeUser");
    done(null, user._id);  // Sérialise l'ID de l'utilisateur
});

passport.deserializeUser(async (_id, done) => {
    try {
        console.log("We are inside deserializeUser");
        const user = await User.findById(_id);  // Recherche de l'utilisateur par ID
        done(null, user);  // Désérialise en renvoyant l'utilisateur complet
    } catch (error) {
        done(error);  // Gère les erreurs éventuelles
    }
});
