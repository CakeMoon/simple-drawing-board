const express = require('express');

const Homes = require('../models/Homes');

const router = express.Router();


/**
 * Create a Home or Update a Home of a user.
 * @name POST/api/homes
 * @prop {string} user - user
 * @prop {numbers[]]} x - x
 * @prop {numbers[]]} y - y
 * @return {Home} - the created Home
 */
router.post('/', (req, res) => {
  if (req.body.user.length === 0) {
    res.status(400).json({ message: 'The user name must be at least 1 character.' });
  } else {

    if (Homes.findOne(req.body.user) === undefined) {
      const home = Homes.addOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({home, message: "successfully created!"}).end();
    } else {
      const oldHome = Homes.findOne(req.body.user);
      // Updated!
      const home = Homes.updateOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({home, message: "successfully updated!" }).end();
    }
  }
  });


module.exports = router;