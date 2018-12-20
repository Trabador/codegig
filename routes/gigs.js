const express = require('express');
const router = express.Router();
const Gig = require('../models/Gigs');
const uuid = require('uuid');
const Sequelize = require('sequelize');
const Operator = Sequelize.Op;

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

    let errors  = [];

    if(!title){
        errors.push({ text: "Please fill title" });
    }

    if(!technologies){
        errors.push({ text: "Please fill technologies" });
    }

    if(!budget){
        errors.push({ text: "Please fill budget" });
    }

    if(!description){
        errors.push({ text: "Please fill description" });
    }

    if(!contact_email){
        errors.push({ text: "Please fill email" });
    }

    if(errors.length > 0){
        res.render('add', {
            errors,title,technologies,budget,description,contact_email
        });
    }
    else{
        budget = '$'+budget;
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
    }
});

//Search gigs
router.get('/search', (req, res) => {
    //get term data from url
    let { term } = req.query;
    term = term.toLowerCase();

    //find all gigs with technologies that match the term and anything before and after
    Gig.findAll({ where: { technologies: { [Operator.like]: '%'+term+'%' } } })
        .then((gigs) => res.render('search', { gigs }))
        .catch((err) => console.log(err));
});

module.exports = router;