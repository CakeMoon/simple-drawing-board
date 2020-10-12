const express = require('express');

const Desks = require('../models/Desks');

const router = express.Router();


/**
 * Create a Desk or Update a Desk of a user.
 * @name POST/api/desks
 * @prop {string} user - user
 * @prop {numbers[]]} x - x
 * @prop {numbers[]]} y - y
 * @return {Desk} - the created Desk
 */
router.post('/', (req, res) => {
  if (req.body.user.length === 0) {
    res.status(400).json({ message: 'The user name must be at least 1 character.' });
  } else {

    if (Desks.findOne(req.body.user) === undefined) {
      const desk = Desks.addOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({desk, message: "successfully created!"}).end();
    } else {
      const oldDesk = Desks.findOne(req.body.user);
      // Updated!
      const desk = Desks.updateOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({desk, message: "successfully updated!" }).end();
    }
  }
  });


module.exports = router;