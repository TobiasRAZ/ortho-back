const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

// Get rituals
router.get('/', async (req, res) => {
 const rituals = await loadRitualsCollection();

 res.send(await rituals.find({}).toArray());
});

// Add ritual
router.post('/', async (req, res) => {
    const rituals = await loadRitualsCollection();

    const response = await rituals.insertOne(req.body);

    res.status(201).send(response);
});

// Update ritual
router.post('/:id', async (req, res) => {
    const rituals = await loadRitualsCollection();

    const response = await rituals.updateOne(
        { _id : mongodb.ObjectId(req.params.id)},
        { $set: req.body}
    );

    res.status(204).send(response);
});

// Delete ritual
router.delete('/:id', async (req, res) => {
    const rituals = await loadRitualsCollection();

    await rituals.deleteOne({ _id : mongodb.ObjectId(req.params.id)});

    res.status(200).send();
})

async function loadRitualsCollection() {
    const client = await mongodb.MongoClient
        .connect('mongodb+srv://ritualdb:u0x6ycwBwLZVz7ru@cluster0.lpt9j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true
        })

    return client.db('ritualdb').collection('rituals');
}

module.exports = router;
