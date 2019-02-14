/* eslint-disable no-use-before-define */
const express = require('express');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const secret = 'mykey';

const router = express.Router();

const User = require('./../models/user');
const Authentication = require('./../authentication');

router.get('/all', Authentication, HandleAllUsers);
router.post('/', HandleCreateUser);
router.get('/login/:username/:password', HandleLoginUser);
router.delete('/:id', Authentication, HandleDeleteUser);

async function HandleAllUsers(req, res) {
  const users = await User.findAll();
  res.json(users);
}

async function HandleCreateUser(req, res) {
  const { password, username } = req.body;
  if (!password || !username) {
    return res.status(400).json({ error: 'password or username not found' });
  }
  const hash = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');

  const user = await User.create({
    username,
    password: hash,
  });
  res.status(200).json(user);
}

async function HandleLoginUser(req, res) {
  const { password, username } = req.params;
  if (!password || !username) {
    return res.status(400).json({ error: 'password or username not found' });
  }
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }
  const hash = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');

  if (hash !== user.password) {
    return res.status(400).json({ error: 'Wrong Password or Username' });
  }

  const token = jwt.sign({ username }, secret, { expiresIn: '24h' });
  return res.status(200).json({
    success: true,
    message: 'Authentication successful!',
    token,
  });
}

async function HandleDeleteUser(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'id not found' });
  }
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }


  const destroyed = await user.destroy();
  res.status(200).json({
    destroyed,
    message: 'Deleted',
  });
}

module.exports = router;
