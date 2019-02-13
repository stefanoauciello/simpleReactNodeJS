/* eslint-disable no-use-before-define */
const express = require('express');

const router = express.Router();

const Role = require('./../models/role');
const RoleNoSQL = require('./../modelsNoSQL/role');
const Authentication = require('./../authentication');

router.post('/', Authentication, HandleCreateRole);
router.delete('/:id', Authentication, HandleDeleteRole);

async function HandleCreateRole(req, res) {
  const { name } = req.body;

  const role = await Role.create({ name });

  const roleNoSql = new RoleNoSQL({
    _id: role.id,
    name: role.name,
  });

  await roleNoSql.save();

  res.json({ status: 200 });
}

async function HandleDeleteRole(req, res) {
  const { id } = req.params;
  const role = await Role.findOne({ where: { id } });

  if (role) {
    await role.destroy();
    await RoleNoSQL.findOneAndRemove({
      _id: id,
    });

    res.json({
      success: true,
      message: 'Deleted',
    });
  } else {
    res.status(404).json({ error: 'Role not found' });
  }
}

module.exports = router;
