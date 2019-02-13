/* eslint-disable no-use-before-define */
const express = require('express');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const secret = 'mykey';

const router = express.Router();

const User = require('./../models/user');
const UserNoSQL = require('./../modelsNoSQL/user');
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
  const hash = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');

  const user = await User.create({
    username,
    password: hash,
  });

  const userNoSql = new UserNoSQL({
    _id: user.id,
    username: user.username,
    password: hash,
  });

  await userNoSql.save();

  res.json({ status: 200 });
}

async function HandleLoginUser(req, res) {
  const { password, username } = req.params;
  const user = await User.findOne({ where: { username } });
  const hash = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');

  if (user) {
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
}

async function HandleDeleteUser(req, res) {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (user) {
    await user.destroy();
    await UserNoSQL.findOneAndRemove({
      _id: id,
    });

    res.json({
      success: true,
      message: 'Deleted',
    });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

module.exports = router;
