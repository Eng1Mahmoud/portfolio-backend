import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class AuthController {
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: "User already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await User.create({
                email,
                password: hashedPassword,
            });
            res.status(201).json({
                message: "User created successfully",
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = (await User.findOne({ email }));
            if (user && (await bcrypt.compare(password, user.password))) {
                res.status(200).json({
                    message: "You are login successfully!",
                    token: generateToken(user._id.toString()),
                });
            }
            else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
export default new AuthController();
