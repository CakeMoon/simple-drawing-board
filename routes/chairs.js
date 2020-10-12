const express = require('express');

const Chairs = require('../models/Chairs');

const router = express.Router();


/**
 * Create a Chair or Update a Chair of a user.
 * @name POST/api/chairs
 * @prop {string} user - user
 * @prop {numbers[]]} x - x
 * @prop {numbers[]]} y - y
 * @return {Chair} - the created Chair
 */
router.post('/', (req, res) => {
  if (req.body.user.length === 0) {
    res.status(400).json({ message: 'The user name must be at least 1 character.' });
  } else {

    if (Chairs.findOne(req.body.user) === undefined) {
      const chair = Chairs.addOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({chair, message: "successfully created!"}).end();
    } else {
      const oldChair = Chairs.findOne(req.body.user);
      // Updated!
      const chair = Chairs.updateOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({chair, message: "successfully updated!" }).end();
    }
  }
  });


module.exports = router;