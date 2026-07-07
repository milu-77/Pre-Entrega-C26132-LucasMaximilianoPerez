import { generateToken } from '../utils/token.generator.js';
const default_user = {
    id: 1,
    email: "admin@gmail.com",
    password: "123456"
}

export async function login(req, res) {
    const { email, password } = req.body;
    console.log(req.body )
     
    const user = { id: 1, email };
    if (email === default_user.email
        && password === default_user.password) {
        const token = generateToken(user);
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
}