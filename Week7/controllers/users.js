const User = require('../models/user'); 

const getProfile = (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.render('profile', { user: req.oidc.user });
    } else {
        res.redirect('/login'); 
    }
};

const getUsers = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'An error occurred', error: err });
        });
};

module.exports = { getProfile, getUsers };
