const mongoose = require('mongoose');
const shortid = require('shortid');

const ProjectSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: shortid.generate(),
  },
  meta: {
    type: Object,
    required: true,
  },
  maps: {
    type: Array,
    required: true,
  },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
