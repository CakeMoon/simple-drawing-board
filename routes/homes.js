const express = require('express');

const Homes = require('../models/Homes');

const router = express.Router();

validateEmail = function(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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
  } else if (validateEmail(req.body.user)){

    if (Homes.findOne(req.body.user) === undefined) {
      const home = Homes.addOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({home, message: req.body.user + '\'s home is ' + "successfully created!"}).end();
      // console.log('POST/api/homes');
      // console.log({home, message: req.body.user + '\'s home is ' + "successfully created!"});
    } else {
      const oldHome = Homes.findOne(req.body.user);
      // Updated!
      const home = Homes.updateOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({home, message: req.body.user + '\'s home is ' + "successfully updated!" }).end();
      // console.log('POST/api/homes');
      // console.log({home, message: req.body.user + '\'s home is ' + "successfully created!"});
    }
  } else {
    res.status(400).json({ message: 'Please enter a valid email.' });
  }
  });


module.exports = router;