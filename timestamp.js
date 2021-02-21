const express = require('express'),
      timestamp  = express.Router();

const digitOnlyRegEx = /^\d*$/g

timestamp.get('/', ( req, res ) => {
    res.send('timestamp router is working');
})

timestamp.get('/:date', ( req, res ) => {
    let par     = req.params.date,
        date    = null;
        isDigit =  digitOnlyRegEx.test(par),
        utc     = null,
        unix    = 0,
        dateUtc = "";


    date    = new Date(par),
    dateUtc = date.toUTCString();

    if ( dateUtc !== "Invalid Date") {
        console.log('Not Invalid Date');
        unix    = Math.floor(Date.parse(par) / 1000);

        return res.json({ utc: dateUtc, unix: unix });
    }
    if ( isDigit ) {
        console.log('Is digit');
        let utc = new Date( parseInt(par) );

        return res.json( { utc: utc, unix: par } );
    };
    console.log('error: Invalid Date');

    return res.json({error: "Invalid Date"});
});

module.exports = timestamp;