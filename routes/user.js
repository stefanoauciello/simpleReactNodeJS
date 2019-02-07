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

async function HandleAllUsers(req, res, next) {
  const users = await User.findAll();
  res.json(users);
}

async function HandleCreateUser(req, res, next) {
  const { password, username } = req.body;
  const hash = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');


  User.create({
    username,
    password: hash,
  });
  res.json({ status: 200 });
}

async function HandleLoginUser(req, res, next) {
  const { password, username } = req.params;
  const user = await User.findOne({ where: { username } });
  const hash = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');

  if (hash === user.password) {
    const token = jwt.sign({ username }, secret, { expiresIn: '24h' });
    res.json({
      success: true,
      message: 'Authentication successful!',
      token,
    });
  } else {
    res.status(403).send('Wrong Password or Username');
  }
}

module.exports = router;
