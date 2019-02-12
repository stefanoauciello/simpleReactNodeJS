/* eslint-disable no-use-before-define */
const express = require('express');
const jwt = require('jsonwebtoken');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

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

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("simpleReactNodeJS");
        const myobj = {username, password: hash};
        dbo.collection("user").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 user inserted in MongoDB");
            db.close();
        });
    });

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
