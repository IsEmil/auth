import express from "express";
import bcrypt from "bcrypt";

import UserModel from '../schema/User.js';

/**
 * Endpoint used to register a user
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export default async function (req, res) {
    if (!req.body["username"] && !req.body["password"]) {
        return res.status(404).json({ status: 404, message: "Missing username and password" });
    }

    let { username, password } = req.body;

    const user = await UserModel.findOne({
        username: new RegExp(["^", username, "$"].join(""), "i"),
    }).exec();

    if (!user) {
        return res.status(404).json({ status: 404, message: "Invalid username or password" });
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
        return res.status(404).json({ status: 404, message: "Invalid username or password" });
    }

    req.session.user = user._id;

    return res.status(200).json({ status: 200, message: "Success" });
}