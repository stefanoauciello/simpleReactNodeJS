/* eslint-disable no-use-before-define */
const express = require('express');

const router = express.Router();

const Role = require('./../models/role');
const Authentication = require('./../authentication');

router.post('/', Authentication, HandleCreateRole);
router.delete('/:id', Authentication, HandleDeleteRole);

async function HandleCreateRole(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name not found' });
  }
  const role = await Role.create({ name });
  res.status(200).json(role);
}

async function HandleDeleteRole(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'id not found' });
  }
  const role = await Role.findOne({ where: { id } });
  if (!role) {
    return res.status(404).json({ error: 'Role not found' });
  }

  await role.destroy();
  return res.status(200).json({
    success: true,
    message: 'Deleted',
  });
}

module.exports = router;
