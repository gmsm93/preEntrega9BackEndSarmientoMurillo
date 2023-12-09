import UserModel from '../models/user.model.js';
import passport from "passport";
import { createHash } from "../utils.js";

export const createUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await UserModel.findOne({ email });
    
        if (existingUser) {
          return res.status(400).json({ message: 'El usuario ya existe' });
        }
    
        const newUser = new UserModel({
          email,
          password: createHash(password),
          role: email === 'adminCoder@coder.com' ? 'admin' : 'usuario'
        });
    
        await newUser.save();
    
        return res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el registro' });
    }
    
};

export const authUser = async (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error en el inicio de sesión' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        req.logIn(user, (err) => {
            if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error en el inicio de sesión' });
            }

            console.log(req.session.user);
            res.redirect('/profile');
        });
    })(req, res, next);
};

export const turnOffUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al cerrar sesión' });
        } else {
        res.redirect('/login');
        }
    });
};

export const authUserGIT = async () => {
    passport.authenticate('github', { scope: ['user:email'] })
};

export const turnOffUserGIT = async () => {
    passport.authenticate('github', { failureRedirect: '/' })
};

export const callBackGIT = async (req, res) => {
    console.log('Callback: ', req.user);
    req.session.user = req.user;

    console.log(req.session);
    res.redirect('/');
};