const express = require('express');
const router = express.Router();
const Experience = require('../models/ExperienceModel');


router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
