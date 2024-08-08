const mongoose = require('mongoose');

const KanbanSchema = new mongoose.Schema({
  title: String,
  columns: [
    {
      name: String,
      tasks: [
        {
          title: String,
          description: String,
          status: String,
          priority: String,
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Kanban', KanbanSchema);
