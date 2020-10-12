const express = require('express');

const Desks = require('../models/Desks');

const router = express.Router();

validateEmail = function(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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
  }  else if (validateEmail(req.body.user)){

    if (Desks.findOne(req.body.user) === undefined) {
      const desk = Desks.addOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({desk, message: req.body.user + '\'s home is ' + "successfully created!"}).end();
      // console.log('POST/api/desks');
      // console.log({desk, message: "successfully created!"});
    } else {
      const oldDesk = Desks.findOne(req.body.user);
      // Updated!
      const desk = Desks.updateOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({desk, message: req.body.user + '\'s home is ' + "successfully updated!" }).end();
      // console.log('POST/api/desks');
      // console.log({desk, message: "successfully created!"});
    }
  } else {
    res.status(400).json({ message: 'Please enter a valid email.' });
  }
  });


module.exports = router;