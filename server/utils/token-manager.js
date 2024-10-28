import jwt from 'jsonwebtoken';

export default function createToken(id) {
    const payload = id;
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
}


// Authentication middleware

export function authenticate(req, res, next) {

    const token = req.cookies.token;
    console.log(token)
    try {
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "You need an account to view this page" });
                }
                next();
            })
        }
    } catch (error) {
        return res.status(401).json({ message: "You need an account to view this page" });

    }
}