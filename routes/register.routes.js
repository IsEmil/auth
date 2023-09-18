import express from "express";
import bcrypt from "bcrypt";

import UserModel from '../schema/User.js';

/**
 * Endpoint used to login a user
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export default async function (req, res) {
    if (!req.body["username"] && !req.body["password"]) {
        return res.status(404).json({ status: 404, message: "Missing username and password" });
    }

    let { username, password } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ status: 400, message: "Password must be at least 6 characters" });
    }

    if (password.length > 1024) {
        return res.status(400).json({ status: 400, message: "Password cannot be longer than 1024 characters" });
    }

    const user = await UserModel.findOne({
        $or: [
            {
                username: new RegExp(["^", username, "$"].join(""), "i"),
            },
        ],
    }).exec();

    if (user) {
        return res.status(400).json({ status: 400, message: "Username is taken" });
    }

    const { rounds } = config.bcrypt;
    const hash = bcrypt.hashSync(password, rounds);

    const userRecord = new UserModel({
        username: username,
        password: hash,
    });

    await userRecord.save();

    req.session.user = userRecord._id;

    return res.status(200).json({ status: 200, message: "Success" });
}
