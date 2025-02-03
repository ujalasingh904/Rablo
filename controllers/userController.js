import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { generateTokenandSetCookie } from "../utils/generateToken.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const registerUser = async (req, res) => {
    const { username, email, password, role, profilePicture } = req.body;


    try {
        if (!username || !email || !password) {
            return res.status(500).json("please provide all the details");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json("User with this email already exist");
        }

        const UserwithSameUsername = await User.findOne({ username });

        if (UserwithSameUsername) {
            return res.status(400).json("User with this username already exist");
        }


        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            username, email,
            password: hashedPassword,
            role: role || "user",
            profilePicture: profilePicture || ""
        })

        if (!newUser) {
            return res.status(500).json("new user not created");
        }

        generateTokenandSetCookie(newUser._id, res)

        await newUser.save();

        const { password: hashedPassword2, ...rest } = newUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        console.log("error at register controller", error);
        res.status(500).json("Internal server error");
    }

}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password")
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: "Error updating user", error: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message })
    }
}

export const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        const user = await User.findByIdAndUpdate(req.params.id, { profilePicture: req.file.path }, { new: true }).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({ message: "Profile picture uploaded successfully", user })
    } catch (error) {
        res.status(500).json({ message: "Error uploading profile picture", error: error.message })
    }
}

