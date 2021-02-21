const express   = require('express'),
      timestamp = express.Router();

const digitOnlyRegEx = /^\d*$/g

timestamp.get('/:date?', ( req, res ) => {
    let str     = req.params.date,
        date    = null,
        isDigit =  digitOnlyRegEx.test(str);

    // date is not a string
    if ( !str ) {
      date = new Date();
    } else {

      // date is number
      if ( isDigit ) {
        console.log('Is digit');
        date = new Date( parseInt(str) );
        
        // date is string
      } else {
        console.log('is valid string');
        date = new Date(str);
      };
    };

    // if date can not be parsed by Date.parse()
    if ( date.toString() === "Invalid Date") {
      console.log('error: Invalid Date'); 
      res.json( { error: date.toString() } );
      
      // respond with valid json
    } else {
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }

});

module.exports = timestamp;