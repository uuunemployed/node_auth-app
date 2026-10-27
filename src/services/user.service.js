import { ApiError } from '../exeptions/api.error.js';
import { User } from '../models/user.js';
import { emailService } from './email.service.js';
import { v4 as uuidv4 } from 'uuid';

function validateName(name) {
  if (!name) {
    return 'Name is required';
  }

  if (name.length < 2) {
    return 'Name is sort';
  }
}

function validateEmail(email) {
  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!email) {
    return 'Email is required';
  }

  if (!emailPattern.test(email)) {
    return 'Email is not valid';
  }
}

function validatePassword(password) {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'At least 6 characters';
  }
}

function normalize({ id, name, email }) {
  return { id, name, email };
}

function findByEmail(email) {
  return User.findOne({ where: { email } });
}

async function register(name, email, password) {
  const activationToken = uuidv4();

  const existUser = await findByEmail(email);

  if (existUser) {
    throw ApiError.notFound();
  }

  const user = await User.create({
    name,
    email,
    password,
    activationToken,
  });

  emailService.sendActivationEmail(email, activationToken);

  return user;
}

export const userService = {
  validateName,
  validateEmail,
  validatePassword,
  normalize,
  findByEmail,
  register,
};
