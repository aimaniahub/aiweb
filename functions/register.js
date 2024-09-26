// /functions/register.js
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
let User;

async function connectToDatabase() {
    if (!User) {
        const db = await mongoose.connect('your-mongodb-connection-string', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const userSchema = new mongoose.Schema({
            username: String,
            password: String,
        });
        User = mongoose.model('User', userSchema);
    }
}

exports.handler = async function (event) {
    try {
        await connectToDatabase();
        const { username, password } = JSON.parse(event.body);

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'User already exists' }),
            };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User registered successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Registration failed' }),
        };
    }
};
