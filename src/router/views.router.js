import { Router } from 'express'
import {loginVW, signupVW, authAdmin, getLogin, getLoginGIT, getCallBackGIT, callBackGIT, authErr } from "../controllers/views.controller.js"

const router = Router()

router.get('/', (req, res) => {
    res.render('index', {})
})

router.get('/login', loginVW)

router.get('/signup', signupVW)

router.get('/profile', authAdmin, getLogin);

router.get('/logins', (req, res) => {
    res.render('logins', {})
})

router.get('/login-github',
    getLoginGIT,
    async (req, res) => {}
)

router.get('/githubcallback',
    getCallBackGIT,
    callBackGIT
)

router.get('/private', authErr, (req, res) => {
    res.json(req.session.user)
})

export default router