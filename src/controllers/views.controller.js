import passport from 'passport'

export const loginVW = (req, res) => {
    if(req.session?.user) {
        return res.redirect('/profile')
    }
    res.render('login', {})
};

export const signupVW = (req, res) => {
    if(req.session?.user) {
        return res.redirect('/profile')
    }
    res.render('signup', {})
};

export function authAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user) {

        if (req.user.role === 'admin') {
            return next();  
        } else {
            res.status(403).send('No tienes permisos de administrador');
        }
    } else {
        res.redirect('/login');
    }
}

export const getLogin = (req, res) => {
    if (req.isAuthenticated() && req.user) {
        const user = req.user;
        res.render('profile', user);
    } else {
        res.redirect('/login');
    }
};

export const getLoginGIT = async () => { passport.authenticate('github', {scope: ['user:email']})};

export const getCallBackGIT = async () => { passport.authenticate('github', {failureRedirect: '/'})};

export const callBackGIT = async(req, res) => {
    console.log('Callback: ', req.user)
    req.session.user = req.user

    console.log(req.session)
    res.redirect('/')
}

export function authErr(req, res, next) {
    if(req.session?.user) next()

    return res.status(401).send('Auth error')
}