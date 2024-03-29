import UserModel from '../models/user.model.js';
import passport from "passport";
import { createHash } from "../utils.js";
import { UserDTO } from '../dto/user.dto.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

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

export const getCurrentUser = (req, res) => {

    const user = req.user;

    const userDTO = new UserDTO(user.email, user.username);

    res.json(userDTO);
};

export const getUserById = (req, res) => {
  const userId = req.params.id;

  const user = UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const userDTO = new UserDTO(user.id, user.email);
  res.status(200).json(userDTO);
};


export const updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  const updatedUser = UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });

  if (!updatedUser) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const userDTO = new UserDTO(updatedUser.id, updatedUser.email);
  res.status(200).json(userDTO);
};

export const deleteUser = (req, res) => {
  const userId = req.params.id;

  const deletedUser = UserModel.findByIdAndDelete(userId);

  if (!deletedUser) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.status(200).json({ message: 'Usuario eliminado correctamente' });
};


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña',
    },
});

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

        await user.save();


        const resetURL = `http://tu-sitio.com/reset/${token}`;


        const mailOptions = {
            from: 'tu_correo@gmail.com',
            to: user.email,
            subject: 'Restablecimiento de Contraseña',
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetURL}`,
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error al enviar el correo' });
            }
            console.log(`Correo enviado: ${info.response}`);
            res.json({ message: 'Correo enviado con éxito' });
        });


        res.redirect('/reset/success');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al procesar la solicitud de restablecimiento de contraseña' });
    }
};
