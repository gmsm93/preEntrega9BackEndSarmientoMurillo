import { Router } from "express";
import {createUser, authUser, turnOffUser, authUserGIT, turnOffUserGIT, callBackGIT } from "../controllers/user.controller.js"

const router = Router();

router.post('/signup', createUser);

router.post('/login', authUser);

router.get('/logout', turnOffUser);

router.get(
  '/login-github', 
  authUserGIT,
  async (req, res) => {}
);

router.get(
  '/githubcallback', 
  turnOffUserGIT,
  callBackGIT
);

router.get('/create', (req, res) => {
  res.render('user/create');
});

router.post('/create', createUser);

export default router;