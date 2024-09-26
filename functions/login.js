// /functions/login.js
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

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid credentials' }),
            };
        }

        // Check password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid credentials' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login successful' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Login failed' }),
        };
    }
};
