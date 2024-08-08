const express = require('express');
const Kanban = require('../database/kanbanModel');

const router = express.Router();

router.get('/', async (req, res) => {
  const kanbans = await Kanban.find();
  res.json(kanbans);
});

router.post('/', async (req, res) => {
  const kanban = new Kanban(req.body);
  await kanban.save();
  res.status(201).json(kanban);
});

router.put('/:id', async (req, res) => {
  const kanban = await Kanban.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(kanban);
});

router.delete('/:id', async (req, res) => {
  await Kanban.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
