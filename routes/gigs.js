const express = require('express');
const router = express.Router();
const Gig = require('../models/Gigs');
const uuid = require('uuid');

//List All
router.get('/', (req, res) => {
    Gig.findAll()
        .then((gigs) => {
            res.render('gigs', {
                gigs //send database fetched rows to the view
            });
        })
        .catch((err) => console.log(err));
});

//Add new Form
router.get('/add', (req, res) => {
    res.render('add');
});

//Add new
router.post('/add', (req, res) => {
    let { title, technologies, budget, description, contact_email } = req.body;
    let id = uuid.v4();

    Gig.create({
        id,
        title,
        technologies,
        description,
        budget,
        contact_email
    })
        .then((gig) => res.redirect('/gigs'))
        .catch((err) => console.log(err));
});

module.exports = router;