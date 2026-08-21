import crypto from 'crypto';
import jwt from 'jsonwebtoken';

//generates the JWT token using secret signature
const generateAccessToken = (payload) => {
    jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m'
    })
}

//varifies the token using the secret again
const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
}

const generateRefreshToken = (payload) => {
    jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    })
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
}

const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest("hex")

    return { rawToken, hashedToken };
}

export {
    generateResetToken,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}