const express = require('express');
const { Validator, ValidationError } = require('express-json-validator-middleware');
const shortid = require('shortid');
const Project = require('../models/project');


const router = express.Router();

/* GET /projects */
router.get('/', (req, res, next) => {
  res.json({
    hello: shortid.generate(),
  });
});

/* POST /projects */
/* Save a project, creating a new hash */
router.post('/', (req, res) => {
  const { body } = req;

  const id = shortid.generate();

  const config = { id, ...body };
  const project = new Project(config);
  project.save()
    .then(({ _id: id }) => {
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

module.exports = router;
