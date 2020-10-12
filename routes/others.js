const express = require('express');

const Others = require('../models/Others');

const router = express.Router();


/**
 * Create a Other or Update a Other of a user.
 * @name POST/api/others
 * @prop {string} user - user
 * @prop {numbers[]]} x - x
 * @prop {numbers[]]} y - y
 * @return {Other} - the created Other
 */
router.post('/', (req, res) => {
  if (req.body.user.length === 0) {
    res.status(400).json({ message: 'The user name must be at least 1 character.' });
  } else {

    if (Others.findOne(req.body.user) === undefined) {
      const other = Others.addOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({other, message: "successfully created!"}).end();
    } else {
      const oldOther = Others.findOne(req.body.user);
      // Updated!
      const other = Others.updateOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({other, message: "successfully updated!" }).end();
    }
  }
  });


module.exports = router;