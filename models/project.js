const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  meta: {
    type: Object,
    required: true,
  },
  layouts: {
    type: Array,
    required: true,
  },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
