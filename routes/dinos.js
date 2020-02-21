//Mounted at '/dinos'
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Index - Get route
router.get('/', (req, res) => {
    //get all dinos, pass to page
    let allDinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(allDinos);

    res.render('dinos/index', { dinos: dinoData });
});

// New - Get route
router.get('/new', (req, res) => {
    res.render('dinos/new');
});


// Create - Post route
router.post('/', (req, res) => {
    console.log('haiiiiiiiiiiiiiiiiiii');
    console.log(req.body);
    //Read Dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    //JSON parse dinos
    let dinoData = JSON.parse(dinos);
    //add req.body to end of dinos
    dinoData.push(req.body);
    // JSON stringify dinos
    let newDinos = JSON.stringify(dinoData);
    // write dinos
    fs.writeFileSync('dinosaurs.json', newDinos);

    //redirect to show page for new dino
    res.redirect(`/dinos/${dinoData.length - 1}`);
});


// Show - Get route
router.get('/:id', (req, res) => {
    //Get actual dino at idi of req.params.id
    let dinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinoData[dinoIndex];
    oneDino.id = dinoIndex;

    res.render('dinos/show', { dino: oneDino });
});


// Edit - Get route
router.get('/edit/:id', (req, res) => {
    //TODO get dino info and pass it in
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinos[dinoIndex];
    oneDino.id = dinoIndex;

    res.render('dinos/edit', { dino: oneDino});
});


// Update - Put route
router.put('/:id', (req, res) => {
    console.log(req.body);
    //Read the file
    let dinos = fs.readFileSync('./dinosaurs.json');
    //json parse the dinos
    dinos = JSON.parse(dinos);
    //change the name and type of dino at index
    dinos[parseInt(req.params.id)] = req.body
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));

    res.redirect(`/dinos/${req.params.id}`)
});


//Destroy - Delete route. 
//----------Anything that is not a get route, needs to redirect to a get route
router.delete('/:id', (req, res) => {
    console.log(`Deleting dino at id ${req.params.id}`)
    //read dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    //JSON pars dinos
    dinos = JSON.parse(dinos);
    //remove dino frorm array at index
    let deadDino = dinos.splice(req.params.id, 1);
    //JSON stringified version of dinos
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));

    console.log(`Press F to pay respects to ${deadDino[0].name}`);
    res.redirect('/dinos');
});



module.exports = router;