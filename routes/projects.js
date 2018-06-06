const express = require('express');
const shortid = require('shortid');
const Project = require('../models/project');

const router = express.Router();

/* GET /projects/:id */
/* Retreive a single project */

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Project.findById(id, {}, {}, (err, project) => {
    res.send(project);
  });
});

/* POST /projects */
/* Save a project, creating a new hash */
router.post('/', (req, res) => {
  const { body } = req;

  const project = new Project(body);
  project._id = shortid.generate(); // eslint-disable-line
  project.save()
    .then(() => {
      res.send(project);
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
    },
    { new: true },
    (err, project) => {
      if (err) return handleError(err);
      res.send(project);
    },
  );
});

module.exports = router;
