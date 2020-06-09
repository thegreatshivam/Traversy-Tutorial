//Import Modules
const express = require('express');

//Importing Local Modules
const members = require('../../Members');

//Initialize Express Router
const router = express.Router();

// Get All Members
router.get('/', (req, res) => res.json(members));

//Get Single Member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    found ? res.json(members.filter(member => member.id === parseInt(req.params.id))) : res.status(404).json({message: 'Member not found!'});
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: parseInt(req.body.id),
        name: req.body.name,
        status: req.body.status
    };
    if(!newMember.id || !newMember.name || !newMember.status) {
        return res.status(400).json({message: 'Please enter id, name and status correctly'});
    }
    members.push(newMember);

    res.redirect('/');
});

//Update Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updatedMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.status = updatedMember.status ? updatedMember.status : member.status;
            }
        });
        res.json(member);
    } else {
        return res.status(400).json({message: `Member with id ${req.params.id} not found`});
    }
});

//Remove Member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        for(let i = 0; i < members.length; i++) {
            if(members[i].id === parseInt(req.params.id)) {
                members.splice(i, 1);
            }
        }
        res.json(members);
    } else {
        return res.status(400).json({message: `Member with id ${req.params.id} not found`});
    }
});

module.exports = router;
