const express = require('express');
const router = express.Router();
const Model = require('../model/model');

// Create a new data entry
router.post('/quotes', async (req, res) => {
  const data = new Model({
    quotes: req.body.quotes,
  });

  try {
    const a = await data.save();
    res.status(200).json(a);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Get all data entries
router.get('/getAll', async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single data entry by ID
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a data entry by ID
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const option = { new: true };
    const result = await Model.findByIdAndUpdate(id, updateData, option);

    if (!result) {
      return res.status(404).json({ message: "Data not found for update" });
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a data entry by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found for deletion" });
    }
    res.send(`${data.name} data deleted`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
