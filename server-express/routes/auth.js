const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----
`;
const saltRounds = 10;
router.use(function(req, res, next) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            req.hashedPassword = hash;
            next();
    });
});
})

router.post("/login", async function (req, res, next) {
    if (req.body.username && req.body.password) {
        const user = await User.findOne()
            .where("username")
            .equals(req.body.username)
            .exec();

        if (user) {
            return bcrypt
                .compare(req.body.password, user.password)
                .then((result) => {
                    if (result === true) {
                        const token = jwt.sign({ id: user._id }, privateKey, {
                            algorithm: "RS256",
                        });
                        return res.status(200).json({ access_token: token });
                    } else {
                        return res.status(401).json({ error: "Invalid credentials." });
                    }
                })
                .catch((error) => {
                    return res.status(500).json({ error: error.message });
                });
        }
        return res.status(401).json({ error: "Invalid credentials." });
    } else {
        res.status(400).json({ error: "Username or Password Missing" });
    }
});
   
router.post("/register", async function (req, res, next) {
    if (req.body.username && req.body.password && req.body.passwordConfirmation) {
        if (req.body.password === req.body.passwordConfirmation) {
            const user = new User({
                username: req.body.username,
                password: req.hashedPassword,
        });
        return await user
            .save()
            .then((savedUser) => {
                return res.status(201).json({
                    id: savedUser._id,
                    username: savedUser.username,
                });
            })
            .catch((error) => {
                return res.status(500).json({ error: error.message });
            });
        }
        res.status(400).json({ error: "Passwords not matching" });
    } else {
        res.status(400).json({ error: "Username or Password Missing" });
    }
});
   
module.exports = router;