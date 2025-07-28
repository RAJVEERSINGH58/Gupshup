import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Generate a token
export const  generateToken = (payload)=> {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES});
}

// Verify a token
export const verifyToken = (token)=> {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null; // or throw error if preferred
  }
}

// Decode token without verifying (optional use)
export const decodeToken = (token)=> {
  return jwt.decode(token);
}

