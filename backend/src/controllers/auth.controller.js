import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "../models/user.model.js"
import Admin from "../models/admin.model.js"
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })

}

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json({ message: "User registered successfully" })
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = generateToken({ id: user._id, role: "user" })


    return res.status(200).json({ token });

}

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
        return res.status(400).json({ message: "Admin not found" })
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = generateToken({ id: admin._id, role: "admin" })

    res.json({ token })
}