const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const avatarURL = gravatar.url(email);
    if (user) {
        throw new Conflict("Email in use");
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({
        email,
        password: hashPassword,
        avatarURL,
    });
    res.status(201).json({
        status: "success",
        code: 201,
        user: {
            email,
            subscription: result.subscription,
            avatarURL,
        },
    });
};

module.exports = register;
