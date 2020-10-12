const express = require('express');

const Cameras = require('../models/Cameras');

const router = express.Router();

validateEmail = function(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Create a Camera or Update a Camera of a user.
 * @name POST/api/cameras
 * @prop {string} user - user
 * @prop {numbers[]]} x - x
 * @prop {numbers[]]} y - y
 * @return {Camera} - the created Camera
 */
router.post('/', (req, res) => {
  if (req.body.user.length === 0) {
    res.status(400).json({ message: 'The user name must be at least 1 character.' });
  } else if (validateEmail(req.body.user)){

    if (Cameras.findOne(req.body.user) === undefined) {
      const camera = Cameras.addOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({camera, message: req.body.user + '\'s home is ' + "successfully created!"}).end();
      // console.log('POST/api/cameras');
      // console.log({camera, message: "successfully created!"});
    } else {
      const oldCamera = Cameras.findOne(req.body.user);
      // Updated!
      const camera = Cameras.updateOne(req.body.user, req.body.x, req.body.y);
      res.status(200).json({camera, message: req.body.user + '\'s home is ' + "successfully updated!" }).end();
      // console.log('POST/api/cameras');
      // console.log({camera, message: "successfully updated!" });
    }
  } else {
    res.status(400).json({ message: 'Please enter a valid email.' });
  }
  });


module.exports = router;