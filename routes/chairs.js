const express = require('express');

const Chairs = require('../models/Chairs');

const router = express.Router();

validateEmail = function(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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
  } else if (validateEmail(req.body.user)){

    if (Chairs.findOne(req.body.user) === undefined) {
      const chair = Chairs.addOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({chair, message: req.body.user + '\'s home is ' + "successfully created!"}).end();
    //   console.log('POST/api/chairs');
    //   console.log({chair, message: "successfully created!"});
    } else {
      const oldChair = Chairs.findOne(req.body.user);
      // Updated!
      const chair = Chairs.updateOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({chair, message: req.body.user + '\'s home is ' + "successfully updated!" }).end();
      // console.log('POST/api/chairs');
      // console.log({chair, message: "successfully created!"});
    }
  } else {
    res.status(400).json({ message: 'Please enter a valid email.' });
  }
  });


module.exports = router;