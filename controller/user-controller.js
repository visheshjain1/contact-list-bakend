import User from '../model/user.js';
import Login from '../model/login.js';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await Login.findOne({ email });
        if (user) {
            res.status(400)
                .json({ success: false, message: "User already exists" });
            return
        }
        user = new Login(req.body);
        try {
            await user.save();
        } catch (error) {
            res.status(409).json({ message: error.message });
            return
        }



        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            domain: 'localhost',
            samesite: 'none',
            httpOnly: false,
            secure: false
        };
        console.log('here' + token)
        if (token) {
            res.status(201).cookie("token", token, options).json({
                success: true,
                user,
                token,
            });
        }
        return

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        return
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Login.findOne({ email })
            .select("+password");

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User does not exist",
            });
            return
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
            return
        }

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        };
        if (token) {
            console.log('vishesh1 ' + token)
            res.status(201).cookie("token", token, options).json({
                success: true,
                user,
                token,
            });
        }
        return
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        return
    }
};


// Get all users
export const getUsers = async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json(users);
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

// Save data of the user in database
export const addUser = async (request, response) => {
    const user = request.body;

    const newUser = new User(user);
    try {
        await newUser.save();
        response.status(201).json(newUser);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

// Get a user by id
export const getUserById = async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        response.status(200).json(user);
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

// Save data of edited user in the database
export const editUser = async (request, response) => {
    let user = request.body;

    const editUser = new User(user);
    try {
        await User.updateOne({ _id: request.params.id }, editUser);
        response.status(201).json(editUser);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

// deleting data of user from the database
export const deleteUser = async (request, response) => {
    try {
        await User.deleteOne({ _id: request.params.id });
        response.status(201).json("User deleted Successfully");
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}