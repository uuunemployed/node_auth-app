import jsonwebtoken from 'jsonwebtoken';

const SECRET = process.env.JWT_KEY;
const REFRESH_SECRET = process.env.JWT_REFRESH_KEY;

function generateAccessToken(user) {
  return jsonwebtoken.sign(user, SECRET, { expiresIn: '10m' });
}

function validateAccessToken(token) {
  try {
    return jsonwebtoken.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}

function generateRefreshToken(user) {
  return jsonwebtoken.sign(user, REFRESH_SECRET, { expiresIn: '7d' });
}

function validateRefreshToken(token) {
  try {
    return jsonwebtoken.verify(token, REFRESH_SECRET);
  } catch (error) {
    return null;
  }
}

export const jwtService = {
  generateAccessToken,
  validateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
};
