//Mounted at '/cryptids'
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Index - Get route
router.get('/', (req, res) => {
    //get all cryptids, pass to page
    let allCryptids = fs.readFileSync('./cryptids.json');
    let cryptidsData = JSON.parse(allCryptids);

    res.render('cryptids/index', { cryptids: cryptidsData });
});

// New - Get route
router.get('/new', (req, res) => {
    res.render('cryptids/new');
});


// Create - Post route
router.post('/', (req, res) => {
    console.log('BIGFOOOOOTTTTTTTT');
    console.log(req.body);
    //Read cryptids
    let cryptids = fs.readFileSync('./cryptids.json');
    //JSON parse cryptids
    let cryptidData = JSON.parse(cryptids);
    //add req.body to end of cryptids
    cryptidsData.push(req.body);
    // JSON stringify cryptids
    let newCryptids = JSON.stringify(cryptidsData);
    // write cryptids
    fs.writeFileSync('cryptids.json', newCryptids);

    //redirect to show page for new cryptid
    res.redirect(`/cryptids/${cryptidsData.length - 1}`);
});


// Show - Get route
router.get('/:id', (req, res) => {
    //Get actual cryptid at idi of req.params.id
    let cryptids = fs.readFileSync('./cryptids.json');
    let cryptidsData = JSON.parse(cryptids);
    let cryptidsIndex = parseInt(req.params.id);
    let oneCryptids = cryptidsData[cryptidsIndex];
    oneCryptids.id = cryptidsIndex;

    res.render('cryptids/show', { cryptids: oneCryptids });
});


// Edit - Get route
router.get('/edit/:id', (req, res) => {
    //TODO get cryptids info and pass it in
    let cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids);
    let cryptidsIndex = parseInt(req.params.id);
    let oneCryptids = cryptids[cryptidsIndex];
    oneCryptids.id = cryptidsIndex;

    res.render('cryptids/edit', { cryptids: oneCryptids});
});


// Update - Put route
router.put('/:id', (req, res) => {
    console.log(req.body);
    //Read the file
    let cryptids = fs.readFileSync('./cryptids.json');
    //json parse the cryptids
    cryptids = JSON.parse(cryptids);
    //change the name and type of cryptid at index
    cryptids[parseInt(req.params.id)] = req.bodys
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));

    res.redirect(`/cryptids/${req.params.id}`)
});


//Destroy - Delete route. 
//----------Anything that is not a get route, needs to redirect to a get route
router.delete('/:id', (req, res) => {
    console.log(`Deleting cryptid at id ${req.params.id}`)
    //read cryptids
    let cryptids = fs.readFileSync('./cryptids.json');
    //JSON pars cryptids
    cryptids = JSON.parse(cryptids);
    //remove cryptid frorm array at index
    let deadCryptids = cryptids.splice(req.params.id, 1);
    //JSON stringified version of cryptids
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));

    console.log(`Press F to pay respects to ${deadCryptids[0].name}`);
    res.redirect('/cryptids');
});



module.exports = router;