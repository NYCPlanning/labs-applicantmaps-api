const express = require('express');
const Project = require('../models/project');

const router = express.Router();

/* GET /projects/:id */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Project.findById(id, {}, {}, (err, project) => {
    res.send({
      status: 'success',
      project,
    });
  });
});

/* POST /projects */
/* Save a project, creating a new hash */
router.post('/', (req, res) => {
  const { body } = req;

  const project = new Project(body);
  project.save()
    .then(() => {
      res.send({
        status: 'success',
        project,
      });
    })
    .catch(((err) => {
      res.send({
        status: `error: ${err}`,
      });
    }));
});

/* POST /projects/:id */
/* Update a project by id */
router.post('/:id', (req, res) => {
  const { id } = req.params;
  Project.findByIdAndUpdate(
    id,
    {
      $set: req.body,
      $inc: { __v: 1 },
    },
    { new: true },
    (err, project) => {
      if (err) return handleError(err);
      res.send(project);
    },
  );
});

module.exports = router;
