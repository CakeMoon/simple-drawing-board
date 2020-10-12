const express = require('express');

const Others = require('../models/Others');

const router = express.Router();

validateEmail = function(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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
  } else if (validateEmail(req.body.user)){

    if (Others.findOne(req.body.user) === undefined) {
      const other = Others.addOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({other, message: req.body.user + '\'s home is ' + "successfully created!"}).end();
      // console.log('POST/api/others');
      // console.log({other, message: "successfully updated!" });
    } else {
      const oldOther = Others.findOne(req.body.user);
      // Updated!
      const other = Others.updateOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({other, message: req.body.user + '\'s home is ' + "successfully updated!" }).end();
      // console.log('POST/api/others');
      // console.log({other, message: "successfully updated!" });
    }
  } else {
    res.status(400).json({ message: 'Please enter a valid email.' });
  }
  });


module.exports = router;